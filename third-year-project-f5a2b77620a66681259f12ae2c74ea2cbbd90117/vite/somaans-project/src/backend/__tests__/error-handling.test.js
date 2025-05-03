// src/backend/__tests__/error-handling.test.js

// Mock modules
jest.mock('pg', () => {
    const mPool = {
      query: jest.fn(),
      connect: jest.fn(),
      end: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
  });
  
  // Mock SendGrid
  jest.mock('@sendgrid/mail', () => ({
    setApiKey: jest.fn(),
    send: jest.fn().mockResolvedValue([{ statusCode: 202 }]),
  }));
  
  describe('Error Handling', () => {
    let pool;
    let request;
    let response;
    
    beforeEach(() => {
      jest.clearAllMocks();
      
      // Import the pool module and get the mock
      pool = require('../db');
      
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
    
    describe('Database Error Handling', () => {
      test('should handle database query failures gracefully', async () => {
        // Mock query failure
        pool.query.mockRejectedValueOnce(new Error('Database error'));
        
        // Attempt to fetch user achievements
        request.params = { userId: '123' };
        
        // Import server and execute handler
        const server = require('../server');
        const getUserAchievementsHandler = server.__testables.getUserAchievementsHandler;
        await getUserAchievementsHandler(request, response);
        
        // Verify proper error response
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith(expect.objectContaining({ 
          error: 'Server error' 
        }));
      });
    });
    
    describe('Authentication Error Handling', () => {
      test('should handle invalid credentials properly', async () => {
        // Mock user query
        pool.query.mockResolvedValueOnce({
          rows: [{ 
            id: 1, 
            username: 'testuser',
            password_hash: 'hashedpassword' 
          }]
        });
        
        // Mock bcrypt.compare to return false (invalid password)
        const bcrypt = require('bcrypt');
        bcrypt.compare = jest.fn().mockResolvedValueOnce(false);
        
        // Setup request
        request.body = {
          username: 'testuser',
          password: 'wrongpassword'
        };
        
        // Import server and execute handler
        const server = require('../server');
        const loginHandler = server.__testables.loginHandler;
        await loginHandler(request, response);
        
        // Should return 401 for invalid password
        expect(response.status).toHaveBeenCalledWith(401);
        expect(response.json).toHaveBeenCalledWith({ error: 'Invalid password' });
      });
    });
  });