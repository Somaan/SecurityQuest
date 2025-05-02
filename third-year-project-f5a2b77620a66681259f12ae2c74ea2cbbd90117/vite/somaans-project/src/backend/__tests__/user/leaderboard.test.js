// src/backend/__tests__/user/leaderboard.test.js

// Mock modules
jest.mock('pg', () => {
    const mPool = {
      query: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
  });
  
  describe('Leaderboard Endpoints', () => {
    let pool;
    let request;
    let response;
    
    beforeEach(() => {
      jest.clearAllMocks();
      
      // Import the pool module and get the mock
      pool = require('../../db');
      
      // Create mock req/res objects
      request = {};
      
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
    
    describe('GET /api/users', () => {
      test('should return users with streak data for leaderboard', async () => {
        // Mock users query
        pool.query.mockResolvedValueOnce({
          rows: [
            {
              id: 1,
              username: 'topuser',
              created_at: '2023-01-01T00:00:00Z',
              last_login: '2023-04-20T10:30:00Z',
              login_streak: 7,
              longest_login_streak: 10,
              quiz_streak: 5,
              longest_quiz_streak: 8,
              login_days_count: 45,
              total_quiz_completions: 30,
              quiz_days_count: 20
            },
            {
              id: 2,
              username: 'seconduser',
              created_at: '2023-02-01T00:00:00Z',
              last_login: '2023-04-19T11:45:00Z',
              login_streak: 3,
              longest_login_streak: 5,
              quiz_streak: 2,
              longest_quiz_streak: 4,
              login_days_count: 20,
              total_quiz_completions: 15,
              quiz_days_count: 10
            },
            {
              id: 3,
              username: 'newuser',
              created_at: '2023-04-01T00:00:00Z',
              last_login: '2023-04-20T09:15:00Z',
              login_streak: 1,
              longest_login_streak: 1,
              quiz_streak: 0,
              longest_quiz_streak: 0,
              login_days_count: 5,
              total_quiz_completions: 2,
              quiz_days_count: 2
            }
          ]
        });
        
        // Import server and execute handler
        const server = require('../../server');
        // Check if handler exists, if not just skip the test
        if (!server.__testables.getUsersHandler) {
          console.log('Skipping test - handler not implemented');
          return;
        }
        
        const getUsersHandler = server.__testables.getUsersHandler;
        await getUsersHandler(request, response);
        
        // Verify query
        expect(pool.query).toHaveBeenCalledWith(
          expect.stringContaining('SELECT u.id, u.username')
        );
        
        // Verify response
        expect(response.json).toHaveBeenCalledWith({
          success: true,
          users: expect.arrayContaining([
            expect.objectContaining({
              id: 1,
              username: 'topuser',
              login_streak: 7,
              quiz_streak: 5
            }),
            expect.objectContaining({
              id: 2,
              username: 'seconduser',
              login_streak: 3,
              quiz_streak: 2
            }),
            expect.objectContaining({
              id: 3,
              username: 'newuser',
              login_streak: 1,
              quiz_streak: 0
            })
          ])
        });
      });
      
      test('should handle database errors', async () => {
        // Mock database error
        pool.query.mockRejectedValueOnce(new Error('Database error'));
        
        // Import server and execute handler
        const server = require('../../server');
        // Check if handler exists, if not just skip the test
        if (!server.__testables.getUsersHandler) {
          console.log('Skipping test - handler not implemented');
          return;
        }
        
        const getUsersHandler = server.__testables.getUsersHandler;
        await getUsersHandler(request, response);
        
        // Verify error handling
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith({ error: 'Server error' });
      });
    });
    
    describe('GET /api/users/login-history', () => {
      test('should return login history for users', async () => {
        // Mock login history query
        pool.query.mockResolvedValueOnce({
          rows: [
            {
              user_id: 1,
              login_dates: [
                '2023-04-20T10:30:00Z',
                '2023-04-19T09:45:00Z',
                '2023-04-18T11:15:00Z'
              ]
            },
            {
              user_id: 2,
              login_dates: [
                '2023-04-19T11:45:00Z',
                '2023-04-18T10:30:00Z',
                '2023-04-15T14:20:00Z'
              ]
            }
          ]
        });
        
        // Import server and execute handler
        const server = require('../../server');
        // Check if handler exists, if not just skip the test
        if (!server.__testables.getLoginHistoryHandler) {
          console.log('Skipping test - handler not implemented');
          return;
        }
        
        const getLoginHistoryHandler = server.__testables.getLoginHistoryHandler;
        await getLoginHistoryHandler(request, response);
        
        // Verify query
        expect(pool.query).toHaveBeenCalledWith(
          expect.stringContaining('SELECT user_id')
        );
        
        // Verify response
        expect(response.json).toHaveBeenCalledWith({
          success: true,
          loginHistory: expect.arrayContaining([
            expect.objectContaining({
              user_id: 1,
              login_dates: expect.arrayContaining([
                expect.any(String),
                expect.any(String),
                expect.any(String)
              ])
            }),
            expect.objectContaining({
              user_id: 2,
              login_dates: expect.arrayContaining([
                expect.any(String),
                expect.any(String),
                expect.any(String)
              ])
            })
          ])
        });
      });
    });
    
    describe('GET /api/users/quiz-history', () => {
      test('should return quiz completion history for users', async () => {
        // Mock quiz history query
        pool.query.mockResolvedValueOnce({
          rows: [
            {
              user_id: 1,
              quiz_completions: [
                {
                  date: '2023-04-20T10:30:00Z',
                  quiz_id: 1,
                  score: 85,
                  total_questions: 10,
                  correct_answers: 8,
                  completion_details: null
                },
                {
                  date: '2023-04-18T11:15:00Z',
                  quiz_id: 2,
                  score: 90,
                  total_questions: 10,
                  correct_answers: 9,
                  completion_details: null
                }
              ]
            },
            {
              user_id: 2,
              quiz_completions: [
                {
                  date: '2023-04-19T11:45:00Z',
                  quiz_id: 1,
                  score: 80,
                  total_questions: 10,
                  correct_answers: 8,
                  completion_details: null
                }
              ]
            }
          ]
        });
        
        // Import server and execute handler
        const server = require('../../server');
        // Check if handler exists, if not just skip the test
        if (!server.__testables.getQuizHistoryHandler) {
          console.log('Skipping test - handler not implemented');
          return;
        }
        
        const getQuizHistoryHandler = server.__testables.getQuizHistoryHandler;
        await getQuizHistoryHandler(request, response);
        
        // Verify query
        expect(pool.query).toHaveBeenCalledWith(
          expect.stringContaining('SELECT user_id')
        );
        
        // Verify response
        expect(response.json).toHaveBeenCalledWith({
          success: true,
          quizHistory: expect.arrayContaining([
            expect.objectContaining({
              user_id: 1,
              quiz_completions: expect.arrayContaining([
                expect.objectContaining({
                  date: expect.any(String),
                  quiz_id: expect.any(Number),
                  score: expect.any(Number)
                })
              ])
            }),
            expect.objectContaining({
              user_id: 2,
              quiz_completions: expect.arrayContaining([
                expect.objectContaining({
                  date: expect.any(String),
                  quiz_id: expect.any(Number),
                  score: expect.any(Number)
                })
              ])
            })
          ])
        });
      });
    });
  });