// src/__integration_tests__/auth.test.js
const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const dbHelper = require('./helpers/db-helper');
const testData = require('./fixtures/testData');
const { setupTestEnvironment, teardownTestEnvironment } = require('./setup');

// Import server handlers from the correct location
const { __testables } = require('../backend/server');

// Create express app for testing
const app = express();
app.use(express.json());

// Route handlers
app.post('/api/login', __testables.loginHandler);
app.post('/api/register', __testables.registerHandler);
app.post('/api/forgot-password', __testables.forgotPasswordHandler);
app.post('/api/reset-password', __testables.resetPasswordHandler);

// Global variables
let resetToken = null;

describe('Authentication Integration Tests', () => {
  
  // Setup test environment before all tests
  beforeAll(async () => {
    await setupTestEnvironment();
  });
  
  // Clean up test environment after all tests
  afterAll(async () => {
    await teardownTestEnvironment();
  });
  
  describe('User Registration', () => {
    test('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({
          username: testData.newUser.username,
          email: testData.newUser.email,
          password: testData.newUser.password
        });
      
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.username).toBe(testData.newUser.username);
      expect(response.body.user.email).toBe(testData.newUser.email);
      
      // Verify the user was created in the database
      const user = await dbHelper.getUserByEmail(testData.newUser.email);
      expect(user).toBeTruthy();
      expect(user.username).toBe(testData.newUser.username);
    });
    
    test('should reject registration with existing username', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({
          username: testData.newUser.username, // Existing username
          email: 'another@test.com',
          password: testData.newUser.password
        });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Username or email already exists');
    });
    
    test('should reject registration with existing email', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({
          username: 'anothertestuser',
          email: testData.newUser.email, // Existing email
          password: testData.newUser.password
        });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Username or email already exists');
    });
  });
  
  describe('User Login', () => {
    test('should login successfully with correct credentials', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          username: testData.loginUser.username,
          password: testData.loginUser.password
        });
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.username).toBe(testData.loginUser.username);
    });
    
    test('should reject login with incorrect password', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          username: testData.loginUser.username,
          password: 'wrongpassword'
        });
      
      expect(response.status).toBe(401);
      expect(response.body.error).toContain('Invalid password');
    });
    
    test('should reject login for non-existent user', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          username: 'nonexistentuser',
          password: 'anypassword'
        });
      
      expect(response.status).toBe(401);
      expect(response.body.error).toContain('User not found');
    });
    
    test('should create remember token when remember_me is true', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          username: testData.loginUser.username,
          password: testData.loginUser.password,
          remember_me: true
        });
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('remember_token');
      expect(response.body.remember_token).toBeTruthy();
      
      // Verify token was stored in database
      const user = await dbHelper.getUserByEmail(testData.loginUser.email);
      const token = await dbHelper.getRememberToken(user.id);
      expect(token).toBeTruthy();
      expect(token.token).toBe(response.body.remember_token);
    });
  });
  
  describe('Password Reset Flow', () => {
    test('should send password reset email', async () => {
      // Mock sendgrid email sending
      const originalSendgridSend = require('@sendgrid/mail').send;
      require('@sendgrid/mail').send = jest.fn().mockResolvedValue({});
      
      const response = await request(app)
        .post('/api/forgot-password')
        .send({
          email: testData.resetUser.email
        });
      
      expect(response.status).toBe(200);
      expect(response.body.message).toContain('Password reset email sent');
      
      // Verify token was created in database
      const user = await dbHelper.getUserByEmail(testData.resetUser.email);
      const token = await dbHelper.getPasswordResetToken(user.id);
      expect(token).toBeTruthy();
      
      // Save token for next test
      resetToken = token.token;
      
      // Restore original function
      require('@sendgrid/mail').send = originalSendgridSend;
    });
    
    test('should reject password reset for non-existent email', async () => {
      const response = await request(app)
        .post('/api/forgot-password')
        .send({
          email: 'nonexistent@test.com'
        });
      
      expect(response.status).toBe(404);
      expect(response.body.error).toContain('Email not found');
    });
    
    test('should reset password with valid token', async () => {
      // Skip if we don't have a token from previous test
      if (!resetToken) {
        console.warn('Skipping reset password test - no token available');
        return;
      }
      
      const response = await request(app)
        .post('/api/reset-password')
        .send({
          token: resetToken,
          newPassword: testData.resetUser.newPassword
        });
      
      expect(response.status).toBe(200);
      expect(response.body.message).toContain('Password successfully reset');
      
      // Verify user can login with new password
      const loginResponse = await request(app)
        .post('/api/login')
        .send({
          username: testData.resetUser.username,
          password: testData.resetUser.newPassword
        });
      
      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.success).toBe(true);
    });
    
    test('should reject password reset with invalid token', async () => {
      const response = await request(app)
        .post('/api/reset-password')
        .send({
          token: 'invalid-token',
          newPassword: 'NewPassword123!'
        });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Invalid or expired token');
    });
    
    test('should reject reusing the same token', async () => {
      // Skip if we don't have a token from previous test
      if (!resetToken) {
        console.warn('Skipping token reuse test - no token available');
        return;
      }
      
      const response = await request(app)
        .post('/api/reset-password')
        .send({
          token: resetToken, // Token should now be marked as used
          newPassword: 'AnotherNewPassword123!'
        });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Invalid or expired token');
    });
  });
});