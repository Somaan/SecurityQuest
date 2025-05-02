import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFireFlameSimple,
  faSpinner,
  faExclamationTriangle,
  faCalendarCheck,
  faQuestionCircle,
  faTrophy,
  faChartLine,
  faCheckCircle,
  faLock,
  faGraduationCap,
  faArrowRight,
  faAward,
  faUnlock,
  faGamepad,
  faChevronRight,
  faShield,
  faStar,
  faMedal,
  faCertificate,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "./constants";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import AchievementService from "./AchievementService";
// No longer importing AchievementNotification since we're only using the top notification

const Dashboard = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username") || "User";
  const userId = sessionStorage.getItem("userId") || "1";
  const seenAchievements = useRef(new Set());

  const [userData, setUserData] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAchievementPopup, setShowAchievementPopup] = useState(false);
  const [latestAchievement, setLatestAchievement] = useState(null);
  // States for the top notification only
  // No states for bottom notification as we're removing it

  function normaliseScore(quiz) {
    if (quiz.earnedPoints !== undefined && quiz.totalPoints !== undefined) {
      return Math.min(100, (quiz.earnedPoints / quiz.totalPoints) * 100);
    } else {
      return Math.min(100, quiz.score);
    }
  }

  function getBeginner() {
    const beginnerQuizzes = quizHistory.filter((q) => q.quiz_id === 1);
    if (beginnerQuizzes.length === 0) return 0;

    const normalizedScores = beginnerQuizzes.map((quiz) =>
      normaliseScore(quiz)
    );
    return Math.max(...normalizedScores);
  }

  function getIntermediate() {
    const intermediateQuizzes = quizHistory.filter((q) => q.quiz_id === 2);
    if (intermediateQuizzes.length === 0) return 0;

    const normalisedScores = intermediateQuizzes.map((quiz) =>
      normaliseScore(quiz)
    );
    return Math.max(...normalisedScores);
  }

  function getAdvanced() {
    const advancedQuizzes = quizHistory.filter((q) => q.quiz_id === 3);
    if (advancedQuizzes.length === 0) return 0;

    const normalizedScores = advancedQuizzes.map((quiz) =>
      normaliseScore(quiz)
    );
    return Math.max(...normalizedScores);
  }

  function getDifficultyName(quizId) {
    switch (quizId) {
      case 1:
        return "Beginner";
      case 2:
        return "Intermediate";
      case 3:
        return "Advanced";
      default:
        return "Unknown";
    }
  }

  function getIconForAchievement(achievement) {
    // If the achievement has an icon property, use it
    if (achievement.icon) {
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
    }

    // Otherwise, try to determine icon from title
    if (
      achievement.title.includes("Star") ||
      achievement.title.includes("Learner")
    ) {
      return faStar;
    } else if (
      achievement.title.includes("Champion") ||
      achievement.title.includes("Security")
    ) {
      return faShield;
    } else if (
      achievement.title.includes("Streak") ||
      achievement.title.includes("Login")
    ) {
      return faCalendarCheck;
    } else if (achievement.title.includes("Master")) {
      return faTrophy;
    } else {
      return faMedal;
    }
  }

  // Check for new achievements - simplified to only handle top notification
  const checkForNewAchievements = async () => {
    try {
      console.log("Checking for new achievements...");

      // Check for streak-based achievements
      const streakAchievements =
        await AchievementService.checkStreakAchievements(userId);
      console.log("Found streak achievements:", streakAchievements);

      // Check for new achievements from API
      const newAchievements = await AchievementService.checkForNewAchievements(
        userId
      );
      console.log("New achievements from API:", newAchievements);

      // Don't set notifications here - let the main useEffect handle it
      return newAchievements;
    } catch (err) {
      console.error("Error checking achievements:", err);
      return [];
    }
  };

  // Fetch user data, achievements, and quiz history
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Fetch user streaks
        const streaksResponse = await fetch(
          API_ENDPOINTS.GET_USER_STREAKS.replace(":userId", userId)
        );
        if (!streaksResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        const streaksData = await streaksResponse.json();

        // Fetch user achievements
        const achievementsResponse = await fetch(
          API_ENDPOINTS.GET_USER_ACHIEVEMENTS.replace(":userId", userId)
        );
        if (!achievementsResponse.ok) {
          throw new Error("Failed to fetch achievements");
        }
        const achievementsData = await achievementsResponse.json();

        console.log("User streaks data:", streaksData);
        console.log("User achievements data:", achievementsData);

        setUserData(streaksData.userData || {});
        setQuizHistory(streaksData.quizHistory || []);
        setAchievements(achievementsData.achievements || []);

        // Check for streak achievements, but don't display them yet
        await AchievementService.checkStreakAchievements(userId);

        // Check for new achievements, but don't display them yet
        await AchievementService.checkForNewAchievements(userId);

        // After all checks, fetch the latest achievements again to ensure we have everything
        const finalAchievementsResponse = await fetch(
          API_ENDPOINTS.GET_USER_ACHIEVEMENTS.replace(":userId", userId)
        );
        const finalAchievementsData = await finalAchievementsResponse.json();
        const allAchievements = finalAchievementsData.achievements || [];

        // Find the most recent unlocked achievement
        const unlockedAchievements = allAchievements.filter(
          (a) => a && a.unlocked
        );

        if (unlockedAchievements.length > 0) {
          // Sort by unlock date (newest first)
          const sortedAchievements = unlockedAchievements.sort((a, b) => {
            if (a.unlockDate && b.unlockDate) {
              return new Date(b.unlockDate) - new Date(a.unlockDate);
            }
            return 0;
          });

          // Get the most recent achievement
          const mostRecentAchievement = sortedAchievements[0];

          // Only show if not already seen in this session
          if (
            mostRecentAchievement &&
            !seenAchievements.current.has(mostRecentAchievement.id)
          ) {
            seenAchievements.current.add(mostRecentAchievement.id);
            setLatestAchievement(mostRecentAchievement);
            setShowAchievementPopup(true);

            // Auto close the popup after 5 seconds
            setTimeout(() => {
              setShowAchievementPopup(false);
            }, 5000);
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Calculate overall progress based on completed quizzes and achievements
  const calculateProgress = () => {
    if (!userData) return 0;

    // Calculate based on module progress
    const beginnerProgress = calculateModuleProgress("beginner");
    const intermediateProgress = calculateModuleProgress("intermediate");
    const advancedProgress = calculateModuleProgress("advanced");

    // Weight the progress (beginner: 30%, intermediate: 30%, advanced: 40%)
    const weightedProgress =
      beginnerProgress * 0.3 +
      intermediateProgress * 0.3 +
      advancedProgress * 0.4;

    return Math.round(weightedProgress) || 0;
  };

  // Calculate module progress
  const calculateModuleProgress = (difficulty) => {
    if (!quizHistory || quizHistory.length === 0) return 0;

    const quizId =
      difficulty === "beginner" ? 1 : difficulty === "intermediate" ? 2 : 3;
    const matchingQuizzes = quizHistory.filter(
      (quiz) => quiz.quiz_id === quizId
    );

    if (matchingQuizzes.length === 0) return 0;

    // Find highest score from ALL completions
    const normalisedScore = matchingQuizzes.map((quiz) => normaliseScore(quiz));
    return Math.max(...normalisedScore);
  };

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return "Unknown date";
    try {
      const date = new Date(dateStr);
      return `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}`;
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Invalid date";
    }
  };

  // Format time ago
  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return "Never";

    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else {
      return formatDate(dateStr);
    }
  };

  // Handle quiz selection
  const handleStartQuiz = (difficulty) => {
    navigate("/quiz/difficulty");
  };

  if (loading) {
    return (
      <div className="content-wrapper">
        <div className="loading-container">
          <div className="loading-animation">
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className="loading-spinner"
            />
          </div>
          <p>Loading your dashboard...</p>
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
          <h3>Error loading dashboard</h3>
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

  // Get recent unlocked achievements
  const recentAchievements = achievements
    .filter((achievement) => achievement.unlocked)
    .slice(0, 2);

  // Get most recent quiz completions
  const recentQuizzes = quizHistory
    .sort(
      (a, b) =>
        new Date(b.completion_date || b.date) -
        new Date(a.completion_date || a.date)
    )
    .slice(0, 3); // Show up to 3 recent quizzes

  // Get total quiz completions
  const totalQuizCompletions =
    userData?.total_quizzes || quizHistory.length || 0;

  // Difficulty info
  const difficultyInfo = [
    {
      id: 1,
      name: "Beginner",
      progress: getBeginner(),
      icon: faGraduationCap,
      color: "#3498db",
      description: "Learn the basics of phishing and social engineering.",
    },
    {
      id: 2,
      name: "Intermediate",
      progress: getIntermediate(),
      icon: faAward,
      color: "#2ecc71",
      description: "Advance your knowledge with complex scenarios.",
    },
    {
      id: 3,
      name: "Advanced",
      progress: getAdvanced(),
      icon: faTrophy,
      color: "#e74c3c",
      description: "Master high-level security concepts and challenges.",
    },
  ];

  return (
    <div className="content-wrapper">
      <div className="dashboard-container">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div className="welcome-content">
            <h1>Welcome back, {username}!</h1>
            <p>Continue your security training journey</p>
            <div className="user-stats">
              <div className="stat-item">
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className="stat-icon"
                />
                <div className="stat-text">
                  <span className="stat-value">{totalQuizCompletions}</span>
                  <span className="stat-label">Quizzes</span>
                </div>
              </div>

              <div className="stat-item">
                <FontAwesomeIcon icon={faCalendarCheck} className="stat-icon" />
                <div className="stat-text">
                  <span className="stat-value">
                    {userData?.login_streak || 0}
                  </span>
                  <span className="stat-label">Day Streak</span>
                </div>
              </div>

              <div className="stat-item">
                <FontAwesomeIcon icon={faTrophy} className="stat-icon" />
                <div className="stat-text">
                  <span className="stat-value">
                    {achievements.filter((a) => a.unlocked).length}
                  </span>
                  <span className="stat-label">Achievements</span>
                </div>
              </div>
            </div>
          </div>

          <div className="progress-summary">
            <div className="progress-ring-container">
              <svg
                className="progress-ring"
                width="120"
                height="120"
                viewBox="0 0 120 120"
              >
                <circle
                  className="progress-ring-circle-bg"
                  stroke="#2c3e50"
                  strokeWidth="8"
                  fill="transparent"
                  r="54"
                  cx="60"
                  cy="60"
                />
                <circle
                  className="progress-ring-circle"
                  stroke="#646cff"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 54} ${2 * Math.PI * 54}`}
                  strokeDashoffset={
                    2 * Math.PI * 54 * (1 - calculateProgress() / 100)
                  }
                  strokeLinecap="round"
                  fill="transparent"
                  r="54"
                  cx="60"
                  cy="60"
                />
                <text
                  x="60"
                  y="55"
                  textAnchor="middle"
                  fill="white"
                  fontSize="22"
                  fontWeight="bold"
                >
                  {calculateProgress()}%
                </text>
                <text
                  x="60"
                  y="75"
                  textAnchor="middle"
                  fill="#b3b3b3"
                  fontSize="12"
                >
                  PROGRESS
                </text>
              </svg>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Quiz Modules Section */}
          <div className="dashboard-card modules-card">
            <div className="card-header">
              <h2>Security Training Modules</h2>
              <Link to="/quiz/difficulty" className="view-all-link">
                View All <FontAwesomeIcon icon={faChevronRight} />
              </Link>
            </div>

            <div className="modules-grid">
              {difficultyInfo.map((module) => (
                <div key={module.id} className="module-card">
                  <div
                    className="module-header"
                    style={{ backgroundColor: module.color + "20" }}
                  >
                    <div
                      className="module-icon"
                      style={{ backgroundColor: module.color }}
                    >
                      <FontAwesomeIcon icon={module.icon} />
                    </div>
                    <h3>{module.name}</h3>
                  </div>

                  <div className="module-content">
                    <p>{module.description}</p>
                    <div className="module-progress">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${module.progress}%`,
                            backgroundColor: module.color,
                          }}
                        ></div>
                      </div>
                      <div className="progress-label">
                        <span>{module.progress}% Complete</span>
                        {module.progress >= 70 ? (
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="complete-icon"
                            style={{ color: module.color }}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    <button
                      className="module-action-btn"
                      style={{ backgroundColor: module.color }}
                      onClick={() => handleStartQuiz(module.name.toLowerCase())}
                    >
                      {module.progress > 0 ? "Continue" : "Start"}{" "}
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Showcase */}
          <div className="dashboard-card achievements-card">
            <div className="card-header">
              <h2>Your Achievements</h2>
              <Link to="/achievements" className="view-all-link">
                View All <FontAwesomeIcon icon={faChevronRight} />
              </Link>
            </div>

            <div className="achievements-grid">
              {recentAchievements.length > 0 ? (
                recentAchievements.map((achievement, index) => (
                  <div key={index} className="achievement-item">
                    <div
                      className="achievement-icon"
                      style={{
                        backgroundColor: achievement.color || "#646cff",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={getIconForAchievement(achievement)}
                      />
                    </div>
                    <div className="achievement-details">
                      <h3>{achievement.title}</h3>
                      <p>{achievement.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <FontAwesomeIcon icon={faLock} className="empty-icon" />
                  <p>Complete quizzes to unlock achievements</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-card activity-card">
            <div className="card-header">
              <h2>Recent Activity</h2>
            </div>

            <div className="activity-timeline">
              {recentQuizzes.length > 0 ? (
                recentQuizzes.map((quiz, index) => (
                  <div key={`quiz-${index}`} className="activity-item">
                    <div className="activity-icon quiz-icon">
                      <FontAwesomeIcon icon={faQuestionCircle} />
                    </div>
                    <div className="activity-content">
                      <div className="activity-details">
                        <span className="activity-title">
                          Completed {getDifficultyName(quiz.quiz_id)} Quiz
                        </span>
                        <span className="activity-score">
                          Score: <strong>{quiz.score}%</strong>
                          {quiz.score >= 70 && (
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className="pass-icon"
                            />
                          )}
                        </span>
                      </div>
                      <div className="activity-time">
                        {formatTimeAgo(quiz.completion_date || quiz.date)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <FontAwesomeIcon icon={faGamepad} className="empty-icon" />
                  <p>Complete quizzes to see your activity</p>
                </div>
              )}

              {userData && userData.login_streak > 1 && (
                <div className="activity-item">
                  <div className="activity-icon streak-icon">
                    <FontAwesomeIcon icon={faFireFlameSimple} />
                  </div>
                  <div className="activity-content">
                    <div className="activity-details">
                      <span className="activity-title">
                        Login streak: {userData.login_streak} days
                      </span>
                    </div>
                    <div className="activity-time">Current streak</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Statistics Snapshot */}
          <div className="dashboard-card stats-card">
            <div className="card-header">
              <h2>Statistics Preview</h2>
              <Link to="/statistics" className="view-all-link">
                View All <FontAwesomeIcon icon={faChevronRight} />
              </Link>
            </div>

            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-icon-bg">
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </div>
                <div className="stat-data">
                  <h3>Total Completions</h3>
                  <div className="stat-number">{totalQuizCompletions}</div>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon-bg">
                  <FontAwesomeIcon icon={faCalendarCheck} />
                </div>
                <div className="stat-data">
                  <h3>Unique Quiz Days</h3>
                  <div className="stat-number">
                    {userData?.quiz_days_count || 0}
                  </div>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon-bg">
                  <FontAwesomeIcon icon={faFireFlameSimple} />
                </div>
                <div className="stat-data">
                  <h3>Quiz Streak</h3>
                  <div className="stat-number">
                    {userData?.quiz_streak || 0}
                    <span className="stat-unit">
                      {userData?.quiz_streak === 1 ? " day" : " days"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon-bg">
                  <FontAwesomeIcon icon={faTrophy} />
                </div>
                <div className="stat-data">
                  <h3>Longest Streak</h3>
                  <div className="stat-number">
                    {userData?.longest_quiz_streak || 0}
                    <span className="stat-unit">
                      {userData?.longest_quiz_streak === 1 ? " day" : " days"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Notification Component - Only show top one */}
      {showAchievementPopup && latestAchievement && (
        <div className="achievement-popup">
          <div className="achievement-popup-content">
            <div
              className="achievement-popup-icon"
              style={{ backgroundColor: latestAchievement.color || "#646cff" }}
            >
              <FontAwesomeIcon
                icon={getIconForAchievement(latestAchievement)}
              />
            </div>
            <div className="achievement-popup-details">
              <h3>Achievement Unlocked!</h3>
              <h4>{latestAchievement.title}</h4>
              <p>{latestAchievement.description}</p>
            </div>
            <button
              className="achievement-close-btn"
              onClick={() => setShowAchievementPopup(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Main Container Styles */
        .dashboard-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 0 1.5rem 2rem;
        }

        /* Welcome Banner */
        .welcome-banner {
          background-color: #1a1a1a;
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .welcome-banner::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(100, 108, 255, 0.1),
            rgba(0, 0, 0, 0)
          );
          z-index: 1;
        }

        .welcome-content {
          position: relative;
          z-index: 2;
          flex: 1;
        }

        .welcome-banner h1 {
          color: #ffffff;
          font-size: 2rem;
          margin: 0 0 0.5rem 0;
        }

        .welcome-banner p {
          color: #b3b3b3;
          font-size: 1.1rem;
          margin: 0 0 1.5rem 0;
        }

        .user-stats {
          display: flex;
          gap: 2rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .stat-icon {
          font-size: 1.5rem;
          color: #646cff;
        }

        .stat-text {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          color: #ffffff;
          font-size: 1.25rem;
          font-weight: bold;
        }

        .stat-label {
          color: #b3b3b3;
          font-size: 0.85rem;
        }

        .progress-summary {
          position: relative;
          z-index: 2;
        }

        .progress-ring-circle-bg {
          opacity: 0.3;
        }

        .progress-ring-circle {
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
          transition: stroke-dashoffset 0.5s ease;
        }

        /* Dashboard Grid */
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        /* Card Styles */
        .dashboard-card {
          background-color: #1a1a1a;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #2c3e50;
        }

        .card-header h2 {
          color: #ffffff;
          font-size: 1.25rem;
          margin: 0;
        }

        .view-all-link {
          color: #646cff;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: color 0.2s ease;
        }

        .view-all-link:hover {
          color: #535bf2;
        }

        /* Modules Card */
        .modules-card {
          grid-column: span 2;
        }

        .modules-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        .module-card {
          background-color: #242424;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .module-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
        }

        .module-header {
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .module-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .module-header h3 {
          color: #ffffff;
          margin: 0;
          font-size: 1.1rem;
        }

        .module-content {
          padding: 0 1.25rem 1.25rem;
        }

        .module-content p {
          color: #b3b3b3;
          font-size: 0.9rem;
          margin-top: 0;
          margin-bottom: 1rem;
          min-height: 40px;
        }

        .module-progress {
          margin-bottom: 1.25rem;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background-color: #333;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease;
        }

        .progress-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #b3b3b3;
          font-size: 0.85rem;
        }

        .complete-icon {
          font-size: 1rem;
        }

        .module-action-btn {
          width: 100%;
          padding: 0.75rem;
          border: none;
          border-radius: 6px;
          color: white;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          transition: opacity 0.2s ease;
        }

        .module-action-btn:hover {
          opacity: 0.9;
        }

        /* Achievements Card */
        .achievements-card {
          grid-column: 1;
          grid-row: span 2;
        }

        .achievements-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height: calc(100% - 3rem);
        }

        .achievement-item {
          background-color: #242424;
          border-radius: 10px;
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: transform 0.2s ease;
        }

        .achievement-item:hover {
          transform: translateX(5px);
        }

        .achievement-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .achievement-details {
          flex: 1;
        }

        .achievement-details h3 {
          color: #ffffff;
          margin: 0 0 0.25rem 0;
          font-size: 1rem;
        }

        .achievement-details p {
          color: #b3b3b3;
          margin: 0;
          font-size: 0.85rem;
        }

        /* Activity Card */
        .activity-card {
          grid-column: 2;
        }

        .activity-timeline {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-item {
          background-color: #242424;
          border-radius: 10px;
          padding: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 1rem;
          flex-shrink: 0;
        }

        .quiz-icon {
          background-color: rgba(52, 152, 219, 0.2);
          color: #3498db;
        }

        .streak-icon {
          background-color: rgba(231, 76, 60, 0.2);
          color: #e74c3c;
        }

        .activity-content {
          flex: 1;
        }

        .activity-details {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }

        .activity-title {
          color: #ffffff;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .activity-score {
          color: #b3b3b3;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .pass-icon {
          color: #2ecc71;
        }

        .activity-time {
          color: #777;
          font-size: 0.8rem;
        }

        /* Stats Card */
        .stats-card {
          grid-column: 2;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .stat-box {
          background-color: #242424;
          border-radius: 10px;
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-icon-bg {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(100, 108, 255, 0.1);
          color: #646cff;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .stat-data {
          flex: 1;
        }

        .stat-data h3 {
          color: #b3b3b3;
          font-size: 0.8rem;
          margin: 0 0 0.25rem 0;
          font-weight: normal;
        }

        .stat-number {
          color: #ffffff;
          font-size: 1.25rem;
          font-weight: bold;
        }

        .stat-unit {
          font-size: 0.85rem;
          color: #b3b3b3;
          font-weight: normal;
        }

        /* Empty States */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem;
          color: #777;
          text-align: center;
        }

        .empty-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .empty-state p {
          color: #e0e0e0;
          font-size: 1.1rem;
        }

        /* Achievement Popup */
        .achievement-popup {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
          opacity: 0;
          transform: translateX(100%);
          animation: slideIn 0.6s cubic-bezier(0.17, 0.67, 0.21, 1.69) forwards;
        }

        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateX(400px) translateY(-20px);
          }
          50% {
            opacity: 1;
            transform: translateX(-20px) translateY(0);
          }
          70% {
            transform: translateX(10px) translateY(0);
          }
          100% {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }

        @keyframes slideOut {
          0% {
            opacity: 1;
            transform: translateX(0);
          }
          100% {
            opacity: 0;
            transform: translateX(400px);
          }
        }

        .achievement-popup-content {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          max-width: 350px;
          position: relative;
          overflow: hidden;
        }

        .achievement-popup-content:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(
            to right,
            ${latestAchievement?.color || "#646cff"},
            rgba(100, 108, 255, 0.5)
          );
          animation: shimmer 2s linear infinite;
          background-size: 200% 100%;
        }

        @keyframes shimmer {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }

        .achievement-popup-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 1.5rem;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
          animation: iconPulse 2s ease-in-out infinite;
        }

        @keyframes iconPulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .achievement-popup-icon:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0) 70%
          );
          animation: iconGlow 2s ease-in-out infinite;
        }

        @keyframes iconGlow {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .achievement-popup-details {
          flex: 1;
        }

        .achievement-popup-details h3 {
          color: #646cff;
          margin: 0 0 0.25rem 0;
          font-size: 0.9rem;
        }

        .achievement-popup-details h4 {
          color: #ffffff;
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
        }

        .achievement-popup-details p {
          color: #b3b3b3;
          margin: 0;
          font-size: 0.85rem;
        }

        .achievement-close-btn {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: none;
          border: none;
          color: #b3b3b3;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0.25rem;
          line-height: 1;
        }

        .achievement-close-btn:hover {
          color: #ffffff;
        }

        /* Loading/Error States */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 50vh;
          color: #ffffff;
        }

        .loading-animation {
          margin-bottom: 1rem;
        }

        .loading-spinner {
          font-size: 2.5rem;
          color: #646cff;
        }

        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background-color: #1a1a1a;
          border-radius: 12px;
          color: #ffffff;
          text-align: center;
        }

        .error-icon {
          color: #e74c3c;
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .retry-btn {
          margin-top: 1rem;
          background-color: #646cff;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        }

        .retry-btn:hover {
          background-color: #535bf2;
        }

        /* Responsive Design */
        @media (max-width: 1100px) {
          .modules-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .modules-card,
          .achievements-card,
          .activity-card,
          .stats-card {
            grid-column: 1;
          }
        }

        @media (max-width: 768px) {
          .welcome-banner {
            flex-direction: column;
            padding: 1.5rem;
            gap: 1.5rem;
          }

          .welcome-banner h1 {
            font-size: 1.5rem;
          }

          .user-stats {
            flex-wrap: wrap;
            gap: 1rem;
          }

          .modules-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-container {
            padding: 0 1rem 1.5rem;
          }

          .achievement-popup {
            left: 1rem;
            right: 1rem;
            bottom: 1rem;
          }

          .achievement-popup-content {
            width: 100%;
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
