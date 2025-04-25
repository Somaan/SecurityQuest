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
  
  // Check for streak-based achievements - FIXED with more reliable streak checking
  static async checkStreakAchievements(userId) {
    try {
      const response = await fetch(API_ENDPOINTS.GET_USER_STREAKS.replace(':userId', userId));
      
      if (!response.ok) {
        throw new Error('Failed to fetch user streaks');
      }
      
      const data = await response.json();
      const userData = data.userData || {};
      
      console.log("Checking streak achievements for user:", userId);
      console.log("Current login streak:", userData.login_streak);
      
      const newAchievements = [];
      
      // Check login streak achievements - Improved conditions
      // Dedicated User (3-day login streak)
      if (userData.login_streak >= 3) {
        newAchievements.push({
          id: 1, // ID from database
          title: 'Dedicated User',
          description: 'Logged in for 3 days in a row',
          icon: 'calendar-check',
          color: '#3498db',
          unlocked: true
        });
        console.log("Added Dedicated User achievement");
      }
      
      // Weekly Warrior (7-day login streak)
      if (userData.login_streak >= 7) {
        newAchievements.push({
          id: 2, // ID from database
          title: 'Weekly Warrior',
          description: 'Logged in for 7 days in a row',
          icon: 'calendar-check',
          color: '#9b59b6',
          unlocked: true
        });
        console.log("Added Weekly Warrior achievement");
      }
      
      // Monthly Master (30-day login streak)
      if (userData.login_streak >= 30) {
        newAchievements.push({
          id: 3, // ID from database
          title: 'Monthly Master',
          description: 'Logged in for 30 days in a row',
          icon: 'calendar-check', 
          color: '#e74c3c',
          unlocked: true
        });
        console.log("Added Monthly Master achievement");
      }
      
      // Check quiz streak achievements - More reliable conditions
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
      
      // For each achievement, submit to the server to ensure it's properly saved
      for (const achievement of newAchievements) {
        await this.saveAchievement(userId, achievement);
      }
      
      return newAchievements;
    } catch (error) {
      console.error('Error checking streak achievements:', error);
      return [];
    }
  }
  
  // New method to save achievements to the server
  static async saveAchievement(userId, achievement) {
    try {
      const response = await fetch(API_ENDPOINTS.GET_USER_ACHIEVEMENTS.replace(':userId', userId), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          achievementId: achievement.id,
          unlocked: true,
          progress: 100,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to save achievement: ${achievement.title}`);
      }
      
      console.log(`Successfully saved achievement: ${achievement.title}`);
      return true;
    } catch (error) {
      console.error('Error saving achievement:', error);
      return false;
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
  
  // Queue a new achievement to be shown - Fixed to avoid duplicates
  static queueAchievement(achievement) {
    if (!achievement || !achievement.id) {
      console.error('Invalid achievement object:', achievement);
      return;
    }
    
    if (this.shownAchievements.has(achievement.id)) {
      console.log(`Achievement ${achievement.id} (${achievement.title}) already shown`);
      return;
    }
    
    // Check if this achievement is already in the queue
    const exists = this.newlyUnlockedAchievements.some(a => a.id === achievement.id);
    if (!exists) {
      console.log(`Queueing achievement ${achievement.id} (${achievement.title}) for display`);
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
  
  // Reset shown achievements - useful when testing
  static resetShownAchievements() {
    this.shownAchievements.clear();
  }
}

export default AchievementService;