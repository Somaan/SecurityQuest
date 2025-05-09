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
  
  // Check for quiz-related achievements - NEW IMPROVED VERSION
  static async checkQuizAchievements(userId) {
    try {
      console.log(`Checking quiz achievements for user ${userId}...`);
      
      // Fetch user quiz data
      const response = await fetch(API_ENDPOINTS.GET_USER_STREAKS.replace(':userId', userId));
      if (!response.ok) {
        throw new Error('Failed to fetch user quiz data');
      }
      
      const data = await response.json();
      const userData = data.userData || {};
      
      // Extract quiz data from the response
      const totalQuizzes = userData.total_quizzes || 0;
      const beginnerQuizCount = userData.difficulty_counts?.[1] || 0;
      const intermediateQuizCount = userData.difficulty_counts?.[2] || 0;
      const advancedQuizCount = userData.difficulty_counts?.[3] || 0;
      
      console.log(`Quiz stats: Total: ${totalQuizzes}, Beginner: ${beginnerQuizCount}, Intermediate: ${intermediateQuizCount}, Advanced: ${advancedQuizCount}`);
      
      // Check quiz history for perfect score
      let hasPerfectScore = false;
      if (data.quizHistory && Array.isArray(data.quizHistory)) {
        hasPerfectScore = data.quizHistory.some(quiz => quiz.score === 100);
        if (hasPerfectScore) {
          console.log("User has achieved a perfect score on a quiz");
        }
      }
      
      // Prepare array for all quiz achievements
      const quizAchievements = [];
      
      // Quiz Master (10 quizzes)
      const quizMasterProgress = Math.min(100, (totalQuizzes / 10) * 100);
      console.log(`Quiz Master progress: ${quizMasterProgress.toFixed(1)}%`);
      quizAchievements.push({
        id: 8,
        title: 'Quiz Master',
        description: 'Complete 10 quizzes',
        icon: 'graduation-cap',
        color: '#3498db',
        unlocked: totalQuizzes >= 10,
        progress: quizMasterProgress
      });
      
      // Beginner's Badge (5 beginner quizzes)
      const beginnerBadgeProgress = Math.min(100, (beginnerQuizCount / 5) * 100);
      console.log(`Beginner's Badge progress: ${beginnerBadgeProgress.toFixed(1)}%`);
      quizAchievements.push({
        id: 9,
        title: 'Beginner\'s Badge',
        description: 'Complete 5 Beginner quizzes',
        icon: 'shield-alt',
        color: '#2ecc71',
        unlocked: beginnerQuizCount >= 5,
        progress: beginnerBadgeProgress
      });
      
      // Intermediate Guardian (5 intermediate quizzes)
      const intermediateGuardianProgress = Math.min(100, (intermediateQuizCount / 5) * 100);
      console.log(`Intermediate Guardian progress: ${intermediateGuardianProgress.toFixed(1)}%`);
      quizAchievements.push({
        id: 11,
        title: 'Intermediate Guardian',
        description: 'Complete 5 Intermediate quizzes',
        icon: 'shield',
        color: '#9b59b6',
        unlocked: intermediateQuizCount >= 5,
        progress: intermediateGuardianProgress
      });
      
      // Advanced Defender (5 advanced quizzes)
      const advancedDefenderProgress = Math.min(100, (advancedQuizCount / 5) * 100);
      console.log(`Advanced Defender progress: ${advancedDefenderProgress.toFixed(1)}%`);
      quizAchievements.push({
        id: 12,
        title: 'Advanced Defender',
        description: 'Complete 5 Advanced quizzes',
        icon: 'shield-virus',
        color: '#e74c3c',
        unlocked: advancedQuizCount >= 5,
        progress: advancedDefenderProgress
      });
      
      // Perfect Score
      quizAchievements.push({
        id: 13,
        title: 'Perfect Score',
        description: 'Get 100% on any quiz',
        icon: 'award',
        color: '#f1c40f',
        unlocked: hasPerfectScore,
        progress: hasPerfectScore ? 100 : 0
      });
      
      // Save all achievements with progress
      console.log(`Saving ${quizAchievements.length} quiz achievements`);
      for (const achievement of quizAchievements) {
        await this.saveAchievement(userId, achievement);
      }
      
      // Return newly unlocked achievements for notification
      const newlyUnlocked = quizAchievements.filter(achievement => 
        achievement.unlocked && 
        achievement.progress >= 100 && 
        !this.shownAchievements.has(achievement.id)
      );
      
      console.log(`Found ${newlyUnlocked.length} newly unlocked quiz achievements`);
      return newlyUnlocked;
      
    } catch (error) {
      console.error('Error checking quiz achievements:', error);
      return [];
    }
  }
  
  // Check for achievements after quiz completion - NEW METHOD
static async checkAchievementsAfterQuiz(userId, quizResult) {
  try {
    if (typeof userId === 'object') {
      console.error('userId is an object instead of string/number:', userId);
      if (userId.id) {
        userId = userId.id;
      } else {
        userId = sessionStorage.getItem("userId") || "1";
      }
    }
    
    userId = String(userId);
    console.log("Checking achievements after quiz completion:", quizResult);
    
    // Check for Quick Learner achievement (3 correct answers in a row)
    const newAchievements = [];
    if (quizResult && quizResult.consecutiveCorrect >= 3) {
      const quickLearner = {
        id: 7,
        title: 'Quick Learner',
        description: '3 correct answers in a row',
        icon: 'star',
        color: '#F1C40F',
        unlocked: true,
        progress: 100
      };
      
      // Save the achievement
      try {
        await this.saveAchievement(userId, quickLearner);
        
        // Add to new achievements if not already shown
        if (!this.shownAchievements.has(quickLearner.id)) {
          newAchievements.push(quickLearner);
          this.shownAchievements.add(quickLearner.id);
          this.saveShownAchievements(userId);
        }
      } catch (error) {
        console.error("Error saving Quick Learner achievement:", error);
      }
    }
    
    // Check for Perfect Score achievement immediately
    if (quizResult && quizResult.percentCorrect === 100) {
      const perfectScore = {
        id: 13,
        title: 'Perfect Score',
        description: 'Get 100% on any quiz',
        icon: 'award',
        color: '#f1c40f',
        unlocked: true,
        progress: 100
      };
      
      // Save this achievement
      try {
        await this.saveAchievement(userId, perfectScore);
        
        // Add to new achievements if not already shown
        if (!this.shownAchievements.has(perfectScore.id)) {
          newAchievements.push(perfectScore);
          this.shownAchievements.add(perfectScore.id);
          this.saveShownAchievements(userId);
        }
      } catch (error) {
        console.error("Error saving Perfect Score achievement:", error);
      }
    }
    
    // Check difficulty-specific achievements safely
    if (quizResult && quizResult.quizId) {
      try {
        // Fetch current counts
        const streakResponse = await fetch(API_ENDPOINTS.GET_USER_STREAKS.replace(':userId', userId));
        if (streakResponse.ok) {
          const data = await streakResponse.json();
          const userData = data.userData || {};
          
          // *** UPDATED CODE: Always update progress regardless of completion ***
          const quizType = parseInt(quizResult.quizId);
          const totalQuizzes = userData.total_quizzes || 0;
          
          // Get counts for this difficulty
          const beginnerCount = userData.difficulty_counts?.[1] || 0;
          const intermediateCount = userData.difficulty_counts?.[2] || 0;
          const advancedCount = userData.difficulty_counts?.[3] || 0;
          
          console.log(`Quiz counts - Beginner: ${beginnerCount}, Intermediate: ${intermediateCount}, Advanced: ${advancedCount}, Total: ${totalQuizzes}`);
          
          // Always update Beginner's Badge progress
          if (quizType === 1) {
            const beginnerBadge = {
              id: 9,
              title: 'Beginner\'s Badge',
              description: 'Complete 5 Beginner quizzes',
              icon: 'shield-alt',
              color: '#2ecc71',
              unlocked: beginnerCount >= 5,
              progress: Math.min(100, (beginnerCount / 5) * 100)
            };
            
            await this.saveAchievement(userId, beginnerBadge);
            console.log(`Updated Beginner's Badge progress: ${beginnerBadge.progress}%`);
            
            // Add to new achievements if newly unlocked
            if (beginnerBadge.unlocked && !this.shownAchievements.has(beginnerBadge.id)) {
              newAchievements.push(beginnerBadge);
              this.shownAchievements.add(beginnerBadge.id);
              this.saveShownAchievements(userId);
            }
          }
          
          // Always update Intermediate Guardian progress
          if (quizType === 2) {
            const intermediateGuardian = {
              id: 11,
              title: 'Intermediate Guardian',
              description: 'Complete 5 Intermediate quizzes',
              icon: 'shield',
              color: '#9b59b6',
              unlocked: intermediateCount >= 5,
              progress: Math.min(100, (intermediateCount / 5) * 100)
            };
            
            await this.saveAchievement(userId, intermediateGuardian);
            console.log(`Updated Intermediate Guardian progress: ${intermediateGuardian.progress}%`);
            
            // Add to new achievements if newly unlocked
            if (intermediateGuardian.unlocked && !this.shownAchievements.has(intermediateGuardian.id)) {
              newAchievements.push(intermediateGuardian);
              this.shownAchievements.add(intermediateGuardian.id);
              this.saveShownAchievements(userId);
            }
          }
          
          // Always update Advanced Defender progress
          if (quizType === 3) {
            const advancedDefender = {
              id: 12,
              title: 'Advanced Defender',
              description: 'Complete 5 Advanced quizzes',
              icon: 'shield-virus',
              color: '#e74c3c',
              unlocked: advancedCount >= 5,
              progress: Math.min(100, (advancedCount / 5) * 100)
            };
            
            await this.saveAchievement(userId, advancedDefender);
            console.log(`Updated Advanced Defender progress: ${advancedDefender.progress}%`);
            
            // Add to new achievements if newly unlocked
            if (advancedDefender.unlocked && !this.shownAchievements.has(advancedDefender.id)) {
              newAchievements.push(advancedDefender);
              this.shownAchievements.add(advancedDefender.id);
              this.saveShownAchievements(userId);
            }
          }
          
          // Always update Quiz Master progress
          const quizMasterProgress = Math.min(100, (totalQuizzes / 10) * 100);
          const quizMaster = {
            id: 8,
            title: 'Quiz Master',
            description: 'Complete 10 quizzes',
            icon: 'graduation-cap',
            color: '#3498db',
            unlocked: totalQuizzes >= 10,
            progress: quizMasterProgress
          };
          
          await this.saveAchievement(userId, quizMaster);
          console.log(`Updated Quiz Master progress: ${quizMasterProgress}%`);
          
          // Add to new achievements if newly unlocked
          if (quizMaster.unlocked && !this.shownAchievements.has(quizMaster.id)) {
            newAchievements.push(quizMaster);
            this.shownAchievements.add(quizMaster.id);
            this.saveShownAchievements(userId);
          }
          
          // Update Rising Star progress (Complete 5 quizzes with score >= 70%)
          if (quizResult && quizResult.percentCorrect >= 70) {
            // We would need to track this separately, for now, just update if the current quiz qualifies
            const risingStar = {
              id: 10,
              title: 'Rising Star',
              description: 'Complete 5 quizzes with a score of 70% or higher',
              icon: 'star',
              color: '#f39c12',
              // This would need proper tracking of high-scoring quizzes
              unlocked: false,
              progress: Math.min(20, quizMasterProgress) // Simplified progress based on total quizzes for now
            };
            
            await this.saveAchievement(userId, risingStar);
          }
        }
      } catch (error) {
        console.error("Error checking difficulty achievements:", error);
      }
    }
    
    // Queue achievements for notification
    for (const achievement of newAchievements) {
      this.queueAchievement(achievement);
    }
    
    // Return all newly unlocked achievements
    return newAchievements;
  } catch (error) {
    console.error("Error checking achievements after quiz:", error);
    return [];
  }
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