// src/__tests__/pages/Dashboard.test.js

// Add TextEncoder/TextDecoder polyfill for Node.js environment
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

import React from 'react';
import { render, screen, fireEvent, waitFor, act, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../../Dashboard';
import { toast } from 'react-toastify';
import AchievementService from '../../AchievementService';

// Mock imports before requiring modules that use them
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  Link: ({ children, to }) => (
    <a href={to} data-testid={`link-to-${to.replace(/\//g, '-')}`}>
      {children}
    </a>
  ),
  BrowserRouter: ({ children }) => <div>{children}</div>
}));

// Mock react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn()
  }
}));

// Mock AchievementService
jest.mock('../../AchievementService', () => ({
  checkStreakAchievements: jest.fn(),
  checkForNewAchievements: jest.fn(),
  getAllAchievements: jest.fn()
}));

// Mock API_ENDPOINTS
jest.mock('../../constants', () => ({
  API_ENDPOINTS: {
    GET_USER_STREAKS: '/api/users/:userId/streaks',
    GET_USER_ACHIEVEMENTS: '/api/users/:userId/achievements'
  }
}));

// Mock fetch
global.fetch = jest.fn();

// Mock sessionStorage
const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn()
};
Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
  writable: true
});

describe('Dashboard Component', () => {
  // Mock data for testing
  const mockUserId = '123';
  const mockUsername = 'TestUser';
  
  const mockUserData = {
    login_streak: 5,
    quiz_streak: 3,
    longest_quiz_streak: 7,
    quiz_days_count: 10,
    total_quizzes: 15
  };
  
  const mockQuizHistory = [
    { 
      quiz_id: 1, 
      score: 80, 
      completion_date: '2025-05-01T10:30:00.000Z', 
      earnedPoints: 8,
      totalPoints: 10
    },
    { 
      quiz_id: 2, 
      score: 70, 
      completion_date: '2025-05-02T14:15:00.000Z',
      earnedPoints: 7,
      totalPoints: 10
    },
    { 
      quiz_id: 3, 
      score: 90, 
      completion_date: '2025-05-03T09:45:00.000Z',
      earnedPoints: 9,
      totalPoints: 10
    }
  ];
  
  const mockAchievements = [
    {
      id: 'achievement-1',
      title: 'Weekly Warrior',
      description: 'Login for 7 consecutive days',
      icon: 'calendar-check',
      color: '#3498db',
      unlocked: true,
      progress: 100,
      unlockDate: '2025-05-01T00:00:00.000Z'
    },
    {
      id: 'achievement-2',
      title: 'Security Champion',
      description: 'Complete all advanced security quizzes',
      icon: 'shield',
      color: '#e74c3c',
      unlocked: false,
      progress: 50
    }
  ];

  // Setup before each test
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock sessionStorage.getItem
    mockSessionStorage.getItem.mockImplementation((key) => {
      if (key === 'userId') return mockUserId;
      if (key === 'username') return mockUsername;
      return null;
    });
    
    // Mock the fetch responses
    // First fetch for streaks
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ 
        userData: mockUserData,
        quizHistory: mockQuizHistory
      })
    });
    
    // Second fetch for achievements
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ 
        achievements: mockAchievements
      })
    });
    
    // Third fetch for final achievements
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ 
        achievements: mockAchievements
      })
    });
    
    // Mock AchievementService methods
    AchievementService.checkStreakAchievements.mockResolvedValue([]);
    AchievementService.checkForNewAchievements.mockResolvedValue([]);
    
    // Mock console methods
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    
    // Mock timers
    jest.useFakeTimers();
  });
  
  afterEach(() => {
    jest.useRealTimers();
    console.log.mockRestore();
    console.error.mockRestore();
    console.warn.mockRestore();
  });

  // --------------------------------
  // Test 1: Initial Loading State
  // --------------------------------
  test('displays loading state initially', () => {
    render(<Dashboard />);
    
    // Should show loading spinner and text
    expect(screen.getByText('Loading your dashboard...')).toBeInTheDocument();
  });

  // --------------------------------
  // Test 2: Dashboard Content Display
  // --------------------------------
  test('displays dashboard content after loading', async () => {
    render(<Dashboard />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText(`Welcome back, ${mockUsername}!`)).toBeInTheDocument();
    });
    
    // Check dashboard sections
    expect(screen.getByText('Security Training Modules')).toBeInTheDocument();
    expect(screen.getByText('Your Achievements')).toBeInTheDocument();
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    expect(screen.getByText('Statistics Preview')).toBeInTheDocument();
    
    // Check user stats display
    expect(screen.getByText(mockUserData.login_streak.toString())).toBeInTheDocument();
    expect(screen.getByText('Day Streak')).toBeInTheDocument();
  });

  // --------------------------------
  // Test 3: Error State
  // --------------------------------
  test('displays error state when API fails', async () => {
    // Override the first fetch to fail
    fetch.mockReset();
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));
    
    render(<Dashboard />);
    
    // Wait for error state
    await waitFor(() => {
      expect(screen.getByText('Error loading dashboard')).toBeInTheDocument();
    });
    
    // Check error display
    expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try Again' })).toBeInTheDocument();
    
    // Check toast notification
    expect(toast.error).toHaveBeenCalledWith('Failed to load dashboard data');
  });

  // --------------------------------
  // Test 4: Module Cards Display
  // --------------------------------
  test('displays correct module cards with progress', async () => {
    render(<Dashboard />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Beginner')).toBeInTheDocument();
    });
    
    // Check all difficulty modules are displayed
    expect(screen.getByText('Beginner')).toBeInTheDocument();
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
    expect(screen.getByText('Advanced')).toBeInTheDocument();
    
    // Check progress calculations
    expect(screen.getByText('80% Complete')).toBeInTheDocument(); // Beginner score
    expect(screen.getByText('70% Complete')).toBeInTheDocument(); // Intermediate score
    expect(screen.getByText('90% Complete')).toBeInTheDocument(); // Advanced score
  });

  // --------------------------------
  // Test 5: Achievement Display
  // --------------------------------
  test('displays unlocked achievements', async () => {
    render(<Dashboard />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Your Achievements')).toBeInTheDocument();
    });
    
    // Use getAllByText and check that the achievements section has content
    const achievementsSection = screen.getByText('Your Achievements').closest('.dashboard-card');
    
    // Check that there's at least one achievement item in the achievements section
    const achievementItems = within(achievementsSection).getAllByRole('heading', { level: 3 });
    expect(achievementItems.length).toBeGreaterThan(0);
    
    // Check that the achievement card contains the expected content
    // Rather than looking for specific text, check for achievement content in general
    expect(achievementsSection).toHaveTextContent('Weekly Warrior');
    expect(achievementsSection).toHaveTextContent('Login for 7 consecutive days');
  });

  // --------------------------------
  // Test 6: Achievement Popup
  // --------------------------------
  test('shows achievement popup for latest achievement', async () => {
    // Mock a recent achievement that hasn't been seen
    const recentAchievement = {
      id: 'recent-achievement',
      title: 'New Achievement',
      description: 'This is a new achievement',
      icon: 'trophy',
      color: '#27ae60',
      unlocked: true,
      unlockDate: new Date().toISOString()
    };
    
    // Add the recent achievement to the final achievements fetch
    fetch.mockReset();
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ 
        userData: mockUserData,
        quizHistory: mockQuizHistory
      })
    });
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ 
        achievements: mockAchievements
      })
    });
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ 
        achievements: [...mockAchievements, recentAchievement]
      })
    });
    
    render(<Dashboard />);
    
    // Wait for the achievement popup to be displayed
    await waitFor(() => {
      expect(screen.getByText('Achievement Unlocked!')).toBeInTheDocument();
    });
    
    // Check popup content
    expect(screen.getByText('New Achievement')).toBeInTheDocument();
    expect(screen.getByText('This is a new achievement')).toBeInTheDocument();
    
    // Close the popup
    const closeButton = screen.getByRole('button', { name: '×' });
    fireEvent.click(closeButton);
    
    // Popup should disappear
    await waitFor(() => {
      expect(screen.queryByText('Achievement Unlocked!')).not.toBeInTheDocument();
    });
  });

  // --------------------------------
  // Test 7: Progress Calculation
  // --------------------------------
  test('calculates overall progress correctly', async () => {
    render(<Dashboard />);
    
    // Wait for data to load
    await waitFor(() => {
      // Check for the progress display
      // With mock data, the calculation should be: (80*0.3 + 70*0.3 + 90*0.4) = 81%
      expect(screen.getByText('81%')).toBeInTheDocument();
    });
  });

  // --------------------------------
  // Test 8: Empty Quiz History
  // --------------------------------
  test('handles empty quiz history gracefully', async () => {
    // Mock empty quiz history
    fetch.mockReset();
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ 
        userData: { ...mockUserData, total_quizzes: 0 },
        quizHistory: []
      })
    });
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ 
        achievements: mockAchievements
      })
    });
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ 
        achievements: mockAchievements
      })
    });
    
    render(<Dashboard />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Welcome back, TestUser!')).toBeInTheDocument();
    });
    
    // Check for empty state message
    expect(screen.getByText('Complete quizzes to see your activity')).toBeInTheDocument();
    
    // Progress for all modules should be 0%
    const progressLabels = screen.getAllByText('0% Complete');
    expect(progressLabels.length).toBe(3); // One for each difficulty level
  });
});