// src/__integration_tests__/setup.js
const bcrypt = require('bcrypt');
const pool = require('../backend/db');
const dbHelper = require('./helpers/db-helper');
const testData = require('./fixtures/testData');

/**
 * Set up test environment before all tests
 */
const setupTestEnvironment = async () => {
  console.log('Setting up test environment...');
  
  try {
    // Clear any existing test data first
    await dbHelper.clearTestData();
    
    // Create test user for login tests
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(testData.loginUser.password, saltRounds);
    
    await pool.query(
      `INSERT INTO users (username, email, password_hash, created_at) 
       VALUES ($1, $2, $3, NOW())`,
      [testData.loginUser.username, testData.loginUser.email, passwordHash]
    );
    
    console.log('Created test user for login:', testData.loginUser.username);
    
    // Create test user for password reset tests
    const resetPasswordHash = await bcrypt.hash(testData.resetUser.password, saltRounds);
    
    await pool.query(
      `INSERT INTO users (username, email, password_hash, created_at) 
       VALUES ($1, $2, $3, NOW())`,
      [testData.resetUser.username, testData.resetUser.email, resetPasswordHash]
    );
    
    console.log('Created test user for password reset:', testData.resetUser.username);
    
    // Ensure required tables exist
    await ensureTablesExist();
    
    console.log('Test environment setup complete');
  } catch (error) {
    console.error('Error setting up test environment:', error);
    throw error;
  }
};

/**
 * Clean up test environment after all tests
 */
const teardownTestEnvironment = async () => {
  console.log('Tearing down test environment...');
  
  try {
    await dbHelper.clearTestData();
    await pool.end(); // Closing database 
    console.log('Test environment teardown complete');
  } catch (error) {
    console.error('Error tearing down test environment:', error);
    throw error;
  }
};

/**
 * Ensure all required tables exist
 */
async function ensureTablesExist() {
  try {
    // Check and create password_reset table if needed
    await pool.query(`
      CREATE TABLE IF NOT EXISTS password_reset (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        expires_at TIMESTAMP NOT NULL,
        used BOOLEAN NOT NULL DEFAULT FALSE
      )
    `);
    
    // Check and create remember_tokens table if needed
    await pool.query(`
      CREATE TABLE IF NOT EXISTS remember_tokens (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        expires_at TIMESTAMP NOT NULL,
        is_used BOOLEAN NOT NULL DEFAULT FALSE
      )
    `);
    
    // Create indexes for performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS password_reset_token_idx ON password_reset(token);
      CREATE INDEX IF NOT EXISTS password_reset_user_id_idx ON password_reset(user_id);
      CREATE INDEX IF NOT EXISTS remember_tokens_token_idx ON remember_tokens(token);
      CREATE INDEX IF NOT EXISTS remember_tokens_user_id_idx ON remember_tokens(user_id);
    `);
    
    console.log('Required tables and indexes created successfully');
  } catch (error) {
    console.error('Error ensuring tables exist:', error);
    throw error;
  }
}

module.exports = {
  setupTestEnvironment,
  teardownTestEnvironment
};