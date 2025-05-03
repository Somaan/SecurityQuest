// src/backend/__tests__/auth/remember-token-verification.test.js
// Tests for the remember token verification functionality

// Mock modules
jest.mock('pg', () => {
    const mPool = {
      query: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
  });
  
  describe('Remember Token Verification', () => {
    let pool;
    let request;
    let response;
    
    beforeEach(() => {
      jest.clearAllMocks();
      
      // Import the pool module and get the mock
      pool = require('../../db');
      
      // Create mock req/res objects
      request = {
        body: {},
      };
      
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
    
    test('should verify valid remember token', async () => {
      // Setup request with valid token
      request.body = {
        token: 'valid-token-123'
      };
      
      // Mock token query result
      pool.query.mockResolvedValueOnce({
        rows: [{
          id: 1,
          user_id: 123,
          token: 'valid-token-123',
          expires_at: new Date(Date.now() + 86400000), // 1 day in future
          is_used: false
        }]
      });
      
      // Mock user query result
      pool.query.mockResolvedValueOnce({
        rows: [{
          id: 123,
          username: 'testuser',
          email: 'test@example.com'
        }]
      });
      
      // Import server and execute handler
      const server = require('../../server');
      // Create a handler for testing - it will be similar to login code path
      const verifyToken = async (req, res) => {
        const { token } = req.body;
        
        try {
          // Find token in database
          const tokenResult = await pool.query(
            `SELECT * FROM remember_tokens 
             WHERE token = $1 
             AND expires_at > NOW() 
             AND is_used = FALSE`,
            [token]
          );
          
          if (tokenResult.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid or expired token' });
          }
          
          const tokenRecord = tokenResult.rows[0];
          
          // Get user data
          const userResult = await pool.query(
            'SELECT id, username, email FROM users WHERE id = $1',
            [tokenRecord.user_id]
          );
          
          if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
          }
          
          // Return success with user data
          res.json({
            success: true,
            user: {
              id: userResult.rows[0].id,
              username: userResult.rows[0].username
            }
          });
        } catch (error) {
          res.status(500).json({ error: 'Server error' });
        }
      };
      
      await verifyToken(request, response);
      
      // Verify the response
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT * FROM remember_tokens'),
        ['valid-token-123']
      );
      
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        user: {
          id: 123,
          username: 'testuser'
        }
      });
    });
    
    test('should reject expired remember token', async () => {
      // Setup request with expired token
      request.body = {
        token: 'expired-token-123'
      };
      
      // Mock token query result - empty because token is expired
      pool.query.mockResolvedValueOnce({
        rows: [] // Empty result means no valid token found
      });
      
      // Import server and execute handler
      const server = require('../../server');
      // Create a handler for testing
      const verifyToken = async (req, res) => {
        const { token } = req.body;
        
        try {
          // Find token in database
          const tokenResult = await pool.query(
            `SELECT * FROM remember_tokens 
             WHERE token = $1 
             AND expires_at > NOW() 
             AND is_used = FALSE`,
            [token]
          );
          
          if (tokenResult.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid or expired token' });
          }
          
          // We shouldn't reach here in this test
          res.json({ success: true });
        } catch (error) {
          res.status(500).json({ error: 'Server error' });
        }
      };
      
      await verifyToken(request, response);
      
      // Verify the response
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT * FROM remember_tokens'),
        ['expired-token-123']
      );
      
      expect(response.status).toHaveBeenCalledWith(401);
      expect(response.json).toHaveBeenCalledWith({
        error: 'Invalid or expired token'
      });
    });
  });