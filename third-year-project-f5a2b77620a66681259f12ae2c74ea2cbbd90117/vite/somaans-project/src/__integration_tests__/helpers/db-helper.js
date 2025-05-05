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
  // Delete test users and their related data
  const testEmails = ['testuser@test.com', 'loginuser@test.com', 'resetuser@test.com'];
  
  for (const email of testEmails) {
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
        
        // Finally delete the user
        await pool.query('DELETE FROM users WHERE id = $1', [user.id]);
      }
    } catch (error) {
      console.error(`Error cleaning up test user ${email}:`, error);
    }
  }
  
  console.log('Test data cleared successfully');
}

module.exports = {
  getUserByEmail,
  getPasswordResetToken,
  getRememberToken,
  clearTestData
};