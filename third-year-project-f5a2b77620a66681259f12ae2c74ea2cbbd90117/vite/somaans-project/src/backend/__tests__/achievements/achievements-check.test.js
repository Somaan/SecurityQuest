// src/backend/__tests__/achievements/achievements-check.test.js

// Mock modules
jest.mock('pg', () => {
    const mPool = {
      query: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
  });
  
  describe('Achievements Check Endpoints', () => {
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
        protocol: 'http',
        get: jest.fn().mockReturnValue('localhost:5000'),
      };
      
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      
      // Reset global fetch mock
      global.fetch = jest.fn();
    });
    
    describe('GET /api/users/:userId/check-achievements', () => {
      test('should identify newly unlocked achievements', async () => {
        // Mock previously unlocked achievements query
        pool.query.mockResolvedValueOnce({
          rows: [{ achievement_id: 1 }]  // User has already unlocked achievement #1
        });
        
        // Mock fetch response for current achievements
        global.fetch.mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce({
            success: true,
            achievements: [
              { id: 1, title: 'Dedicated User', unlocked: true },
              { id: 2, title: 'Quiz Enthusiast', unlocked: true } // Newly unlocked
            ]
          })
        });
        
        // Set userId parameter
        request.params = { userId: '123' };
        
        // Import server and execute handler
        const server = require('../../server');
        const checkNewAchievementsHandler = server.__testables.checkNewAchievementsHandler;
        await checkNewAchievementsHandler(request, response);
        
        // Verify expectations
        expect(pool.query).toHaveBeenCalledWith(
          expect.stringContaining('SELECT achievement_id'),
          ['123']
        );
        expect(global.fetch).toHaveBeenCalledWith(
          'http://localhost:5000/api/users/123/achievements'
        );
        expect(response.json).toHaveBeenCalledWith({
          success: true,
          newAchievements: [
            expect.objectContaining({ id: 2, title: 'Quiz Enthusiast', unlocked: true })
          ]
        });
      });
      
      test('should return empty array when no new achievements', async () => {
        // Mock previously unlocked achievements query
        pool.query.mockResolvedValueOnce({
          rows: [
            { achievement_id: 1 },
            { achievement_id: 2 }
          ]
        });
        
        // Mock fetch response for current achievements - same as previous
        global.fetch.mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce({
            success: true,
            achievements: [
              { id: 1, title: 'Dedicated User', unlocked: true },
              { id: 2, title: 'Quiz Enthusiast', unlocked: true }
            ]
          })
        });
        
        // Set userId parameter
        request.params = { userId: '123' };
        
        // Import server and execute handler
        const server = require('../../server');
        const checkNewAchievementsHandler = server.__testables.checkNewAchievementsHandler;
        await checkNewAchievementsHandler(request, response);
        
        // Verify expectations
        expect(response.json).toHaveBeenCalledWith({
          success: true,
          newAchievements: []
        });
      });
      
      test('should handle error when achievements cannot be fetched', async () => {
        // Mock previously unlocked achievements query
        pool.query.mockResolvedValueOnce({
          rows: [{ achievement_id: 1 }]
        });
        
        // Mock fetch failure
        global.fetch.mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce({
            success: false
          })
        });
        
        // Set userId parameter
        request.params = { userId: '123' };
        
        // Import server and execute handler
        const server = require('../../server');
        const checkNewAchievementsHandler = server.__testables.checkNewAchievementsHandler;
        await checkNewAchievementsHandler(request, response);
        
        // Verify expectations
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith({ error: 'Server error' });
      });
    });
  });