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
      
      // If we don't have a cache yet, initialise it and return with no new achievements
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
      // Try to fetch streak data from API first
      let userData = {};
      
      try {
        const response = await fetch(API_ENDPOINTS.GET_USER_STREAKS.replace(':userId', userId));
        
        if (response.ok) {
          const data = await response.json();
          userData = data.userData || {};
        } else {
          throw new Error('Failed to fetch user streaks from API');
        }
      } catch (error) {
        console.warn('Using local streak storage as fallback:', error);
        // Fallback to localStorage if API fails
        const loginStreak = localStorage.getItem(`login_streak_${userId}`) || 0;
        const quizStreak = localStorage.getItem(`quiz_streak_${userId}`) || 0;
        
        userData = {
          login_streak: parseInt(loginStreak),
          quiz_streak: parseInt(quizStreak)
        };
      }
      
      console.log("Checking streak achievements for user:", userId);
      console.log("Current login streak:", userData.login_streak);
      
      // Calculate progress percentages
      const dedicatedUserProgress = Math.min(100, (userData.login_streak / 3) * 100);
      const weeklyWarriorProgress = Math.min(100, (userData.login_streak / 7) * 100);
      const monthlyMasterProgress = Math.min(100, (userData.login_streak / 30) * 100);
      
      console.log("Weekly warrior progress:", weeklyWarriorProgress.toFixed(1) + "%");
      console.log("Monthly Master progress:", monthlyMasterProgress.toFixed(1) + "%");
      
      const updatedAchievements = [];
      
      // Dedicated User (3-day login streak)
      const dedicatedUserUnlocked = userData.login_streak >= 3;
      updatedAchievements.push({
        id: 1, // ID from database
        title: 'Dedicated User',
        description: 'Logged in for 3 days in a row',
        icon: 'calendar-check',
        color: '#3498db',
        unlocked: dedicatedUserUnlocked,
        progress: dedicatedUserProgress
      });
      
      // Weekly Warrior (7-day login streak)
      const weeklyWarriorUnlocked = userData.login_streak >= 7;
      updatedAchievements.push({
        id: 2, // ID from database
        title: 'Weekly Warrior',
        description: 'Logged in for 7 days in a row',
        icon: 'calendar-check',
        color: '#9b59b6',
        unlocked: weeklyWarriorUnlocked,
        progress: weeklyWarriorProgress
      });
      
      // Monthly Master (30-day login streak)
      const monthlyMasterUnlocked = userData.login_streak >= 30;
      updatedAchievements.push({
        id: 3, // ID from database
        title: 'Monthly Master',
        description: 'Logged in for 30 days in a row',
        icon: 'calendar-check', 
        color: '#e74c3c',
        unlocked: monthlyMasterUnlocked,
        progress: monthlyMasterProgress
      });
      
      // Check quiz streak achievements - More reliable conditions
      if (userData.quiz_streak > 0) {
        const quizEnthusiastProgress = Math.min(100, (userData.quiz_streak / 3) * 100);
        const quizChampionProgress = Math.min(100, (userData.quiz_streak / 7) * 100);
        const securityExpertProgress = Math.min(100, (userData.quiz_streak / 14) * 100);
        
        const quizEnthusiastUnlocked = userData.quiz_streak >= 3;
        updatedAchievements.push({
          id: 4, // ID from database
          title: 'Quiz Enthusiast',
          description: 'Completed quizzes for 3 days in a row',
          icon: 'trophy',
          color: '#2ecc71',
          unlocked: quizEnthusiastUnlocked,
          progress: quizEnthusiastProgress
        });
        
        const quizChampionUnlocked = userData.quiz_streak >= 7;
        updatedAchievements.push({
          id: 5, // ID from database
          title: 'Quiz Champion',
          description: 'Completed quizzes for 7 days in a row',
          icon: 'trophy',
          color: '#f39c12',
          unlocked: quizChampionUnlocked,
          progress: quizChampionProgress
        });
        
        const securityExpertUnlocked = userData.quiz_streak >= 14;
        updatedAchievements.push({
          id: 6, // ID from database
          title: 'Security Expert',
          description: 'Completed quizzes for 14 days in a row',
          icon: 'shield',
          color: '#e74c3c',
          unlocked: securityExpertUnlocked,
          progress: securityExpertProgress
        });
      }
      
      // Save all achievements with progress
      for (const achievement of updatedAchievements) {
        await this.saveAchievement(userId, achievement);
      }
      
      // Only return newly unlocked achievements for notification
      const newlyUnlocked = updatedAchievements.filter(achievement => 
        achievement.unlocked && 
        achievement.progress >= 100 && 
        !this.shownAchievements.has(achievement.id)
      );
      
      return newlyUnlocked;
    } catch (error) {
      console.error('Error checking streak achievements:', error);
      return [];
    }
  }
  
  // Method to save achievements - now with localStorage fallback
  static async saveAchievement(userId, achievement) {
    try {
      if (!achievement || !achievement.id) {
        console.error('Invalid achievement object:', achievement);
        return false;
      }
      
      console.log(`Saving achievement ${achievement.id} (${achievement.title}) with progress: ${achievement.progress}%`);
      
      // Try API first, fall back to localStorage
      try {
        const response = await fetch(API_ENDPOINTS.GET_USER_ACHIEVEMENTS.replace(':userId', userId), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            achievementId: achievement.id,
            unlocked: achievement.unlocked,
            progress: Math.round(achievement.progress), // Round to nearest integer
            title: achievement.title,
            description: achievement.description,
            icon: achievement.icon,
            color: achievement.color
          }),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to save achievement: ${achievement.title}`);
        }
        
        console.log(`Successfully saved achievement to API: ${achievement.title}`);
      } catch (error) {
        console.warn(`API save failed, using localStorage for achievement: ${achievement.title}`, error);
        
        // Fall back to localStorage
        const storageKey = `achievement_${userId}_${achievement.id}`;
        const existingData = localStorage.getItem(storageKey);
        let storedAchievement = existingData ? JSON.parse(existingData) : null;
        
        // Only update if progress is higher or it wasn't unlocked before
        if (!storedAchievement || 
            achievement.progress > storedAchievement.progress ||
            (achievement.unlocked && !storedAchievement.unlocked)) {
          
          localStorage.setItem(storageKey, JSON.stringify({
            id: achievement.id,
            title: achievement.title,
            description: achievement.description,
            icon: achievement.icon,
            color: achievement.color,
            unlocked: achievement.unlocked,
            progress: achievement.progress,
            lastUpdated: new Date().toISOString()
          }));
          
          console.log(`Saved achievement ${achievement.id} to localStorage`);
        }
      }
      
      // Queue for notification only if newly unlocked
      if (achievement.unlocked && achievement.progress >= 100 && !this.shownAchievements.has(achievement.id)) {
        this.queueAchievement(achievement);
      }
      
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
  
  // Debug achievements helper
  static debugAchievements(achievements) {
    console.group('Achievement Debug Information');
    console.log('Total achievements:', achievements.length);
    
    if (Array.isArray(achievements)) {
      achievements.forEach(achievement => {
        console.group(`Achievement: ${achievement.title || 'Unknown'}`);
        console.log('ID:', achievement.id);
        console.log('Unlocked:', achievement.unlocked);
        console.log('Progress:', achievement.progress);
        console.log('Full data:', achievement);
        console.groupEnd();
      });
    } else {
      console.warn('Achievements is not an array:', achievements);
    }
    
    console.groupEnd();
  }
  
  // Get all achievements for a user (including those stored locally)
  static async getAllAchievements(userId) {
    try {
      // Try to get achievements from API
      let apiAchievements = [];
      try {
        const response = await fetch(API_ENDPOINTS.GET_USER_ACHIEVEMENTS.replace(':userId', userId));
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && Array.isArray(data.achievements)) {
            apiAchievements = data.achievements;
          }
        }
      } catch (error) {
        console.warn('Failed to fetch achievements from API, using local only');
      }
      
      // Get locally stored achievements
      const localAchievements = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(`achievement_${userId}_`)) {
          try {
            const achievementData = JSON.parse(localStorage.getItem(key));
            localAchievements.push(achievementData);
          } catch (e) {
            console.warn('Error parsing local achievement:', e);
          }
        }
      }
      
      // Merge API and local achievements, preferring local if both exist for the same ID
      const mergedAchievements = [...apiAchievements];
      
      localAchievements.forEach(localAchievement => {
        const existingIndex = mergedAchievements.findIndex(a => a.id === localAchievement.id);
        if (existingIndex >= 0) {
          // Use the one with higher progress
          if (localAchievement.progress > mergedAchievements[existingIndex].progress) {
            mergedAchievements[existingIndex] = localAchievement;
          }
        } else {
          mergedAchievements.push(localAchievement);
        }
      });
      
      return mergedAchievements;
    } catch (error) {
      console.error('Error getting all achievements:', error);
      return [];
    }
  }
}

export default AchievementService;