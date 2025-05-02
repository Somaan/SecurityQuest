// src/backend/__tests__/achievements/user-achievements.test.js

// Mock modules
jest.mock('pg', () => {
    const mPool = {
      query: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
  });
  
  describe('User Achievements Endpoints', () => {
    let pool;
    let request;
    let response;
    
    beforeEach(() => {
      jest.clearAllMocks();
      
      // Import the pool module and get the mock
      pool = require('../db');
      
      // Create mock req/res objects
      request = {
        params: {},
      };
      
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
    
    describe('GET /api/users/:userId/achievements', () => {
      test('should return 404 if user does not exist', async () => {
        // Mock userResult query for non-existent user
        pool.query.mockResolvedValueOnce({ rows: [] });
        
        // Set userId parameter
        request.params = { userId: '999' };
        
        // Import server and execute handler
        const server = require('../../../server');
        const getUserAchievementsHandler = server.__testables.getUserAchievementsHandler;
        await getUserAchievementsHandler(request, response);
        
        // Verify expectations
        expect(pool.query).toHaveBeenCalledWith(
          'SELECT id FROM users WHERE id = $1', 
          ['999']
        );
        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledWith({ error: 'User not found' });
      });
      
      test('should return user achievements when user exists', async () => {
        // Mock userResult query for existing user
        pool.query.mockResolvedValueOnce({ 
          rows: [{ id: '123' }] 
        });
        
        // Mock userStats query
        pool.query.mockResolvedValueOnce({
          rows: [{
            login_streak: 5,
            longest_login_streak: 7,
            quiz_streak: 3,
            longest_quiz_streak: 4,
            total_quizzes: 10,
            total_logins: 15
          }]
        });
        
        // Mock achievementsResult query
        pool.query.mockResolvedValueOnce({
          rows: [
            {
              id: 1,
              title: 'Dedicated User',
              description: 'Log in for 3 consecutive days',
              icon: 'calendar',
              color: 'blue',
              achievement_type: 'login_streak'
            },
            {
              id: 2,
              title: 'Quiz Enthusiast',
              description: 'Complete quizzes for 3 consecutive days',
              icon: 'star',
              color: 'gold',
              achievement_type: 'quiz_streak'
            }
          ]
        });
        
        // Mock userAchievementsResult query
        pool.query.mockResolvedValueOnce({
          rows: [
            {
              achievement_id: 1,
              unlocked: true,
              progress: 100,
              unlock_date: '2023-04-15T10:30:00Z'
            }
          ]
        });
        
        // Mock leaderboard position check
        pool.query.mockResolvedValueOnce({
          rows: [{ id: '123' }]  // User is at top of leaderboard
        });
        
        // Set userId parameter
        request.params = { userId: '123' };
        
        // Import server and execute handler
        const server = require('../../../server');
        const getUserAchievementsHandler = server.__testables.getUserAchievementsHandler;
        await getUserAchievementsHandler(request, response);
        
        // Verify expectations
        expect(response.json).toHaveBeenCalledWith({
          success: true,
          achievements: expect.arrayContaining([
            expect.objectContaining({
              id: 1,
              title: 'Dedicated User',
              unlocked: true,
              progress: 100
            }),
            expect.objectContaining({
              id: 2,
              title: 'Quiz Enthusiast',
              unlocked: true,
              progress: 100
            })
          ])
        });
      });
      
      test('should handle achievement calculations correctly', async () => {
        // Mock userResult query for existing user
        pool.query.mockResolvedValueOnce({ 
          rows: [{ id: '123' }] 
        });
        
        // Mock userStats query with low streaks
        pool.query.mockResolvedValueOnce({
          rows: [{
            login_streak: 1,
            longest_login_streak: 1,
            quiz_streak: 1,
            longest_quiz_streak: 1,
            total_quizzes: 2,
            total_logins: 3
          }]
        });
        
        // Mock achievementsResult query
        pool.query.mockResolvedValueOnce({
          rows: [
            {
              id: 1,
              title: 'Dedicated User',
              description: 'Log in for 3 consecutive days',
              icon: 'calendar',
              color: 'blue',
              achievement_type: 'login_streak'
            },
            {
              id: 2,
              title: 'Quiz Enthusiast',
              description: 'Complete quizzes for 3 consecutive days',
              icon: 'star',
              color: 'gold',
              achievement_type: 'quiz_streak'
            },
            {
              id: 3,
              title: 'Quick Learner',
              description: 'Complete 3 quizzes',
              icon: 'book',
              color: 'green',
              achievement_type: 'quiz_performance'
            }
          ]
        });
        
        // Mock userAchievementsResult query - no existing achievements
        pool.query.mockResolvedValueOnce({ rows: [] });
        
        // Mock leaderboard position check - not at top
        pool.query.mockResolvedValueOnce({
          rows: [{ id: '456' }]  // Different user at top
        });
        
        // Set userId parameter
        request.params = { userId: '123' };
        
        // Import server and execute handler
        const server = require('../../../server');
        const getUserAchievementsHandler = server.__testables.getUserAchievementsHandler;
        await getUserAchievementsHandler(request, response);
        
        // Verify expectations
        expect(response.json).toHaveBeenCalledWith({
          success: true,
          achievements: expect.arrayContaining([
            expect.objectContaining({
              id: 1,
              title: 'Dedicated User',
              unlocked: false,
              progress: expect.any(Number)
            }),
            expect.objectContaining({
              id: 2,
              title: 'Quiz Enthusiast',
              unlocked: false,
              progress: expect.any(Number)
            }),
            expect.objectContaining({
              id: 3,
              title: 'Quick Learner',
              unlocked: false,
              progress: expect.any(Number)
            })
          ])
        });
        
        // Check that progress values are calculated correctly
        const achievementsResponse = response.json.mock.calls[0][0].achievements;
        
        // 'Dedicated User' - 1/3 of the way (login_streak = 1)
        const dedicatedUser = achievementsResponse.find(a => a.title === 'Dedicated User');
        expect(dedicatedUser.progress).toBeCloseTo(33.33, 0);
        
        // 'Quiz Enthusiast' - 1/3 of the way (quiz_streak = 1)
        const quizEnthusiast = achievementsResponse.find(a => a.title === 'Quiz Enthusiast');
        expect(quizEnthusiast.progress).toBeCloseTo(33.33, 0);
        
        // 'Quick Learner' - 2/3 of the way (total_quizzes = 2)
        const quickLearner = achievementsResponse.find(a => a.title === 'Quick Learner');
        expect(quickLearner.progress).toBeCloseTo(66.67, 0);
      });
    });
  });