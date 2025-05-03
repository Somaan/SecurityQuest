// src/backend/__tests__/quiz/quiz-edge-cases.test.js

// Mock modules
jest.mock('pg', () => {
    const mPool = {
      query: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
  });
  
  describe('Quiz Edge Cases', () => {
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
      };
      
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
    
    describe('Quiz Completion Edge Cases', () => {
      test('should handle quiz with mixed question types', async () => {
        // Setup request with mixed question types
        request.body = {
          userId: 1,
          quizId: 2,
          score: 80,
          totalQuestions: 3,
          correctAnswers: 2,
          duration: 120,
          completionDetails: [
            // Multiple choice - correct
            {
              questionIndex: 0,
              question: 'What is phishing?',
              selectedOption: 'A deceptive attempt to steal information',
              correctOption: 'A deceptive attempt to steal information',
              isCorrect: true
            },
            // Email analysis question
            {
              type: 'email_analysis',
              questionIndex: 1,
              details: {
                earnedPoints: 8,
                maxPoints: 10,
                truePositives: ['sender', 'link'],
                falsePositives: ['greeting'],
                falseNegatives: ['urgency']
              }
            },
            // Multiple choice - incorrect
            {
              questionIndex: 2,
              question: 'What should you do with suspicious emails?',
              selectedOption: 'Open them',
              correctOption: 'Report them',
              isCorrect: false
            }
          ]
        };
        
        // Mock sequence for database operations
        pool.query.mockResolvedValueOnce({ rows: [] }); // quiz_attempts insertion
        pool.query.mockResolvedValueOnce({ rows: [] }); // column check
        pool.query.mockResolvedValueOnce({ rows: [] }); // duplicate check
        pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] }); // user exists
        pool.query.mockResolvedValueOnce({ rows: [{ id: 456 }] }); // Insert completion
        
        // Mock for streak handling
        pool.query.mockResolvedValueOnce({
          rows: [{ last_quiz_update: null }]
        });
        pool.query.mockResolvedValueOnce({ rows: [] }); // Update streak
        pool.query.mockResolvedValueOnce({ rows: [{ quiz_streak: 1, longest_quiz_streak: 1 }] });
        pool.query.mockResolvedValueOnce({ rows: [{ count: '1' }] });
        
        // Import server and execute handler
        const server = require('../../server');
        const completeQuizHandler = server.__testables.completeQuizHandler;
        await completeQuizHandler(request, response);
        
        // Should complete quiz successfully
        expect(response.json).toHaveBeenCalledWith(expect.objectContaining({
          success: true,
          message: expect.stringContaining('Quiz completion recorded')
        }));
      });
      
      test('should handle duplicate quiz submission detection', async () => {
        // Setup request with submissionId
        request.body = {
          userId: 1,
          quizId: 2,
          score: 80,
          totalQuestions: 5,
          correctAnswers: 4,
          duration: 120,
          submissionId: 'duplicate-submission-id'
        };
        
        // Mock quiz_attempts insert query
        pool.query.mockResolvedValueOnce({ rows: [] });
        
        // Mock submission_id column check query
        pool.query.mockResolvedValueOnce({ rows: [{ submission_id: 'some-id' }] });
        
        // Mock duplicate submission check - finding existing submission
        pool.query.mockResolvedValueOnce({
          rows: [{ id: 123 }]
        });
        
        // Import server and execute handler
        const server = require('../../server');
        const completeQuizHandler = server.__testables.completeQuizHandler;
        await completeQuizHandler(request, response);
        
        // Should detect duplicate
        expect(response.json).toHaveBeenCalledWith(expect.objectContaining({
          success: true,
          message: expect.stringContaining('already recorded'),
          duplicate: true
        }));
      });
    });
    
    describe('Quiz Threat Performance Analysis', () => {
      test('should handle empty performance results', async () => {
        // Set userId parameter
        request.params = { userId: '123' };
        
        // Mock empty performance results
        pool.query.mockResolvedValueOnce({ rows: [] });
        
        // Mock empty missed threats
        pool.query.mockResolvedValueOnce({ rows: [] });
        
        // Import server and execute handler
        const server = require('../../server');
        const getThreatPerformanceHandler = server.__testables.getThreatPerformanceHandler;
        await getThreatPerformanceHandler(request, response);
        
        // Should return empty results successfully
        expect(response.json).toHaveBeenCalledWith({
          success: true,
          performance: [],
          missedThreats: {}
        });
      });
    });
  });