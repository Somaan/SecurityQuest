// src/__tests__/pages/App.test.js

// Mock modules before imports
jest.mock('react-router-dom', () => ({
    Routes: ({ children }) => <div data-testid="routes">{children}</div>,
    Route: ({ element }) => element,
    Navigate: () => <div data-testid="navigate" />,
    useLocation: jest.fn(() => ({ pathname: '/dashboard' }))
  }));
  
  jest.mock('react-toastify', () => ({
    ToastContainer: () => <div data-testid="toast-container" />,
    toast: {
      success: jest.fn(),
      error: jest.fn()
    }
  }));
  
  jest.mock('../../ThemeContext', () => ({
    ThemeProvider: ({ children }) => <div data-testid="theme-provider">{children}</div>
  }));
  
  jest.mock('../../NavBar', () => () => <div data-testid="navbar" />);
  jest.mock('../../Dashboard', () => () => <div data-testid="dashboard" />);
  jest.mock('../../Login', () => ({ onLoginSuccess }) => (
    <div data-testid="login" onClick={() => onLoginSuccess()}>Login Component</div>
  ));
  jest.mock('../../Register', () => () => <div data-testid="register" />);
  jest.mock('../../ForgotPassword', () => () => <div data-testid="forgot-password" />);
  jest.mock('../../ResetPassword', () => () => <div data-testid="reset-password" />);
  jest.mock('../../Quiz', () => () => <div data-testid="quiz" />);
  jest.mock('../../Achievements', () => () => <div data-testid="achievements" />);
  jest.mock('../../Leaderboard', () => () => <div data-testid="leaderboard" />);
  jest.mock('../../Statistics', () => () => <div data-testid="statistics" />);
  jest.mock('../../ErrorPage', () => () => <div data-testid="error-page" />);
  jest.mock('../../AchievementNotification', () => ({ achievement, onClose }) => (
    <div data-testid="achievement-notification" onClick={onClose}>
      {achievement ? achievement.title : 'Achievement'}
    </div>
  ));
  
  jest.mock('../../AchievementService', () => ({
    getNextAchievementToShow: jest.fn(),
    checkStreakAchievements: jest.fn()
  }));
  
  jest.mock('../../Routes', () => ({
    ROUTES: {
      HOME: '/',
      LOGIN: '/login',
      REGISTER: '/register',
      DASHBOARD: '/dashboard',
      ACHIEVEMENTS: '/achievements',
      STATISTICS: '/statistics',
      LEADERBOARD: '/leaderboard',
      QUIZ: '/quiz',
      FORGOT_PASSWORD: '/forgot-password',
      RESET_PASSWORD: '/reset-password'
    },
    PUBLIC_ROUTES: ['/login', '/register', '/forgot-password', '/reset-password'],
    PROTECTED_ROUTES: ['/dashboard', '/achievements', '/statistics', '/leaderboard', '/quiz']
  }));
  
  // Now import React and test utilities
  import React from 'react';
  import { render, screen, fireEvent, act } from '@testing-library/react';
  import '@testing-library/jest-dom';
  
  // Import component after mocks
  import App from '../../App';
  import AchievementService from '../../AchievementService';
  import { useLocation } from 'react-router-dom';
  
  // Mock localStorage and sessionStorage
  const mockStorage = {};
  const mockSessionStorage = {};
  
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(key => mockStorage[key] || null),
      setItem: jest.fn((key, value) => {
        mockStorage[key] = value;
      }),
      removeItem: jest.fn(key => {
        delete mockStorage[key];
      }),
      clear: jest.fn(() => {
        Object.keys(mockStorage).forEach(key => {
          delete mockStorage[key];
        });
      })
    },
    writable: true
  });
  
  Object.defineProperty(window, 'sessionStorage', {
    value: {
      getItem: jest.fn(key => mockSessionStorage[key] || null),
      setItem: jest.fn((key, value) => {
        mockSessionStorage[key] = value;
      }),
      removeItem: jest.fn(key => {
        delete mockSessionStorage[key];
      }),
      clear: jest.fn(() => {
        Object.keys(mockSessionStorage).forEach(key => {
          delete mockSessionStorage[key];
        });
      })
    },
    writable: true
  });
  
  // Suppress console methods to reduce test noise
  console.log = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();
  
  describe('App Component', () => {
    // Setup before each test
    beforeEach(() => {
      jest.clearAllMocks();
      
      // Reset storage mocks
      Object.keys(mockStorage).forEach(key => {
        delete mockStorage[key];
      });
      Object.keys(mockSessionStorage).forEach(key => {
        delete mockSessionStorage[key];
      });
      
      // Clear timers
      jest.useFakeTimers();
    });
    
    afterEach(() => {
      jest.useRealTimers();
    });
  
    // --------------------------------
    // Test 1: Authentication Handling
    // --------------------------------
    test('handles authenticated state correctly', () => {
      // Set authenticated state in session storage
      mockSessionStorage['isAuthenticated'] = 'true';
      mockSessionStorage['userId'] = '123';
      
      // Mock location to dashboard
      useLocation.mockReturnValue({ pathname: '/dashboard' });
      
      render(<App />);
      
      // Advance timers to complete authentication check
      act(() => {
        jest.advanceTimersByTime(100);
      });
      
      // Should show navbar for authenticated users
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      
      // Should check for achievements
      expect(AchievementService.checkStreakAchievements).toHaveBeenCalledWith('123');
    });
  
    // --------------------------------
    // Test 2: Non-Authenticated State
    // --------------------------------
    test('handles non-authenticated state correctly', () => {
      // Mock unauthenticated state
      mockSessionStorage['isAuthenticated'] = 'false';
      
      // Mock location to login page
      useLocation.mockReturnValue({ pathname: '/login' });
      
      render(<App />);
      
      // Advance timers to complete authentication check
      act(() => {
        jest.advanceTimersByTime(100);
      });
      
      // Should not show navbar for public routes
      expect(screen.queryByTestId('navbar')).not.toBeInTheDocument();
    });
  
    // --------------------------------
    // Test 3: Achievement Notification
    // --------------------------------
    test('shows achievement notifications', async () => {
      // Set authenticated state
      mockSessionStorage['isAuthenticated'] = 'true';
      mockSessionStorage['userId'] = '123';
      
      // Mock achievement to show
      const mockAchievement = {
        id: 'achievement1',
        title: 'Test Achievement',
        description: 'You passed the test!'
      };
      
      // Make achievement service return an achievement
      AchievementService.getNextAchievementToShow.mockReturnValue(mockAchievement);
      
      render(<App />);
      
      // Advance timers to complete authentication check and show achievement
      act(() => {
        jest.advanceTimersByTime(100);
      });
      
      // Should show the achievement notification
      expect(screen.getByTestId('achievement-notification')).toBeInTheDocument();
      expect(screen.getByText('Test Achievement')).toBeInTheDocument();
      
      // Close the achievement
      fireEvent.click(screen.getByTestId('achievement-notification'));
      
      // Should not show achievement anymore
      expect(screen.queryByTestId('achievement-notification')).not.toBeInTheDocument();
    });
  
    // --------------------------------
    // Test 4: Remembered User Handling
    // --------------------------------
    test('handles remembered user correctly', () => {
      // Mock remembered user
      mockStorage['rememberedUser'] = JSON.stringify({
        username: 'testuser',
        password: 'hashedpassword'
      });
      
      // Mock location to login page
      useLocation.mockReturnValue({ pathname: '/login' });
      
      render(<App />);
      
      // Advance timers to complete authentication check
      act(() => {
        jest.advanceTimersByTime(100);
      });
      
      // Should not auto-authenticate just prefill the form
      expect(mockSessionStorage['isAuthenticated']).not.toBe('true');
    });
  
    // --------------------------------
    // Test 5: Error Handling for Invalid Routes
    // --------------------------------
    test('shows error page for invalid routes', () => {
      // Mock location to an invalid route
      useLocation.mockReturnValue({ pathname: '/invalid-route' });
      
      render(<App />);
      
      // Advance timers to complete authentication check
      act(() => {
        jest.advanceTimersByTime(100);
      });
      
      // Should show error page
      expect(screen.getByTestId('error-page')).toBeInTheDocument();
    });
  
    // --------------------------------
    // Test 6: Hiding NavBar for Quiz Routes
    // --------------------------------
    test('hides navbar for quiz routes', () => {
      // Set authenticated state
      mockSessionStorage['isAuthenticated'] = 'true';
      
      // Mock location to quiz route
      useLocation.mockReturnValue({ pathname: '/quiz/1' });
      
      render(<App />);
      
      // Advance timers to complete authentication check
      act(() => {
        jest.advanceTimersByTime(100);
      });
      
      // NavBar should be hidden for quiz routes
      expect(screen.queryByTestId('navbar')).not.toBeInTheDocument();
    });
  
    // --------------------------------
    // Test 7: Periodic Achievement Check
    // --------------------------------
    test('periodically checks for achievements', () => {
      // Set authenticated state
      mockSessionStorage['isAuthenticated'] = 'true';
      mockSessionStorage['userId'] = '123';
      
      render(<App />);
      
      // Advance timers to complete initial checks
      act(() => {
        jest.advanceTimersByTime(100);
      });
      
      // Reset the mock to track new calls
      AchievementService.getNextAchievementToShow.mockClear();
      
      // Advance timers to trigger interval
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      
      // Should have checked for achievements again
      expect(AchievementService.getNextAchievementToShow).toHaveBeenCalled();
    });
  
    // --------------------------------
    // Test 8: Authentication State Inconsistency
    // --------------------------------
    test('handles authentication state inconsistency', () => {
      // Set inconsistent state - authenticated but no userId
      mockSessionStorage['isAuthenticated'] = 'true';
      // Deliberately not setting userId
      
      render(<App />);
      
      // Advance timers to complete authentication check
      act(() => {
        jest.advanceTimersByTime(100);
      });
      
      // Should have logged a warning
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('Authentication state inconsistent')
      );
      
      // Should have reset authentication state
      expect(mockSessionStorage['isAuthenticated']).toBeFalsy();
    });
  });