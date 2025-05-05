// src/__tests__/services/AchievementService.test.js
import AchievementService from '../../AchievementService';
import { API_ENDPOINTS } from '../../constants';

// Mock the API_ENDPOINTS constant if not available
jest.mock('../../constants', () => ({
  API_ENDPOINTS: {
    GET_USER_ACHIEVEMENTS: '/api/users/:userId/achievements',
    GET_USER_STREAKS: '/api/users/:userId/streaks',
    GET_USERS: '/api/users'
  }
}));

// Mock the fetch API
global.fetch = jest.fn();

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    key: jest.fn((i) => Object.keys(store)[i] || null),
    get length() {
      return Object.keys(store).length;
    },
    // Helper for tests
    _getStore: () => store,
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Reset mocks before each test
beforeEach(() => {
  fetch.mockClear();
  localStorageMock.clear();
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  
  // Reset static properties of AchievementService
  AchievementService.achievementCache = null;
  AchievementService.newlyUnlockedAchievements = [];
  AchievementService.shownAchievements = new Set();
  
  // Spy on console methods
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'group').mockImplementation(() => {});
  jest.spyOn(console, 'groupEnd').mockImplementation(() => {});
});

afterEach(() => {
  console.log.mockRestore();
  console.error.mockRestore();
  console.warn.mockRestore();
  console.group.mockRestore();
  console.groupEnd.mockRestore();
});

describe('AchievementService', () => {
  const userId = 'user123';

  describe('checkForNewAchievements', () => {
    // Test #1: Initialise cache
    test('should initialise cache if no existing cache', async () => {
      // Mock API response
      const mockAchievements = [
        { id: 1, unlocked: true, progress: 100 },
        { id: 2, unlocked: false, progress: 50 }
      ];
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ achievements: mockAchievements })
      });
      
      const result = await AchievementService.checkForNewAchievements(userId);
      
      // Should return empty array for first fetch
      expect(result).toEqual([]);
      
      // Cache should be initialized
      expect(AchievementService.achievementCache).toEqual([
        { id: 1, unlocked: true, progress: 100 },
        { id: 2, unlocked: false, progress: 50 }
      ]);
      
      // Verify fetch was called with correct URL
      expect(fetch).toHaveBeenCalledWith(
        API_ENDPOINTS.GET_USER_ACHIEVEMENTS.replace(':userId', userId)
      );
    });
    
    // Test #2: Detect newly unlocked achievements
    test('should detect newly unlocked achievements', async () => {
      // Setup initial cache state
      AchievementService.achievementCache = [
        { id: 1, unlocked: true, progress: 100 },
        { id: 2, unlocked: false, progress: 50 },
        { id: 3, unlocked: false, progress: 25 }
      ];
      
      // Mock API response with some achievements now unlocked
      const mockNewAchievements = [
        { id: 1, unlocked: true, progress: 100 },
        { id: 2, unlocked: true, progress: 100 }, // Newly unlocked
        { id: 3, unlocked: false, progress: 75 }  // Progress changed but not unlocked
      ];
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ achievements: mockNewAchievements })
      });
      
      const result = await AchievementService.checkForNewAchievements(userId);
      
      // Should return only newly unlocked achievements
      expect(result).toEqual([
        { id: 2, unlocked: true, progress: 100 }
      ]);
      
      // Cache should be updated
      expect(AchievementService.achievementCache).toEqual([
        { id: 1, unlocked: true, progress: 100 },
        { id: 2, unlocked: true, progress: 100 },
        { id: 3, unlocked: false, progress: 75 }
      ]);
    });
    
    // Test #3: Handle API errors
    test('should handle API errors gracefully', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));
      
      const result = await AchievementService.checkForNewAchievements(userId);
      
      // Should return empty array on error
      expect(result).toEqual([]);
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('checkStreakAchievements', () => {
    // Test #4: Login streak achievements
    test('should calculate login streak achievements correctly', async () => {
      // Mock API response for streaks
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          userData: {
            login_streak: 8, // This should unlock 'Dedicated User' and 'Weekly Warrior'
            quiz_streak: 0
          }
        })
      });
      
      // Mock the saveAchievement method
      const saveAchievementSpy = jest.spyOn(AchievementService, 'saveAchievement')
        .mockImplementation(() => Promise.resolve(true));
      
      const result = await AchievementService.checkStreakAchievements(userId);
      
      // Should return unlocked achievements
      expect(result.length).toBe(2);
      expect(result[0].title).toBe('Dedicated User');
      expect(result[1].title).toBe('Weekly Warrior');
      
      // Should calculate correct progress
      expect(saveAchievementSpy).toHaveBeenCalledTimes(3); // 3 login achievements
      
      // Verify the progress values
      const dedicatedUserCall = saveAchievementSpy.mock.calls.find(
        call => call[1].title === 'Dedicated User'
      );
      expect(dedicatedUserCall[1].progress).toBe(100); // 8 days > 3 days requirement = 100%
      
      const weeklyWarriorCall = saveAchievementSpy.mock.calls.find(
        call => call[1].title === 'Weekly Warrior'
      );
      expect(weeklyWarriorCall[1].progress).toBe(100); // 8 days > 7 days requirement = 100%
      
      const monthlyMasterCall = saveAchievementSpy.mock.calls.find(
        call => call[1].title === 'Monthly Master'
      );
      expect(monthlyMasterCall[1].progress).toBeLessThan(100); // 8 days < 30 days requirement
      
      saveAchievementSpy.mockRestore();
    });
    
    // Test #5: localStorage fallback
    test('should fall back to localStorage if API fails', async () => {
      // Mock API failure
      fetch.mockRejectedValueOnce(new Error('Network error'));
      
      // Set up localStorage with streak data
      localStorage.setItem(`login_streak_${userId}`, '5');
      localStorage.setItem(`quiz_streak_${userId}`, '3');
      
      // Mock the saveAchievement method
      const saveAchievementSpy = jest.spyOn(AchievementService, 'saveAchievement')
        .mockImplementation(() => Promise.resolve(true));
      
      const result = await AchievementService.checkStreakAchievements(userId);
      
      // Should check localStorage
      expect(localStorage.getItem).toHaveBeenCalledWith(`login_streak_${userId}`);
      expect(localStorage.getItem).toHaveBeenCalledWith(`quiz_streak_${userId}`);
      
      // Should return unlocked achievements
      expect(result.length).toBe(2); // 'Dedicated User' and 'Quiz Enthusiast'
      
      saveAchievementSpy.mockRestore();
    });
    
    // Test #6: Quiz streak achievements
    test('should handle quiz streak achievements correctly', async () => {
      // Mock API response for streaks
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          userData: {
            login_streak: 2,
            quiz_streak: 10 // This should unlock 'Quiz Enthusiast' and 'Quiz Champion'
          }
        })
      });
      
      // Mock the saveAchievement method
      const saveAchievementSpy = jest.spyOn(AchievementService, 'saveAchievement')
        .mockImplementation(() => Promise.resolve(true));
      
      const result = await AchievementService.checkStreakAchievements(userId);
      
      // Verify quiz achievement calculations
      const quizEnthusiastCall = saveAchievementSpy.mock.calls.find(
        call => call[1].title === 'Quiz Enthusiast'
      );
      expect(quizEnthusiastCall[1].progress).toBe(100);
      
      const quizChampionCall = saveAchievementSpy.mock.calls.find(
        call => call[1].title === 'Quiz Champion'
      );
      expect(quizChampionCall[1].progress).toBe(100);
      
      saveAchievementSpy.mockRestore();
    });
  });

  describe('saveAchievement', () => {
    // Test #7: Save to API
    test('should save achievement to API successfully', async () => {
      const mockAchievement = {
        id: 1,
        title: 'Test Achievement',
        description: 'For testing purposes',
        icon: 'star',
        color: '#ff0000',
        unlocked: true,
        progress: 100
      };
      
      // Mock successful API call
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      });
      
      const result = await AchievementService.saveAchievement(userId, mockAchievement);
      
      expect(result).toBe(true);
      expect(fetch).toHaveBeenCalledWith(
        API_ENDPOINTS.GET_USER_ACHIEVEMENTS.replace(':userId', userId),
        expect.objectContaining({
          method: 'POST',
          headers: expect.any(Object),
          body: expect.any(String)
        })
      );
      
      // Check if body was properly formatted
      const requestBody = JSON.parse(fetch.mock.calls[0][1].body);
      expect(requestBody).toEqual({
        achievementId: 1,
        unlocked: true,
        progress: 100,
        title: 'Test Achievement',
        description: 'For testing purposes',
        icon: 'star',
        color: '#ff0000'
      });
      
      // Should queue for notification if newly unlocked
      expect(AchievementService.newlyUnlockedAchievements.length).toBe(1);
    });
    
    // Test #8: localStorage fallback
    test('should fall back to localStorage if API fails', async () => {
      const mockAchievement = {
        id: 2,
        title: 'Fallback Achievement',
        description: 'Tests localStorage fallback',
        icon: 'trophy',
        color: '#00ff00',
        unlocked: true,
        progress: 75
      };
      
      // Mock API failure
      fetch.mockRejectedValueOnce(new Error('Network error'));
      
      const result = await AchievementService.saveAchievement(userId, mockAchievement);
      
      expect(result).toBe(true);
      expect(localStorage.setItem).toHaveBeenCalled();
      
      // Verify localStorage was called with correct data
      const storageKey = `achievement_${userId}_${mockAchievement.id}`;
      const storedData = JSON.parse(localStorage.setItem.mock.calls.find(
        call => call[0] === storageKey
      )[1]);
      
      expect(storedData.id).toBe(2);
      expect(storedData.unlocked).toBe(true);
      expect(storedData.progress).toBe(75);
    });
    
    // Test #9: Invalid achievement objects
    test('should handle invalid achievement objects', async () => {
      // Null achievement
      let result = await AchievementService.saveAchievement(userId, null);
      expect(result).toBe(false);
      
      // Missing ID
      result = await AchievementService.saveAchievement(userId, { title: 'No ID' });
      expect(result).toBe(false);
      
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('checkQuizAchievements', () => {
    // Test #10: Quick Learner achievement
    test('should detect Quick Learner achievement', () => {
      const mockQuizResults = {
        consecutiveCorrect: 3,
        totalScore: 75
      };
      
      const result = AchievementService.checkQuizAchievements(mockQuizResults);
      
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(7);
      expect(result[0].title).toBe('Quick Learner');
      expect(result[0].unlocked).toBe(true);
    });
    
    // Test #11: Requirements not met
    test('should return empty array if requirements not met', () => {
      const mockQuizResults = {
        consecutiveCorrect: 2, // Not enough for achievement
        totalScore: 75
      };
      
      const result = AchievementService.checkQuizAchievements(mockQuizResults);
      
      expect(result).toEqual([]);
    });
    
    // Test #12: Null quiz results
    test('should handle null/undefined quiz results', () => {
      const result = AchievementService.checkQuizAchievements(null);
      expect(result).toEqual([]);
    });
  });

  describe('checkLeaderboardAchievements', () => {
    // Test #13: Top ranked user
    test('should detect Security Champion achievement when user is top ranked', async () => {
      // Mock leaderboard API response
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          users: [
            { id: userId, score: 1000, login_streak: 10 }, // User is top ranked
            { id: 'otherUser', score: 950, login_streak: 8 },
            { id: 'anotherUser', score: 900, login_streak: 5 }
          ]
        })
      });
      
      const result = await AchievementService.checkLeaderboardAchievements(userId);
      
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(10);
      expect(result[0].title).toBe('Security Champion');
    });
    
    // Test #14: Not top ranked
    test('should not award achievement if user is not top ranked', async () => {
      // Mock leaderboard API response
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          users: [
            { id: 'topUser', score: 1200, login_streak: 15 },
            { id: userId, score: 1000, login_streak: 10 }, // User is second
            { id: 'anotherUser', score: 900, login_streak: 5 }
          ]
        })
      });
      
      const result = await AchievementService.checkLeaderboardAchievements(userId);
      
      expect(result).toEqual([]);
    });
    
    // Test #15: API errors
    test('should handle API errors gracefully', async () => {
      // Mock API error
      fetch.mockRejectedValueOnce(new Error('Network error'));
      
      const result = await AchievementService.checkLeaderboardAchievements(userId);
      
      expect(result).toEqual([]);
      expect(console.error).toHaveBeenCalled();
    });
    
    // Test #16: Secondary sort criteria
    test('should apply secondary sort criteria when scores are tied', async () => {
      // Mock leaderboard API response with tied scores
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          users: [
            { id: 'otherUser', score: 1000, login_streak: 12 }, // Higher login streak
            { id: userId, score: 1000, login_streak: 10 }, // Same score but lower login streak
            { id: 'anotherUser', score: 900, login_streak: 5 }
          ]
        })
      });
      
      const result = await AchievementService.checkLeaderboardAchievements(userId);
      
      // User should not get achievement due to secondary sort criteria
      expect(result).toEqual([]);
    });
  });

  describe('Achievement Notification Queue', () => {
    // Test #17: Add achievements to queue
    test('queueAchievement should add achievements to queue', () => {
      const mockAchievement1 = { id: 1, title: 'Achievement 1' };
      const mockAchievement2 = { id: 2, title: 'Achievement 2' };
      
      AchievementService.queueAchievement(mockAchievement1);
      AchievementService.queueAchievement(mockAchievement2);
      
      expect(AchievementService.newlyUnlockedAchievements.length).toBe(2);
      expect(AchievementService.shownAchievements.size).toBe(2);
    });
    
    // Test #18: Prevent duplicates
    test('queueAchievement should not add duplicates', () => {
      const mockAchievement = { id: 1, title: 'Achievement 1' };
      
      AchievementService.queueAchievement(mockAchievement);
      AchievementService.queueAchievement(mockAchievement); // Same achievement again
      
      expect(AchievementService.newlyUnlockedAchievements.length).toBe(1);
    });
    
    // Test #19: Get and remove first item
    test('getNextAchievementToShow should return and remove first item', () => {
      const mockAchievement1 = { id: 1, title: 'Achievement 1' };
      const mockAchievement2 = { id: 2, title: 'Achievement 2' };
      
      AchievementService.queueAchievement(mockAchievement1);
      AchievementService.queueAchievement(mockAchievement2);
      
      const next = AchievementService.getNextAchievementToShow();
      
      expect(next).toEqual(mockAchievement1);
      expect(AchievementService.newlyUnlockedAchievements.length).toBe(1);
    });
    
    // Test #20: Empty queue
    test('getNextAchievementToShow should return null if queue is empty', () => {
      const next = AchievementService.getNextAchievementToShow();
      
      expect(next).toBeNull();
    });
    
    // Test #21: Clear queue
    test('clearAchievementQueue should empty the queue', () => {
      AchievementService.queueAchievement({ id: 1, title: 'Achievement 1' });
      AchievementService.queueAchievement({ id: 2, title: 'Achievement 2' });
      
      AchievementService.clearAchievementQueue();
      
      expect(AchievementService.newlyUnlockedAchievements).toEqual([]);
    });
    
    // Test #22: Reset shown achievements
    test('resetShownAchievements should clear the shown set', () => {
      AchievementService.queueAchievement({ id: 1, title: 'Achievement 1' });
      expect(AchievementService.shownAchievements.size).toBe(1);
      
      AchievementService.resetShownAchievements();
      
      expect(AchievementService.shownAchievements.size).toBe(0);
    });
  });

  describe('getAllAchievements', () => {
    // Test #23: Merge API and localStorage
    test('should merge API and localStorage achievements', async () => {
      // Mock API response
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          achievements: [
            { id: 1, title: 'API Achievement 1', progress: 100, unlocked: true },
            { id: 2, title: 'API Achievement 2', progress: 50, unlocked: false }
          ]
        })
      });
      
      // Set up localStorage achievements
      localStorage.setItem(
        `achievement_${userId}_2`, 
        JSON.stringify({ id: 2, title: 'Local Achievement 2', progress: 75, unlocked: true })
      );
      localStorage.setItem(
        `achievement_${userId}_3`, 
        JSON.stringify({ id: 3, title: 'Local Achievement 3', progress: 100, unlocked: true })
      );
      
      const result = await AchievementService.getAllAchievements(userId);
      
      // Should have 3 unique achievements
      expect(result.length).toBe(3);
      
      // Check that localStorage overrides API for ID 2 (higher progress)
      const achievement2 = result.find(a => a.id === 2);
      expect(achievement2.progress).toBe(75);
      expect(achievement2.unlocked).toBe(true);
      
      // Check that unique achievements from both sources are included
      const ids = result.map(a => a.id);
      expect(ids).toContain(1);
      expect(ids).toContain(2);
      expect(ids).toContain(3);
    });
    
    // Test #24: Handle API failure
    test('should handle API failure gracefully', async () => {
      // Mock API failure
      fetch.mockRejectedValueOnce(new Error('Network error'));
      
      // Set up localStorage achievement
      localStorage.setItem(
        `achievement_${userId}_1`, 
        JSON.stringify({ id: 1, title: 'Local Achievement', progress: 100, unlocked: true })
      );
      
      const result = await AchievementService.getAllAchievements(userId);
      
      // Should still return localStorage achievements
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(1);
    });
    
    // Test #25: Handle localStorage parse errors
    test('should handle localStorage parse errors', async () => {
      // Mock API response
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          achievements: [
            { id: 1, title: 'API Achievement', progress: 100, unlocked: true }
          ]
        })
      });
      
      // Set up valid localStorage achievement
      localStorage.setItem(
        `achievement_${userId}_2`, 
        JSON.stringify({ id: 2, title: 'Valid Local Achievement', progress: 100, unlocked: true })
      );
      
      // Set up invalid JSON in localStorage
      localStorage.setItem(`achievement_${userId}_3`, '{invalid-json}');
      
      const result = await AchievementService.getAllAchievements(userId);
      
      // Should ignore invalid localStorage entry
      expect(result.length).toBe(2); // Only valid entries
      expect(console.warn).toHaveBeenCalled(); // Should warn about parse error
    });
  });

  describe('debugAchievements', () => {
    // Test #26: Log debug information
    test('should log achievement debug information', () => {
      const mockAchievements = [
        { id: 1, title: 'Debug Achievement 1', progress: 100, unlocked: true },
        { id: 2, title: 'Debug Achievement 2', progress: 50, unlocked: false }
      ];
      
      AchievementService.debugAchievements(mockAchievements);
      
      expect(console.group).toHaveBeenCalledWith('Achievement Debug Information');
      expect(console.log).toHaveBeenCalledWith('Total achievements:', 2);
      expect(console.groupEnd).toHaveBeenCalled();
    });
    
    // Test #27: Handle non-array
    test('should handle non-array input', () => {
      AchievementService.debugAchievements('not an array');
      
      expect(console.warn).toHaveBeenCalled();
    });
  });
});