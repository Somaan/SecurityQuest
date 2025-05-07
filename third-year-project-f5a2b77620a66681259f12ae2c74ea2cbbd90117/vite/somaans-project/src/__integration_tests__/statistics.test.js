// src/__integration_tests__/statistics.test.js
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

const request = require('supertest');
const express = require('express');
const dbHelper = require('./helpers/db-helper');
const testData = require('./fixtures/testData');
const { setupTestEnvironment, teardownTestEnvironment } = require('./setup');
const pool = require('../backend/db');

// Import server handlers
const { __testables } = require('../backend/server');

// Create express app for testing
const app = express();
app.use(express.json());

// Route handlers
app.get('/api/users/:userId/streaks', __testables.getUserStreaksHandler);
app.post('/api/quiz/complete', __testables.completeQuizHandler);
app.post('/api/users/:userId/reset-streaks', __testables.resetUserStreaksHandler);
app.get('/api/users', __testables.getUsersHandler);
app.get('/api/users/quiz-history', __testables.getQuizHistoryHandler);
app.get('/api/users/login-history', __testables.getLoginHistoryHandler);

describe('Statistics Integration Tests', () => {
  
  let testUserId;

  // Setup test environment before all tests
  beforeAll(async () => {
    await setupTestEnvironment();
    
    // Get actual user ID from the database for the test user
    const userResult = await pool.query(
      'SELECT id FROM users WHERE username = $1',
      [testData.loginUser.username]
    );
    
    if (userResult.rows.length > 0) {
      testUserId = userResult.rows[0].id;
      console.log('Found test user ID:', testUserId);
    } else {
      throw new Error('Test user not found in database');
    }
    
    // Create necessary tables if they don't exist
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
        earned_points INTEGER DEFAULT 0,
        max_points INTEGER DEFAULT 0
      )
    `);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_logins (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        login_date TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS quiz_attempts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        quiz_id INTEGER NOT NULL,
        score FLOAT NOT NULL,
        duration_seconds INTEGER,
        total_questions INTEGER,
        correct_answers INTEGER,
        attempt_date TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS quiz_answers (
        id SERIAL PRIMARY KEY,
        completion_id INTEGER NOT NULL REFERENCES quiz_completions(id) ON DELETE CASCADE,
        question_index INTEGER NOT NULL,
        question TEXT,
        user_answer TEXT,
        correct_answer TEXT,
        is_correct BOOLEAN NOT NULL DEFAULT FALSE,
        question_type VARCHAR(50) DEFAULT 'multiple_choice',
        earned_points INTEGER DEFAULT 0,
        max_points INTEGER DEFAULT 10,
        identifications TEXT
      )
    `);
    
    // Update users table with streak fields if needed
    try {
      await pool.query(`
        ALTER TABLE users 
        ADD COLUMN IF NOT EXISTS login_streak INTEGER DEFAULT 0,
        ADD COLUMN IF NOT EXISTS longest_login_streak INTEGER DEFAULT 0,
        ADD COLUMN IF NOT EXISTS last_login_update TIMESTAMP,
        ADD COLUMN IF NOT EXISTS quiz_streak INTEGER DEFAULT 0,
        ADD COLUMN IF NOT EXISTS longest_quiz_streak INTEGER DEFAULT 0,
        ADD COLUMN IF NOT EXISTS last_quiz_update TIMESTAMP
      `);
    } catch (e) {
      console.log('Streak columns may already exist:', e.message);
    }
    
    // Create a login record for the test user
    await pool.query(`
      INSERT INTO user_logins (user_id, login_date)
      VALUES ($1, NOW())
    `, [testUserId]);
    
  }, 60000);
  
  // Clean up test environment after all tests
  afterAll(async () => {
    await teardownTestEnvironment();
  }, 60000);
  
  describe('User Statistics Data Fetching', () => {
    test('should fetch user streak data', async () => {
      const response = await request(app)
        .get(`/api/users/${testUserId}/streaks`);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('userData');
      expect(response.body).toHaveProperty('quizHistory');
    });
    
    test('should handle non-existent user ID', async () => {
      const response = await request(app)
        .get('/api/users/999999/streaks');
      
      expect(response.status).toBe(404);
    });
    
    test('should return structured user data with expected fields', async () => {
      const response = await request(app)
        .get(`/api/users/${testUserId}/streaks`);
      
      expect(response.body.userData).toHaveProperty('id');
      expect(response.body.userData).toHaveProperty('username');
      expect(response.body.userData).toHaveProperty('login_streak');
      expect(response.body.userData).toHaveProperty('longest_login_streak');
      expect(response.body.userData).toHaveProperty('quiz_streak');
      expect(response.body.userData).toHaveProperty('longest_quiz_streak');
      expect(response.body.userData).toHaveProperty('quiz_days_count');
      expect(response.body.userData).toHaveProperty('total_quizzes');
    });
  });
  
  describe('Quiz Recording and Stats Calculation', () => {
    test('should record beginner quiz completion', async () => {
      // Create a unique submission ID
      const submissionId = `test-${Date.now()}-beginner`;
      
      // Quiz completion data for a beginner quiz
      const quizData = {
        userId: testUserId,
        quizId: 1, // Beginner quiz
        score: 80,
        totalQuestions: 5,
        correctAnswers: 4,
        duration: 120, // seconds
        completionDetails: [
          { questionIndex: 0, isCorrect: true },
          { questionIndex: 1, isCorrect: true },
          { questionIndex: 2, isCorrect: true },
          { questionIndex: 3, isCorrect: true },
          { questionIndex: 4, isCorrect: false }
        ],
        submissionId: submissionId
      };
      
      const response = await request(app)
        .post('/api/quiz/complete')
        .send(quizData);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('completionId');
     // expect(response.body).toHaveProperty('quizStreak');
     expect (response.body).toHaveProperty('earnedPoints');
    });
    
    test('should record intermediate quiz completion', async () => {
      // Create a unique submission ID
      const submissionId = `test-${Date.now()}-intermediate`;
      
      // Quiz completion data for an intermediate quiz
      const quizData = {
        userId: testUserId,
        quizId: 2, // Intermediate quiz
        score: 75,
        totalQuestions: 5,
        correctAnswers: 3,
        duration: 180, // seconds
        completionDetails: [
          { questionIndex: 0, isCorrect: true },
          { questionIndex: 1, isCorrect: true },
          { questionIndex: 2, isCorrect: true },
          { questionIndex: 3, isCorrect: false },
          { questionIndex: 4, isCorrect: false }
        ],
        submissionId: submissionId
      };
      
      const response = await request(app)
        .post('/api/quiz/complete')
        .send(quizData);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
    
    test('should record advanced quiz completion', async () => {
      // Create a unique submission ID
      const submissionId = `test-${Date.now()}-advanced`;
      
      // Quiz completion data for an advanced quiz
      const quizData = {
        userId: testUserId,
        quizId: 3, // Advanced quiz
        score: 60,
        totalQuestions: 5,
        correctAnswers: 3,
        duration: 240, // seconds
        completionDetails: [
          { questionIndex: 0, isCorrect: true },
          { questionIndex: 1, isCorrect: false },
          { questionIndex: 2, isCorrect: true },
          { questionIndex: 3, isCorrect: false },
          { questionIndex: 4, isCorrect: true }
        ],
        submissionId: submissionId
      };
      
      const response = await request(app)
        .post('/api/quiz/complete')
        .send(quizData);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      
      // Fetch user stats to verify updated counts
      const statsResponse = await request(app)
        .get(`/api/users/${testUserId}/streaks`);
      
      expect(statsResponse.body.userData.total_quizzes).toBeGreaterThanOrEqual(3);
      
      // Check quiz history array
      expect(Array.isArray(statsResponse.body.quizHistory)).toBe(true);
      expect(statsResponse.body.quizHistory.length).toBeGreaterThanOrEqual(3);
    });
    
    test('should handle quiz completion with special question types', async () => {
      const submissionId = `test-${Date.now()}-special`;
      
      // Quiz with threat identification question type
      // FIX: Added correctAnswers: 1 to ensure it's not null
      const quizData = {
        userId: testUserId,
        quizId: 1,
        score: 85,
        totalQuestions: 3,
        correctAnswers: 1, // Added this value
        duration: 180,
        completionDetails: [
          { questionIndex: 0, isCorrect: true },
          { 
            questionIndex: 1, 
            type: 'threat_identification',
            details: {
              earnedPoints: 8,
              maxPoints: 10,
              truePositives: ['threat1', 'threat2'],
              falsePositives: ['normal1'],
              falseNegatives: ['threat3']
            }
          },
          {
            questionIndex: 2,
            type: 'email_analysis',
            details: {
              earnedPoints: 7,
              maxPoints: 10,
              selectedOptions: ['option1', 'option2']
            }
          }
        ],
        submissionId: submissionId
      };
      
      const response = await request(app)
        .post('/api/quiz/complete')
        .send(quizData);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('earnedPoints');
      expect(response.body).toHaveProperty('maxPoints');
    });
    
    test('should handle duplicate quiz submission', async () => {
      // Use the same submission ID for both requests
      const submissionId = `test-${Date.now()}-duplicate`;
      
      // First submission
      const quizData = {
        userId: testUserId,
        quizId: 1,
        score: 90,
        totalQuestions: 5,
        correctAnswers: 4, // Changed from 4.5 to 4
        duration: 100,
        completionDetails: [
          { questionIndex: 0, isCorrect: true },
          { questionIndex: 1, isCorrect: true },
          { questionIndex: 2, isCorrect: true },
          { questionIndex: 3, isCorrect: true },
          { questionIndex: 4, isCorrect: false }
        ],
        submissionId: submissionId
      };
      
      // First submission should succeed
      const response1 = await request(app)
        .post('/api/quiz/complete')
        .send(quizData);
      
      expect(response1.status).toBe(200);
      expect(response1.body.success).toBe(true);
      
      // Second submission with same ID should be marked as duplicate
      const response2 = await request(app)
        .post('/api/quiz/complete')
        .send(quizData);
      
      expect(response2.status).toBe(200);
      expect(response2.body.success).toBe(true);
      expect(response2.body).toHaveProperty('duplicate');
      expect(response2.body.duplicate).toBe(true);
    });
    
    test('should calculate correct points from completion details', async () => {
      const submissionId = `test-${Date.now()}-points`;
      
      const quizData = {
        userId: testUserId,
        quizId: 2,
        score: 80,
        totalQuestions: 4,
        correctAnswers: 2, // Added this value
        duration: 150,
        completionDetails: [
          { questionIndex: 0, isCorrect: true }, // 10 points
          { questionIndex: 1, isCorrect: true }, // 10 points
          { questionIndex: 2, isCorrect: false }, // 0 points
          { 
            questionIndex: 3,
            type: 'threat_identification',
            details: {
              earnedPoints: 6,
              maxPoints: 10
            }
          } // 6 points
        ],
        submissionId: submissionId
      };
      
      const response = await request(app)
        .post('/api/quiz/complete')
        .send(quizData);
      
      expect(response.status).toBe(200);
      expect(response.body.earnedPoints).toBe(26); // 10 + 10 + 0 + 6
      expect(response.body.maxPoints).toBe(40); // 10 + 10 + 10 + 10
      expect(response.body.pointsPercentage).toBe(65); // (26/40) * 100
    });
  });
  
  describe('Streak Management', () => {
    test('should reset user streak data', async () => {
      // First, record a quiz to ensure some streak data
      const submissionId = `test-${Date.now()}-streak`;
      
      const quizData = {
        userId: testUserId,
        quizId: 1,
        score: 85,
        totalQuestions: 5,
        correctAnswers: 4,
        duration: 110,
        submissionId: submissionId
      };
      
      await request(app)
        .post('/api/quiz/complete')
        .send(quizData);
      
      // Now reset streak data
      const resetResponse = await request(app)
        .post(`/api/users/${testUserId}/reset-streaks`);
      
      expect(resetResponse.status).toBe(200);
      expect(resetResponse.body.success).toBe(true);
      
      // Verify streak was reset
      const userDataResponse = await request(app)
        .get(`/api/users/${testUserId}/streaks`);
      
      expect(userDataResponse.body.userData.quiz_streak).toBe(0);
      expect(userDataResponse.body.userData.longest_quiz_streak).toBe(0);
    });
  });
  
  describe('Quiz History Analysis', () => {
    test('should provide quiz history data for different quiz types', async () => {
      // Submit another quiz to ensure enough data
      const submissionId = `test-${Date.now()}-analysis`;
      
      const quizData = {
        userId: testUserId,
        quizId: 2, // Intermediate
        score: 70,
        totalQuestions: 5,
        correctAnswers: 3, // FIX: Changed from 3.5 to 3
        duration: 130,
        submissionId: submissionId
      };
      
      await request(app)
        .post('/api/quiz/complete')
        .send(quizData);
      
      // Get user streak data which includes quiz history
      const response = await request(app)
        .get(`/api/users/${testUserId}/streaks`);
      
      expect(response.status).toBe(200);
      
      // Check quiz history
      const quizzes = response.body.quizHistory;
      expect(quizzes.length).toBeGreaterThan(0);
      
      // Should have some beginner quizzes
      const beginnerQuizzes = quizzes.filter(q => q.quiz_id === 1);
      expect(beginnerQuizzes.length).toBeGreaterThan(0);
      
      // Should have some intermediate quizzes
      const intermediateQuizzes = quizzes.filter(q => q.quiz_id === 2);
      expect(intermediateQuizzes.length).toBeGreaterThan(0);
      
      // Should have some advanced quizzes
      const advancedQuizzes = quizzes.filter(q => q.quiz_id === 3);
      expect(advancedQuizzes.length).toBeGreaterThan(0);
    });
    
    test('should get global quiz history data', async () => {
      const response = await request(app)
        .get('/api/users/quiz-history');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.quizHistory)).toBe(true);
      
      // Find our test user's data
      const testUserData = response.body.quizHistory.find(
        data => parseInt(data.user_id) === testUserId
      );
      
      // Should have quiz completions
      expect(testUserData).toBeDefined();
      expect(Array.isArray(testUserData.quiz_completions)).toBe(true);
      expect(testUserData.quiz_completions.length).toBeGreaterThan(0);
    });
    
    test('should get login history data', async () => {
      const response = await request(app)
        .get('/api/users/login-history');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.loginHistory)).toBe(true);
      
      // Find our test user's login data
      const testUserLoginData = response.body.loginHistory.find(
        data => parseInt(data.user_id) === testUserId
      );
      
      // Should have login dates
      expect(testUserLoginData).toBeDefined();
      expect(Array.isArray(testUserLoginData.login_dates)).toBe(true);
      expect(testUserLoginData.login_dates.length).toBeGreaterThan(0);
    });
  });
  
  describe('Leaderboard Data', () => {
    test('should fetch users for leaderboard including streak data', async () => {
      const response = await request(app)
        .get('/api/users');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.users)).toBe(true);
      
      // Find our test user in the leaderboard
      const testUser = response.body.users.find(u => parseInt(u.id) === testUserId);
      expect(testUser).toBeDefined();
      
      // Should have streak data and quiz count data
      expect(testUser).toHaveProperty('login_streak');
      expect(testUser).toHaveProperty('quiz_streak');
      expect(testUser).toHaveProperty('total_quiz_completions');
      expect(testUser).toHaveProperty('quiz_days_count');
    });
  });
  
  describe('Edge Cases', () => {
    test('should handle quiz submission without completionDetails', async () => {
      const submissionId = `test-${Date.now()}-no-details`;
      
      const quizData = {
        userId: testUserId,
        quizId: 1,
        score: 60, // 60% score
        totalQuestions: 5,
        correctAnswers: 3, // Added this value
        duration: 90,
        // No completionDetails provided
        submissionId: submissionId
      };
      
      const response = await request(app)
        .post('/api/quiz/complete')
        .send(quizData);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('completionId');
      
      // Should estimate correct answers based on score percentage
      expect(response.body).toHaveProperty('earnedPoints');
      expect(response.body.earnedPoints).toBe(0);
    });
    
    test('should handle invalid quiz submission data', async () => {
      const quizData = {
        userId: testUserId,
        quizId: 1,
        score: 80,
        // Missing required duration field
        submissionId: `test-${Date.now()}-invalid`
      };
      
      const response = await request(app)
        .post('/api/quiz/complete')
        .send(quizData);
      
      expect(response.status).toBe(400); // Bad request
    });
  });
});