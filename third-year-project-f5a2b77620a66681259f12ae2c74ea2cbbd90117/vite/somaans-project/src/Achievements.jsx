import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "./constants";
import { toast } from "react-toastify";
import EnhancedGamifiedAchievements from "./EnhancedGamifiedAchievements"; // Import the new component
import AchievementService from "./AchievementService";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = sessionStorage.getItem("username") || "User";
  const userId = sessionStorage.getItem("userId") || "1";

  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true);
      try {
        // Call the real API endpoint
        console.log("Fetching achievements for user:", userId);

        let achievementsData = [];

        // Try API fetch first
        try {
          const response = await fetch(
            API_ENDPOINTS.GET_USER_ACHIEVEMENTS.replace(":userId", userId)
          );

          if (response.ok) {
            const data = await response.json();
            console.log("Achievements data:", data);

            if (data.success && Array.isArray(data.achievements)) {
              achievementsData = data.achievements;
            } else {
              console.warn("Invalid achievement data format from API");
            }
          } else {
            throw new Error("Failed to load achievements from API");
          }
        } catch (apiError) {
          console.warn("API fetch failed, using fallback:", apiError.message);
          // Fallback to AchievementService getAllAchievements which includes localStorage
          achievementsData = await AchievementService.getAllAchievements(
            userId
          );
        }

        // If no achievements found, try local storage
        if (achievementsData.length === 0) {
          console.log("No achievements found, using fallback data");
          achievementsData = await AchievementService.getAllAchievements(
            userId
          );
        }

        // Map the achievements to the format expected by EnhancedGamifiedAchievements
        const formattedAchievements =
          mapAchievementsForDisplay(achievementsData);
        setAchievements(formattedAchievements);
      } catch (err) {
        console.error("Error fetching achievements:", err);
        setError(err.message);
        toast.error("Failed to load achievements");
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();

    // Check for any streak achievements when the component loads
    const checkForStreakAchievements = async () => {
      try {
        const newAchievements =
          await AchievementService.checkStreakAchievements(userId);
        if (newAchievements && newAchievements.length > 0) {
          console.log("Found new streak achievements:", newAchievements);
          toast.success(
            `You've earned ${newAchievements.length} new achievement(s)!`
          );
          // Refresh achievements list
          fetchAchievements();
        }
      } catch (error) {
        console.error("Error checking streak achievements:", error);
      }
    };

    checkForStreakAchievements();
  }, [userId]);

  // Function to map API achievements to the format expected by EnhancedGamifiedAchievements
  const mapAchievementsForDisplay = (apiAchievements) => {
    // Make sure we're dealing with an array
    if (!Array.isArray(apiAchievements)) {
      console.error(
        "Expected achievements to be an array, got:",
        typeof apiAchievements
      );
      return [];
    }

    return apiAchievements.map((achievement, index) => {
      if (!achievement) {
        console.error("Found null or undefined achievement at index", index);
        return {
          id: `fallback-${index}`,
          title: "Achievement",
          description: "Achievement description unavailable",
          category: "other",
          icon: "trophy",
          color: "#646cff",
          unlocked: false,
          progress: 0,
          rarity: "common",
          tier: 1,
        };
      }

      // Safely extract values with fallbacks
      const title =
        typeof achievement.title === "string"
          ? achievement.title
          : "Unknown Achievement";
      const description =
        typeof achievement.description === "string"
          ? achievement.description
          : "";
      const iconStr =
        typeof achievement.icon === "string" ? achievement.icon : "trophy";
      const colorStr =
        typeof achievement.color === "string" ? achievement.color : "#646cff";

      // Ensure unlocked is a boolean
      let unlocked = false;
      if (
        achievement.unlocked === true ||
        achievement.unlocked === "true" ||
        achievement.unlocked === 1
      ) {
        unlocked = true;
      }

      // Ensure progress is a number
      let progress = 0;
      if (typeof achievement.progress === "number") {
        progress = achievement.progress;
      } else if (typeof achievement.progress === "string") {
        progress = parseFloat(achievement.progress) || 0;
      }

      // Define rarity based on some logic
      let rarity = "common";
      let tier = 1;
      let category = "other";

      // Example logic for determining rarity and tier based on title
      if (title) {
        // Set category based on title keywords
        if (
          title.includes("Login") ||
          title.includes("User") ||
          title.includes("Weekly") ||
          title.includes("Monthly") ||
          title.includes("Dedicated")
        ) {
          category = "login";
        } else if (title.includes("Quiz")) {
          category = "quiz";
        } else if (title.includes("Streak")) {
          category = "streaks";
        } else if (title.includes("Score") || title.includes("Perfect")) {
          category = "scores";
        }

        // Set rarity and tier based on title keywords
        if (title === "Security Expert") {
          rarity = "legendary";
          tier = 4;
        } else if (title === "Security Champion") {
          rarity = "epic";
          tier = 3;
        } else if (title === "Monthly Master" || title === "Quiz Champion") {
          rarity = "rare";
          tier = 3;
        } else if (
          title === "Weekly Warrior" ||
          title === "Quiz Enthusiast" ||
          title === "Rising Star"
        ) {
          rarity = "uncommon";
          tier = 2;
        }
      }

      // Format unlockDate properly if it exists
      let unlockDate = null;
      if (achievement.unlockDate) {
        try {
          unlockDate = new Date(achievement.unlockDate).toISOString();
        } catch (e) {
          console.warn("Invalid unlockDate format", achievement.unlockDate);
        }
      }

      return {
        id: achievement.id || `achievement-${index}`,
        title,
        description,
        category,
        icon: iconStr,
        color: colorStr,
        unlocked,
        progress,
        rarity,
        tier,
        unlockDate: unlocked ? unlockDate || new Date().toISOString() : null,
      };
    });
  };

  if (loading) {
    return (
      <div className="content-wrapper">
        <div className="loading-container">
          <FontAwesomeIcon icon={faSpinner} spin className="loading-spinner" />
          <p>Loading achievements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-wrapper">
        <div className="error-container">
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="error-icon"
          />
          <h3>Error</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-btn"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="content-wrapper">
      <div className="achievements-container">
        <div className="achievements-header">
          <h2>Let's see what achievements you've received, {username}</h2>
          <h3>
            As you complete quizzes and login each day, you will be able to view
            your achievements here.
          </h3>
        </div>

        {/* Use the enhanced achievements component */}
        <EnhancedGamifiedAchievements achievements={achievements} />
      </div>

      <style jsx>{`
        .achievements-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 2rem;
        }

        .achievements-header {
          margin-bottom: 2rem;
        }

        .achievements-header h2 {
          color: #ffffff;
          font-size: 1.5rem;
        }

        .achievements-header h3 {
          color: #e0e0e0;
          font-size: 1rem;
          font-weight: normal;
          margin-top: 0.5rem;
        }

        /* Responsive adjustments to match other pages */
        @media (max-width: 768px) {
          .achievements-container {
            padding: 1rem;
          }

          .achievements-header {
            margin-bottom: 1.5rem;
          }

          .achievements-header h2 {
            font-size: 1.3rem;
          }
        }

        @media (max-width: 576px) {
          .achievements-container {
            padding: 0.75rem;
          }

          .achievements-header {
            margin-bottom: 1rem;
          }

          .achievements-header h2 {
            font-size: 1.2rem;
          }

          .achievements-header h3 {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Achievements;
