const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const pool = require('./db');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const app = express();

// Check if running in test environment
const isTestEnvironment = process.env.NODE_ENV === 'test' || require.main !== module;

// Middleware
app.use(cors({
    origin: [
      'http://localhost:5173',  // Local Vite dev server
      'https://z1nvc8z-5173.uk1.devtunnels.ms'  // Your dev tunnel address
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true  
  }));

app.use(express.json());

// Ensure dotenv is properly initialized whether running tests or main server
try {
    require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
} catch (error) {
    console.error('Error loading .env file:', error);
}

// Initialize SendGrid only if API key is available
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else if (!isTestEnvironment) {
    console.warn('Warning: SendGrid API Key not found in environment variables');
}

// API endpoint to get user achievements
app.get('/api/users/:userId/achievements', async (req, res) => {
    const userId = req.params.userId;
    
    try {
      // Check if user exists
      const userResult = await pool.query('SELECT id FROM users WHERE id = $1', [userId]);
      if (userResult.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Get user stats from 'users'
      const userStats = await pool.query(`
        SELECT 
          u.login_streak,
          u.longest_login_streak,
          u.quiz_streak,
          u.longest_quiz_streak,
          (SELECT COUNT(*) FROM quiz_completions WHERE user_id = u.id) AS total_quizzes,
          (SELECT COUNT(*) FROM user_logins WHERE user_id = u.id) AS total_logins
        FROM users u
        WHERE u.id = $1
      `, [userId]);
      
      const stats = userStats.rows[0];
      
      // First, extract all achievements from the database
      const achievementsResult = await pool.query(`
        SELECT id, title, description, icon, color, achievement_type
        FROM achievements
        ORDER BY id
      `);
      
      // Then get user's current achievement progress
      const userAchievementsResult = await pool.query(`
        SELECT 
          ua.achievement_id, 
          ua.unlocked,
          ua.progress,
          ua.unlock_date
        FROM user_achievements ua
        WHERE ua.user_id = $1
      `, [userId]);
      
      // Map user achievements for easier lookup
      const userAchievementsMap = {};
      userAchievementsResult.rows.forEach(ua => {
        userAchievementsMap[ua.achievement_id] = {
          unlocked: ua.unlocked,
          progress: ua.progress,
          unlockDate: ua.unlock_date
        };
      });
      
      // Process achievements with current status for this user
      const achievements = achievementsResult.rows.map(achievement => {
        let unlocked = false;
        let progress = 0;
        let unlockDate = null;
        
        // If user has this achievement record, use those values
        if (userAchievementsMap[achievement.id]) {
          unlocked = userAchievementsMap[achievement.id].unlocked;
          progress = userAchievementsMap[achievement.id].progress;
          unlockDate = userAchievementsMap[achievement.id].unlockDate;
        } else {
        
          // Calculate achievement status based on user stats  
          switch(achievement.achievement_type) {
            case 'login_streak':
              if (achievement.title === 'Dedicated User') {
                const effectiveStreak = Math.max(stats.login_streak || 0, stats.longest_login_streak || 0);
                unlocked = stats.login_streak >= 3 || stats.longest_login_streak >= 3;
                progress = Math.min(100, (effectiveStreak / 3) * 100);

              } else if (achievement.title === 'Weekly Warrior') {
                const effectiveStreak = Math.max(stats.login_streak || 0, stats.longest_login_streak || 0);
                unlocked = stats.login_streak >= 7 || stats.longest_login_streak >= 7;
                progress = Math.min(100, (effectiveStreak / 7) * 100);

              } else if (achievement.title === 'Monthly Master') {
                const effectiveStreak = Math.max(stats.login_streak || 0, stats.longest_login_streak || 0);
                unlocked = stats.login_streak >= 30 || stats.longest_login_streak >= 30;
                progress = Math.min(100, (effectiveStreak / 30) * 100);
              }
              break;
              
            case 'quiz_streak':
              if (achievement.title === 'Quiz Enthusiast') {
                unlocked = stats.quiz_streak >= 3 || stats.longest_quiz_streak >= 3;
                progress = Math.min(100, (stats.quiz_streak / 3) * 100);
              } else if (achievement.title === 'Quiz Champion') {
                unlocked = stats.quiz_streak >= 7 || stats.longest_quiz_streak >= 7;
                progress = Math.min(100, (stats.quiz_streak / 7) * 100);
              } else if (achievement.title === 'Security Expert') {
                unlocked = stats.quiz_streak >= 14 || stats.longest_quiz_streak >= 14;
                progress = Math.min(100, (stats.quiz_streak / 14) * 100);
              }
              break;
              
            case 'quiz_performance':
              if (achievement.title === 'Quick Learner') {
                unlocked = stats.total_quizzes >= 3;
                progress = Math.min(100, (stats.total_quizzes / 3) * 100);
              } else if (achievement.title === 'Rising Star') {
                unlocked = stats.total_quizzes >= 5;
                progress = Math.min(100, (stats.total_quizzes / 5) * 100);
              } else if (achievement.title === 'Quiz Master') {
                unlocked = stats.total_quizzes >= 10;
                progress = Math.min(100, (stats.total_quizzes / 10) * 100);
              }
              break;
              
            case 'login_count':
              if (achievement.title === 'Regular User') {
                unlocked = stats.total_logins >= 10;
                progress = Math.min(100, (stats.total_logins / 10) * 100);
              }
              break;
            
            
            
          }
          
          // If we've just determined that an achievement is unlocked, save it
          if (unlocked) {
            try {
              // Insert into user_achievements with unlocked=true
              const now = new Date();
              pool.query(`
                INSERT INTO user_achievements (
                  user_id, achievement_id, unlocked, progress, unlock_date
                ) VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (user_id, achievement_id) 
                DO UPDATE SET unlocked = $3, progress = $4, unlock_date = $5
                WHERE NOT user_achievements.unlocked
              `, [userId, achievement.id, true, 100, now]);
              
              unlockDate = now;
            } catch (error) {
              console.error('Error updating achievement status:', error);
            }
          }
          // If not unlocked but progress is seen, save the progress
          else if (progress > 0) {
            try {
              pool.query(`
                INSERT INTO user_achievements (
                  user_id, achievement_id, unlocked, progress
                ) VALUES ($1, $2, $3, $4)
                ON CONFLICT (user_id, achievement_id) 
                DO UPDATE SET progress = $4
                WHERE user_achievements.progress < $4
              `, [userId, achievement.id, false, progress]);
            } catch (error) {
              console.error('Error updating achievement progress:', error);
            }
          }
        }
        
        return {
          id: achievement.id,
          title: achievement.title,
          description: achievement.description,
          icon: achievement.icon,
          color: achievement.color,
          unlocked,
          progress,
          unlockDate
        };
      });
      
      // Determine Security Champion
      try {
        // Get top user from leaderboard
        const topUserResult = await pool.query(`
          SELECT id 
          FROM users 
          ORDER BY (COALESCE(login_streak, 0) + COALESCE(quiz_streak, 0)) DESC, 
                   username ASC
          LIMIT 1
        `);
        
        if (topUserResult.rows.length > 0 && topUserResult.rows[0].id == userId) {
          // This user is top of leaderboard, update Security Champion achievement
          const securityChampion = achievements.find(a => a.title === 'Security Champion');
          if (securityChampion) {
            securityChampion.unlocked = true;
            securityChampion.progress = 100;
            
            // Save this achievement
            if (!userAchievementsMap[securityChampion.id]?.unlocked) {
              const now = new Date();
              await pool.query(`
                INSERT INTO user_achievements (
                  user_id, achievement_id, unlocked, progress, unlock_date
                ) VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (user_id, achievement_id) 
                DO UPDATE SET unlocked = $3, progress = $4, unlock_date = $5
              `, [userId, securityChampion.id, true, 100, now]);
              
              securityChampion.unlockDate = now;
            }
          }
        } else {
          // If not top of leaderboard, update progress proportionally
          const securityChampion = achievements.find(a => a.title === 'Security Champion');
          if (securityChampion && !securityChampion.unlocked) {
            securityChampion.progress = 25; // Arbitrary partial progress
          }
        }
      } catch (error) {
        console.error('Error checking leaderboard position:', error);
      }
      
      res.json({
        success: true,
        achievements: achievements
      });
      
    } catch (error) {
      console.error(`Error fetching achievements for user ${userId}:`, error);
      res.status(500).json({ error: 'Server error' });
    }
});

// Check for new achievements endpoint
app.get('/api/users/:userId/check-achievements', async (req, res) => {
    const userId = req.params.userId;
    
    try {
        // Get the user's previously unlocked achievements
        const previousResult = await pool.query(`
            SELECT achievement_id
            FROM user_achievements
            WHERE user_id = $1 AND unlocked = TRUE
        `, [userId]);
        
        const previousUnlocked = new Set(previousResult.rows.map(row => row.achievement_id));
        
        // Get current achievements
        const achievementsResponse = await fetch(`${req.protocol}://${req.get('host')}/api/users/${userId}/achievements`);
        const achievementsData = await achievementsResponse.json();
        
        if (!achievementsData.success || !achievementsData.achievements) {
            throw new Error('Failed to fetch current achievements');
        }
        
        // Find newly unlocked achievements
        const newlyUnlocked = achievementsData.achievements.filter(a => 
            a.unlocked && !previousUnlocked.has(a.id)
        );
        
        res.json({
            success: true,
            newAchievements: newlyUnlocked
        });
    } catch (error) {
        console.error('Error checking for new achievements:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get user's threat identification performance stats
app.get('/api/users/:userId/threat-performance', async (req, res) => {
    const userId = req.params.userId;
    
    try {
        // Get overall threat identification performance by question type
        const performanceResult = await pool.query(`
            SELECT 
                qa.question_type,
                COUNT(*) as total_questions,
                SUM(qa.earned_points) as total_earned_points,
                SUM(qa.max_points) as total_max_points,
                ROUND(AVG(qa.earned_points * 100.0 / NULLIF(qa.max_points, 0)), 1) as average_percent
            FROM quiz_answers qa
            JOIN quiz_completions qc ON qa.completion_id = qc.id
            WHERE qc.user_id = $1 AND qa.question_type != 'multiple_choice'
            GROUP BY qa.question_type
            ORDER BY qa.question_type
        `, [userId]);
        
        // Get most common missed threats by question type
        const missedThreatsResult = await pool.query(`
            SELECT 
                qa.question_type,
                qa.identifications,
                COUNT(*) as frequency
            FROM quiz_answers qa
            JOIN quiz_completions qc ON qa.completion_id = qc.id
            WHERE 
                qc.user_id = $1 AND 
                qa.question_type != 'multiple_choice' AND
                qa.identifications IS NOT NULL
            GROUP BY qa.question_type, qa.identifications
            ORDER BY COUNT(*) DESC
            LIMIT 10
        `, [userId]);
        
        // Process the missed threats to extract common patterns
        const missedThreatsAnalysis = {};
        
        missedThreatsResult.rows.forEach(row => {
            if (!missedThreatsAnalysis[row.question_type]) {
                missedThreatsAnalysis[row.question_type] = [];
            }
            
            try {
                const identifications = JSON.parse(row.identifications);
                if (identifications.falseNegatives && identifications.falseNegatives.length > 0) {
                    // Add missed threats with their frequency
                    identifications.falseNegatives.forEach(threatId => {
                        const existingThreat = missedThreatsAnalysis[row.question_type].find(t => t.id === threatId);
                        if (existingThreat) {
                            existingThreat.frequency += row.frequency;
                        } else {
                            missedThreatsAnalysis[row.question_type].push({
                                id: threatId,
                                frequency: row.frequency
                            });
                        }
                    });
                }
            } catch (err) {
                console.error('Error parsing identifications:', err);
            }
        });
        
        // Sort by frequency and limit to top 5 per question type
        Object.keys(missedThreatsAnalysis).forEach(questionType => {
            missedThreatsAnalysis[questionType].sort((a, b) => b.frequency - a.frequency);
            missedThreatsAnalysis[questionType] = missedThreatsAnalysis[questionType].slice(0, 5);
        });
        
        res.json({
            success: true,
            performance: performanceResult.rows,
            missedThreats: missedThreatsAnalysis
        });
    } catch (error) {
        console.error('Error fetching threat identification performance:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get user's improvement over time from threat-performance endpoint
app.get('/api/users/:userId/threat-progress', async (req, res) => {
    const userId = req.params.userId;
    
    try {
        // Get weekly progress data for the last 3 months
        const progressResult = await pool.query(`
            SELECT 
                DATE_TRUNC('week', qc.completion_date) AS week,
                qa.question_type,
                AVG(qa.earned_points * 100.0 / NULLIF(qa.max_points, 0)) AS average_percent
            FROM 
                quiz_answers qa
                JOIN quiz_completions qc ON qa.completion_id = qc.id
            WHERE 
                qc.user_id = $1 AND 
                qa.question_type != 'multiple_choice' AND
                qc.completion_date > CURRENT_DATE - INTERVAL '3 months'
            GROUP BY 
                DATE_TRUNC('week', qc.completion_date),
                qa.question_type
            ORDER BY 
                week, qa.question_type
        `, [userId]);
        
        res.json({
            success: true,
            progress: progressResult.rows
        });
    } catch (error) {
        console.error('Error fetching threat progress data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = process.env.PORT || 5000;
// Only start HTTP server if not in test environment
if (!isTestEnvironment) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
    });
} else {
    console.log('Server imported as a module - not starting HTTP server');
}

// Initial API key check
console.log('Testing environment setup...');
console.log('SendGrid API Key loaded:', process.env.SENDGRID_API_KEY ? 'Yes' : 'No');
console.log('API Key length:', process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY.length : 0);


// Login endpoint with Remember Me support
app.post('/api/login', async (req, res) => {
    const { username, password, remember_me } = req.body;
    console.log('Login attempt:', { username, remember_me: !!remember_me });

    try {
        // Check if user exists
        console.log('Checking if user exists...');
        const userResult = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (userResult.rows.length === 0) {
            console.log('User not found');
            return res.status(401).json({ error: 'User not found' });
        }

        const user = userResult.rows[0];
        console.log('User found, ID:', user.id);

        // Check password
        console.log('Verifying password...');
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            console.log('Invalid password');
            return res.status(401).json({ error: 'Invalid password' });
        }
        console.log('Password verified successfully');

        // Update last login time
        await pool.query(
            'UPDATE users SET last_login = NOW() WHERE id = $1',
            [user.id]
        );
        console.log('Updated last login time');

        // Generate and store a remember token if remember_me is true
        let rememberToken = null;
        if (remember_me) {
            try {
                // Generate a secure token
                rememberToken = crypto.randomBytes(32).toString('hex');
                console.log('Generated remember token for user ID:', user.id);
                
                // Check if remember_tokens table exists
                const tableExists = await pool.query(`
                    SELECT EXISTS (
                        SELECT FROM information_schema.tables 
                        WHERE table_schema = 'public' 
                        AND table_name = 'remember_tokens'
                    );
                `);
                
                if (!tableExists.rows[0].exists) {
                    console.log('remember_tokens table does not exist, creating it now...');
                    
                    // Create the table if it doesn't exist
                    await pool.query(`
                        CREATE TABLE IF NOT EXISTS remember_tokens (
                            id SERIAL PRIMARY KEY,
                            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                            token VARCHAR(255) NOT NULL,
                            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                            expires_at TIMESTAMP NOT NULL,
                            is_used BOOLEAN NOT NULL DEFAULT FALSE
                        );
                        
                        CREATE INDEX IF NOT EXISTS remember_tokens_token_idx 
                            ON remember_tokens(token);
                        
                        CREATE INDEX IF NOT EXISTS remember_tokens_user_id_idx 
                            ON remember_tokens(user_id);
                    `);
                    
                    console.log('remember_tokens table created successfully');
                }
                
                // Store token in database 
                const now = new Date();
                const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
                
                console.log('Storing token in database...');
                console.log('Expiry date:', expiresAt.toISOString());
                
                const tokenResult = await pool.query(
                    `INSERT INTO remember_tokens 
                    (user_id, token, created_at, expires_at, is_used) 
                    VALUES ($1, $2, NOW(), $3, FALSE) RETURNING id`,
                    [user.id, rememberToken, expiresAt]
                );
                
                console.log('Token stored successfully with ID:', tokenResult.rows[0].id);
                
                // Verify the token was stored properly
                const verifyToken = await pool.query(
                    `SELECT * FROM remember_tokens WHERE id = $1`,
                    [tokenResult.rows[0].id]
                );
                
                console.log('Verification result:', verifyToken.rows[0]);
            } catch (tokenError) {
                console.error('Error storing remember token:', tokenError);
                // Continue login process even if token storage fails
            }
        }

        // Send success response
        res.json({
            success: true,
            user: {
                id: user.id,
                username: user.username
            },
            remember_token: rememberToken
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Register endpoint
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if username or email already exists
        const existingUser = await pool.query(
            'SELECT * FROM users WHERE username = $1 OR email = $2',
            [username, email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                error: 'Username or email already exists'
            });
        }

        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Insert new user
        const newUser = await pool.query(
            `INSERT INTO users (username, email, password_hash, created_at) 
             VALUES ($1, $2, $3, NOW()) 
             RETURNING id, username, email`,
            [username, email, passwordHash]
        );

        res.status(201).json({
            success: true,
            user: newUser.rows[0]
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Forgot Password endpoint
app.post('/api/forgot-password', async (req, res) => {
    const { email } = req.body;
    console.log('Received forgot password request for email:', email);

    try {
        // Check if user exists
        console.log('Checking if user exists...');
        const userResult = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        console.log('User query result:', userResult.rows);

        if (userResult.rows.length === 0) {
            console.log('No user found with this email');
            return res.status(404).json({ error: 'Email not found' });
        }

        const user = userResult.rows[0];
        console.log('User found:', user.id);

        // Generate timed reset token
        const token = crypto.randomBytes(32).toString('hex');
        const expires_at = new Date(Date.now() + 3600000); // 1 hour from now
        console.log('Generated token:', token);

        // Save token to database
        console.log('Saving token to database...');
        await pool.query(
            `INSERT INTO password_reset 
            (user_id, token, expires_at) 
            VALUES ($1, $2, $3)`,
            [user.id, token, expires_at]
        );
        console.log('Token saved successfully');

        // Send reset email using SendGrid API
        console.log('Preparing to send email via SendGrid API...');
        try {
            const msg = {
                to: email,
                from: {
                    email: 'somaan.mirza@uea.ac.uk',
                    name: 'Reset your password here'
                },
                subject: 'Social Engineering Platform',
                html: `
                    <div style="background-color: #f4f4f4; padding: 20px;">
                        <div style="background-color: white; padding: 20px; border-radius: 5px; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
                            <p>You have requested to reset your password.</p>
                            <p>Click the button below to reset your password.</p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="http://localhost:5173/reset-password?token=${token}" 
                                   style="background-color: #007bff; color: white; padding: 12px 24px; 
                                          text-decoration: none; border-radius: 4px; display: inline-block;">
                                    Reset Password
                                </a>
                            </div>
                            <p style="color: #666; font-size: 0.9em;">If you didn't request this password reset, please ignore this email.</p>
                            <p style="color: #666; font-size: 0.9em;">For security, this link will expire in 1 hour.</p>
                            <p style="color: #666; font-size: 0.9em;">Please check your spam folder if you don't see this email in your inbox.</p>
                        </div>
                    </div>
                `
            };
            
            console.log('SendGrid message configuration:', {
                to: msg.to,
                from: msg.from,
                subject: msg.subject
            });
            
            const response = await sgMail.send(msg);
            console.log('Email sent successfully via SendGrid API:', response);
        } catch (error) {
            console.error('SendGrid API error:', error);
            if (error.response) {
                console.error('Error body:', error.response.body);
            }
            throw error;
        }

        res.json({ message: 'Password reset email sent' });

    } catch (error) {
        console.error('Password reset request error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Reset Password endpoint
app.post('/api/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    console.log('Received password reset request');

    try {
        // Find valid token
        console.log('Checking token validity...');
        const tokenResult = await pool.query(
            `SELECT * FROM password_reset 
            WHERE token = $1 
            AND used = FALSE 
            AND expires_at > NOW()`,
            [token]
        );
        console.log('Token query result:', tokenResult.rows.length > 0);

        if (tokenResult.rows.length === 0) {
            console.log('Token invalid or expired');
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        const resetToken = tokenResult.rows[0];

        // Hash new password
        console.log('Hashing new password...');
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(newPassword, saltRounds);

        // Update password
        console.log('Updating password...');
        await pool.query(
            'UPDATE users SET password_hash = $1 WHERE id = $2',
            [passwordHash, resetToken.user_id]
        );

        // Mark token as used
        console.log('Marking token as used...');
        await pool.query(
            'UPDATE password_reset SET used = TRUE WHERE id = $1',
            [resetToken.id]
        );
        console.log('Password reset completed successfully');

        res.json({ message: 'Password successfully reset' });

    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Invalidate Remember Token endpoint
app.post('/api/invalidate-remember-token', async (req, res) => {
    const { username } = req.body;
    console.log('Invalidating remember tokens for user:', username);
    
    try {
        // Find user by username
        const userResult = await pool.query(
            'SELECT id FROM users WHERE username = $1',
            [username]
        );
        
        if (userResult.rows.length > 0) {
            const userId = userResult.rows[0].id;
            console.log('User found, ID:', userId);
            
            // Mark all tokens for this user as used
            const updateResult = await pool.query(
                'UPDATE remember_tokens SET is_used = TRUE WHERE user_id = $1 RETURNING id',
                [userId]
            );
            
            console.log(`Invalidated ${updateResult.rows.length} tokens`);
            res.json({ 
                success: true, 
                invalidated_count: updateResult.rows.length 
            });
        } else {
            console.log('User not found');
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error invalidating remember token:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Test endpoint for remember_tokens table
app.get('/api/test/remember-tokens', async (req, res) => {
    try {
        // Check if remember_tokens table exists
        const tableExists = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'remember_tokens'
            );
        `);
        
        if (!tableExists.rows[0].exists) {
            return res.json({ 
                exists: false, 
                message: 'remember_tokens table does not exist' 
            });
        }
        
        // Get recent tokens
        const recentTokens = await pool.query(`
            SELECT id, user_id, 
                  substring(token, 1, 10) || '...' as token_preview, 
                  created_at, expires_at, is_used
            FROM remember_tokens
            ORDER BY created_at DESC
            LIMIT 5
        `);
        
        res.json({ 
            exists: true, 
            recent_tokens: recentTokens.rows,
            count: recentTokens.rows.length
        });
    } catch (error) {
        console.error('Error testing remember tokens:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get Users for Leaderboard
app.get('/api/users', async (req, res) => {
    try {
        // Get all users with streak data
        const result = await pool.query(`
           SELECT 
                u.id, 
                u.username, 
                u.created_at, 
                u.last_login,
                u.login_streak,
                u.longest_login_streak,
                u.last_login_update,
                u.quiz_streak,
                u.longest_quiz_streak,
                u.last_quiz_update,
                (
                    SELECT COUNT(*) 
                    FROM user_logins 
                    WHERE user_id = u.id
                ) AS login_days_count,
                (
                    SELECT COUNT(*) 
                    FROM quiz_completions 
                    WHERE user_id = u.id
                ) AS total_quiz_completions,
                (
                    SELECT COUNT(DISTINCT DATE(completion_date)) 
                    FROM quiz_completions 
                    WHERE user_id = u.id
                ) AS quiz_days_count
            FROM users u
            ORDER BY 
                (COALESCE(u.login_streak, 0) + COALESCE(u.quiz_streak, 0)) DESC, 
                u.username ASC
        `);

        // Log user data for debugging
        result.rows.forEach(user => {
            console.log(`User ${user.username} (ID: ${user.id}): ${user.total_quiz_completions} total completions, ${user.quiz_days_count} unique days`);
        });
        
        res.json({ 
            success: true, 
            users: result.rows 
        });
    } catch (error) {
        console.error('Error fetching users with streak data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// API endpoint to get login history
app.get('/api/users/login-history', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                user_id,
                json_agg(login_date ORDER BY login_date DESC) AS login_dates
            FROM user_logins
            GROUP BY user_id
        `);
        
        res.json({
            success: true,
            loginHistory: result.rows
        });
    } catch (error) {
        console.error('Error fetching login history:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// API endpoint to get quiz completion history
app.get('/api/users/quiz-history', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                user_id,
                json_agg(
                    json_build_object(
                        'date', completion_date,
                        'quiz_id', quiz_id,
                        'score', score,
                        'total_questions', total_questions,
                        'correct_answers', correct_answers,
                        'completion_details', completion_details
                    ) ORDER BY completion_date DESC
                ) AS quiz_completions
            FROM quiz_completions
            GROUP BY user_id
        `);

        result.rows.forEach(row => {
            const completionsCount = row.quiz_completions ? row.quiz_completions.length : 0;
            console.log(`User ${row.user_id} has ${completionsCount} quiz completions`);
        });
        
        res.json({
            success: true,
            quizHistory: result.rows
        });
    } catch (error) {
        console.error('Error fetching quiz history:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Endpoint to reset user streak data - NEW
app.post('/api/users/:userId/reset-streaks', async (req, res) => {
    const userId = req.params.userId;
    
    try {
      // Reset streak data for the specified user
      await pool.query(`
        UPDATE users
        SET quiz_streak = 0,
            longest_quiz_streak = 0,
            last_quiz_update = NULL
        WHERE id = $1
      `, [userId]);
      
      res.json({
        success: true,
        message: 'User streak data reset successfully'
      });
    } catch (error) {
      console.error('Error resetting user streaks:', error);
      res.status(500).json({ error: 'Server error' });
    }
});
  
// Add this endpoint to reset all users' streak data - NEW
app.post('/api/admin/reset-all-streaks', async (req, res) => {
    try {
      // Reset streak data for all users
      await pool.query(`
        UPDATE users
        SET quiz_streak = 0,
            longest_quiz_streak = 0,
            last_quiz_update = NULL
      `);
      
      res.json({
        success: true,
        message: 'All users streak data reset successfully'
      });
    } catch (error) {
      console.error('Error resetting all user streaks:', error);
      res.status(500).json({ error: 'Server error' });
    }
});

// IMPROVED - API endpoint to get detailed streak info for a specific user
app.get('/api/users/:userId/streaks', async (req, res) => {
    const userId = req.params.userId;
    
    try {
        // Get user streak data with corrected calculations
        const userResult = await pool.query(`
            SELECT 
                id, 
                username,
                last_login, 
                login_streak,
                longest_login_streak,
                last_login_update,
                quiz_streak,
                longest_quiz_streak,
                last_quiz_update
            FROM users
            WHERE id = $1
        `, [userId]);
        
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Get login history for streak visualization
        const loginHistoryResult = await pool.query(`
            SELECT login_date
            FROM user_logins
            WHERE user_id = $1
            ORDER BY login_date DESC
            LIMIT 30
        `, [userId]);
        
        // Get quiz completion history
        const quizHistoryResult = await pool.query(`
            SELECT 
                qc.completion_date, 
                qc.quiz_id, 
                qc.score, 
                qc.total_questions, 
                qc.correct_answers,
                COUNT(*) OVER() as total_count
            FROM quiz_completions qc
            WHERE qc.user_id = $1
            ORDER BY qc.completion_date DESC
        `, [userId]);

        // Count unique quiz days
        const uniqueDaysResult = await pool.query(`
            SELECT COUNT(DISTINCT DATE(completion_date)) as unique_days
            FROM quiz_completions
            WHERE user_id = $1
        `, [userId]);
        
        // Calculate total quizzes
        const totalQuizzes = quizHistoryResult.rows.length > 0 
            ? parseInt(quizHistoryResult.rows[0].total_count) 
            : 0;
        
        // Count quizzes by difficulty level
        const difficultyCountsResult = await pool.query(`
            SELECT 
                quiz_id, 
                COUNT(*) as count 
            FROM quiz_completions
            WHERE user_id = $1
            GROUP BY quiz_id
        `, [userId]);
        
        // Format the difficulty counts
        const difficultyCounts = {
            1: 0, // Beginner
            2: 0, // Intermediate  
            3: 0  // Advanced
        };
        
        difficultyCountsResult.rows.forEach(row => {
            difficultyCounts[row.quiz_id] = parseInt(row.count);
        });

        // Log the counts
        console.log(`User ${userId} has ${totalQuizzes} quiz completions`);
        console.log(`User ${userId} has completed quizzes on ${uniqueDaysResult.rows[0].unique_days} unique days`);
        
        // Enhanced user data object with correct counts
        const enhancedUserData = {
            ...userResult.rows[0],
            total_quizzes: totalQuizzes,
            quiz_days_count: parseInt(uniqueDaysResult.rows[0].unique_days),
            difficulty_counts: difficultyCounts
        };
        
        res.json({
            success: true,
            userData: enhancedUserData,
            loginHistory: loginHistoryResult.rows.map(row => row.login_date),
            quizHistory: quizHistoryResult.rows
        });
    } catch (error) {
        console.error(`Error fetching streak data for user ${userId}:`, error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/quiz/complete', async (req, res) => {
    const { 
        userId,
        quizId, 
        score,
        totalQuestions,
        correctAnswers,
        duration,
        completionDetails,
        submissionId
    } = req.body;

    console.log("Recording quiz attempt with timing data:", {
        userId,
        quizId,
        score,
        duration: duration,
        totalQuestions,
        correctAnswers
    });

    try {
        // Validate that duration is provided since it's a required field
        if (!duration) {
            console.error('Missing required field: duration_seconds');
            return res.status(400).json({ error: 'Missing required field: duration_seconds' });
        }
        
        // Store time in quiz_attempts (mandatory)
        await pool.query(`
            INSERT INTO quiz_attempts (
            user_id,
            quiz_id,
            score,
            duration_seconds,
            total_questions,
            correct_answers
        ) VALUES ($1, $2, $3, $4, $5, $6)
        `, [userId, quizId, score, duration, totalQuestions, correctAnswers]);
        
        console.log(`Stored quiz attempt timing data: ${duration} seconds`);
    
        console.log('Received quiz completion data:', {
            userId, quizId, score,
            totalQuestions, 
            completionDetailsLength: completionDetails ? completionDetails.length : 0,
            submissionId: submissionId || 'Not provided'
        });
        
        // Check for duplicate submission by submissionId
        if (submissionId) {
            try {
                // First check if the submission_id column exists
                try {
                    await pool.query(`
                        SELECT submission_id FROM quiz_completions WHERE submission_id IS NOT NULL LIMIT 1
                    `);
                } catch (error) {
                    if (error.message.includes('column "submission_id" does not exist')) {
                        console.log('Adding submission_id column to quiz_completions table');
                        await pool.query(`
                            ALTER TABLE quiz_completions 
                            ADD COLUMN submission_id VARCHAR(255)
                        `);
                        
                        await pool.query(`
                            CREATE INDEX IF NOT EXISTS quiz_completions_submission_id_idx 
                            ON quiz_completions(submission_id)
                        `);
                    }
                }
                
                // Now check for existing submissions with this ID
                const existingSubmission = await pool.query(
                    'SELECT id FROM quiz_completions WHERE submission_id = $1',
                    [submissionId]
                );
                
                if (existingSubmission.rows.length > 0) {
                    console.log(`Duplicate submission detected with ID: ${submissionId}`);
                    return res.json({
                        success: true,
                        message: 'Quiz completion already recorded',
                        duplicate: true,
                        completionId: existingSubmission.rows[0].id
                    });
                }
            } catch (error) {
                console.error('Error checking for duplicate submission:', error);
                // Continue with submission even if duplicate check fails
            }
        }

        // Validate userId
        const userExists = await pool.query('SELECT id FROM users WHERE id = $1', [userId]);
        if (userExists.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Calculate correctAnswers if not provided but completionDetails exists
        let actualCorrectAnswers = correctAnswers;
        let totalEarnedPoints = 0;
        let maxPossiblePoints = 0;
        
        // Process completion details based on question types
        if (completionDetails && Array.isArray(completionDetails)) {
            // Calculate total points from all questions
            completionDetails.forEach(detail => {
                // For special question types with points
                if (detail.type && detail.details && detail.details.earnedPoints) {
                    totalEarnedPoints += detail.details.earnedPoints;
                    maxPossiblePoints += detail.details.maxPoints || 10;
                }
                // For multiple choice questions
                else if (detail.isCorrect) {
                    totalEarnedPoints += 10;
                    maxPossiblePoints += 10;
                } else {
                    maxPossiblePoints += 10;
                }
            });
            
            // Calculate number of correct answers for backward compatibility
            if (!actualCorrectAnswers) {
                // For multiple choice questions, count correct answers
                actualCorrectAnswers = completionDetails.filter(detail => 
                    !detail.type && detail.isCorrect
                ).length;
                
                // For special question types, add proportional correct answers
                const specialQuestions = completionDetails.filter(detail => detail.type);
                if (specialQuestions.length > 0) {
                    specialQuestions.forEach(detail => {
                        if (detail.details && detail.details.earnedPoints && detail.details.maxPoints) {
                            // If they got at least 70% of points, count as correct
                            if ((detail.details.earnedPoints / detail.details.maxPoints) >= 0.7) {
                                actualCorrectAnswers += 1;
                            }
                        }
                    });
                }
                
                console.log("Calculated correct answers from details:", actualCorrectAnswers);
            }
        } else if (!actualCorrectAnswers && score) {
            // If no correct answers but score is provided, estimate from score percentage
            actualCorrectAnswers = Math.round((score / 100) * totalQuestions);
            console.log("Estimated correct answers from score:", actualCorrectAnswers);
            
            // Estimate points
            totalEarnedPoints = Math.round((score / 100) * (totalQuestions * 10));
            maxPossiblePoints = totalQuestions * 10;
        }

        const finalTotalQuestions = totalQuestions || 5;
        const finalCorrectAnswers = actualCorrectAnswers || 0;
        const finalCompletionDetails = completionDetails ? JSON.stringify(completionDetails) : null;
        
        // Record quiz completion with points data
        const result = await pool.query(`
            INSERT INTO quiz_completions (
                user_id,
                quiz_id,
                score,
                completion_date,
                total_questions,
                correct_answers,
                completion_details,
                submission_id,
                earned_points,
                max_points
            )
            VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4, $5, $6, $7, $8, $9)
            RETURNING id, completion_date
        `, [
            userId,
            quizId,
            score,
            finalTotalQuestions, 
            finalCorrectAnswers,
            finalCompletionDetails,
            submissionId,
            totalEarnedPoints,
            maxPossiblePoints
        ]);
        
        const completionId = result.rows[0].id;
        const completionDate = result.rows[0].completion_date;
        console.log("Quiz completion recorded with ID:", completionId);

        // Store detailed answer records for all question types
        if (completionDetails && Array.isArray(completionDetails) && completionDetails.length > 0) {
            console.log("Storing detailed answer records for all question types");
            
            for (const detail of completionDetails) {
                // Prepare data based on question type
                let questionType = 'multiple_choice';
                let earnedPoints = 0;
                let maxPoints = 10;
                let identifications = null;
                
                if (detail.type) {
                    questionType = detail.type;
                    
                    // Extract points information
                    if (detail.details) {
                        if (detail.details.earnedPoints !== undefined) {
                            earnedPoints = detail.details.earnedPoints;
                        }
                        
                        if (detail.details.maxPoints !== undefined) {
                            maxPoints = detail.details.maxPoints;
                        }
                        
                        // Store identification details for threat identification questions
                        if (detail.details.truePositives || detail.details.falsePositives || 
                            detail.details.selectedOptions) {
                            identifications = JSON.stringify({
                                truePositives: detail.details.truePositives || [],
                                falsePositives: detail.details.falsePositives || [],
                                falseNegatives: detail.details.falseNegatives || [],
                                selectedOptions: detail.details.selectedOptions || []
                            });
                        }
                    }
                }
                // For multiple choice
                else {
                    earnedPoints = detail.isCorrect ? 10 : 0;
                    maxPoints = 10;
                }
                
                await pool.query(`
                    INSERT INTO quiz_answers (
                        completion_id,
                        question_index,
                        question,
                        user_answer,
                        correct_answer,
                        is_correct,
                        question_type,
                        earned_points,
                        max_points,
                        identifications
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                `, [
                    completionId,
                    detail.questionIndex || 0,
                    detail.question || '',
                    detail.selectedOption || '',
                    detail.correctOption || '',
                    detail.isCorrect || false,
                    questionType,
                    earnedPoints,
                    maxPoints,
                    identifications
                ]);
            }
        }

        // Update quiz streak based on date
        const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        
        // Get last quiz date
        const lastQuizDateResult = await pool.query(`
            SELECT last_quiz_update
            FROM users
            WHERE id = $1
        `, [userId]);
        
        const lastUpdate = lastQuizDateResult.rows[0]?.last_quiz_update ?
            new Date(lastQuizDateResult.rows[0].last_quiz_update).toISOString().slice(0, 10) : null;
            
        // Only update if it's the first quiz of the day
        if (lastUpdate !== today) {
            // Check if it's a continuation from yesterday
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().slice(0, 10);
            
            if (lastUpdate === yesterdayStr || lastUpdate === null) {
                // Continue streak - it's either the first quiz or a continuation from yesterday
                await pool.query(`
                    UPDATE users
                    SET quiz_streak = COALESCE(quiz_streak, 0) + 1,
                        longest_quiz_streak = GREATEST(COALESCE(longest_quiz_streak, 0), COALESCE(quiz_streak, 0) + 1),
                        last_quiz_update = CURRENT_DATE
                    WHERE id = $1
                `, [userId]);
                console.log("Updated quiz streak - continuation");
            } else {
                // Reset streak - it's been more than a day since the last quiz
                await pool.query(`
                    UPDATE users
                    SET quiz_streak = 1,
                        last_quiz_update = CURRENT_DATE
                    WHERE id = $1
                `, [userId]);
                console.log("Reset quiz streak - gap in continuity");
            }
        } else {
            console.log("User already completed a quiz today, not updating streak");
            // Still update the last_quiz_update to ensure timestamp is current
            await pool.query(`
                UPDATE users
                SET last_quiz_update = CURRENT_TIMESTAMP
                WHERE id = $1
            `, [userId]);
        }

        // Get updated user data for response
        const updatedUser = await pool.query(`
            SELECT quiz_streak, longest_quiz_streak
            FROM users
            WHERE id = $1
        `, [userId]);

        // Count the number of completed quizzes for this user
        const quizCountResult = await pool.query(`
            SELECT COUNT(*) as count
            FROM quiz_completions
            WHERE user_id = $1
        `, [userId]);
        
        const totalQuizCount = parseInt(quizCountResult.rows[0].count);
    
        res.json({
            success: true,
            message: 'Quiz completion recorded successfully',
            completionId: completionId,
            completionDate: completionDate,
            totalQuizzes: totalQuizCount,
            quizStreak: updatedUser.rows[0]?.quiz_streak || 1,
            longestQuizStreak: updatedUser.rows[0]?.longest_quiz_streak || 1,
            // Add points information
            earnedPoints: totalEarnedPoints,
            maxPoints: maxPossiblePoints,
            pointsPercentage: maxPossiblePoints > 0 ? Math.round((totalEarnedPoints / maxPossiblePoints) * 100) : 0
        });
    } catch (error) {
        console.error('Error recording quiz completion:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});
// Get questions by difficulty with randomization
app.get('/api/quiz/questions/:difficulty', async (req, res) => {
    const { difficulty } = req.params;
    const { userId } = req.query; // Optional user ID for tracking seen questions
    
    try {
        // Validate difficulty
        const validDifficulties = ['Beginner', 'Intermediate', 'Advanced'];
        if (!validDifficulties.includes(difficulty)) {
            return res.status(400).json({ error: 'Invalid difficulty level' });
        }
        
        // Get all questions of the specified difficulty
        const questionsResult = await pool.query(
            'SELECT id, question_text, question_type, explanation FROM questions WHERE difficulty = $1',
            [difficulty]
        );
        
        if (questionsResult.rows.length === 0) {
            return res.status(404).json({ error: 'No questions found for this difficulty level' });
        }
        
        let questionsToUse = questionsResult.rows;
        
        // If userId is provided, track which questions the user has seen
        if (userId) {
            // Get questions this user has already seen
            const seenQuestionsResult = await pool.query(
                'SELECT question_id FROM user_question_history WHERE user_id = $1 AND quiz_difficulty = $2',
                [userId, difficulty]
            );
            
            const seenQuestionIds = seenQuestionsResult.rows.map(row => row.question_id);
            
            // Prioritize questions the user hasn't seen yet
            const unseenQuestions = questionsToUse.filter(q => !seenQuestionIds.includes(q.id));
            const seenQuestions = questionsToUse.filter(q => seenQuestionIds.includes(q.id));
            
            // If there are enough unseen questions, use only those
            if (unseenQuestions.length >= 5) {
                questionsToUse = unseenQuestions;
            } else {
                // Otherwise, use all unseen questions + some seen ones (randomized)
                seenQuestions.sort(() => Math.random() - 0.5);
                questionsToUse = [...unseenQuestions, ...seenQuestions];
            }
        }
        
        // Randomize the order
        questionsToUse.sort(() => Math.random() - 0.5);
        
        // Limit to 10 questions (or your desired quiz length)
        questionsToUse = questionsToUse.slice(0, 10);
        
        // Create an array to store the full question data
        const fullQuestions = [];
        
        // Fetch details for each question based on type
        for (const question of questionsToUse) {
            const questionId = question.id;
            const questionType = question.question_type;
            
            // Common question data
            const fullQuestion = {
                id: questionId,
                question: question.question_text,
                type: questionType,
                explanation: question.explanation
            };
            
            // Fetch type-specific data
            switch (questionType) {
                case 'multiple_choice':
                    const optionsResult = await pool.query(
                        'SELECT id, option_text, is_correct, option_order FROM multiple_choice_options WHERE question_id = $1 ORDER BY option_order',
                        [questionId]
                    );
                    
                    fullQuestion.options = optionsResult.rows.map(row => row.option_text);
                    
                    // Find the index of the correct answer
                    const correctOption = optionsResult.rows.find(row => row.is_correct);
                    fullQuestion.correctAnswer = correctOption ? optionsResult.rows.indexOf(correctOption) : 0;
                    
                    break;
                    
                case 'email_phishing':
                    // Fetch email content
                    const emailResult = await pool.query(
                        'SELECT * FROM email_phishing_content WHERE question_id = $1',
                        [questionId]
                    );
                    
                    if (emailResult.rows.length > 0) {
                        const email = emailResult.rows[0];
                        fullQuestion.emailContent = {
                            from: email.email_from,
                            to: email.email_to,
                            subject: email.email_subject,
                            date: email.email_date,
                            body: email.email_body,
                            signature: email.email_signature
                        };
                    }
                    
                    // Fetch suspicious elements
                    const emailElementsResult = await pool.query(
                        'SELECT * FROM suspicious_elements WHERE question_id = $1',
                        [questionId]
                    );
                    
                    fullQuestion.suspiciousElements = emailElementsResult.rows.map(element => ({
                        id: element.element_id,
                        description: element.description,
                        field: element.field,
                        content: element.content,
                        type: element.type,
                        isCorrect: element.is_correct,
                        hint: element.hint,
                        points: element.points
                    }));
                    
                    // Whether unique type selection is required (optional feature)
                    fullQuestion.uniqueTypeSelection = false;
                    
                    break;
                    
                case 'vishing':
                    // Fetch call transcript
                    const vishingResult = await pool.query(
                        'SELECT * FROM vishing_content WHERE question_id = $1',
                        [questionId]
                    );
                    
                    if (vishingResult.rows.length > 0) {
                        fullQuestion.callTranscript = vishingResult.rows[0].call_transcript;
                    }
                    
                    // Fetch options
                    const vishingOptionsResult = await pool.query(
                        'SELECT * FROM vishing_options WHERE question_id = $1',
                        [questionId]
                    );
                    
                    fullQuestion.options = vishingOptionsResult.rows.map(option => ({
                        id: option.option_id,
                        text: option.option_text,
                        isCorrect: option.is_correct,
                        explanation: option.explanation
                    }));
                    
                    break;
                    
                case 'smishing':
                    // Fetch SMS content
                    const smishingResult = await pool.query(
                        'SELECT * FROM smishing_content WHERE question_id = $1',
                        [questionId]
                    );
                    
                    if (smishingResult.rows.length > 0) {
                        const sms = smishingResult.rows[0];
                        fullQuestion.messageContent = {
                            from: sms.message_from,
                            message: sms.message,
                            timestamp: sms.timestamp
                        };
                    }
                    
                    // Fetch options
                    const smishingOptionsResult = await pool.query(
                        'SELECT * FROM smishing_options WHERE question_id = $1',
                        [questionId]
                    );
                    
                    fullQuestion.options = smishingOptionsResult.rows.map(option => ({
                        id: option.option_id,
                        text: option.option_text,
                        isCorrect: option.is_correct
                    }));
                    
                    break;
                    
                case 'website_phishing':
                    // Fetch website image
                    const websiteResult = await pool.query(
                        'SELECT * FROM website_phishing_content WHERE question_id = $1',
                        [questionId]
                    );
                    
                    if (websiteResult.rows.length > 0) {
                        fullQuestion.websiteImage = websiteResult.rows[0].website_image_url;
                    }
                    
                    // Fetch suspicious elements with coordinates
                    const websiteElementsResult = await pool.query(
                        'SELECT * FROM suspicious_elements WHERE question_id = $1',
                        [questionId]
                    );
                    
                    fullQuestion.suspiciousElements = websiteElementsResult.rows.map(element => ({
                        id: element.element_id,
                        description: element.description,
                        isCorrect: element.is_correct,
                        hint: element.hint,
                        points: element.points,
                        coordinates: {
                            top: element.coordinates_top,
                            left: element.coordinates_left,
                            width: element.coordinates_width,
                            height: element.coordinates_height
                        }
                    }));
                    
                    break;
            }
            
            fullQuestions.push(fullQuestion);
        }
        
        // Record these questions as "seen" by this user if userId is provided
        if (userId) {
            for (const question of questionsToUse) {
                try {
                    await pool.query(
                        `INSERT INTO user_question_history (user_id, question_id, quiz_difficulty)
                        VALUES ($1, $2, $3)
                        ON CONFLICT (user_id, question_id) DO UPDATE
                        SET viewed_at = CURRENT_TIMESTAMP`,
                        [userId, question.id, difficulty]
                    );
                } catch (error) {
                    console.error(`Error recording question history for user ${userId}, question ${question.id}:`, error);
                    // Continue with other questions
                }
            }
        }
        
        res.json({
            success: true,
            questions: fullQuestions
        });
        
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Add a new question (admin endpoint)
app.post('/api/quiz/questions', async (req, res) => {
    const { 
        question_text, 
        question_type, 
        difficulty, 
        explanation,
        questionData // Contains type-specific data
    } = req.body;
    
    // Start a database transaction
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        
        // Insert the base question
        const questionResult = await client.query(
            `INSERT INTO questions 
            (question_text, question_type, difficulty, explanation) 
            VALUES ($1, $2, $3, $4) 
            RETURNING id`,
            [question_text, question_type, difficulty, explanation]
        );
        
        const questionId = questionResult.rows[0].id;
        
        // Process type-specific data
        switch (question_type) {
            case 'multiple_choice':
                // Insert options
                for (let i = 0; i < questionData.options.length; i++) {
                    const option = questionData.options[i];
                    await client.query(
                        `INSERT INTO multiple_choice_options 
                        (question_id, option_text, is_correct, option_order) 
                        VALUES ($1, $2, $3, $4)`,
                        [questionId, option.text, option.isCorrect, i]
                    );
                }
                break;
                
            case 'email_phishing':
                // Insert email content
                await client.query(
                    `INSERT INTO email_phishing_content 
                    (question_id, email_from, email_to, email_subject, email_date, email_body, email_signature) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                    [
                        questionId, 
                        questionData.emailContent.from, 
                        questionData.emailContent.to, 
                        questionData.emailContent.subject, 
                        questionData.emailContent.date, 
                        questionData.emailContent.body, 
                        questionData.emailContent.signature
                    ]
                );
                
                // Insert suspicious elements
                for (const element of questionData.suspiciousElements) {
                    await client.query(
                        `INSERT INTO suspicious_elements 
                        (question_id, element_id, description, field, content, type, is_correct, hint, points) 
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                        [
                            questionId, 
                            element.id, 
                            element.description, 
                            element.field, 
                            element.content, 
                            element.type, 
                            element.isCorrect !== false, 
                            element.hint, 
                            element.points || 10
                        ]
                    );
                }
                break;
                
            case 'vishing':
                // Insert call transcript
                await client.query(
                    `INSERT INTO vishing_content 
                    (question_id, call_transcript) 
                    VALUES ($1, $2)`,
                    [questionId, questionData.callTranscript]
                );
                
                // Insert options
                for (const option of questionData.options) {
                    await client.query(
                        `INSERT INTO vishing_options 
                        (question_id, option_id, option_text, is_correct, explanation) 
                        VALUES ($1, $2, $3, $4, $5)`,
                        [
                            questionId, 
                            option.id, 
                            option.text, 
                            option.isCorrect, 
                            option.explanation
                        ]
                    );
                }
                break;
                
            case 'smishing':
                // Insert SMS content
                await client.query(
                    `INSERT INTO smishing_content 
                    (question_id, message_from, message, timestamp) 
                    VALUES ($1, $2, $3, $4)`,
                    [
                        questionId, 
                        questionData.messageContent.from, 
                        questionData.messageContent.message, 
                        questionData.messageContent.timestamp
                    ]
                );
                
                // Insert options
                for (const option of questionData.options) {
                    await client.query(
                        `INSERT INTO smishing_options 
                        (question_id, option_id, option_text, is_correct) 
                        VALUES ($1, $2, $3, $4)`,
                        [questionId, option.id, option.text, option.isCorrect]
                    );
                }
                break;
                
            case 'website_phishing':
                // Insert website image
                await client.query(
                    `INSERT INTO website_phishing_content 
                    (question_id, website_image_url) 
                    VALUES ($1, $2)`,
                    [questionId, questionData.websiteImage]
                );
                
                // Insert suspicious elements with coordinates
                for (const element of questionData.suspiciousElements) {
                    await client.query(
                        `INSERT INTO suspicious_elements 
                        (question_id, element_id, description, is_correct, hint, points, 
                         coordinates_top, coordinates_left, coordinates_width, coordinates_height) 
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                        [
                            questionId, 
                            element.id, 
                            element.description, 
                            element.isCorrect !== false, 
                            element.hint, 
                            element.points || 10,
                            element.coordinates.top,
                            element.coordinates.left,
                            element.coordinates.width,
                            element.coordinates.height
                        ]
                    );
                }
                break;
        }
        
        await client.query('COMMIT');
        
        res.status(201).json({
            success: true,
            message: 'Question created successfully',
            questionId
        });
        
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating question:', error);
        res.status(500).json({ error: 'Server error' });
    } finally {
        client.release();
    }
});

// Get analytics on question performance
app.get('/api/quiz/questions/:questionId/analytics', async (req, res) => {
    const { questionId } = req.params;
    
    try {
        // Get question info
        const questionResult = await pool.query(
            'SELECT question_text, question_type, difficulty FROM questions WHERE id = $1',
            [questionId]
        );
        
        if (questionResult.rows.length === 0) {
            return res.status(404).json({ error: 'Question not found' });
        }
        
        const question = questionResult.rows[0];
        
        // Get attempts for this question
        const attemptsResult = await pool.query(`
            SELECT 
                qa.is_correct, 
                qa.earned_points, 
                qa.max_points,
                COUNT(*) as attempt_count
            FROM quiz_answers qa
            JOIN quiz_completions qc ON qa.completion_id = qc.id
            WHERE qa.question_index = $1
            GROUP BY qa.is_correct, qa.earned_points, qa.max_points
        `, [questionId]);
        
        // Calculate success rate
        let totalAttempts = 0;
        let correctAttempts = 0;
        let averagePoints = 0;
        let totalPoints = 0;
        let totalMaxPoints = 0;
        
        attemptsResult.rows.forEach(row => {
            const count = parseInt(row.attempt_count);
            totalAttempts += count;
            
            if (row.is_correct) {
                correctAttempts += count;
            }
            
            if (row.earned_points && row.max_points) {
                totalPoints += parseFloat(row.earned_points) * count;
                totalMaxPoints += parseFloat(row.max_points) * count;
            }
        });
        
        const successRate = totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;
        averagePoints = totalMaxPoints > 0 ? (totalPoints / totalMaxPoints) * 100 : 0;
        
        res.json({
            success: true,
            question: {
                id: questionId,
                text: question.question_text,
                type: question.question_type,
                difficulty: question.difficulty
            },
            analytics: {
                totalAttempts,
                correctAttempts,
                successRate: Math.round(successRate * 10) / 10,
                averagePointsPercentage: Math.round(averagePoints * 10) / 10
            }
        });
        
    } catch (error) {
        console.error('Error fetching question analytics:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


// Admin endpoint to migrate quiz questions
// Add this endpoint to server.js to handle question migration
app.post('/api/admin/migrate-questions', async (req, res) => {
    try {
      // Get quiz data from request body
      const { quizData } = req.body;
      
      if (!quizData) {
        return res.status(400).json({ error: 'Missing quiz data in request' });
      }
      
      // Track statistics
      const stats = {
        total: 0,
        successful: 0,
        failed: 0,
        byType: {}
      };
      
      // Get a client for transaction support
      const client = await pool.connect();
      
      try {
        // Process each difficulty level
        const difficulties = Object.keys(quizData);
        for (const difficulty of difficulties) {
          console.log(`Processing ${difficulty} questions...`);
          const questions = quizData[difficulty];
          
          for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            stats.total++;
            
            // Track by type
            const questionType = question.type || 'multiple_choice';
            stats.byType[questionType] = (stats.byType[questionType] || 0) + 1;
            
            try {
              // Start transaction
              await client.query('BEGIN');
              
              // Insert base question
              const questionResult = await client.query(
                `INSERT INTO questions 
                (question_text, question_type, difficulty, explanation) 
                VALUES ($1, $2, $3, $4) 
                RETURNING id`,
                [question.question, questionType, difficulty, question.explanation]
              );
              
              const questionId = questionResult.rows[0].id;
              
              // Handle different question types
              switch (questionType) {
                case 'multiple_choice':
                  // Insert options
                  for (let j = 0; j < question.options.length; j++) {
                    const option = question.options[j];
                    const isCorrect = j === question.correctAnswer;
                    
                    await client.query(
                      `INSERT INTO multiple_choice_options 
                      (question_id, option_text, is_correct, option_order) 
                      VALUES ($1, $2, $3, $4)`,
                      [questionId, option, isCorrect, j]
                    );
                  }
                  break;
                  
                case 'email_phishing':
                  // Insert email content
                  await client.query(
                    `INSERT INTO email_phishing_content 
                    (question_id, email_from, email_to, email_subject, email_date, email_body, email_signature) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                    [
                      questionId, 
                      question.emailContent.from, 
                      question.emailContent.to, 
                      question.emailContent.subject, 
                      question.emailContent.date, 
                      question.emailContent.body, 
                      question.emailContent.signature || null
                    ]
                  );
                  
                  // Insert suspicious elements
                  for (const element of question.suspiciousElements) {
                    await client.query(
                      `INSERT INTO suspicious_elements 
                      (question_id, element_id, description, field, content, type, is_correct, hint, points) 
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                      [
                        questionId, 
                        element.id, 
                        element.description, 
                        element.field || null, 
                        element.content || null, 
                        element.type || null, 
                        element.isCorrect !== false, // Default to true if not specified
                        element.hint || null, 
                        element.points || 10
                      ]
                    );
                  }
                  break;
                  
                case 'vishing':
                  // Insert call transcript
                  await client.query(
                    `INSERT INTO vishing_content 
                    (question_id, call_transcript) 
                    VALUES ($1, $2)`,
                    [questionId, question.callTranscript]
                  );
                  
                  // Insert options
                  for (const option of question.options) {
                    await client.query(
                      `INSERT INTO vishing_options 
                      (question_id, option_id, option_text, is_correct, explanation) 
                      VALUES ($1, $2, $3, $4, $5)`,
                      [
                        questionId, 
                        option.id, 
                        option.text, 
                        option.isCorrect || false, 
                        option.explanation || null
                      ]
                    );
                  }
                  break;
                  
                case 'smishing':
                  // Insert SMS content
                  await client.query(
                    `INSERT INTO smishing_content 
                    (question_id, message_from, message, timestamp) 
                    VALUES ($1, $2, $3, $4)`,
                    [
                      questionId, 
                      question.messageContent.from, 
                      question.messageContent.message, 
                      question.messageContent.timestamp
                    ]
                  );
                  
                  // Insert options
                  for (const option of question.options) {
                    await client.query(
                      `INSERT INTO smishing_options 
                      (question_id, option_id, option_text, is_correct) 
                      VALUES ($1, $2, $3, $4)`,
                      [questionId, option.id, option.text, option.isCorrect || false]
                    );
                  }
                  break;
                  
                case 'website_phishing':
                  // Insert website image
                  await client.query(
                    `INSERT INTO website_phishing_content 
                    (question_id, website_image_url) 
                    VALUES ($1, $2)`,
                    [questionId, question.websiteImage]
                  );
                  
                  // Insert suspicious elements with coordinates
                  for (const element of question.suspiciousElements) {
                    await client.query(
                      `INSERT INTO suspicious_elements 
                      (question_id, element_id, description, is_correct, hint, points,
                       coordinates_top, coordinates_left, coordinates_width, coordinates_height) 
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                      [
                        questionId, 
                        element.id, 
                        element.description, 
                        element.isCorrect !== false, // Default to true if not specified
                        element.hint || null, 
                        element.points || 10,
                        element.coordinates?.top,
                        element.coordinates?.left,
                        element.coordinates?.width,
                        element.coordinates?.height
                      ]
                    );
                  }
                  break;
              }
              
              await client.query('COMMIT');
              stats.successful++;
              console.log(`✓ Migrated ${difficulty} question ${i + 1} (${questionType})`);
              
            } catch (error) {
              await client.query('ROLLBACK');
              stats.failed++;
              console.error(`✗ Failed to migrate ${difficulty} question ${i + 1}:`, error);
            }
          }
        }
        
        res.json({
          success: true,
          message: 'Quiz questions migration completed',
          stats: stats
        });
        
      } catch (error) {
        console.error('Migration failed:', error);
        res.status(500).json({ error: 'Migration failed', details: error.message });
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Error in migration process:', error);
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  });

// Export handlers for testing purposes
module.exports = {
    // For testing purposes, export the handler functions
    __testables: {
        // Authentication handlers
        loginHandler: async (req, res) => {
            return app._router.stack
                .filter(layer => layer.route && layer.route.path === '/api/login')[0]
                .route.stack[0].handle(req, res);
        },
        registerHandler: async (req, res) => {
            return app._router.stack
                .filter(layer => layer.route && layer.route.path === '/api/register')[0]
                .route.stack[0].handle(req, res);
        },
        forgotPasswordHandler: async (req, res) => {
            return app._router.stack
                .filter(layer => layer.route && layer.route.path === '/api/forgot-password')[0]
                .route.stack[0].handle(req, res);
        },
        resetPasswordHandler: async (req, res) => {
            return app._router.stack
                .filter(layer => layer.route && layer.route.path === '/api/reset-password')[0]
                .route.stack[0].handle(req, res);
        },
        
        // Achievements handlers
        getUserAchievementsHandler: async (req, res) => {
            return app._router.stack
                .filter(layer => layer.route && layer.route.path === '/api/users/:userId/achievements')[0]
                .route.stack[0].handle(req, res);
        },
        checkNewAchievementsHandler: async (req, res) => {
            return app._router.stack
                .filter(layer => layer.route && layer.route.path === '/api/users/:userId/check-achievements')[0]
                .route.stack[0].handle(req, res);
        },
        
        // Quiz handlers
        completeQuizHandler: async (req, res) => {
            return app._router.stack
                .filter(layer => layer.route && layer.route.path === '/api/quiz/complete')[0]
                .route.stack[0].handle(req, res);
        },
        getThreatPerformanceHandler: async (req, res) => {
            return app._router.stack
                .filter(layer => layer.route && layer.route.path === '/api/users/:userId/threat-performance')[0]
                .route.stack[0].handle(req, res);
        },
        getThreatProgressHandler: async (req, res) => {
            return app._router.stack
                .filter(layer => layer.route && layer.route.path === '/api/users/:userId/threat-progress')[0]
                .route.stack[0].handle(req, res);
        },
        
        // User and leaderboard handlers
        getUserStreaksHandler: async (req, res) => {
            return app._router.stack
                .filter(layer => layer.route && layer.route.path === '/api/users/:userId/streaks')[0]
                .route.stack[0].handle(req, res);
        },
        resetUserStreaksHandler: async (req, res) => {
            return app._router.stack
                .filter(layer => layer.route && layer.route.path === '/api/users/:userId/reset-streaks')[0]
                .route.stack[0].handle(req, res);
        },
        resetAllStreaksHandler: async (req, res) => {
            return app._router.stack
                .filter(layer => layer.route && layer.route.path === '/api/admin/reset-all-streaks')[0]
                .route.stack[0].handle(req, res);
        },
        getUsersHandler: async (req, res) => {
            return app._router.stack
                .filter(layer => layer.route && layer.route.path === '/api/users')[0]
                .route.stack[0].handle(req, res);
        },
        getLoginHistoryHandler: async (req, res) => {
            return app._router.stack
                .filter(layer => layer.route && layer.route.path === '/api/users/login-history')[0]
                .route.stack[0].handle(req, res);
        },
        getQuizHistoryHandler: async (req, res) => {
            return app._router.stack
                .filter(layer => layer.route && layer.route.path === '/api/users/quiz-history')[0]
                .route.stack[0].handle(req, res);
        }
    }
};