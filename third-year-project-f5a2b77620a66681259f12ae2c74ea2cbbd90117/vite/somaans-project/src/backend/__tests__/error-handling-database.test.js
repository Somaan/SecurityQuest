// src/backend/__tests__/error-handling-database.test.js
jest.mock('pg', () => {
    const mPool = { query: jest.fn() };
    return { Pool: jest.fn(() => mPool) };
  });
  
  describe('Database Error Handling', () => {
    let pool, request, response;
    
    beforeEach(() => {
      jest.clearAllMocks();
      pool = require('../db');
      
      request = {
        body: {},
        params: {},
        protocol: 'http',
        get: jest.fn().mockReturnValue('localhost:5000')
      };
      
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });
    
    test('should handle database errors in threat performance endpoint', async () => {
      // Force database error
      pool.query.mockRejectedValueOnce(new Error('Database error'));
      
      request.params = { userId: '123' };
      
      const server = require('../server');
      await server.__testables.getThreatPerformanceHandler(request, response);
      
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ error: 'Server error' });
    });
    
    test('should handle JSON parsing errors in missed threats data', async () => {
      // First query succeeds
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Second query returns unparseable JSON
      pool.query.mockResolvedValueOnce({
        rows: [{
          question_type: 'email_analysis',
          identifications: '{invalid json',
          frequency: '3'
        }]
      });
      
      request.params = { userId: '123' };
      
      const server = require('../server');
      await server.__testables.getThreatPerformanceHandler(request, response);
      
      // Should not crash, should return valid response
      expect(response.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        performance: expect.any(Array),
        missedThreats: expect.any(Object)
      }));
    });
    
    test('should handle database errors in reset user streaks endpoint', async () => {
      // Force database error
      pool.query.mockRejectedValueOnce(new Error('Database error'));
      
      request.params = { userId: '123' };
      
      const server = require('../server');
      await server.__testables.resetUserStreaksHandler(request, response);
      
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ error: 'Server error' });
    });
    
    test('should handle database errors in reset all streaks endpoint', async () => {
      // Force database error
      pool.query.mockRejectedValueOnce(new Error('Database error'));
      
      const server = require('../server');
      await server.__testables.resetAllStreaksHandler(request, response);
      
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ error: 'Server error' });
    });
  });