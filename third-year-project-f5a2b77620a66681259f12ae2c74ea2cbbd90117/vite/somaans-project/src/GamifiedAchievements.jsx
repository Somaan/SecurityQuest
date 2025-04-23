import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faShield,
  faCalendarCheck,
  faTrophy,
  faMedal,
  faAward,
  faGraduationCap,
  faCertificate,
  faCheck,
  faLock,
  faSearch,
  faSort,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

const GamifiedAchievements = ({ achievements = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("progress");

  // Define achievement categories
  const categories = [
    { id: "all", name: "All" },
    { id: "login", name: "Login" },
    { id: "quiz", name: "Quiz" },
    { id: "streak", name: "Streaks" },
    { id: "score", name: "Scores" },
  ];

  // Helper function to safely get icon based on achievement title or icon property
  const getIconForAchievement = (achievement) => {
    // If the achievement has an icon property, use it
    if (achievement.icon) {
      if (typeof achievement.icon === "string") {
        // Handle string icon names
        switch (achievement.icon.toLowerCase()) {
          case "star":
            return faStar;
          case "shield":
            return faShield;
          case "calendar-check":
            return faCalendarCheck;
          case "trophy":
            return faTrophy;
          case "medal":
            return faMedal;
          case "award":
            return faAward;
          case "certificate":
            return faCertificate;
          case "graduation-cap":
            return faGraduationCap;
          case "check":
            return faCheck;
          default:
            return faStar;
        }
      } else {
        // If it's not a string (e.g. an object), use default
        return faStar;
      }
    }

    // Otherwise, try to determine icon from title
    const title = achievement.title || "";
    if (title.includes("Star") || title.includes("Learner")) {
      return faStar;
    } else if (title.includes("Champion") || title.includes("Security")) {
      return faShield;
    } else if (title.includes("Streak") || title.includes("Login")) {
      return faCalendarCheck;
    } else if (title.includes("Master")) {
      return faTrophy;
    } else {
      return faMedal;
    }
  };

  // Filter achievements based on category and search term
  const filteredAchievements = achievements.filter(
    (achievement) =>
      (selectedCategory === "all" ||
        achievement.category === selectedCategory) &&
      ((achievement.title &&
        achievement.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (achievement.description &&
          achievement.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())))
  );

  // Sort achievements based on selected option
  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    switch (sortOption) {
      case "progress":
        if (a.unlocked && !b.unlocked) return -1;
        if (!a.unlocked && b.unlocked) return 1;
        if (!a.unlocked && !b.unlocked) return b.progress - a.progress;
        // Safely handle unlock date comparison
        const dateA = a.unlockDate ? new Date(a.unlockDate) : new Date(0);
        const dateB = b.unlockDate ? new Date(b.unlockDate) : new Date(0);
        return dateB - dateA;
      case "alphabetical":
        return (a.title || "").localeCompare(b.title || "");
      case "rarity":
        const rarityOrder = {
          common: 1,
          uncommon: 2,
          rare: 3,
          epic: 4,
          legendary: 5,
        };
        return (
          rarityOrder[b.rarity || "common"] - rarityOrder[a.rarity || "common"]
        );
      case "recent":
        if (!a.unlocked && !b.unlocked) return b.progress - a.progress;
        if (!a.unlocked) return 1;
        if (!b.unlocked) return -1;
        // Safely handle unlock date comparison
        const unlockDateA = a.unlockDate ? new Date(a.unlockDate) : new Date(0);
        const unlockDateB = b.unlockDate ? new Date(b.unlockDate) : new Date(0);
        return unlockDateB - unlockDateA;
      default:
        return 0;
    }
  });

  // Calculate user achievement stats
  const totalAchievements = achievements.length;
  const unlockedAchievements = achievements.filter((a) => a.unlocked).length;
  const completionPercentage =
    totalAchievements > 0
      ? Math.round((unlockedAchievements / totalAchievements) * 100)
      : 0;

  // Map rarity to styles - safely handle undefined
  const getRarityClass = (rarity) => {
    if (!rarity) return "achievement-common";

    switch (rarity.toString().toLowerCase()) {
      case "common":
        return "achievement-common";
      case "uncommon":
        return "achievement-uncommon";
      case "rare":
        return "achievement-rare";
      case "epic":
        return "achievement-epic";
      case "legendary":
        return "achievement-legendary";
      default:
        return "achievement-common";
    }
  };

  // Safely format date string
  const formatDate = (dateString) => {
    if (!dateString) return "";

    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  return (
    <div className="gamified-achievements">
      <div className="achievements-summary">
        <div className="progress-circle">
          <div className="progress-circle-inner">
            <span className="progress-percentage">{completionPercentage}%</span>
          </div>
        </div>
        <div className="achievements-stats">
          <h3>Achievement Progress</h3>
          <p>
            {unlockedAchievements} of {totalAchievements} unlocked
          </p>
        </div>

        <div className="achievements-controls">
          <div className="sort-control">
            <FontAwesomeIcon icon={faSort} className="control-icon" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="sort-select"
            >
              <option value="progress">Sort by Progress</option>
              <option value="alphabetical">Sort Alphabetically</option>
              <option value="rarity">Sort by Rarity</option>
              <option value="recent">Sort by Recent</option>
            </select>
          </div>

          <div className="search-control">
            <FontAwesomeIcon icon={faSearch} className="control-icon" />
            <input
              type="text"
              placeholder="Search achievements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="achievement-categories">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${
              selectedCategory === category.id ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Achievement grid */}
      <div className="achievements-grid">
        {sortedAchievements.length > 0 ? (
          sortedAchievements.map((achievement, index) => {
            // Safe check for achievement properties
            const title = achievement.title || "Achievement";
            const description = achievement.description || "";
            const unlocked = Boolean(achievement.unlocked);
            const color = achievement.color || "#646cff";
            const progress = achievement.progress || 0;
            const tier = achievement.tier || 1;
            const rarity = achievement.rarity || "common";
            const unlockDate = achievement.unlockDate || "";

            return (
              <div
                key={achievement.id || index}
                className={`achievement-card ${
                  !unlocked ? "locked" : ""
                } ${getRarityClass(rarity)}`}
                style={{
                  borderLeftColor: unlocked ? color : undefined,
                }}
              >
                <div className="achievement-content">
                  <div
                    className={`achievement-icon ${!unlocked && "locked"}`}
                    style={{ backgroundColor: unlocked ? color : "#333" }}
                  >
                    {unlocked ? (
                      <FontAwesomeIcon
                        icon={getIconForAchievement(achievement)}
                      />
                    ) : (
                      <FontAwesomeIcon icon={faLock} />
                    )}
                  </div>

                  <div className="achievement-details">
                    <h3>{title}</h3>
                    <p>{description}</p>

                    {unlocked ? (
                      <div className="achievement-unlocked">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="check-icon"
                        />
                        <span>Unlocked!</span>
                        {unlockDate && (
                          <span className="unlock-date">
                            on {formatDate(unlockDate)}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="achievement-progress">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">
                          {Math.round(progress)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Rarity badge */}
                {unlocked && rarity && (
                  <div
                    className="rarity-badge"
                    style={{ backgroundColor: `${color}30`, color: color }}
                  >
                    {typeof rarity === "string"
                      ? rarity.charAt(0).toUpperCase() + rarity.slice(1)
                      : "Common"}
                  </div>
                )}

                {/* Tier indicator */}
                {tier > 1 && (
                  <div className="tier-indicator">
                    {Array(tier)
                      .fill(0)
                      .map((_, i) => <span key={i}>I</span>)
                      .join("")}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="no-achievements">
            <FontAwesomeIcon icon={faTrophy} className="no-achievements-icon" />
            <p>No achievements found matching your criteria.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .gamified-achievements {
          width: 100%;
          padding: 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .achievements-summary {
          display: flex;
          align-items: center;
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .progress-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: conic-gradient(
            #646cff ${completionPercentage * 3.6}deg,
            #333 0deg
          );
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1.5rem;
          flex-shrink: 0;
        }

        .progress-circle-inner {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .progress-percentage {
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: bold;
        }

        .achievements-stats {
          flex: 1;
        }

        .achievements-stats h3 {
          color: #ffffff;
          font-size: 1.2rem;
          margin: 0 0 0.5rem 0;
        }

        .achievements-stats p {
          color: #b3b3b3;
          font-size: 1rem;
          margin: 0;
        }

        .achievements-controls {
          display: flex;
          gap: 1rem;
          margin-left: auto;
        }

        .sort-control,
        .search-control {
          position: relative;
          display: flex;
          align-items: center;
          background-color: #242424;
          border-radius: 8px;
          padding: 0.5rem 1rem;
        }

        .control-icon {
          color: #646cff;
          margin-right: 0.5rem;
        }

        .sort-select,
        .search-input {
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 0.9rem;
          outline: none;
        }

        .sort-select {
          padding-right: 1.5rem;
          appearance: none;
          cursor: pointer;
        }

        .achievement-categories {
          display: flex;
          border-bottom: 1px solid #333;
          margin-bottom: 1.5rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          gap: 0.5rem;
        }

        .category-btn {
          padding: 0.5rem 1rem;
          background-color: #242424;
          border: none;
          border-radius: 8px;
          color: #b3b3b3;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .category-btn:hover {
          background-color: #2c2c2c;
        }

        .category-btn.active {
          background-color: #646cff;
          color: #ffffff;
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .achievement-card {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 1.5rem;
          border-left: 4px solid;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .achievement-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }

        .achievement-card.locked {
          opacity: 0.7;
          border-left-color: #555;
        }

        .achievement-content {
          display: flex;
          gap: 1rem;
        }

        .achievement-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .achievement-icon.locked {
          background-color: #555 !important;
          opacity: 0.5;
        }

        .achievement-details {
          flex: 1;
        }

        .achievement-details h3 {
          color: #ffffff;
          font-size: 1.1rem;
          margin: 0 0 0.5rem 0;
        }

        .achievement-details p {
          color: #b3b3b3;
          font-size: 0.9rem;
          margin: 0 0 0.75rem 0;
        }

        .achievement-unlocked {
          color: #4caf50;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .check-icon {
          font-size: 0.8rem;
        }

        .unlock-date {
          color: #777;
          margin-left: 0.5rem;
          font-size: 0.8rem;
        }

        .achievement-progress {
          margin-top: 0.5rem;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background-color: #333;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.25rem;
        }

        .progress-fill {
          height: 100%;
          background-color: #646cff;
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 0.8rem;
          color: #b3b3b3;
        }

        .rarity-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-size: 0.7rem;
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
        }

        .tier-indicator {
          position: absolute;
          bottom: 0.5rem;
          right: 0.5rem;
          font-size: 0.8rem;
          color: #777;
          font-weight: bold;
        }

        /* Achievement rarity styles */
        .achievement-common {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .achievement-uncommon {
          box-shadow: 0 4px 8px rgba(46, 204, 113, 0.2);
        }

        .achievement-rare {
          box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
        }

        .achievement-epic {
          box-shadow: 0 4px 16px rgba(155, 89, 182, 0.4);
        }

        .achievement-legendary {
          box-shadow: 0 4px 20px rgba(241, 196, 15, 0.5);
          animation: legendary-pulse 2s infinite;
        }

        @keyframes legendary-pulse {
          0% {
            box-shadow: 0 4px 20px rgba(241, 196, 15, 0.5);
          }
          50% {
            box-shadow: 0 4px 25px rgba(241, 196, 15, 0.8);
          }
          100% {
            box-shadow: 0 4px 20px rgba(241, 196, 15, 0.5);
          }
        }

        .no-achievements {
          grid-column: 1 / -1;
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .no-achievements-icon {
          font-size: 3rem;
          color: #333;
          margin-bottom: 1rem;
        }

        .no-achievements p {
          color: #777;
          font-size: 1.1rem;
        }

        /* Responsive adjustments */
        @media (max-width: 992px) {
          .achievements-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .achievements-summary {
            flex-direction: column;
            align-items: flex-start;
          }

          .progress-circle {
            margin-right: 0;
            margin-bottom: 1rem;
          }

          .achievements-controls {
            margin-left: 0;
            margin-top: 1rem;
            width: 100%;
            flex-direction: column;
            gap: 0.5rem;
          }

          .sort-control,
          .search-control {
            width: 100%;
          }

          .search-input {
            width: 100%;
          }

          .achievement-categories {
            padding-bottom: 0.5rem;
            justify-content: space-between;
          }

          .category-btn {
            flex: 1;
            font-size: 0.85rem;
            padding: 0.5rem 0.5rem;
          }

          .achievements-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 1rem;
          }

          .achievement-card {
            padding: 1rem;
          }

          .achievement-icon {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }

          .achievement-details h3 {
            font-size: 1rem;
          }

          .achievement-details p {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 576px) {
          .gamified-achievements {
            padding: 0.5rem;
          }

          .achievements-summary {
            padding: 1rem;
            margin-bottom: 1rem;
          }

          .progress-circle {
            width: 60px;
            height: 60px;
          }

          .progress-circle-inner {
            width: 45px;
            height: 45px;
          }

          .progress-percentage {
            font-size: 0.9rem;
          }

          .achievements-stats h3 {
            font-size: 1rem;
          }

          .achievements-stats p {
            font-size: 0.85rem;
          }

          .achievement-categories {
            overflow-x: auto;
            justify-content: flex-start;
            gap: 0.25rem;
            padding-bottom: 0.75rem;
            margin-bottom: 1rem;
          }

          .category-btn {
            font-size: 0.75rem;
            padding: 0.4rem 0.5rem;
            flex: 0 0 auto;
          }

          .achievements-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }

          .achievement-card {
            padding: 0.75rem;
          }

          .achievement-content {
            gap: 0.75rem;
          }

          .achievement-icon {
            width: 36px;
            height: 36px;
            font-size: 0.9rem;
          }

          .rarity-badge {
            top: 0.5rem;
            right: 0.5rem;
            font-size: 0.65rem;
            padding: 0.2rem 0.4rem;
          }

          .tier-indicator {
            bottom: 0.25rem;
            right: 0.25rem;
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
};

export default GamifiedAchievements;
