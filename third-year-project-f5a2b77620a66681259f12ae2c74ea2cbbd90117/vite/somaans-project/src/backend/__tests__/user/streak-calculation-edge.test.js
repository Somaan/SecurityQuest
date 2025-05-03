// src/backend/__tests__/user/streak-calculation-edge.test.js
jest.mock('pg', () => {
    const mPool = {
      query: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
  });
  
  describe('Streak Calculation Edge Cases', () => {
    let pool;
    let request;
    let response;
    
    beforeEach(() => {
      jest.clearAllMocks();
      pool = require('../../db');
      
      request = {
        body: {
          userId: 123,
          quizId: 1,
          score: 80,
          totalQuestions: 5,
          correctAnswers: 4,
          duration: 120
        }
      };
      
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
    
    test('should not update streak for second quiz in same day', async () => {
      // Instead of using a counter, set up a map of responses for different query patterns
      pool.query.mockImplementation((query, params) => {
        // Quiz attempt insertion
        if (query.includes('INSERT INTO quiz_attempts')) {
          return Promise.resolve({ rows: [] });
        }
        // Column check for submission_id
        else if (query.includes('submission_id FROM quiz_completions')) {
          return Promise.resolve({ rows: [{ submission_id: 'exists' }] });
        }
        // Check for duplicate submission
        else if (query.includes('SELECT id FROM quiz_completions WHERE submission_id')) {
          return Promise.resolve({ rows: [] });
        }
        // User exists check
        else if (query.includes('SELECT id FROM users WHERE id')) {
          return Promise.resolve({ rows: [{ id: 123 }] });
        }
        // CRITICAL FIX: Insert completion with proper return value
        else if (query.includes('INSERT INTO quiz_completions')) {
          return Promise.resolve({ 
            rows: [{ 
              id: 456, 
              completion_date: new Date().toISOString() 
            }] 
          });
        }
        // Get last quiz date - crucial mock for this test
        else if (query.includes('SELECT last_quiz_update')) {
          // Return TODAY to simulate already completed quiz today
          return Promise.resolve({ 
            rows: [{ last_quiz_update: new Date().toISOString().slice(0, 10) }] 
          });
        }
        // Update timestamp query
        else if (query.includes('UPDATE users SET last_quiz_update')) {
          return Promise.resolve({ rows: [] });
        }
        // Get updated user streak data
        else if (query.includes('SELECT quiz_streak')) {
          return Promise.resolve({ 
            rows: [{ quiz_streak: 3, longest_quiz_streak: 5 }] 
          });
        }
        // Get quiz count
        else if (query.includes('COUNT(*)') || query.includes('count(*)')) {
          return Promise.resolve({ rows: [{ count: '10' }] });
        }
        // Default response
        return Promise.resolve({ rows: [] });
      });
      
      const server = require('../../server');
      await server.__testables.completeQuizHandler(request, response);
      
      // Should return success with unchanged streak
      expect(response.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        quizStreak: 3
      }));
      
      // Verify the specific update timestamp query was called but not the increment streak query
      const updateQueries = pool.query.mock.calls.map(call => call[0]);
      
      // Should call the update timestamp query
      expect(updateQueries.some(q => 
        q.includes('UPDATE users') && q.includes('last_quiz_update')
      )).toBe(true);
      
      // Should NOT call the increment streak query
      expect(updateQueries.some(q => 
        q.includes('quiz_streak = COALESCE(quiz_streak, 0) + 1')
      )).toBe(false);
    });
  });