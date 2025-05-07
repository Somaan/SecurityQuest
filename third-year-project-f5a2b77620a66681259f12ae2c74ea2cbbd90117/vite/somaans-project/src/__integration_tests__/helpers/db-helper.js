// src/__integration_tests__/helpers/db-helper.js
const pool = require('../../backend/db');

/**
 * Database helper utilities for testing
 */

/**
 * Get user by email
 */
async function getUserByEmail(email) {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
}

/**
 * Get password reset token for user
 */
async function getPasswordResetToken(userId) {
  const result = await pool.query(
    'SELECT * FROM password_reset WHERE user_id = $1 AND used = FALSE ORDER BY created_at DESC LIMIT 1',
    [userId]
  );
  return result.rows[0];
}

/**
 * Get remember token for user
 */
async function getRememberToken(userId) {
  const result = await pool.query(
    'SELECT * FROM remember_tokens WHERE user_id = $1 AND is_used = FALSE ORDER BY created_at DESC LIMIT 1',
    [userId]
  );
  return result.rows[0];
}

/**
 * Clear test data from all relevant tables
 */
async function clearTestData() {
  console.log("Clearing test data...");
  // Delete test users and their related data
  const testEmails = ['testuser@test.com', 'loginuser@test.com', 'resetuser@test.com'];
  
  for (const email of testEmails) {
    try {
      await pool.query('SELECT 1 as connection_test');
    } catch (error) {
      console.error('Database connection failed during clearTestData:', error);
      throw error;
    }
    try {
      const user = await getUserByEmail(email);
      if (user) {
        // Delete all related data
        await pool.query('DELETE FROM password_reset WHERE user_id = $1', [user.id]);
        await pool.query('DELETE FROM remember_tokens WHERE user_id = $1', [user.id]);
        
        // Check if tables exist before deleting from them
        try {
          await pool.query('DELETE FROM user_achievements WHERE user_id = $1', [user.id]);
        } catch (error) {
          console.log('Table user_achievements may not exist, skipping');
        }
        
        try {
          await pool.query('DELETE FROM quiz_answers WHERE completion_id IN (SELECT id FROM quiz_completions WHERE user_id = $1)', [user.id]);
        } catch (error) {
          console.log('Table quiz_answers may not exist, skipping');
        }
        
        try {
          await pool.query('DELETE FROM quiz_completions WHERE user_id = $1', [user.id]);
        } catch (error) {
          console.log('Table quiz_completions may not exist, skipping');
        }
        
        try {
          await pool.query('DELETE FROM user_logins WHERE user_id = $1', [user.id]);
        } catch (error) {
          console.log('Table user_logins may not exist, skipping');
        }
        
        try {
          await pool.query('DELETE FROM quiz_attempts WHERE user_id = $1', [user.id]);
        } catch (error) {
          console.log('Table quiz_attempts may not exist, skipping');
        }
        
        // Finally delete the user
        await pool.query('DELETE FROM users WHERE id = $1', [user.id]);
      }
    } catch (error) {
      console.error(`Error cleaning up test user ${email}:`, error);
    }
  }
  
  console.log('Test data cleared successfully');
}

/**
 * Update user's login or quiz streak
 */
async function updateUserStreak(userId, streakValue, streakType) {
  if (streakType !== 'login_streak' && streakType !== 'quiz_streak') {
    throw new Error('Invalid streak type');
  }
  
  const longestField = streakType === 'login_streak' ? 'longest_login_streak' : 'longest_quiz_streak';
  
  await pool.query(`
    UPDATE users
    SET ${streakType} = $1,
        ${longestField} = GREATEST(COALESCE(${longestField}, 0), $1),
        last_${streakType.replace('_streak', '')}_update = NOW()
    WHERE id = $2
  `, [streakValue, userId]);
  
  console.log(`Updated ${streakType} for user ${userId} to ${streakValue}`);
  return true;
}

/**
 * Add a quiz completion for a user
 */
async function addQuizCompletion(userId, quizId, score, totalQuestions, correctAnswers) {
  try {
    // Check if table exists
    try {
      await pool.query('SELECT 1 FROM quiz_completions LIMIT 0');
    } catch (error) {
      console.log('Creating quiz_completions table...');
      await pool.query(`
        CREATE TABLE IF NOT EXISTS quiz_completions (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          quiz_id INTEGER NOT NULL,
          score FLOAT NOT NULL,
          completion_date TIMESTAMP NOT NULL DEFAULT NOW(),
          total_questions INTEGER DEFAULT 5,
          correct_answers INTEGER DEFAULT 0,
          completion_details TEXT,
          submission_id VARCHAR(255),
          earned_points INTEGER,
          max_points INTEGER
        )
      `);
    }
    
    const result = await pool.query(`
      INSERT INTO quiz_completions (
        user_id, quiz_id, score, completion_date, total_questions, correct_answers
      ) VALUES ($1, $2, $3, NOW(), $4, $5)
      RETURNING id
    `, [userId, quizId, score, totalQuestions, correctAnswers]);
    
    console.log(`Added quiz completion for user ${userId}, quiz ${quizId}, score ${score}`);
    return result.rows[0].id;
  } catch (error) {
    console.error('Error adding quiz completion:', error);
    throw error;
  }
}

/**
 * Reset user streaks to zero
 */
async function resetUserStreaks(userId) {
  await pool.query(`
    UPDATE users
    SET login_streak = 0,
        quiz_streak = 0,
        last_login_update = NULL,
        last_quiz_update = NULL
    WHERE id = $1
  `, [userId]);
  
  console.log(`Reset streaks for user ${userId}`);
}

/**
 * Set user's last quiz update to previous day (for streak testing)
 */
async function setLastQuizUpdateToPreviousDay(userId) {
  await pool.query(`
    UPDATE users
    SET last_quiz_update = NOW() - INTERVAL '1 day'
    WHERE id = $1
  `, [userId]);
  
  console.log(`Set last quiz update to yesterday for user ${userId}`);
}

// Export all the functions
module.exports = {
  getUserByEmail,
  getPasswordResetToken,
  getRememberToken,
  clearTestData,
  updateUserStreak,
  addQuizCompletion,
  resetUserStreaks,
  setLastQuickUpdateToPreviousDay: setLastQuizUpdateToPreviousDay // Fix typo in export
};