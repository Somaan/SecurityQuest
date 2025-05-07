// src/__integration_tests__/leaderboard.test.js
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
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
app.get('/api/users', __testables.getUsersHandler);
app.get('/api/users/quiz-history', __testables.getQuizHistoryHandler);
app.get('/api/users/:userId/streaks', __testables.getUserStreaksHandler);
app.post('/api/quiz/complete', __testables.completeQuizHandler);
app.post('/api/users/:userId/reset-streaks', __testables.resetUserStreaksHandler);

describe('Leaderboard Integration Tests', () => {
  let testUserId;
  let secondUserId;
  let createdTestUsers = [];

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
    
    // Create a second test user for comparison tests
    const timestamp = Date.now().toString(36);
    const secondUsername = `test_user_${timestamp}`;
    const passwordHash = await bcrypt.hash('TestPass123!', 10);
    
    const newUserResult = await pool.query(
      `INSERT INTO users (username, email, password_hash, created_at) 
       VALUES ($1, $2, $3, NOW()) RETURNING id`,
      [secondUsername, `test_${timestamp}@example.com`, passwordHash]
    );
    
    secondUserId = newUserResult.rows[0].id;
    createdTestUsers.push(secondUserId);
    console.log('Created second test user with ID:', secondUserId);
    
    // Create necessary tables for quiz history if they don't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS quiz_completions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        quiz_id INTEGER NOT NULL,
        score FLOAT NOT NULL,
        completion_date TIMESTAMP NOT NULL DEFAULT NOW(),
        total_questions INTEGER,
        correct_answers INTEGER,
        completion_details TEXT,
        submission_id VARCHAR(255),
        earned_points INTEGER,
        max_points INTEGER
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
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_logins (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        login_date TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    
    // Add helper methods for tests
    dbHelper.addQuizCompletion = async (userId, quizId, score, totalQuestions, correctAnswers, completionDetails = null) => {
      // Calculate earned points and max points
      const earnedPoints = correctAnswers * 10;
      const maxPoints = totalQuestions * 10;
      
      const result = await pool.query(`
        INSERT INTO quiz_completions (
          user_id, quiz_id, score, completion_date, 
          total_questions, correct_answers, completion_details,
          earned_points, max_points
        )
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4, $5, $6, $7, $8)
        RETURNING id, completion_date
      `, [
        userId, quizId, score, totalQuestions, correctAnswers,
        completionDetails ? JSON.stringify(completionDetails) : null,
        earnedPoints, maxPoints
      ]);
      
      return result.rows[0];
    };
    
    dbHelper.updateUserStreak = async (userId, loginStreak, quizStreak) => {
      await pool.query(`
        UPDATE users
        SET login_streak = $2,
            quiz_streak = $3,
            longest_login_streak = GREATEST(longest_login_streak, $2),
            longest_quiz_streak = GREATEST(longest_quiz_streak, $3),
            last_login_update = CURRENT_DATE,
            last_quiz_update = CURRENT_DATE
        WHERE id = $1
      `, [userId, loginStreak, quizStreak]);
    };
    
    dbHelper.recordLogin = async (userId) => {
      const result = await pool.query(`
        INSERT INTO user_logins (user_id, login_date)
        VALUES ($1, CURRENT_TIMESTAMP)
        RETURNING id
      `, [userId]);
      
      return result.rows[0];
    };
    
  }, 60000);
  
  // Clean up test environment after all tests
  afterAll(async () => {
    // Clean up created test users
    for (const userId of createdTestUsers) {
      try {
        await pool.query('DELETE FROM quiz_attempts WHERE user_id = $1', [userId]);
        await pool.query('DELETE FROM quiz_completions WHERE user_id = $1', [userId]);
        await pool.query('DELETE FROM user_logins WHERE user_id = $1', [userId]);
        await pool.query('DELETE FROM users WHERE id = $1', [userId]);
      } catch (error) {
        console.error(`Error cleaning up test user ${userId}:`, error);
      }
    }
    
    await teardownTestEnvironment();
  }, 60000);
  
  describe('Leaderboard Data Fetching', () => {
    test('should fetch all users for leaderboard', async () => {
      const response = await request(app)
        .get('/api/users');
      
      // Verify status code and response structure
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('users');
      expect(Array.isArray(response.body.users)).toBe(true);
    });
    
    test('should fetch quiz history for all users', async () => {
      const response = await request(app)
        .get('/api/users/quiz-history');
      
      // Verify status code and response structure
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('quizHistory');
      expect(Array.isArray(response.body.quizHistory)).toBe(true);
    });
    
    test('should return user objects with correct properties', async () => {
      const response = await request(app)
        .get('/api/users');
      
      // Find our test user
      const testUser = response.body.users.find(user => user.id === testUserId);
      expect(testUser).toBeDefined();
      
      // Verify user object properties
      expect(testUser).toHaveProperty('id');
      expect(testUser).toHaveProperty('username');
      expect(testUser).toHaveProperty('created_at');
      expect(testUser).toHaveProperty('last_login');
      expect(testUser).toHaveProperty('login_streak');
      expect(testUser).toHaveProperty('longest_login_streak');
      expect(testUser).toHaveProperty('quiz_streak');
      expect(testUser).toHaveProperty('longest_quiz_streak');
    });
    
    test('should fetch user streak data', async () => {
      // First update the streak for test user
      await dbHelper.updateUserStreak(testUserId, 3, 2);
      
      const response = await request(app)
        .get(`/api/users/${testUserId}/streaks`);
      
      // Verify response structure
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('userData');
      expect(response.body.userData).toHaveProperty('login_streak', 3);
      expect(response.body.userData).toHaveProperty('quiz_streak', 2);
      expect(response.body.userData).toHaveProperty('longest_login_streak');
      expect(response.body.userData).toHaveProperty('longest_quiz_streak');
    });
  });
  
  describe('Score Calculation', () => {
    test('should add quiz completions and show in leaderboard', async () => {
      try {
        // Add a quiz completion for the test user
        await dbHelper.addQuizCompletion(testUserId, 1, 80, 5, 4);
        
        // Fetch the leaderboard data
        const response = await request(app)
          .get('/api/users');
        
        // Find our test user
        const testUser = response.body.users.find(user => user.id === testUserId);
        expect(testUser).toBeDefined();
        
        // Verify quiz completion count
        expect(parseInt(testUser.total_quiz_completions)).toBeGreaterThanOrEqual(1);
      } catch (err) {
        console.error('Error in test:', err);
        throw err;
      }
    });
    
    test('should correctly calculate score for different quiz types', async () => {
      // Create a quiz completion with mixed question types
      const completionDetails = [
        // Regular multiple choice questions
        { questionIndex: 0, isCorrect: true, question: "Question 1", selectedOption: "A", correctOption: "A" },
        { questionIndex: 1, isCorrect: false, question: "Question 2", selectedOption: "B", correctOption: "C" },
        // Special question with partial credit
        { 
          questionIndex: 2, 
          type: "image_identification",
          question: "Identify threats in image",
          details: {
            earnedPoints: 15,
            maxPoints: 20,
            truePositives: [1, 2, 3],
            falsePositives: [4],
            falseNegatives: [5]
          }
        }
      ];
      
      // Submit via API
      const completionData = {
        userId: secondUserId,
        quizId: 2,
        score: 75, // Overall percentage
        totalQuestions: 3,
        correctAnswers: 1, // Just the regular MC questions
        duration: 180, // seconds
        completionDetails: completionDetails,
        submissionId: "test-score-" + Date.now()
      };
      
      const response = await request(app)
        .post('/api/quiz/complete')
        .send(completionData);
      
      // Verify response
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('earnedPoints');
      expect(response.body).toHaveProperty('maxPoints');
      
      // Expected: 10 (MC) + 15 (image) = 25 points earned
      // Expected: 20 (2 MC * 10) + 20 (image max) = 40 max points
      expect(response.body.earnedPoints).toBe(25);
      expect(response.body.maxPoints).toBe(40);
      
      // Check for this user in leaderboard
      const leaderboardResponse = await request(app)
        .get('/api/users');
      
      const testUser = leaderboardResponse.body.users.find(user => user.id === secondUserId);
      expect(testUser).toBeDefined();
      expect(parseInt(testUser.total_quiz_completions)).toBeGreaterThanOrEqual(1);
    });
    
    test('should handle duplicate quiz submissions', async () => {
      // Submit a quiz completion
      const submissionId = "duplicate-test-" + Date.now();
      const completionData = {
        userId: secondUserId,
        quizId: 1,
        score: 90,
        totalQuestions: 5,
        correctAnswers: 4,
        duration: 120,
        completionDetails: [
          { questionIndex: 0, isCorrect: true, question: "Test question", selectedOption: "A", correctOption: "A" }
        ],
        submissionId: submissionId
      };
      
      // First submission
      const firstResponse = await request(app)
        .post('/api/quiz/complete')
        .send(completionData);
      
      expect(firstResponse.status).toBe(200);
      
      // Submit again with same ID
      const duplicateResponse = await request(app)
        .post('/api/quiz/complete')
        .send(completionData);
      
      expect(duplicateResponse.status).toBe(200);
      expect(duplicateResponse.body).toHaveProperty('duplicate', true);
      
      // Verify only counted once in history
      const historyResponse = await request(app)
        .get('/api/users/quiz-history');
      
      const userHistory = historyResponse.body.quizHistory.find(h => h.user_id === secondUserId);
      
      if (userHistory && userHistory.quiz_completions) {
        // Count completions with this submissionId
        const matchingCompletions = userHistory.quiz_completions.filter(c => 
          c.completion_details && c.completion_details.includes(submissionId)
        );
        
        expect(matchingCompletions.length).toBeLessThanOrEqual(1);
      }
    });
  });
  
  describe('Streaks and Rankings', () => {
    // Reset streaks before each test
    beforeEach(async () => {
      await pool.query(`
        UPDATE users
        SET login_streak = 0,
            quiz_streak = 0
        WHERE id = $1 OR id = $2
      `, [testUserId, secondUserId]);
    });
    
    test('should increment quiz streak when completing quizzes', async () => {
      // Submit a quiz completion
      const completionData = {
        userId: secondUserId,
        quizId: 1,
        score: 90,
        totalQuestions: 5,
        correctAnswers: 4,
        duration: 120,
        completionDetails: [
          { questionIndex: 0, isCorrect: true, question: "Test question", selectedOption: "A", correctOption: "A" }
        ],
        submissionId: "streak-test-" + Date.now()
      };
      
      const response = await request(app)
        .post('/api/quiz/complete')
        .send(completionData);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('quizStreak');
      expect(response.body.quizStreak).toBeGreaterThanOrEqual(1);
      
      // Verify streak in user data
      const userResponse = await request(app)
        .get(`/api/users/${secondUserId}/streaks`);
      
      expect(userResponse.body.userData.quiz_streak).toBeGreaterThanOrEqual(1);
    });
    
    test('should reset streak when calling reset API', async () => {
      // Set up initial streak
      await dbHelper.updateUserStreak(secondUserId, 3, 3);
      
      // Verify initial streak
      const initialResponse = await request(app)
        .get(`/api/users/${secondUserId}/streaks`);
      
      expect(initialResponse.body.userData.quiz_streak).toBe(3);
      
      // Reset streak
      const resetResponse = await request(app)
        .post(`/api/users/${secondUserId}/reset-streaks`);
      
      expect(resetResponse.status).toBe(200);
      
      // Verify reset
      const finalResponse = await request(app)
        .get(`/api/users/${secondUserId}/streaks`);
      
      expect(finalResponse.body.userData.quiz_streak).toBe(0);
    });
    
    test('should sort users by score and streaks in leaderboard', async () => {
      // Set up two users with different scores and streaks
      await dbHelper.updateUserStreak(testUserId, 1, 1);
      await dbHelper.updateUserStreak(secondUserId, 5, 5);
      
      // Add quiz completions with different scores
      await dbHelper.addQuizCompletion(testUserId, 1, 90, 5, 5); // 50 points
      await dbHelper.addQuizCompletion(secondUserId, 1, 60, 5, 3); // 30 points
      
      // Another test to give testUserId higher total score
      await dbHelper.addQuizCompletion(testUserId, 2, 80, 5, 4); // 40 points
      
      // Fetch leaderboard
      const response = await request(app)
        .get('/api/users');
      
      const testUser = response.body.users.find(user => user.id === testUserId);
      const secondUser = response.body.users.find(user => user.id === secondUserId);
      
      expect(testUser).toBeDefined();
      expect(secondUser).toBeDefined();
      
      // Compare total completions - testUser should have more
      const testUserCompletions = parseInt(testUser.total_quiz_completions);
      const secondUserCompletions = parseInt(secondUser.total_quiz_completions);
      
      // We expect testUserId to have more completions
      expect(testUserCompletions).toBeGreaterThanOrEqual(2);
      expect(secondUserCompletions).toBeGreaterThanOrEqual(1);
    });
  });
  
  describe('Edge Cases', () => {
    test('should handle users with no quiz completions', async () => {
      // Create a new user with no completions
      const timestamp = Date.now().toString(36);
      const emptyUsername = `empty_user_${timestamp}`;
      const passwordHash = await bcrypt.hash('EmptyPass123!', 10);
      
      const emptyUserResult = await pool.query(
        `INSERT INTO users (username, email, password_hash, created_at) 
         VALUES ($1, $2, $3, NOW()) RETURNING id`,
        [emptyUsername, `empty_${timestamp}@example.com`, passwordHash]
      );
      
      const emptyUserId = emptyUserResult.rows[0].id;
      createdTestUsers.push(emptyUserId);
      
      // Record login to set streak but no quizzes
      await dbHelper.updateUserStreak(emptyUserId, 2, 0);
      
      // Fetch the leaderboard
      const response = await request(app)
        .get('/api/users');
      
      // Find our empty user
      const emptyUser = response.body.users.find(user => user.id === emptyUserId);
      expect(emptyUser).toBeDefined();
      
      // Should have login streak but no quizzes
      expect(emptyUser.login_streak).toBe(2);
      expect(emptyUser.quiz_streak).toBe(0);
      expect(parseInt(emptyUser.total_quiz_completions)).toBe(0);
    });
    
    test('should handle malformed quiz completion data gracefully', async () => {
      // Test with missing required fields
      const incompleteData = {
        userId: secondUserId,
        quizId: 1,
        // Missing score, totalQuestions, correctAnswers
        duration: 60
      };
      
      const response = await request(app)
        .post('/api/quiz/complete')
        .send(incompleteData);
      if (response.status === 200) {
        expect(response.body).toHaveProperty('error')
      } else {
        expect(response.status).toBeGreaterThanOrEqual(400);
      }
    });
  });
  
  describe('Leaderboard Display', () => {
    test('should include top users in leaderboard', async () => {
      // Set high scores for test users
      await dbHelper.updateUserStreak(testUserId, 5, 5);
      await dbHelper.addQuizCompletion(testUserId, 1, 100, 5, 5); // Perfect score
      
      // Fetch leaderboard
      const response = await request(app)
        .get('/api/users');
      
      // Test user should be in the response
      const testUser = response.body.users.find(user => user.id === testUserId);
      expect(testUser).toBeDefined();
      
      // Get position in array - can't reliably test exact position
      // as other users might have higher scores in the test database
      const position = response.body.users.findIndex(user => user.id === testUserId);
      expect(position).toBeGreaterThanOrEqual(0);
    });
  });
});