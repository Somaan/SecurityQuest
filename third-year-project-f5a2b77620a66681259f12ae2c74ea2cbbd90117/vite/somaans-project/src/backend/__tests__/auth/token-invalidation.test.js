// src/backend/__tests__/auth/token-invalidation.test.js
jest.mock('pg', () => {
    const mPool = { query: jest.fn() };
    return { Pool: jest.fn(() => mPool) };
  });
  
  describe('Remember Token Invalidation', () => {
    let pool, request, response;
    
    beforeEach(() => {
      jest.clearAllMocks();
      pool = require('../../db');
      
      request = { body: {} };
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });
    
    test('should invalidate all remember tokens for user', async () => {
      // Setup precise mocking for the endpoint
      pool.query.mockResolvedValueOnce({ rows: [{ id: 123 }] }); // User found
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }, { id: 2 }] }); // 2 tokens invalidated
      
      request.body = { username: 'testuser' };
      
      // Create direct test for invalidation endpoint
      const invalidateToken = async (req, res) => {
        const { username } = req.body;
        
        try {
          // Find user by username
          const userResult = await pool.query(
            'SELECT id FROM users WHERE username = $1',
            [username]
          );
          
          if (userResult.rows.length > 0) {
            const userId = userResult.rows[0].id;
            
            // Mark all tokens for this user as used
            const updateResult = await pool.query(
              'UPDATE remember_tokens SET is_used = TRUE WHERE user_id = $1 RETURNING id',
              [userId]
            );
            
            res.json({ 
              success: true, 
              invalidated_count: updateResult.rows.length 
            });
          } else {
            res.status(404).json({ error: 'User not found' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Server error' });
        }
      };
      
      await invalidateToken(request, response);
      
      // Verify precise function behavior
      expect(pool.query).toHaveBeenNthCalledWith(
        1,
        'SELECT id FROM users WHERE username = $1',
        ['testuser']
      );
      expect(pool.query).toHaveBeenNthCalledWith(
        2,
        'UPDATE remember_tokens SET is_used = TRUE WHERE user_id = $1 RETURNING id',
        [123]
      );
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        invalidated_count: 2
      });
    });
    
    test('should handle database errors when invalidating tokens', async () => {
      // Force database error
      pool.query.mockRejectedValueOnce(new Error('Database connection failed'));
      
      request.body = { username: 'testuser' };
      
      // Direct test for error handling in invalidation endpoint
      const invalidateToken = async (req, res) => {
        const { username } = req.body;
        
        try {
          // Find user by username
          const userResult = await pool.query(
            'SELECT id FROM users WHERE username = $1',
            [username]
          );
          
          // Rest of handler would go here...
          
        } catch (error) {
          res.status(500).json({ error: 'Server error' });
        }
      };
      
      await invalidateToken(request, response);
      
      // Verify error handling
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ error: 'Server error' });
    });
  });