// src/backend/__tests__/user/streak-edge-cases.test.js

// Mock modules
jest.mock('pg', () => {
    const mPool = {
      query: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
  });
  
  describe('User Streak Edge Cases', () => {
    let pool;
    let request;
    let response;
    
    beforeEach(() => {
      jest.clearAllMocks();
      
      // Import the pool module and get the mock
      pool = require('../../db');
      
      // Create mock req/res objects
      request = {
        params: {},
        body: {},
      };
      
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
    
    describe('Streak Reset Functionality', () => {
      test('should reset user streaks correctly', async () => {
        // Set userId parameter
        request.params = { userId: '123' };
        
        // Mock reset query
        pool.query.mockResolvedValueOnce({ rows: [] });
        
        // Import server and execute handler
        const server = require('../../server');
        const resetUserStreaksHandler = server.__testables.resetUserStreaksHandler;
        await resetUserStreaksHandler(request, response);
        
        // Verify correct query
        expect(pool.query).toHaveBeenCalledWith(
          expect.stringContaining('SET quiz_streak = 0'),
          ['123']
        );
        
        expect(response.json).toHaveBeenCalledWith(expect.objectContaining({
          success: true,
          message: expect.stringContaining('reset successfully')
        }));
      });
      
      test('should reset all users streaks correctly', async () => {
        // Mock reset all query
        pool.query.mockResolvedValueOnce({ rows: [] });
        
        // Import server and execute handler
        const server = require('../../server');
        const resetAllStreaksHandler = server.__testables.resetAllStreaksHandler;
        await resetAllStreaksHandler(request, response);
        
        // Verify success response
        expect(response.json).toHaveBeenCalledWith(expect.objectContaining({
          success: true,
          message: expect.stringContaining('All users streak data')
        }));
      });
    });
    
    describe('Streak Data Access', () => {
      test('should return 404 for non-existent user', async () => {
        // Set userId parameter
        request.params = { userId: '999' };
        
        // Mock user query for non-existent user
        pool.query.mockResolvedValueOnce({ rows: [] });
        
        // Import server and execute handler
        const server = require('../../server');
        const getUserStreaksHandler = server.__testables.getUserStreaksHandler;
        await getUserStreaksHandler(request, response);
        
        // Should return 404 for non-existent user
        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledWith({ error: 'User not found' });
      });
    });
  });