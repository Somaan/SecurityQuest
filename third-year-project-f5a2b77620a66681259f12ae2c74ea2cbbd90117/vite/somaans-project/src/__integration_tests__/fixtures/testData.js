// src/__integration_tests__/fixtures/testData.js

/**
 * Test data for authentication integration tests
 */
module.exports = {
  // Test user for registration
  newUser: {
    username: 'testuser',
    email: 'testuser@test.com',
    password: 'Test!password123',
    invalidPassword: 'weak'
  },
  
  // Test user for login
  loginUser: {
    username: 'loginuser',
    email: 'loginuser@test.com',
    password: 'Login!password123'
  },
  
  // Test user for password reset
  resetUser: {
    username: 'resetuser',
    email: 'resetuser@test.com',
    password: 'Reset!password123',
    newPassword: 'New!password456'
  }
};