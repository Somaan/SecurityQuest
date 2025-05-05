// src/__tests__/pages/Leaderboard.test.js

// Mock modules BEFORE importing them
jest.mock('../../constants', () => ({
    API_ENDPOINTS: {
      GET_USERS: '/api/users',
      GET_USER_QUIZ_HISTORY: '/api/users/quiz-history'
    }
  }));
  
  jest.mock('react-toastify', () => ({
    toast: {
      error: jest.fn(),
      success: jest.fn(),
    }
  }));
  
  // Mock FontAwesomeIcon component
  jest.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: jest.fn(() => <span data-testid="mock-icon" />),
  }));
  
  // Mock all FontAwesome icons
  jest.mock('@fortawesome/free-solid-svg-icons', () => ({
    faMedal: 'faMedal',
    faTrophy: 'faTrophy',
    faAward: 'faAward',
    faCircleUser: 'faCircleUser',
    faFireFlameSimple: 'faFireFlameSimple',
    faSpinner: 'faSpinner',
    faExclamationTriangle: 'faExclamationTriangle',
    faInfoCircle: 'faInfoCircle',
    faCalendarCheck: 'faCalendarCheck',
    faQuestionCircle: 'faQuestionCircle'
  }));
  
  // Import React and testing libraries AFTER mocks
  import React from 'react';
  import { render, screen, fireEvent, waitFor } from '@testing-library/react';
  import '@testing-library/jest-dom';
  import Leaderboard from '../../Leaderboard';
  import { toast } from 'react-toastify';
  
  // Create a local constant for API_ENDPOINTS to use in tests
  const API_ENDPOINTS = {
    GET_USERS: '/api/users',
    GET_USER_QUIZ_HISTORY: '/api/users/quiz-history'
  };
  
  // Mock sessionStorage
  const mockSessionStorage = (() => {
    let store = {
      'username': 'testUser',
    };
    return {
      getItem: jest.fn(key => store[key] || null),
      setItem: jest.fn((key, value) => {
        store[key] = value;
      }),
      clear: jest.fn(() => {
        store = {};
      }),
    };
  })();
  
  Object.defineProperty(window, 'sessionStorage', {
    value: mockSessionStorage,
  });
  
  // Mock console methods to reduce test output noise
  const originalConsoleError = console.error;
  const originalConsoleLog = console.log;
  const originalConsoleWarn = console.warn;
  
  describe('Leaderboard Component', () => {
    // Setup mock data
    const mockUsers = [
      {
        id: 1,
        username: 'testUser',
        quiz_days_count: 5,
        total_quiz_completions: 10,
        login_streak: 3,
        quiz_streak: 2,
        longest_login_streak: 5,
        longest_quiz_streak: 4,
        last_login: '2025-05-01T10:00:00.000Z',
        last_login_update: '2025-05-01T10:00:00.000Z',
        last_quiz_update: '2025-05-01T09:00:00.000Z',
      },
      {
        id: 2,
        username: 'topUser',
        quiz_days_count: 10,
        total_quiz_completions: 20,
        login_streak: 7,
        quiz_streak: 5,
        longest_login_streak: 10,
        longest_quiz_streak: 8,
        last_login: '2025-05-01T11:00:00.000Z',
        last_login_update: '2025-05-01T11:00:00.000Z',
        last_quiz_update: '2025-05-01T10:30:00.000Z',
      },
      {
        id: 3,
        username: 'newUser',
        quiz_days_count: 1,
        total_quiz_completions: 2,
        login_streak: 1,
        quiz_streak: 1,
        longest_login_streak: 1,
        longest_quiz_streak: 1,
        last_login: '2025-05-01T09:00:00.000Z',
        last_login_update: '2025-05-01T09:00:00.000Z',
        last_quiz_update: '2025-05-01T08:00:00.000Z',
      },
    ];
  
    const mockQuizHistory = [
      {
        user_id: 1,
        quiz_completions: [
          {
            quiz_id: 1,
            total_questions: 5,
            correct_answers: 4,
            score: 80,
          },
          {
            quiz_id: 2,
            total_questions: 5,
            correct_answers: 3,
            score: 60,
          },
        ],
      },
      {
        user_id: 2,
        quiz_completions: [
          {
            quiz_id: 1,
            total_questions: 5,
            correct_answers: 5,
            score: 100,
          },
          {
            quiz_id: 2,
            total_questions: 5,
            correct_answers: 4,
            score: 80,
          },
        ],
      },
      {
        user_id: 3,
        quiz_completions: [
          {
            quiz_id: 1,
            total_questions: 5,
            correct_answers: 2,
            score: 40,
          },
        ],
      },
    ];
  
    beforeEach(() => {
      // Reset all mocks
      jest.clearAllMocks();
      
      // Mock console methods to suppress logging during tests
      console.error = jest.fn();
      console.log = jest.fn();
      console.warn = jest.fn();
      
      // Mock fetch by default
      global.fetch = jest.fn();
    });
    
    afterEach(() => {
      // Restore console methods
      console.error = originalConsoleError;
      console.log = originalConsoleLog;
      console.warn = originalConsoleWarn;
    });
  
    it('should render loading state initially', () => {
      // Mock fetch to not resolve yet
      global.fetch.mockImplementation(() => new Promise(() => {}));
      
      render(<Leaderboard />);
      
      expect(screen.getByText('Loading leaderboard data...')).toBeInTheDocument();
    });
  
    it('should render error state when fetch fails', async () => {
      // Mock fetch to reject
      global.fetch.mockRejectedValueOnce(new Error('Failed to fetch'));
      
      render(<Leaderboard />);
      
      await waitFor(() => {
        expect(screen.getByText('Failed to load leaderboard')).toBeInTheDocument();
      });
      
      expect(toast.error).toHaveBeenCalled();
    });
  
    it('should render users data when fetch succeeds', async () => {
      // Mock successful fetch for users
      global.fetch.mockImplementation((url) => {
        if (url === API_ENDPOINTS.GET_USERS) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ 
              success: true, 
              users: mockUsers 
            }),
          });
        } else if (url === API_ENDPOINTS.GET_USER_QUIZ_HISTORY) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ 
              success: true, 
              quizHistory: mockQuizHistory 
            }),
          });
        }
        return Promise.reject(new Error(`Unknown URL: ${url}`));
      });
      
      render(<Leaderboard />);
      
      // Wait for the component to finish loading
      await waitFor(() => {
        expect(screen.queryByText('Loading leaderboard data...')).not.toBeInTheDocument();
      });
      
      // Check if users are rendered
      await waitFor(() => {
        expect(screen.getByText('testUser')).toBeInTheDocument();
      });
      expect(screen.getByText('topUser')).toBeInTheDocument();
      expect(screen.getByText('newUser')).toBeInTheDocument();
    });
  
    it('should expand user details when details button is clicked', async () => {
      // Mock successful fetch for users
      global.fetch.mockImplementation((url) => {
        if (url === API_ENDPOINTS.GET_USERS) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ 
              success: true, 
              users: mockUsers 
            }),
          });
        } else if (url === API_ENDPOINTS.GET_USER_QUIZ_HISTORY) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ 
              success: true, 
              quizHistory: mockQuizHistory 
            }),
          });
        }
        return Promise.reject(new Error(`Unknown URL: ${url}`));
      });
      
      render(<Leaderboard />);
      
      // Wait for the component to finish loading
      await waitFor(() => {
        expect(screen.queryByText('Loading leaderboard data...')).not.toBeInTheDocument();
      });
      
      // Find the details buttons
      await waitFor(() => {
        expect(screen.getAllByLabelText('View details').length).toBeGreaterThan(0);
      });
      
      const detailsButtons = screen.getAllByLabelText('View details');
      
      // Click the first details button
      fireEvent.click(detailsButtons[0]);
      
      // Check if the expanded details are visible
      expect(screen.getByText('Total Quiz Completions')).toBeInTheDocument();
      expect(screen.getByText('Unique Quiz Days')).toBeInTheDocument();
    });
  
    it('should call appropriate fetch functions on component mount', async () => {
      global.fetch.mockImplementation((url) => {
        if (url === API_ENDPOINTS.GET_USERS) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ 
              success: true, 
              users: mockUsers 
            }),
          });
        } else if (url === API_ENDPOINTS.GET_USER_QUIZ_HISTORY) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ 
              success: true, 
              quizHistory: mockQuizHistory 
            }),
          });
        }
        return Promise.reject(new Error(`Unknown URL: ${url}`));
      });
      
      render(<Leaderboard />);
      
      // Wait for the component to finish loading
      await waitFor(() => {
        expect(screen.queryByText('Loading leaderboard data...')).not.toBeInTheDocument();
      });
      
      // Check if fetch was called with the correct URLs
      expect(global.fetch).toHaveBeenCalledWith(API_ENDPOINTS.GET_USERS);
      expect(global.fetch).toHaveBeenCalledWith(API_ENDPOINTS.GET_USER_QUIZ_HISTORY);
    });
  
    it('should navigate through pagination when buttons are clicked', async () => {
      // Create a longer list of users to test pagination
      const manyUsers = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        username: `user${i + 1}`,
        quiz_days_count: i + 1,
        total_quiz_completions: (i + 1) * 2,
        login_streak: i % 5,
        quiz_streak: i % 4,
        longest_login_streak: i + 2,
        longest_quiz_streak: i + 1,
        last_login: '2025-05-01T10:00:00.000Z',
        last_login_update: '2025-05-01T10:00:00.000Z',
        last_quiz_update: '2025-05-01T09:00:00.000Z',
      }));
      
      global.fetch.mockImplementation((url) => {
        if (url === API_ENDPOINTS.GET_USERS) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ 
              success: true, 
              users: manyUsers 
            }),
          });
        } else if (url === API_ENDPOINTS.GET_USER_QUIZ_HISTORY) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ 
              success: true, 
              quizHistory: mockQuizHistory 
            }),
          });
        }
        return Promise.reject(new Error(`Unknown URL: ${url}`));
      });
      
      render(<Leaderboard />);
      
      // Wait for the component to finish loading
      await waitFor(() => {
        expect(screen.queryByText('Loading leaderboard data...')).not.toBeInTheDocument();
      });
      
      // Check if pagination controls are rendered
      await waitFor(() => {
        expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
      });
      
      // Click next page
      fireEvent.click(screen.getByText('Next'));
      
      // Check if page number has changed
      expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
      
      // Click previous page
      fireEvent.click(screen.getByText('Previous'));
      
      // Check if page number has changed back
      expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
      
      // Test "Find Me" button if the current user is in the data
      if (screen.queryByText('Find Me')) {
        fireEvent.click(screen.getByText('Find Me'));
      }
    });
  
    it('should display the correct ranking icons for top 3 users', async () => {
      global.fetch.mockImplementation((url) => {
        if (url === API_ENDPOINTS.GET_USERS) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ 
              success: true, 
              users: mockUsers 
            }),
          });
        } else if (url === API_ENDPOINTS.GET_USER_QUIZ_HISTORY) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ 
              success: true, 
              quizHistory: mockQuizHistory 
            }),
          });
        }
        return Promise.reject(new Error(`Unknown URL: ${url}`));
      });
      
      render(<Leaderboard />);
      
      // Wait for the component to finish loading
      await waitFor(() => {
        expect(screen.queryByText('Loading leaderboard data...')).not.toBeInTheDocument();
      });
      
      // Check for icon presence - since we've mocked FontAwesomeIcon, we can only check indirectly
      const iconElements = screen.getAllByTestId('mock-icon');
      expect(iconElements.length).toBeGreaterThan(0);
    });
  
    it('should show streak tooltips on hover', async () => {
      global.fetch.mockImplementation((url) => {
        if (url === API_ENDPOINTS.GET_USERS) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ 
              success: true, 
              users: mockUsers 
            }),
          });
        } else if (url === API_ENDPOINTS.GET_USER_QUIZ_HISTORY) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ 
              success: true, 
              quizHistory: mockQuizHistory 
            }),
          });
        }
        return Promise.reject(new Error(`Unknown URL: ${url}`));
      });
      
      render(<Leaderboard />);
      
      // Wait for the component to finish loading
      await waitFor(() => {
        expect(screen.queryByText('Loading leaderboard data...')).not.toBeInTheDocument();
      });
      
      // Check for user information first
      await waitFor(() => {
        expect(screen.getByText('testUser')).toBeInTheDocument();
      });
      
      // Check if tooltip container exists
      const tooltipContainers = document.querySelectorAll('.tooltip-container');
      expect(tooltipContainers.length).toBeGreaterThan(0);
      
      // Check if tooltip content exists
      const tooltips = document.querySelectorAll('.tooltip');
      expect(tooltips.length).toBeGreaterThan(0);
    });
  
    it('should handle retry when fetch fails', async () => {
      // Mock fetch to fail initially
      global.fetch.mockRejectedValueOnce(new Error('Failed to fetch'));
      
      render(<Leaderboard />);
      
      // Wait for the error state
      await waitFor(() => {
        expect(screen.getByText('Failed to load leaderboard')).toBeInTheDocument();
      });
      
      // Clear previous fetch calls to track new ones
      global.fetch.mockClear();
      
      // Click the retry button
      fireEvent.click(screen.getByText('Try Again'));
      
      // Verify that fetch was called again (retry functionality worked)
      expect(global.fetch).toHaveBeenCalled();
    });
  
    it('should show empty state when no users are found', async () => {
      global.fetch.mockImplementation((url) => {
        if (url === API_ENDPOINTS.GET_USERS) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ 
              success: true, 
              users: [] 
            }),
          });
        } else if (url === API_ENDPOINTS.GET_USER_QUIZ_HISTORY) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ 
              success: true, 
              quizHistory: [] 
            }),
          });
        }
        return Promise.reject(new Error(`Unknown URL: ${url}`));
      });
      
      render(<Leaderboard />);
      
      // Wait for the component to finish loading
      await waitFor(() => {
        expect(screen.queryByText('Loading leaderboard data...')).not.toBeInTheDocument();
      });
      
      // Check if empty state message is shown
      await waitFor(() => {
        expect(screen.getByText('No users found. Be the first to complete a challenge')).toBeInTheDocument();
      });
    });
  });