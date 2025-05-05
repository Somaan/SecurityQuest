// src/__tests__/pages/Achievements.test.js

// Mock modules before imports
jest.mock('../../constants', () => ({
  API_ENDPOINTS: {
    GET_USER_ACHIEVEMENTS: '/api/users/:userId/achievements'
  }
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

jest.mock('../../EnhancedGamifiedAchievements', () => 
  function MockComponent({ achievements }) {
    return `<div>${achievements.length} achievements</div>`;
  }
);

jest.mock('../../AchievementService', () => ({
  getAllAchievements: jest.fn(),
  checkStreakAchievements: jest.fn()
}));

// Now import React and test utilities
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Import component after mocks
import Achievements from '../../Achievements';
import AchievementService from '../../AchievementService';

// Mock fetch API
global.fetch = jest.fn();

// Set up sessionStorage mock
Object.defineProperty(window, 'sessionStorage', {
  value: {
    getItem: jest.fn(key => {
      if (key === 'userId') return '123';
      if (key === 'username') return 'TestUser';
      return null;
    })
  },
  writable: true
});

// Suppress console methods to reduce noise
console.log = jest.fn();
console.warn = jest.fn();
console.error = jest.fn();

describe('Achievements Component', () => {
  const mockAchievements = [
    { id: '1', title: 'Test Achievement 1', unlocked: true },
    { id: '2', title: 'Test Achievement 2', unlocked: false }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Loading state
  test('shows loading state initially', () => {
    render(<Achievements />);
    expect(screen.getByText(/loading achievements/i)).toBeInTheDocument();
  });

  // Test 2: API fetch success
  test('fetches achievements from API', async () => {
    // Mock successful API response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, achievements: mockAchievements })
    });

    render(<Achievements />);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  // Test 3: API fetch failure
  test('falls back to service when API fails', async () => {
    // Mock failed API
    global.fetch.mockRejectedValueOnce(new Error('API error'));
    
    // Mock successful service
    AchievementService.getAllAchievements.mockResolvedValueOnce(mockAchievements);

    render(<Achievements />);
    
    await waitFor(() => {
      expect(AchievementService.getAllAchievements).toHaveBeenCalled();
    });
  });

  // Test 4: Both API and service fail
  test('shows error when both API and service fail', async () => {
    // Mock failed API
    global.fetch.mockRejectedValueOnce(new Error('API error'));
    
    // Mock failed service
    AchievementService.getAllAchievements.mockRejectedValueOnce(new Error('Service error'));

    render(<Achievements />);
    
    await waitFor(() => {
      // Look for the specific error container or button instead
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
      // Also verify error message is displayed
      expect(screen.getByText('Service error')).toBeInTheDocument();
    });
  });

  // Test 5: Streak achievements check
  test('checks for streak achievements', async () => {
    // Mock successful API
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, achievements: mockAchievements })
    });
    
    // Mock new streak achievements
    AchievementService.checkStreakAchievements.mockResolvedValueOnce([{ id: '3' }]);

    render(<Achievements />);
    
    await waitFor(() => {
      expect(AchievementService.checkStreakAchievements).toHaveBeenCalled();
    });
  });
});