// src/backend/__tests__/db-table-creation.test.js
jest.mock('pg', () => {
    const mPool = {
      query: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
  });
  
  jest.mock('bcrypt', () => ({
    compare: jest.fn().mockResolvedValue(true)
  }));
  
  jest.mock('crypto', () => ({
    randomBytes: jest.fn().mockReturnValue({
      toString: jest.fn().mockReturnValue('test-token')
    })
  }));
  
  describe('Database Table Creation Logic', () => {
    let pool;
    let request;
    let response;
    
    beforeEach(() => {
      jest.clearAllMocks();
      pool = require('../db');
      
      request = {
        body: {
          username: 'testuser',
          password: 'password123',
          remember_me: true
        }
      };
      
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
    
    test('should create remember_tokens table if it does not exist', async () => {
      // Exactly match the query sequence from server.js login handler
      
      // 1. User lookup
      pool.query.mockResolvedValueOnce({
        rows: [{ 
          id: 1, 
          username: 'testuser', 
          password_hash: 'hashedpassword' 
        }]
      });
      
      // 2. Update last login
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // 3. Table existence check - KEY MOCK FOR THIS TEST (no need to match exact string)
      pool.query.mockResolvedValueOnce({
        rows: [{ exists: false }]
      });
      
      // 4. CREATE TABLE and CREATE INDEX queries (combined in server.js)
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // 5. Token storage - THIS NEEDS TO RETURN ID
      pool.query.mockResolvedValueOnce({ 
        rows: [{ id: 123 }]  // Return valid ID for token storage
      });
      
      // 6. Token verification
      pool.query.mockResolvedValueOnce({
        rows: [{ 
          id: 123, 
          user_id: 1, 
          token: 'test-token' 
        }]
      });
      
      const server = require('../server');
      await server.__testables.loginHandler(request, response);
      
      // Don't check exact query text - just verify table creation was attempted
      expect(pool.query).toHaveBeenCalledTimes(6);
      
      // Instead of checking query text, check query sequence logic
      // First check is for user
      expect(pool.query.mock.calls[0][0]).toMatch(/SELECT.*FROM users/i);
      
      // Second is updating last login
      expect(pool.query.mock.calls[1][0]).toMatch(/UPDATE users SET last_login/i);
      
      // Third is checking if table exists
      expect(pool.query.mock.calls[2][0]).toMatch(/SELECT EXISTS/i);
      expect(pool.query.mock.calls[2][0]).toMatch(/remember_tokens/i);
      
      // Fourth is creating table
      expect(pool.query.mock.calls[3][0]).toMatch(/CREATE TABLE/i);
      expect(pool.query.mock.calls[3][0]).toMatch(/remember_tokens/i);
      
      // Response should include remember token
      expect(response.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        remember_token: 'test-token'
      }));
    });
  });