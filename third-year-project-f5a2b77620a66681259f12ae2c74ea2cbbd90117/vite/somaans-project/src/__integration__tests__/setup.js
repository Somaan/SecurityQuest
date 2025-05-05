// integration__tests__/setup.js
const bcrypt = require('bcrypt');
const pool = require('../src/backend/db');
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
    console.log('Test environment teardown complete');
  } catch (error) {
    console.error('Error tearing down test environment:', error);
    throw error;
  }
};

module.exports = {
  setupTestEnvironment,
  teardownTestEnvironment
};