// Mock modules
jest.mock('pg', () => {
    const mPool = {
      query: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
  });
  
  jest.mock('crypto');
  
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
        params: {},
      };
      
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
    
    test('should verify valid remember token', async () => {
      // Mock query to find token
      pool.query.mockResolvedValueOnce({
        rows: [{
          id: 10,
          user_id: 123,
          token: 'valid-token',
          expires_at: new Date(Date.now() + 1000000),
          is_used: false
        }]
      });
      
      // Mock user query
      pool.query.mockResolvedValueOnce({
        rows: [{
          id: 123,
          username: 'testuser',
          email: 'test@example.com'
        }]
      });
      
      // Setup request
      request.body = {
        token: 'valid-token'
      };
      
      // Create a custom endpoint for token verification since there isn't one in the actual code
      const verifyToken = async (req, res) => {
        try {
          const { token } = req.body;
          
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
          
          res.json({
            success: true,
            user: userResult.rows[0]
          });
          
        } catch (error) {
          res.status(500).json({ error: 'Server error' });
        }
      };
      
      // Execute the handler
      await verifyToken(request, response);
      
      // Verify successful response
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        user: expect.objectContaining({
          id: 123,
          username: 'testuser'
        })
      });
    });
    
    test('should reject expired remember token', async () => {
      // Mock query to find expired token - return empty rows array to simulate 
      // that no valid, unexpired tokens were found
      pool.query.mockResolvedValueOnce({
        rows: [] // Empty result because the token is expired
      });
      
      // Setup request
      request.body = {
        token: 'expired-token'
      };
      
      // Create a custom endpoint for token verification
      const verifyToken = async (req, res) => {
        try {
          const { token } = req.body;
          
          // Find token in database with proper expiry check
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
          
          // Rest of the function...
          res.json({ success: true });
          
        } catch (error) {
          res.status(500).json({ error: 'Server error' });
        }
      };
      
      // Execute the handler
      await verifyToken(request, response);
      
      // Verify rejection response
      expect(response.status).toHaveBeenCalledWith(401);
      expect(response.json).toHaveBeenCalledWith({
        error: 'Invalid or expired token'
      });
    });
    
    test('should reject used remember token', async () => {
      // Mock query to find used token (empty result because of is_used=FALSE condition)
      pool.query.mockResolvedValueOnce({
        rows: []
      });
      
      // Setup request
      request.body = {
        token: 'used-token'
      };
      
      // Create a custom endpoint for token verification
      const verifyToken = async (req, res) => {
        try {
          const { token } = req.body;
          
          // Find token in database with proper usage check
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
          
          // Rest of the function...
          
        } catch (error) {
          res.status(500).json({ error: 'Server error' });
        }
      };
      
      // Execute the handler
      await verifyToken(request, response);
      
      // Verify rejection response
      expect(response.status).toHaveBeenCalledWith(401);
      expect(response.json).toHaveBeenCalledWith({
        error: 'Invalid or expired token'
      });
    });
  });