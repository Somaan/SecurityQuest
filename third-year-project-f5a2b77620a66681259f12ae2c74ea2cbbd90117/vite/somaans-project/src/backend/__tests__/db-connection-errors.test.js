// Mock modules
jest.mock('pg', () => {
    const mPool = {
      query: jest.fn(),
      connect: jest.fn(),
      end: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
  });
  
  describe('Database Connection Error Handling', () => {
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
        protocol: 'http',
        get: jest.fn().mockReturnValue('localhost:5000'),
      };
      
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
    
    test('should handle database connection failures gracefully', async () => {
      // Mock connection failure
      pool.connect.mockRejectedValueOnce(new Error('Connection refused'));
      
      // Try to access an endpoint that requires DB connection
      request.params = { userId: '123' };
      
      // Import server and execute handler
      const server = require('../server');
      const getUserAchievementsHandler = server.__testables.getUserAchievementsHandler;
      await getUserAchievementsHandler(request, response);
      
      // Should return appropriate error
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith(expect.objectContaining({ 
        error: 'Server error' 
      }));
    });
    
    test('should handle timeouts gracefully', async () => {
      // Mock query timeout
      const timeoutError = new Error('Query timeout');
      timeoutError.code = '57014'; // SQL state code for query timeout
      pool.query.mockRejectedValueOnce(timeoutError);
      
      // Try to access an endpoint that requires DB query
      request.params = { userId: '123' };
      
      // Import server and execute handler
      const server = require('../server');
      const getUserAchievementsHandler = server.__testables.getUserAchievementsHandler;
      await getUserAchievementsHandler(request, response);
      
      // Should return appropriate error
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith(expect.objectContaining({ 
        error: 'Server error' 
      }));
    });
  });