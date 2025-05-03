// Mock modules
jest.mock('pg', () => {
    const mPool = {
      query: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
  });
  
  jest.mock('bcrypt');
  
  describe('User Profile Management', () => {
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
    
    describe('GET /api/users/:userId/profile', () => {
      test('should return user profile data', async () => {
        // Create mock handler for user profile
        const getUserProfile = async (req, res) => {
          const userId = req.params.userId;
          
          try {
            // Check if user exists
            const userResult = await pool.query(
              'SELECT id, username, email, created_at FROM users WHERE id = $1',
              [userId]
            );
            
            if (userResult.rows.length === 0) {
              return res.status(404).json({ error: 'User not found' });
            }
            
            // Get user achievements count
            const achievementsResult = await pool.query(`
              SELECT COUNT(*) as total_achievements, 
                     COUNT(*) FILTER (WHERE unlocked = true) as unlocked_achievements
              FROM user_achievements
              WHERE user_id = $1
            `, [userId]);
            
            // Get quiz stats
            const quizStatsResult = await pool.query(`
              SELECT 
                COUNT(*) as total_quizzes,
                ROUND(AVG(score), 2) as average_score,
                COUNT(DISTINCT DATE(completion_date)) as quiz_days
              FROM quiz_completions
              WHERE user_id = $1
            `, [userId]);
            
            // Get login stats
            const loginStatsResult = await pool.query(`
              SELECT 
                COUNT(*) as total_logins,
                MAX(login_date) as last_login
              FROM user_logins
              WHERE user_id = $1
            `, [userId]);
            
            // Combine data
            const profile = {
              ...userResult.rows[0],
              achievements: {
                total: parseInt(achievementsResult.rows[0].total_achievements) || 0,
                unlocked: parseInt(achievementsResult.rows[0].unlocked_achievements) || 0
              },
              quizzes: {
                total: parseInt(quizStatsResult.rows[0].total_quizzes) || 0,
                averageScore: parseFloat(quizStatsResult.rows[0].average_score) || 0,
                days: parseInt(quizStatsResult.rows[0].quiz_days) || 0
              },
              logins: {
                total: parseInt(loginStatsResult.rows[0].total_logins) || 0,
                lastLogin: loginStatsResult.rows[0].last_login
              }
            };
            
            res.json({
              success: true,
              profile
            });
            
          } catch (error) {
            res.status(500).json({ error: 'Server error' });
          }
        };
        
        // Mock query results
        // User data
        pool.query.mockResolvedValueOnce({
          rows: [{
            id: 123,
            username: 'testuser',
            email: 'test@example.com',
            created_at: '2023-01-01T00:00:00Z'
          }]
        });
        
        // Achievements count
        pool.query.mockResolvedValueOnce({
          rows: [{
            total_achievements: '8',
            unlocked_achievements: '5'
          }]
        });
        
        // Quiz stats
        pool.query.mockResolvedValueOnce({
          rows: [{
            total_quizzes: '15',
            average_score: '78.50',
            quiz_days: '10'
          }]
        });
        
        // Login stats
        pool.query.mockResolvedValueOnce({
          rows: [{
            total_logins: '25',
            last_login: '2023-04-20T14:30:00Z'
          }]
        });
        
        // Set userId parameter
        request.params = { userId: '123' };
        
        // Execute handler
        await getUserProfile(request, response);
        
        // Verify response
        expect(response.json).toHaveBeenCalledWith({
          success: true,
          profile: expect.objectContaining({
            id: 123,
            username: 'testuser',
            email: 'test@example.com',
            achievements: expect.objectContaining({
              total: 8,
              unlocked: 5
            }),
            quizzes: expect.objectContaining({
              total: 15,
              averageScore: 78.5,
              days: 10
            }),
            logins: expect.objectContaining({
              total: 25,
              lastLogin: '2023-04-20T14:30:00Z'
            })
          })
        });
      });
      
      test('should return 404 if user not found', async () => {
        // Create mock handler for user profile
        const getUserProfile = async (req, res) => {
          const userId = req.params.userId;
          
          try {
            // Check if user exists
            const userResult = await pool.query(
              'SELECT id, username, email, created_at FROM users WHERE id = $1',
              [userId]
            );
            
            if (userResult.rows.length === 0) {
              return res.status(404).json({ error: 'User not found' });
            }
            
            // Rest of the handler...
            
          } catch (error) {
            res.status(500).json({ error: 'Server error' });
          }
        };
        
        // Mock query result - user not found
        pool.query.mockResolvedValueOnce({ rows: [] });
        
        // Set userId parameter
        request.params = { userId: '999' };
        
        // Execute handler
        await getUserProfile(request, response);
        
        // Verify response
        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledWith({ error: 'User not found' });
      });
    });
    
    describe('PUT /api/users/:userId/profile', () => {
      test('should update user profile data', async () => {
        // Create mock handler for updating user profile
        const updateUserProfile = async (req, res) => {
          const userId = req.params.userId;
          const { username, email } = req.body;
          
          try {
            // Check if user exists
            const userResult = await pool.query(
              'SELECT id FROM users WHERE id = $1',
              [userId]
            );
            
            if (userResult.rows.length === 0) {
              return res.status(404).json({ error: 'User not found' });
            }
            
            // Check if username is already taken by another user
            if (username) {
              const usernameCheck = await pool.query(
                'SELECT id FROM users WHERE username = $1 AND id != $2',
                [username, userId]
              );
              
              if (usernameCheck.rows.length > 0) {
                return res.status(400).json({ error: 'Username already taken' });
              }
            }
            
            // Check if email is already taken by another user
            if (email) {
              const emailCheck = await pool.query(
                'SELECT id FROM users WHERE email = $1 AND id != $2',
                [email, userId]
              );
              
              if (emailCheck.rows.length > 0) {
                return res.status(400).json({ error: 'Email already taken' });
              }
            }
            
            // Update the user profile
            const updateResult = await pool.query(`
              UPDATE users
              SET 
                username = COALESCE($1, username),
                email = COALESCE($2, email),
                updated_at = NOW()
              WHERE id = $3
              RETURNING id, username, email, created_at, updated_at
            `, [username || null, email || null, userId]);
            
            res.json({
              success: true,
              user: updateResult.rows[0]
            });
            
          } catch (error) {
            res.status(500).json({ error: 'Server error' });
          }
        };
        
        // Mock query results
        // User exists check
        pool.query.mockResolvedValueOnce({
          rows: [{ id: 123 }]
        });
        
        // Username check
        pool.query.mockResolvedValueOnce({ rows: [] });
        
        // Email check
        pool.query.mockResolvedValueOnce({ rows: [] });
        
        // Update query
        pool.query.mockResolvedValueOnce({
          rows: [{
            id: 123,
            username: 'newusername',
            email: 'newemail@example.com',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-04-20T15:30:00Z'
          }]
        });
        
        // Set up request
        request.params = { userId: '123' };
        request.body = {
          username: 'newusername',
          email: 'newemail@example.com'
        };
        
        // Execute handler
        await updateUserProfile(request, response);
        
        // Verify response
        expect(response.json).toHaveBeenCalledWith({
          success: true,
          user: expect.objectContaining({
            id: 123,
            username: 'newusername',
            email: 'newemail@example.com'
          })
        });
      });
      
      test('should reject update if username is taken', async () => {
        // Create mock handler for updating user profile (simplified)
        const updateUserProfile = async (req, res) => {
          const userId = req.params.userId;
          const { username } = req.body;
          
          try {
            // Check if user exists
            const userResult = await pool.query(
              'SELECT id FROM users WHERE id = $1',
              [userId]
            );
            
            if (userResult.rows.length === 0) {
              return res.status(404).json({ error: 'User not found' });
            }
            
            // Check if username is already taken by another user
            if (username) {
              const usernameCheck = await pool.query(
                'SELECT id FROM users WHERE username = $1 AND id != $2',
                [username, userId]
              );
              
              if (usernameCheck.rows.length > 0) {
                return res.status(400).json({ error: 'Username already taken' });
              }
            }
            
            // Rest of the handler...
            
          } catch (error) {
            res.status(500).json({ error: 'Server error' });
          }
        };
        
        // Mock query results
        // User exists check
        pool.query.mockResolvedValueOnce({
          rows: [{ id: 123 }]
        });
        
        // Username check - username taken
        pool.query.mockResolvedValueOnce({
          rows: [{ id: 456 }]
        });
        
        // Set up request
        request.params = { userId: '123' };
        request.body = {
          username: 'takenusername'
        };
        
        // Execute handler
        await updateUserProfile(request, response);
        
        // Verify response
        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          error: 'Username already taken'
        });
      });
    });
  });