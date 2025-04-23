// AchievementService.js
import { API_ENDPOINTS } from './constants';

class AchievementService {
  // Keep track of achievement cache
  static achievementCache = null;
  static newlyUnlockedAchievements = [];
  static shownAchievements = new Set();
  
  // Check for new achievements by comparing previous and current achievement lists
  static async checkForNewAchievements(userId) {
    try {
      // Use the dedicated endpoint to check for newly unlocked achievements
      const response = await fetch(API_ENDPOINTS.GET_USER_ACHIEVEMENTS.replace(':userId', userId));
      
      if (!response.ok) {
        throw new Error('Failed to fetch achievements');
      }
      
      const data = await response.json();
      const currentAchievements = data.achievements || [];
      
      // If we don't have a cache yet, initialize it and return with no new achievements
      if (!this.achievementCache) {
        this.achievementCache = currentAchievements.map(a => ({
          id: a.id,
          unlocked: a.unlocked,
          progress: a.progress
        }));
        return [];
      }
      
      // Find newly unlocked achievements
      const newlyUnlocked = currentAchievements.filter(current => {
        const cached = this.achievementCache.find(a => a.id === current.id);
        return current.unlocked && cached && !cached.unlocked;
      });
      
      // Update cache
      this.achievementCache = currentAchievements.map(a => ({
        id: a.id,
        unlocked: a.unlocked,
        progress: a.progress
      }));
      
      return newlyUnlocked;
    } catch (error) {
      console.error('Error checking for new achievements:', error);
      return [];
    }
  }
  
  // Check for streak-based achievements
  static async checkStreakAchievements(userId) {
    try {
      const response = await fetch(API_ENDPOINTS.GET_USER_STREAKS.replace(':userId', userId));
      
      if (!response.ok) {
        throw new Error('Failed to fetch user streaks');
      }
      
      const data = await response.json();
      const userData = data.userData || {};
      
      const newAchievements = [];
      
      // Check login streak achievements
      if (userData.login_streak >= 3 && userData.login_streak < 7) {
        newAchievements.push({
          id: 1, // ID from database
          title: 'Dedicated User',
          description: 'Logged in for 3 days in a row',
          icon: 'calendar-check',
          color: '#3498db',
          unlocked: true
        });
      }
      
      if (userData.login_streak >= 7 && userData.login_streak < 30) {
        newAchievements.push({
          id: 2, // ID from database
          title: 'Weekly Warrior',
          description: 'Logged in for 7 days in a row',
          icon: 'calendar-check',
          color: '#9b59b6',
          unlocked: true
        });
      }
      
      if (userData.login_streak >= 30) {
        newAchievements.push({
          id: 3, // ID from database
          title: 'Monthly Master',
          description: 'Logged in for 30 days in a row',
          icon: 'calendar-check', 
          color: '#e74c3c',
          unlocked: true
        });
      }
      
      // Check quiz streak achievements
      if (userData.quiz_streak >= 3 && userData.quiz_streak < 7) {
        newAchievements.push({
          id: 4, // ID from database
          title: 'Quiz Enthusiast',
          description: 'Completed quizzes for 3 days in a row',
          icon: 'trophy',
          color: '#2ecc71',
          unlocked: true
        });
      }
      
      if (userData.quiz_streak >= 7 && userData.quiz_streak < 14) {
        newAchievements.push({
          id: 5, // ID from database
          title: 'Quiz Champion',
          description: 'Completed quizzes for 7 days in a row',
          icon: 'trophy',
          color: '#f39c12',
          unlocked: true
        });
      }
      
      if (userData.quiz_streak >= 14) {
        newAchievements.push({
          id: 6, // ID from database
          title: 'Security Expert',
          description: 'Completed quizzes for 14 days in a row',
          icon: 'shield',
          color: '#e74c3c',
          unlocked: true
        });
      }
      
      return newAchievements;
    } catch (error) {
      console.error('Error checking streak achievements:', error);
      return [];
    }
  }
  
  // Check for quiz-related achievements
  static checkQuizAchievements(quizResults) {
    const newAchievements = [];
    
    // Check for "Quick Learner" achievement (3 correct answers in a row)
    if (quizResults && quizResults.consecutiveCorrect >= 3) {
      newAchievements.push({
        id: 7, // ID from database
        title: 'Quick Learner',
        description: '3 correct answers in a row',
        icon: 'star',
        color: '#F1C40F',
        unlocked: true
      });
    }
    
    return newAchievements;
  }
  
  // Check for leaderboard position achievements
  static async checkLeaderboardAchievements(userId) {
    try {
      const response = await fetch(API_ENDPOINTS.GET_USERS);
      
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard data');
      }
      
      const data = await response.json();
      const users = data.users || [];
      
      // Sort users by score (or whatever ranking criterion is used)
      const sortedUsers = [...users].sort((a, b) => {
        // Primary sort by score
        const scoreDiff = b.score - a.score;
        if (scoreDiff !== 0) return scoreDiff;
        
        // Secondary sort criteria
        return b.login_streak - a.login_streak;
      });
      
      // Find user's rank
      const userRank = sortedUsers.findIndex(user => user.id == userId);
      
      const newAchievements = [];
      
      // Check for "Security Champion" achievement (top of leaderboard)
      if (userRank === 0) {
        newAchievements.push({
          id: 10, // ID from database
          title: 'Security Champion',
          description: 'Reached the top of the leaderboard',
          icon: 'trophy',
          color: '#E74C3C',
          unlocked: true
        });
      }
      
      return newAchievements;
    } catch (error) {
      console.error('Error checking leaderboard achievements:', error);
      return [];
    }
  }
  
  // Queue a new achievement to be shown
  static queueAchievement(achievement) {
    if (this.shownAchievements.has(achievement.id)) {
        return;
    }
    
    // Check if this achievement is already in the queue
    const exists = this.newlyUnlockedAchievements.some(a => a.id === achievement.id);
    if (!exists) {
      this.newlyUnlockedAchievements.push(achievement);
      this.shownAchievements.add(achievement.id);
    }
  }
  
  // Get the next achievement to show
  static getNextAchievementToShow() {
    if (this.newlyUnlockedAchievements.length === 0) {
      return null;
    }
    
    return this.newlyUnlockedAchievements.shift();
  }
  
  // Clear all queued achievements
  static clearAchievementQueue() {
    this.newlyUnlockedAchievements = [];
  }
}

export default AchievementService;