/**
 * Creates a mock request object
 * @param {Object} options - Options to customize the mock
 * @returns {Object} The mock request object
 */
function createMockRequest(options = {}) {
    return {
      body: options.body || {},
      params: options.params || {},
      query: options.query || {},
      protocol: options.protocol || 'http',
      get: jest.fn().mockReturnValue(options.host || 'localhost:5000'),
      ...options.custom
    };
  }
  
  /**
   * Creates a mock response object
   * @returns {Object} The mock response object
   */
  function createMockResponse() {
    return {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
      sendStatus: jest.fn()
    };
  }
  
  /**
   * Creates test achievement data
   * @returns {Array} Sample achievement data
   */
  function getSampleAchievements() {
    return [
      {
        id: 1,
        title: 'Dedicated User',
        description: 'Log in for 3 consecutive days',
        icon: 'calendar',
        color: 'blue',
        achievement_type: 'login_streak'
      },
      {
        id: 2,
        title: 'Weekly Warrior',
        description: 'Log in for 7 consecutive days',
        icon: 'fire',
        color: 'orange',
        achievement_type: 'login_streak'
      },
      {
        id: 3,
        title: 'Quiz Enthusiast',
        description: 'Complete quizzes for 3 consecutive days',
        icon: 'star',
        color: 'gold',
        achievement_type: 'quiz_streak'
      },
      {
        id: 4,
        title: 'Quick Learner',
        description: 'Complete 3 quizzes',
        icon: 'book',
        color: 'green',
        achievement_type: 'quiz_performance'
      },
    ];
  }
  
  /**
   * Creates sample quiz completion data
   * @returns {Object} Sample quiz completion data
   */
  function getSampleQuizCompletion() {
    return {
      userId: 1,
      quizId: 2,
      score: 80,
      totalQuestions: 5,
      correctAnswers: 4,
      duration: 120,
      completionDetails: [
        {
          questionIndex: 0,
          question: 'What is phishing?',
          selectedOption: 'A deceptive attempt to steal information',
          correctOption: 'A deceptive attempt to steal information',
          isCorrect: true
        },
        {
          questionIndex: 1,
          question: 'What should you do with suspicious emails?',
          selectedOption: 'Report them',
          correctOption: 'Report them',
          isCorrect: true
        },
        {
          type: 'email_analysis',
          questionIndex: 2,
          details: {
            earnedPoints: 8,
            maxPoints: 10,
            truePositives: ['sender', 'link'],
            falsePositives: ['greeting'],
            falseNegatives: ['urgency']
          }
        }
      ]
    };
  }
  
  /**
   * Creates sample user data
   * @returns {Object} Sample user data
   */
  function getSampleUser() {
    return {
      id: 123,
      username: 'testuser',
      email: 'test@example.com',
      last_login: '2023-04-20T14:30:00Z',
      login_streak: 5,
      longest_login_streak: 8,
      last_login_update: '2023-04-20',
      quiz_streak: 3,
      longest_quiz_streak: 6,
      last_quiz_update: '2023-04-19',
      created_at: '2023-01-15T10:00:00Z'
    };
  }
  
  module.exports = {
    createMockRequest,
    createMockResponse,
    getSampleAchievements,
    getSampleQuizCompletion,
    getSampleUser
  };