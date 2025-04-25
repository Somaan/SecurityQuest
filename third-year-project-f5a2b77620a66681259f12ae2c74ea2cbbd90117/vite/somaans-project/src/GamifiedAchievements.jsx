import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faShield,
  faCalendarCheck,
  faTrophy,
  faMedal,
  faAward,
  faCheck,
  faLock,
  faGraduationCap,
  faCertificate,
  faUser,
  faQuestionCircle,
  faFilter,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

// Helper function to get FontAwesome icon by name
const getIconByName = (iconName) => {
  if (!iconName || typeof iconName !== "string") return faStar;

  const iconMap = {
    star: faStar,
    shield: faShield,
    "calendar-check": faCalendarCheck,
    trophy: faTrophy,
    medal: faMedal,
    award: faAward,
    check: faCheck,
    "graduation-cap": faGraduationCap,
    certificate: faCertificate,
    user: faUser,
  };

  return iconMap[iconName.toLowerCase()] || faQuestionCircle;
};

// Single achievement card component
const AchievementCard = ({ achievement }) => {
  // Safely extract values with proper type checking and fallbacks
  const {
    id = "",
    title = "Unknown Achievement",
    description = "",
    icon = "trophy",
    color = "#646cff",
    rarity = "common",
    unlocked = false,
    progress = 0,
    total = 100, // Default to 100 for percentage calculation
    unlockDate = null,
    date = null, // Fallback date field
  } = achievement || {};

  // Format unlock date
  const formattedDate =
    unlockDate || date
      ? new Date(unlockDate || date).toLocaleDateString()
      : null;

  // Determine lock status for display
  const isLocked = !unlocked;
  const isInProgress = !unlocked && progress > 0;

  // Calculate progress percentage (safely)
  const progressPercentage =
    total > 0 ? Math.min(100, Math.round((progress / total) * 100)) : progress;

  return (
    <div
      className={`achievement-card ${rarity} ${
        isLocked ? (isInProgress ? "in-progress" : "locked") : "unlocked"
      }`}
    >
      <div
        className="achievement-icon"
        style={{ backgroundColor: isLocked && !isInProgress ? "#555" : color }}
      >
        {isLocked && !isInProgress ? (
          <FontAwesomeIcon icon={faLock} />
        ) : (
          <FontAwesomeIcon icon={getIconByName(icon)} />
        )}
      </div>
      <div className="achievement-info">
        <h3>{title}</h3>
        <p>{description}</p>

        {/* Always show progress bar */}
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPercentage}%` }}
          />
          <span className="progress-text">
            {progress} / {total} ({progressPercentage}%)
          </span>
        </div>

        {unlocked && (
          <div className="unlock-status">
            <FontAwesomeIcon icon={faCheck} className="check-icon" />
            <span>Unlocked!</span>
            {formattedDate && (
              <span className="unlock-date">on {formattedDate}</span>
            )}
          </div>
        )}
      </div>

      {/* Rarity badge */}
      {rarity && rarity !== "common" && (
        <div className={`rarity-badge ${rarity}`}>{rarity.toUpperCase()}</div>
      )}
    </div>
  );
};

// Main GamifiedAchievements component
const GamifiedAchievements = ({ achievements = [] }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [displayedAchievements, setDisplayedAchievements] = useState([]);

  // Define category filters
  const CATEGORIES = [
    { id: "all", label: "All", icon: faFilter },
    { id: "login", label: "Login", icon: faCalendarCheck },
    { id: "quiz", label: "Quiz", icon: faQuestionCircle },
    { id: "streaks", label: "Streaks", icon: faAward },
    { id: "scores", label: "Scores", icon: faChartLine },
  ];

  // Ensure achievements array is valid and safe to use
  const safeAchievements = Array.isArray(achievements)
    ? achievements.filter((a) => a && typeof a === "object")
    : [];

  // Handle and clean potentially corrupted achievement data
  const sanitizedAchievements = safeAchievements.map((achievement) => {
    // Set default values for any missing fields to prevent errors
    return {
      id:
        achievement.id ||
        `achievement-${Math.random().toString(36).substr(2, 9)}`,
      title: achievement.title || "Achievement",
      description:
        achievement.description ||
        "Complete this challenge to earn this achievement",
      icon: achievement.icon || "trophy",
      color: achievement.color || "#646cff",
      rarity: achievement.rarity || "common",
      unlocked: !!achievement.unlocked,
      progress:
        typeof achievement.progress === "number" ? achievement.progress : 0,
      total: typeof achievement.total === "number" ? achievement.total : 100,
      category: achievement.category || "other",
      unlockDate: achievement.unlockDate || achievement.date || null,
    };
  });

  // Calculate progress statistics
  const totalAchievements = sanitizedAchievements.length;
  const unlockedAchievements = sanitizedAchievements.filter(
    (a) => a.unlocked
  ).length;
  const progressPercentage =
    totalAchievements > 0
      ? Math.round((unlockedAchievements / totalAchievements) * 100)
      : 0;

  // Update displayed achievements when category or achievements change
  useEffect(() => {
    // Filter by active category
    const filtered = sanitizedAchievements.filter((achievement) => {
      if (activeTab === "all") return true;
      return achievement.category === activeTab;
    });

    setDisplayedAchievements(filtered);
  }, [activeTab, sanitizedAchievements]);

  // Add content for empty categories
  const getEmptyStateContent = (category) => {
    switch (category) {
      case "login":
        return "Login each day to unlock login-based achievements!";
      case "quiz":
        return "Complete quizzes to unlock quiz-based achievements!";
      case "streaks":
        return "Maintain daily activity to unlock streak-based achievements!";
      case "scores":
        return "Achieve high scores in quizzes to unlock score-based achievements!";
      default:
        return "Complete challenges to unlock achievements!";
    }
  };

  return (
    <div className="gamified-achievements">
      {/* Progress overview */}
      <div className="achievements-progress">
        <div className="progress-stats">
          <h3>Achievement Progress</h3>
          <p>
            {unlockedAchievements} of {totalAchievements} unlocked
          </p>
        </div>
        <div className="progress-circle">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path
              className="circle-bg"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="circle"
              strokeDasharray={`${progressPercentage}, 100`}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="percentage">
              {progressPercentage}%
            </text>
          </svg>
        </div>
      </div>

      {/* Category filters */}
      <div className="achievement-filters">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            className={activeTab === category.id ? "active" : ""}
            onClick={() => setActiveTab(category.id)}
          >
            <FontAwesomeIcon icon={category.icon} className="filter-icon" />
            {category.label}
          </button>
        ))}
      </div>

      {/* Achievement grid */}
      <div className="achievements-grid">
        {displayedAchievements.length > 0 ? (
          displayedAchievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id || `achievement-${index}`}
              achievement={achievement}
            />
          ))
        ) : (
          <div className="no-achievements">
            <FontAwesomeIcon icon={faQuestionCircle} className="empty-icon" />
            <p>{getEmptyStateContent(activeTab)}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .gamified-achievements {
          width: 100%;
          max-width: 100%;
        }

        .achievements-progress {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #1e1e2f;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }

        .progress-stats {
          flex: 1;
        }

        .progress-circle {
          width: 100px;
          height: 100px;
        }

        .circular-chart {
          width: 100%;
          height: 100%;
        }

        .circle-bg {
          fill: none;
          stroke: #2e2e3f;
          stroke-width: 3;
        }

        .circle {
          fill: none;
          stroke: #646cff;
          stroke-width: 3;
          stroke-linecap: round;
          animation: progress-animation 1s ease-out forwards;
        }

        .percentage {
          fill: #fff;
          font-size: 0.5em;
          text-anchor: middle;
          font-weight: bold;
        }

        .progress-stats h3 {
          margin: 0;
          color: #fff;
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .progress-stats p {
          margin: 0;
          color: #9f9fb8;
          font-size: 1rem;
        }

        .achievement-filters {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
          justify-content: center;
        }

        .achievement-filters button {
          background-color: #2e2e3f;
          color: #9f9fb8;
          border: none;
          border-radius: 20px;
          padding: 0.5rem 1.2rem;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-icon {
          font-size: 0.9rem;
        }

        .achievement-filters button.active {
          background-color: #646cff;
          color: #fff;
        }

        .achievement-filters button:hover:not(.active) {
          background-color: #3e3e4f;
          color: #fff;
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .achievement-card {
          background-color: #1e1e2f;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .achievement-card.locked {
          opacity: 0.8;
          filter: grayscale(40%);
        }

        .achievement-card.in-progress {
          opacity: 0.9;
        }

        .achievement-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }

        .achievement-card.common {
          border-left: 4px solid #9f9fb8;
        }

        .achievement-card.uncommon {
          border-left: 4px solid #2ecc71;
        }

        .achievement-card.rare {
          border-left: 4px solid #f1c40f;
        }

        .achievement-card.epic {
          border-left: 4px solid #9b59b6;
        }

        .achievement-card.legendary {
          border-left: 4px solid #e74c3c;
          background: linear-gradient(135deg, #1e1e2f 0%, #2c1c1f 100%);
        }

        .achievement-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 1.5rem;
          margin-right: 1rem;
          flex-shrink: 0;
        }

        .achievement-info {
          flex: 1;
          min-width: 0;
        }

        .achievement-info h3 {
          margin: 0;
          color: #fff;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          word-break: break-word;
        }

        .achievement-info p {
          margin: 0;
          color: #9f9fb8;
          font-size: 0.9rem;
          margin-bottom: 0.75rem;
          word-break: break-word;
        }

        .progress-container {
          height: 8px;
          background-color: #2e2e3f;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
          position: relative;
        }

        .progress-bar {
          height: 100%;
          background-color: #646cff;
          border-radius: 4px;
          transition: width 0.8s ease-in-out;
        }

        .progress-text {
          color: #9f9fb8;
          font-size: 0.8rem;
          margin-top: 0.25rem;
          display: block;
        }

        .unlock-status {
          display: flex;
          align-items: center;
          color: #2ecc71;
          font-size: 0.9rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }

        .check-icon {
          margin-right: 0.5rem;
        }

        .unlock-date {
          margin-left: 0.5rem;
          color: #9f9fb8;
          font-size: 0.8rem;
        }

        .rarity-badge {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: bold;
          text-transform: uppercase;
        }

        .rarity-badge.uncommon {
          background-color: #2ecc71;
          color: #fff;
        }

        .rarity-badge.rare {
          background-color: #f1c40f;
          color: #000;
        }

        .rarity-badge.epic {
          background-color: #9b59b6;
          color: #fff;
        }

        .rarity-badge.legendary {
          background-color: #e74c3c;
          color: #fff;
        }

        .no-achievements {
          grid-column: 1 / -1;
          text-align: center;
          padding: 3rem;
          color: #9f9fb8;
          background-color: #272736;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .no-achievements p {
          font-size: 1.1rem;
          max-width: 80%;
          margin: 0 auto;
        }

        @keyframes progress-animation {
          0% {
            stroke-dasharray: 0 100;
          }
        }

        @media (max-width: 768px) {
          .achievements-progress {
            flex-direction: column-reverse;
            text-align: center;
          }

          .progress-circle {
            margin-bottom: 1rem;
          }

          .achievements-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }

        @media (max-width: 480px) {
          .achievement-filters button {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
            min-width: 70px;
          }

          .filter-icon {
            margin-right: 4px;
          }

          .achievements-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default GamifiedAchievements;
