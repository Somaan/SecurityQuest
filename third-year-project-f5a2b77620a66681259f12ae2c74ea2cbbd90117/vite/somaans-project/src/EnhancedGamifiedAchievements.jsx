import React, { useState } from "react";
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
  faSearch,
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

// Category filters
const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "login", label: "Login" },
  { id: "quiz", label: "Quiz" },
  { id: "streaks", label: "Streaks" },
  { id: "scores", label: "Scores" },
];

// Status filters
const STATUS_FILTERS = [
  { id: "all", label: "All" },
  { id: "unlocked", label: "Unlocked" },
  { id: "locked", label: "Locked" },
  { id: "progress", label: "In Progress" },
];

// Single achievement card component with improved locked/unlocked visualization
const AchievementCard = ({ achievement }) => {
  // Safely extract values with proper type checking
  const {
    id,
    title = "Unknown Achievement",
    description = "",
    icon = "trophy",
    color = "#646cff",
    rarity = "common",
    unlocked = false,
    progress = 0,
    unlockDate = null,
  } = achievement || {};

  // Format unlock date
  const formattedDate = unlockDate
    ? new Date(unlockDate).toLocaleDateString()
    : null;

  // Determine lock status for display - show icon for in-progress achievements
  const isLocked = !unlocked;
  const isInProgress = isLocked && progress > 0;

  return (
    <div
      className={`achievement-card ${rarity} ${
        isLocked ? (isInProgress ? "in-progress" : "locked") : "unlocked"
      }`}
    >
      <div className="achievement-content">
        <div
          className={`achievement-icon ${isLocked ? "locked-icon" : ""}`}
          style={{ backgroundColor: isLocked ? "#555" : color }}
        >
          {isLocked ? (
            <FontAwesomeIcon icon={faLock} />
          ) : (
            <FontAwesomeIcon icon={getIconByName(icon)} />
          )}
        </div>

        <div className="achievement-info">
          <h3>{title}</h3>
          <p>{description}</p>

          {/* Show progress bar for locked achievements with progress */}
          {isLocked && (
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{
                  width: `${progress}%`,
                  backgroundColor: isInProgress ? color : "#555",
                }}
              />
              <span className="progress-text">{Math.round(progress)}%</span>
            </div>
          )}

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
        <div className={`rarity-badge ${rarity}`}>{rarity}</div>
      </div>
    </div>
  );
};

// Main EnhancedGamifiedAchievements component with filtering options
const EnhancedGamifiedAchievements = ({ achievements }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Safely handle achievements array
  const safeAchievements = Array.isArray(achievements) ? achievements : [];

  // Calculate progress statistics
  const totalAchievements = safeAchievements.length;
  const unlockedAchievements = safeAchievements.filter(
    (a) => a && a.unlocked
  ).length;
  const inProgressAchievements = safeAchievements.filter(
    (a) => a && !a.unlocked && a.progress > 0
  ).length;
  const progressPercentage =
    totalAchievements > 0
      ? Math.round((unlockedAchievements / totalAchievements) * 100)
      : 0;

  // Filter achievements by category, status and search term
  const filteredAchievements = safeAchievements.filter((achievement) => {
    // Category filter
    const categoryMatch =
      activeCategory === "all" ||
      (achievement && achievement.category === activeCategory);

    // Status filter
    let statusMatch = true;
    if (activeStatus === "unlocked") {
      statusMatch = achievement && achievement.unlocked;
    } else if (activeStatus === "locked") {
      statusMatch = achievement && !achievement.unlocked;
    } else if (activeStatus === "progress") {
      statusMatch =
        achievement && !achievement.unlocked && achievement.progress > 0;
    }

    // Search term filter
    const searchMatch =
      !searchTerm ||
      (achievement &&
        (achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          achievement.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())));

    return categoryMatch && statusMatch && searchMatch;
  });

  return (
    <div className="enhanced-gamified-achievements">
      {/* Progress overview with counters */}
      <div className="achievements-progress">
        <div className="progress-stats">
          <h3>Achievement Progress</h3>
          <div className="stats-counters">
            <div className="stat-counter unlocked-counter">
              <div className="counter-value">{unlockedAchievements}</div>
              <div className="counter-label">Unlocked</div>
            </div>
            <div className="stat-counter in-progress-counter">
              <div className="counter-value">{inProgressAchievements}</div>
              <div className="counter-label">In Progress</div>
            </div>
            <div className="stat-counter locked-counter">
              <div className="counter-value">
                {totalAchievements -
                  unlockedAchievements -
                  inProgressAchievements}
              </div>
              <div className="counter-label">Locked</div>
            </div>
          </div>
        </div>

        <div className="progress-circle-container">
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
          <div className="progress-label">
            {unlockedAchievements} of {totalAchievements} achievements
          </div>
        </div>
      </div>

      {/* Search and filter options */}
      <div className="achievement-filters-container">
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="search"
            placeholder="Search achievements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <div className="filter-label">
              <FontAwesomeIcon icon={faFilter} /> Category:
            </div>
            <div className="filter-buttons">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  className={activeCategory === category.id ? "active" : ""}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <div className="filter-label">
              <FontAwesomeIcon icon={faLock} /> Status:
            </div>
            <div className="filter-buttons">
              {STATUS_FILTERS.map((status) => (
                <button
                  key={status.id}
                  className={activeStatus === status.id ? "active" : ""}
                  onClick={() => setActiveStatus(status.id)}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Achievement grid */}
      <div className="achievements-grid">
        {filteredAchievements.length > 0 ? (
          filteredAchievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id || `achievement-${index}`}
              achievement={achievement}
            />
          ))
        ) : (
          <div className="no-achievements">
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className="no-achievements-icon"
            />
            <p>No achievements found matching your filters.</p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setActiveStatus("all");
                setSearchTerm("");
              }}
              className="reset-filters-btn"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <style jsx="true">{`
        .enhanced-gamified-achievements {
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

        .stats-counters {
          display: flex;
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .stat-counter {
          text-align: center;
          background-color: #2a2a3d;
          padding: 0.75rem 1.25rem;
          border-radius: 8px;
          min-width: 80px;
        }

        .counter-value {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.25rem;
        }

        .counter-label {
          font-size: 0.8rem;
          color: #9f9fb8;
        }

        .unlocked-counter .counter-value {
          color: #2ecc71;
        }

        .in-progress-counter .counter-value {
          color: #f39c12;
        }

        .locked-counter .counter-value {
          color: #95a5a6;
        }

        .progress-stats {
          flex: 1;
        }

        .progress-circle-container {
          width: 120px;
          text-align: center;
        }

        .circular-chart {
          width: 100%;
          height: 100%;
        }

        .progress-label {
          font-size: 0.85rem;
          color: #9f9fb8;
          margin-top: 0.5rem;
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
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
        }

        .progress-stats p {
          margin: 0;
          color: #9f9fb8;
          font-size: 1rem;
        }

        .achievement-filters-container {
          margin-bottom: 2rem;
          background-color: #1e1e2f;
          border-radius: 12px;
          padding: 1rem;
        }

        .search-container {
          position: relative;
          margin-bottom: 1rem;
        }

        .search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #6c6c8b;
        }

        .search-input {
          width: 100%;
          padding: 10px 10px 10px 35px;
          border-radius: 8px;
          border: 1px solid #2a2a3d;
          background-color: #2a2a3d;
          color: #fff;
          font-size: 0.9rem;
        }

        .search-input:focus {
          outline: none;
          border-color: #646cff;
          box-shadow: 0 0 0 2px rgba(100, 108, 255, 0.2);
        }

        .filters-section {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .filter-group {
          flex: 1;
          min-width: 200px;
        }

        .filter-label {
          margin-bottom: 0.5rem;
          color: #9f9fb8;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filter-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .filter-buttons button {
          background-color: #2a2a3d;
          color: #9f9fb8;
          border: none;
          border-radius: 20px;
          padding: 0.35rem 0.9rem;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-buttons button.active {
          background-color: #646cff;
          color: #fff;
        }

        .filter-buttons button:hover:not(.active) {
          background-color: #3a3a4d;
          color: #fff;
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .achievement-card {
          background-color: #1e1e2f;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .achievement-content {
          padding: 1.5rem;
          display: flex;
          position: relative;
        }

        .achievement-card.locked {
          opacity: 0.7;
          filter: grayscale(50%);
        }

        .achievement-card.in-progress {
          opacity: 0.9;
          filter: grayscale(25%);
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
          font-size: 1.4rem;
          margin-right: 1rem;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }

        .locked-icon {
          background-color: #555 !important;
          position: relative;
        }

        .locked-icon::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background: repeating-linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0.1) 10px,
            rgba(0, 0, 0, 0.2) 10px,
            rgba(0, 0, 0, 0.2) 20px
          );
          z-index: -1;
        }

        .achievement-info {
          flex: 1;
        }

        .achievement-info h3 {
          margin: 0;
          color: #fff;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .achievement-info p {
          margin: 0;
          color: #9f9fb8;
          font-size: 0.85rem;
          margin-bottom: 0.75rem;
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

        .rarity-badge.common {
          background-color: #9f9fb8;
          color: #1e1e2f;
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
          padding: 3rem 1rem;
          background-color: #1e1e2f;
          border-radius: 12px;
          color: #9f9fb8;
        }

        .no-achievements-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.5;
          color: #646cff;
        }

        .reset-filters-btn {
          margin-top: 1rem;
          background-color: #646cff;
          color: white;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .reset-filters-btn:hover {
          background-color: #535bf2;
        }

        @keyframes progress-animation {
          0% {
            stroke-dasharray: 0 100;
          }
        }

        /* Responsive styles */
        @media (max-width: 992px) {
          .achievements-progress {
            flex-direction: column;
            text-align: center;
          }

          .stats-counters {
            justify-content: center;
          }

          .progress-circle-container {
            margin-top: 1.5rem;
          }

          .filters-section {
            flex-direction: column;
            gap: 1rem;
          }

          .filter-group {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .achievements-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          }
        }

        @media (max-width: 480px) {
          .achievements-progress {
            padding: 1rem;
          }

          .progress-stats h3 {
            font-size: 1.1rem;
          }

          .stats-counters {
            flex-wrap: wrap;
            gap: 0.75rem;
          }

          .stat-counter {
            flex: 1;
            min-width: 70px;
            padding: 0.5rem;
          }

          .counter-value {
            font-size: 1.25rem;
          }

          .filter-buttons {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
          }

          .filter-buttons button {
            text-align: center;
            padding: 0.5rem;
          }

          .achievements-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
export default EnhancedGamifiedAchievements;
