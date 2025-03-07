/**
 * Central constants file for the application
 */

// API endpoints
export const API_ENDPOINTS = {
    LOGIN: 'http://localhost:5000/api/login',
    REGISTER: 'http://localhost:5000/api/register',
    FORGOT_PASSWORD: 'http://localhost:5000/api/forgot-password',
    RESET_PASSWORD: 'http://localhost:5000/api/reset-password',
    INVALIDATE_REMEMBER_TOKEN: 'http://localhost:5000/api/invalidate-remember-token',
    GET_USERS: 'http://localhost:5000/api/users',
    GET_USER_LOGIN_HISTORY: 'http://localhost:5000/api/users/login-history',
    GET_USER_QUIZ_HISTORY: 'http://localhost:5000/api/users/quiz-history',
    GET_USER_STREAKS: 'http://localhost:5000/api/users/:userId/streaks',
    COMPLETE_QUIZ: 'http://localhost:5000/api/quiz/complete',
    GET_USER_ACHIEVEMENTS: 'http://localhost:5000/api/users/:userId/achievements'
  };
  
  // CAPTCHA configuration
  export const CAPTCHA_CONFIG = {
    // Public folder path for production compatibility
    busImages: [
      '/images/bus1.jpg',
      '/images/bus2.jpg',
      '/images/bus3.jpg',
      '/images/bus4.jpg',
      '/images/bus5.jpg'
    ],
    // Array to define correct cells in CAPTCHA
    correctCellsMap: [
      new Set([4, 5, 6, 7, 8]), 
      new Set([0, 1, 3, 4]),    
      new Set([2, 3, 4, 5, 8]),  
      new Set([4, 5, 7, 8]),
      new Set([0, 3, 6])
    ]
  };
  
  // Form validation configuration
  export const FORM_CONFIG = {
    MAX_LENGTH: 20,
    passwordPatterns: {
      minLength: /.{10,}/,
      minNumber: /\d/,
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/
    }
  };
  
  // Toast configuration
  export const TOAST_CONFIG = {
    success: {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark"
    },
    error: {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark"
    },
    confirmation: {
      position: "top-center",
      autoClose: false,
      closeButton: false,
      draggable: true,
      closeOnClick: false,
      theme: "dark",
      hideProgressBar: true,
      pauseOnHover: true
    }
  };