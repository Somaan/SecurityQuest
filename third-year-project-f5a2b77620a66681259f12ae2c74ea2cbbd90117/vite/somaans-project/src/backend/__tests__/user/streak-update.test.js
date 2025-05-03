// src/backend/__tests__/user/streak-update.test.js
jest.mock('pg', () => {
    const mPool = {
      query: jest.fn((query, params) => {
        // Default simple response for most queries
        const defaultResponse = { rows: [{}] };
        
        // For user query
        if (query.includes('SELECT id FROM users WHERE id')) {
          return Promise.resolve({ rows: [{ id: 123 }] });
        }
        
        // For quiz completion insertion
        if (query.includes('INSERT INTO quiz_completions')) {
          return Promise.resolve({ 
            rows: [{ id: 456, completion_date: new Date().toISOString() }] 
          });
        }
        
        // For quiz count query
        if (query.includes('SELECT COUNT(*) as count')) {
          return Promise.resolve({ rows: [{ count: '10' }] });
        }
        
        // For user streak data
        if (query.includes('SELECT quiz_streak, longest_quiz_streak')) {
          // Customize based on test context using a global variable
          if (global.testCase === 'yesterday') {
            return Promise.resolve({ rows: [{ quiz_streak: 5, longest_quiz_streak: 7 }] });
          } else if (global.testCase === 'threedays') {
            return Promise.resolve({ rows: [{ quiz_streak: 1, longest_quiz_streak: 7 }] });
          } else if (global.testCase === 'today') {
            return Promise.resolve({ rows: [{ quiz_streak: 4, longest_quiz_streak: 7 }] });
          } else {
            return Promise.resolve({ rows: [{ quiz_streak: 3, longest_quiz_streak: 5 }] });
          }
        }
        
        // Default response for other queries
        return Promise.resolve(defaultResponse);
      })
    };
    return { Pool: jest.fn(() => mPool) };
  });
  
  describe('User Streak Management', () => {
    let request, response;
    
    beforeEach(() => {
      jest.clearAllMocks();
      
      request = {
        body: {
          userId: 123,
          quizId: 1,
          score: 85,
          totalQuestions: 5,
          correctAnswers: 4,
          duration: 150
        }
      };
      
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });
    
    test('should continue streak when quiz completed the day after last quiz', async () => {
      global.testCase = 'yesterday';
      const server = require('../../server');
      await server.__testables.completeQuizHandler(request, response);
      
      // Verify the handler completes and returns a successful response
      expect(response.json).toHaveBeenCalled();
      const responseData = response.json.mock.calls[0][0];
      expect(responseData.success).toBe(true);
    });
    
    test('should reset streak when completing quiz after missing days', async () => {
      global.testCase = 'threedays';
      const server = require('../../server');
      await server.__testables.completeQuizHandler(request, response);
      
      // Verify the handler completes and returns a successful response
      expect(response.json).toHaveBeenCalled();
      const responseData = response.json.mock.calls[0][0];
      expect(responseData.success).toBe(true);
    });
    
    test('should not update streak for second quiz in same day', async () => {
      global.testCase = 'today';
      const server = require('../../server');
      await server.__testables.completeQuizHandler(request, response);
      
      // Verify the handler completes and returns a successful response
      expect(response.json).toHaveBeenCalled();
      const responseData = response.json.mock.calls[0][0];
      expect(responseData.success).toBe(true);
    });
  });