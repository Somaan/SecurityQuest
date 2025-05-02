// src/backend/__tests__/quiz/quiz-completion.test.js

// Mock modules
jest.mock('pg', () => {
    const mPool = {
      query: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
  });
  
  describe('Quiz Completion Endpoint', () => {
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
      };
      
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
    
    test('should return 400 if duration is missing', async () => {
      // Setup request with missing duration
      request.body = {
        userId: 1,
        quizId: 2,
        score: 80,
        totalQuestions: 5,
        correctAnswers: 4
        // No duration provided
      };
      
      // Import server and execute handler
      const server = require('../../../server');
      const completeQuizHandler = server.__testables.completeQuizHandler;
      await completeQuizHandler(request, response);
      
      // Verify expectations
      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({ 
        error: 'Missing required field: duration_seconds' 
      });
    });
    
    test('should detect and handle duplicate submissions', async () => {
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
      const server = require('../../../server');
      const completeQuizHandler = server.__testables.completeQuizHandler;
      await completeQuizHandler(request, response);
      
      // Verify expectations
      expect(pool.query).toHaveBeenNthCalledWith(
        3,
        'SELECT id FROM quiz_completions WHERE submission_id = $1',
        ['duplicate-submission-id']
      );
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        message: 'Quiz completion already recorded',
        duplicate: true,
        completionId: 123
      });
    });
    
    test('should return 404 if user not found', async () => {
      // Setup request with valid data
      request.body = {
        userId: 999, // Non-existent user
        quizId: 2,
        score: 80,
        totalQuestions: 5,
        correctAnswers: 4,
        duration: 120
      };
      
      // Mock quiz_attempts insert query
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Mock submission_id column check query
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Mock duplicate submission check - no duplicates
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Mock user existence check - user not found
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Import server and execute handler
      const server = require('../../../server');
      const completeQuizHandler = server.__testables.completeQuizHandler;
      await completeQuizHandler(request, response);
      
      // Verify expectations
      expect(pool.query).toHaveBeenNthCalledWith(
        4,
        'SELECT id FROM users WHERE id = $1',
        [999]
      );
      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({ error: 'User not found' });
    });
    
    test('should successfully record quiz completion with detailed answers', async () => {
      // Setup request with valid data and completion details
      request.body = {
        userId: 1,
        quizId: 2,
        score: 80,
        totalQuestions: 5,
        correctAnswers: 4,
        duration: 120,
        completionDetails: [
          {
            questionIndex: 0,
            question: 'What is phishing?',
            selectedOption: 'A deceptive attempt to steal information',
            correctOption: 'A deceptive attempt to steal information',
            isCorrect: true
          },
          {
            questionIndex: 1,
            question: 'What should you do with suspicious emails?',
            selectedOption: 'Report them',
            correctOption: 'Report them',
            isCorrect: true
          },
          {
            type: 'email_analysis',
            questionIndex: 2,
            details: {
              earnedPoints: 8,
              maxPoints: 10,
              truePositives: ['sender', 'link'],
              falsePositives: ['greeting'],
              falseNegatives: ['urgency']
            }
          }
        ]
      };
      
      // Mock sequence of database calls
      // 1. Quiz attempts insertion
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // 2. Check submission_id column exists
      pool.query.mockResolvedValueOnce({ rows: [{ submission_id: 'exists' }] });
      
      // 3. Check for duplicate submission
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // 4. Check user exists
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });
      
      // 5. Insert quiz completion
      pool.query.mockResolvedValueOnce({
        rows: [{ id: 456, completion_date: '2023-04-20T14:30:00Z' }]
      });
      
      // 6-8. Insert detailed answer records for each question
      pool.query.mockResolvedValueOnce({ rows: [] }); // First question
      pool.query.mockResolvedValueOnce({ rows: [] }); // Second question
      pool.query.mockResolvedValueOnce({ rows: [] }); // Email analysis question
      
      // 9. Get last quiz date for streak calculation
      pool.query.mockResolvedValueOnce({
        rows: [{ last_quiz_update: '2023-04-19' }] // Yesterday
      });
      
      // 10. Update streak - continuation
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // 11. Get updated user data
      pool.query.mockResolvedValueOnce({
        rows: [{ quiz_streak: 4, longest_quiz_streak: 6 }]
      });
      
      // 12. Count total quizzes
      pool.query.mockResolvedValueOnce({ rows: [{ count: '12' }] });
      
      // Import server and execute handler
      const server = require('../../../server');
      const completeQuizHandler = server.__testables.completeQuizHandler;
      await completeQuizHandler(request, response);
      
      // Verify expectations for quiz_completions insertion
      expect(pool.query).toHaveBeenNthCalledWith(
        5,
        expect.stringContaining('INSERT INTO quiz_completions'),
        expect.arrayContaining([1, 2, 80])
      );
      
      // Verify quiz_answers insertions
      expect(pool.query).toHaveBeenNthCalledWith(
        6,
        expect.stringContaining('INSERT INTO quiz_answers'),
        expect.arrayContaining([456, 0, 'What is phishing?'])
      );
      
      expect(pool.query).toHaveBeenNthCalledWith(
        7,
        expect.stringContaining('INSERT INTO quiz_answers'),
        expect.arrayContaining([456, 1, 'What should you do with suspicious emails?'])
      );
      
      expect(pool.query).toHaveBeenNthCalledWith(
        8,
        expect.stringContaining('INSERT INTO quiz_answers'),
        expect.arrayContaining([456, 2, '', '', '', false, 'email_analysis', 8, 10])
      );
      
      // Verify streak update
      expect(pool.query).toHaveBeenNthCalledWith(
        10,
        expect.stringContaining('UPDATE users SET quiz_streak'),
        [1]
      );
      
      // Verify response
      expect(response.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        completionId: 456,
        totalQuizzes: 12,
        quizStreak: 4,
        longestQuizStreak: 6,
        earnedPoints: expect.any(Number),
        maxPoints: expect.any(Number)
      }));
    });
    
    test('should reset streak if more than one day since last quiz', async () => {
      // Setup request with valid data
      request.body = {
        userId: 1,
        quizId: 2,
        score: 80,
        totalQuestions: 5,
        correctAnswers: 4,
        duration: 120
      };
      
      // Mock first few database calls (simplified for this test)
      pool.query.mockResolvedValueOnce({ rows: [] }); // Quiz attempts insertion
      pool.query.mockResolvedValueOnce({ rows: [{ submission_id: 'exists' }] }); // Check column
      pool.query.mockResolvedValueOnce({ rows: [] }); // Check for duplicate
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] }); // User exists
      pool.query.mockResolvedValueOnce({ rows: [{ id: 456 }] }); // Insert completion
      
      // Mock last quiz date - more than one day ago
      pool.query.mockResolvedValueOnce({
        rows: [{ last_quiz_update: '2023-04-15' }] // 5 days ago
      });
      
      // Mock reset streak query
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Mock get updated user data
      pool.query.mockResolvedValueOnce({
        rows: [{ quiz_streak: 1, longest_quiz_streak: 6 }]
      });
      
      // Mock count total quizzes
      pool.query.mockResolvedValueOnce({ rows: [{ count: '12' }] });
      
      // Import server and execute handler
      const server = require('../../../server');
      const completeQuizHandler = server.__testables.completeQuizHandler;
      await completeQuizHandler(request, response);
      
      // Verify reset streak query was called
      expect(pool.query).toHaveBeenNthCalledWith(
        7,
        expect.stringContaining('SET quiz_streak = 1'),
        [1]
      );
      
      // Verify response shows reset streak
      expect(response.json).toHaveBeenCalledWith(expect.objectContaining({
        quizStreak: 1,
        longestQuizStreak: 6
      }));
    });
  });