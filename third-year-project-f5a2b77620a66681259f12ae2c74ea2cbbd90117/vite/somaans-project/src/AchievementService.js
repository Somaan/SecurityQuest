import { API_ENDPOINTS } from './constants';

class AchievementService {
  // Keep track of achievement cache
  static achievementCache = null;
  static newlyUnlockedAchievements = [];
  
  // Initialize shownAchievements from localStorage
  static shownAchievements = (() => {
    try {
      const userId = sessionStorage.getItem("userId") || "1";
      const storedIds = localStorage.getItem(`shown_achievements_${userId}`);
      return storedIds ? new Set(JSON.parse(storedIds)) : new Set();
    } catch (e) {
      console.error("Error loading shown achievements:", e);
      return new Set();
    }
  })();
  
  static batchUnlockTimestamp = null;
  
  // Track the most recent unlocked achievement by user
  static setMostRecentAchievement(userId, achievement) {
    if (!achievement || !achievement.id || !achievement.title) return;
    
    try {
      const achievementData = {
        id: achievement.id,
        title: achievement.title,
        description: achievement.description,
        icon: achievement.icon || 'trophy',
        color: achievement.color || '#646cff',
        timestamp: Date.now()
      };
      
      localStorage.setItem(`most_recent_achievement_${userId}`, JSON.stringify(achievementData));
    } catch (error) {
      console.error('Error saving most recent achievement:', error);
    }
  }

  // Get the most recent achievement for display
  static getMostRecentAchievement(userId) {
    try {
      const achievementJSON = localStorage.getItem(`most_recent_achievement_${userId}`);
      if (!achievementJSON) return null;
      
      return JSON.parse(achievementJSON);
    } catch (error) {
      console.error('Error getting most recent achievement:', error);
      return null;
    }
  }
  
  // Helper method to save shown achievements to localStorage
  static saveShownAchievements(userId) {
    try {
      localStorage.setItem(`shown_achievements_${userId}`, 
        JSON.stringify([...this.shownAchievements]));
    } catch (e) {
      console.error("Error saving shown achievements:", e);
    }
  }
  
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
  
  // New method to sync streak data between API and localStorage
  static async syncStreakData(userId) {
    try {
        console.log(`Syncing streak data for user ${userId}`);
        const response = await fetch(API_ENDPOINTS.GET_USER_STREAKS.replace(':userId', userId));
        
        if (response.ok) {
            const data = await response.json();
            if (data.userData) {
                // Save to localStorage as backup
                localStorage.setItem(`login_streak_${userId}`, data.userData.login_streak || 0);
                localStorage.setItem(`longest_login_streak_${userId}`, data.userData.longest_login_streak || 0);
                localStorage.setItem(`quiz_streak_${userId}`, data.userData.quiz_streak || 0);
                localStorage.setItem(`longest_quiz_streak_${userId}`, data.userData.longest_quiz_streak || 0);
                
                console.log('Streak data synchronized between API and localStorage');
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error('Error syncing streak data:', error);
        return false;
    }
  }
  
  // Check for streak-based achievements - FIXED with more reliable streak checking
  static async checkStreakAchievements(userId) {
    try {
      // Try to fetch streak data from API first
      let userData = {};
      let apiSuccess = false;
      
      try {
        console.log(`Fetching streak data from API for user ${userId}...`);
        const response = await fetch(API_ENDPOINTS.GET_USER_STREAKS.replace(':userId', userId));
        
        if (response.ok) {
          const data = await response.json();
          userData = data.userData || {};
          apiSuccess = true;
          console.log('Successfully fetched streak data from API');
          console.log('Login streak:', userData.login_streak);
          console.log('Longest login streak:', userData.longest_login_streak);
          console.log('Quiz streak:', userData.quiz_streak);
          console.log('Longest quiz streak:', userData.longest_quiz_streak);
          
          // If API provides a calculated streak, use it for verification
          if (userData.calculatedStreak !== undefined) {
            console.log(`API calculated streak: ${userData.calculatedStreak}`);
            console.log(`Database streak: ${userData.login_streak}`);
            if (userData.calculatedStreak !== userData.login_streak) {
              console.warn(`Streak mismatch detected! API calculated ${userData.calculatedStreak} but database has ${userData.login_streak}`);
            }
          }
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
          longest_login_streak: parseInt(localStorage.getItem(`longest_login_streak_${userId}`) || loginStreak),
          quiz_streak: parseInt(quizStreak),
          longest_quiz_streak: parseInt(localStorage.getItem(`longest_quiz_streak_${userId}`) || quizStreak)
        };
        
        console.log('Using fallback streak data from localStorage:');
        console.log('Login streak:', userData.login_streak);
        console.log('Longest login streak:', userData.longest_login_streak);
      }
      
      console.log("Computing achievement progress with the following streak data:");
      console.log(JSON.stringify(userData, null, 2));
      
      // Calculate progress percentages using maximum of current and longest streak for consistency
      const loginStreak = userData.login_streak || 0;
      const longestLoginStreak = userData.longest_login_streak || 0;
      const effectiveLoginStreak = Math.max(loginStreak, longestLoginStreak);
      
      console.log(`Using effective login streak for achievements: ${effectiveLoginStreak}`);
      
      const dedicatedUserProgress = Math.min(100, (effectiveLoginStreak / 3) * 100);
      const weeklyWarriorProgress = Math.min(100, (effectiveLoginStreak / 7) * 100);
      const monthlyMasterProgress = Math.min(100, (effectiveLoginStreak / 30) * 100);
      
      console.log("Dedicated User progress:", dedicatedUserProgress.toFixed(1) + "%");
      console.log("Weekly Warrior progress:", weeklyWarriorProgress.toFixed(1) + "%");
      console.log("Monthly Master progress:", monthlyMasterProgress.toFixed(1) + "%");
      
      const updatedAchievements = [];
      
      // Dedicated User (3-day login streak)
      const dedicatedUserUnlocked = effectiveLoginStreak >= 3;
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
      const weeklyWarriorUnlocked = effectiveLoginStreak >= 7;
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
      const monthlyMasterUnlocked = effectiveLoginStreak >= 30;
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
      if (userData.quiz_streak > 0 || userData.longest_quiz_streak > 0) {
        const effectiveQuizStreak = Math.max(userData.quiz_streak || 0, userData.longest_quiz_streak || 0);
        const quizEnthusiastProgress = Math.min(100, (effectiveQuizStreak / 3) * 100);
        const quizChampionProgress = Math.min(100, (effectiveQuizStreak / 7) * 100);
        const securityExpertProgress = Math.min(100, (effectiveQuizStreak / 14) * 100);
        
        const quizEnthusiastUnlocked = effectiveQuizStreak >= 3;
        updatedAchievements.push({
          id: 4, // ID from database
          title: 'Quiz Enthusiast',
          description: 'Completed quizzes for 3 days in a row',
          icon: 'trophy',
          color: '#2ecc71',
          unlocked: quizEnthusiastUnlocked,
          progress: quizEnthusiastProgress
        });
        
        const quizChampionUnlocked = effectiveQuizStreak >= 7;
        updatedAchievements.push({
          id: 5, // ID from database
          title: 'Quiz Champion',
          description: 'Completed quizzes for 7 days in a row',
          icon: 'trophy',
          color: '#f39c12',
          unlocked: quizChampionUnlocked,
          progress: quizChampionProgress
        });
        
        const securityExpertUnlocked = effectiveQuizStreak >= 14;
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
      
      // Set batch unlock timestamp to mark these achievements as part of the same batch
      this.batchUnlockTimestamp = Date.now();
      
      // Only return newly unlocked achievements for notification
      const newlyUnlocked = updatedAchievements.filter(achievement => 
        achievement.unlocked && 
        achievement.progress >= 100 && 
        !this.shownAchievements.has(achievement.id)
      );
      
      // If multiple achievements were unlocked, consolidate them into a single notification
      if (newlyUnlocked.length > 1) {
        // Return the first one, but mark it as a group with special properties
        if (newlyUnlocked.length > 0) {
          const consolidated = {...newlyUnlocked[0]};
          consolidated.isGrouped = true;
          consolidated.groupCount = newlyUnlocked.length;
          consolidated.originalTitle = consolidated.title;
          consolidated.originalDescription = consolidated.description;
          consolidated.title = "Multiple Achievements Unlocked!";
          consolidated.description = `You've unlocked ${newlyUnlocked.length} achievements at once`;
          
          // Mark all achievements in this batch as shown
          for (const achievement of newlyUnlocked) {
            this.shownAchievements.add(achievement.id);
            // Save most recent achievement
            this.setMostRecentAchievement(userId, achievement);
          }
          this.saveShownAchievements(userId);
          
          // Queue just the consolidated notification
          this.queueAchievement(consolidated);
          return [consolidated];
        }
      } else {
        // Return individual achievements if there's just one
        // If there's only one achievement, set it as most recent
        if (newlyUnlocked.length === 1) {
          this.setMostRecentAchievement(userId, newlyUnlocked[0]);
        }
        return newlyUnlocked;
      }
      
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
        
        // Track this as the most recent achievement
        this.setMostRecentAchievement(userId, achievement);
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
    if (!achievement || !achievement.id || !achievement.title) {
      console.error('Invalid achievement object:', achievement);
      return;
    }
    
    const userId = sessionStorage.getItem("userId") || "1";
    const storageKey = `shown_achievement_${userId}_${achievement.title}`;
    
    // If this is not a grouped achievement, check if already shown
    if (!achievement.isGrouped && localStorage.getItem(storageKey)) {
      console.log(`Achievement "${achievement.title}" already shown`);
      return;
    }
    
    // Check if this achievement is already in the queue
    const exists = this.newlyUnlockedAchievements.some(a => 
      (a.title === achievement.title) || 
      (a.isGrouped && a.batchId === this.batchUnlockTimestamp)
    );
    
    if (!exists) {
      console.log(`Queueing achievement "${achievement.title}" for display`);
      
      // Add batch ID for consolidated achievements
      if (achievement.isGrouped) {
        achievement.batchId = this.batchUnlockTimestamp;
      } else {
        // Save to localStorage by title
        localStorage.setItem(storageKey, 'true');
        this.shownAchievements.add(achievement.id);
        this.saveShownAchievements(userId);
      }
      
      this.newlyUnlockedAchievements.push(achievement);
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
    const userId = sessionStorage.getItem("userId") || "1";
    localStorage.removeItem(`shown_achievements_${userId}`);
    
    // Also clear cached most recent achievement
    localStorage.removeItem(`most_recent_achievement_${userId}`);
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
      
      // Before returning, deduplicate by title if needed
      const uniqueTitles = new Set();
      const dedupedAchievements = [];
      
      for (const achievement of mergedAchievements) {
        if (!uniqueTitles.has(achievement.title)) {
          uniqueTitles.add(achievement.title);
          dedupedAchievements.push(achievement);
        }
      }
      
      return dedupedAchievements;
    } catch (error) {
      console.error('Error getting all achievements:', error);
      return [];
    }
  }
}

export default AchievementService;