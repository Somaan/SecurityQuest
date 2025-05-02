import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faExclamationTriangle,
  faCalendarCheck,
  faQuestionCircle,
  faInfoCircle,
  faListAlt,
  faTrophy,
  faChartLine,
  faCalendarAlt,
  faCheckCircle,
  faTimesCircle,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "./constants";
import { toast } from "react-toastify";

const Statistics = () => {
  // Get username from session
  const username = sessionStorage.getItem("username") || "User";
  const userId = sessionStorage.getItem("userId") || "1";

  // State variables for data
  const [userData, setUserData] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Statistics tabs
  const [activeTab, setActiveTab] = useState("overview");

  // Window resize handler for responsive design
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserStats = async () => {
      setLoading(true);
      try {
        // Fetch user streaks and quiz history
        const response = await fetch(
          API_ENDPOINTS.GET_USER_STREAKS.replace(":userId", userId)
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user statistics");
        }

        const data = await response.json();
        console.log("User stats data:", data);

        setUserData(data.userData || {});
        setQuizHistory(data.quizHistory || []);

        console.log(
          `Loaded ${
            data.quizHistory?.length || 0
          } quiz completions for user ${userId}`
        );
      } catch (err) {
        console.error("Error fetching user statistics:", err);
        setError(err.message);
        toast.error("Failed to load statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [userId]);

  // Chart dimensions calculations
  const getChartWidth = () => {
    if (windowWidth <= 480) return 280;
    if (windowWidth <= 768) return 400;
    return 600;
  };

  const getChartHeight = () => {
    if (windowWidth <= 480) return 140;
    return 200;
  };

  // Calculate score data for line chart from quiz history
  const calculateScoreData = () => {
    if (!quizHistory || quizHistory.length === 0) {
      return { scores: [], labels: [] };
    }

    // Sort by date ascending (earliest to latest)
    const sortedHistory = [...quizHistory].sort(
      (a, b) =>
        new Date(a.completion_date || a.date) -
        new Date(b.completion_date || b.date)
    );

    // Take all quiz entries (or limit to most recent 10 if there are many)
    const recentEntries =
      sortedHistory.length > 10 ? sortedHistory.slice(-10) : sortedHistory;

    // Log what we're working with
    console.log("Processing quiz history entries:", recentEntries.length);

    // Map each quiz to a normalized score
    const scores = recentEntries.map((quiz) => {
      // Try different ways to extract the score
      let score = 0;

      if (quiz.score !== undefined) {
        score = Math.min(100, Math.round(quiz.score));
      } else if (
        quiz.earnedPoints !== undefined &&
        quiz.totalPoints !== undefined
      ) {
        score = Math.round((quiz.earnedPoints / quiz.totalPoints) * 100);
      } else if (
        quiz.correct_answers !== undefined &&
        quiz.total_questions !== undefined
      ) {
        score = Math.round((quiz.correct_answers / quiz.total_questions) * 100);
      }

      return score;
    });

    // Map to date labels (DD/MM format)
    const labels = recentEntries.map((quiz) => {
      const date = new Date(quiz.completion_date || quiz.date);
      return `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}`;
    });

    console.log("Final scores array:", scores);
    console.log("Final labels array:", labels);

    return { scores, labels };
  };

  // Format date function - using DD/MM format (not US format)
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

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    }
    return formatDate(dateStr);
  };

  function normaliseQuizScores(quiz) {
    if (
      quiz.earnedPoints !== undefined &&
      quiz.totalPossiblePoints !== undefined
    ) {
      return Math.round((quiz.earnedPoints / quiz.totalPossiblePoints) * 100);
    } else if (
      quiz.completionDetails &&
      Array.isArray(quiz.completionDetails)
    ) {
      let earnedPoints = 0;
      let totalPoints = 0;

      quiz.completionDetails.forEach((detail) => {
        if (detail.possiblePoints) {
          totalPoints += detail.possiblePoints;
          earnedPoints += detail.earnedPoints || 0;
        } else {
          totalPoints += 10;
          earnedPoints += detail.isCorrect ? 10 : 0;
        }
      });

      return totalPoints > 0
        ? Math.round((earnedPoints / totalPoints) * 100)
        : 0;
    } else {
      return Math.min(100, quiz.score);
    }
  }

  // Calculate statistics
  const calculateStats = () => {
    const stats = {
      totalCompletions: quizHistory.length,
      uniqueDays: userData?.quiz_days_count || 0,
      beginner: quizHistory.filter((q) => q.quiz_id === 1).length,
      intermediate: quizHistory.filter((q) => q.quiz_id === 2).length,
      advanced: quizHistory.filter((q) => q.quiz_id === 3).length,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 100,
      passRate: 0,
      beginnerHighest: calculateModuleProgress("beginner"),
      intermediateHighest: calculateModuleProgress("intermediate"),
      advancedHighest: calculateModuleProgress("advanced"),
      recentQuizzes: [],
    };

    // Calculate average, highest, and lowest scores
    if (quizHistory.length > 0) {
      const normalisedScores = quizHistory.map((q) => normaliseQuizScores(q));
      stats.averageScore = Math.round(
        normalisedScores.reduce((a, b) => a + b, 0) / normalisedScores.length
      );
      stats.highestScore = Math.max(...normalisedScores);
      stats.lowestScore = Math.min(...normalisedScores);
      stats.passRate = Math.round(
        (normalisedScores.filter((score) => score >= 70).length /
          normalisedScores.length) *
          100
      );

      // Get recent quizzes
      stats.recentQuizzes = [...quizHistory]
        .sort(
          (a, b) =>
            new Date(b.completion_date || b.date) -
            new Date(a.completion_date || a.date)
        )
        .slice(0, 5);
    }

    return stats;
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
    return Math.max(...matchingQuizzes.map((quiz) => quiz.score));
  };

  // Calculate difficulty specific stats
  const calculateDifficultyStats = (difficulty) => {
    const quizId =
      difficulty === "beginner" ? 1 : difficulty === "intermediate" ? 2 : 3;
    const matchingQuizzes = quizHistory.filter(
      (quiz) => quiz.quiz_id === quizId
    );

    if (matchingQuizzes.length === 0) {
      return {
        attempts: 0,
        highestScore: 0,
        averageScore: 0,
        passRate: 0,
        recentScore: null,
        trend: "neutral",
      };
    }

    const attempts = matchingQuizzes.length;
    const normalisedScores = matchingQuizzes.map((quiz) =>
      normaliseQuizScores(quiz)
    );
    const highestScore = Math.max(...normalisedScores);
    const averageScore = Math.round(
      normalisedScores.reduce((a, b) => a + b, 0) / attempts
    );
    const passedAttempts = matchingQuizzes.filter(
      (quiz) => quiz.score >= 70
    ).length;
    const passRate = Math.round((passedAttempts / attempts) * 100);

    // Get trend direction by comparing most recent scores
    const sortedQuizzes = [...matchingQuizzes].sort(
      (a, b) =>
        new Date(b.completion_date || b.date) -
        new Date(a.completion_date || a.date)
    );

    let trend = "neutral";
    let recentScore = null;

    if (sortedQuizzes.length > 0) {
      recentScore = normaliseQuizScores(sortedQuizzes[0]);

      if (sortedQuizzes.length > 1) {
        const previousScore = normaliseQuizScores(sortedQuizzes[1]);
        if (recentScore > previousScore) trend = "up";
        else if (recentScore < previousScore) trend = "down";
      }
    }

    return {
      attempts,
      highestScore,
      averageScore,
      passRate,
      recentScore,
      trend,
    };
  };

  // Render the score chart with fixes for the line graph
  const renderScoreChart = () => {
    // Get score data
    const scoreData = calculateScoreData();

    // If no scores, show placeholder
    if (scoreData.scores.length === 0) {
      return (
        <div className="no-data-message">
          <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
          <p>Complete quizzes to see your score history</p>
        </div>
      );
    }

    // Calculate chart dimensions
    const chartWidth = getChartWidth();
    const chartHeight = getChartHeight();
    const maxScore = 100; // Always use 100 as max for percentage scores

    // Calculate step size for x-axis based on number of points
    const xStep =
      scoreData.scores.length > 1
        ? chartWidth / (scoreData.scores.length - 1)
        : chartWidth / 2; // Prevent division by zero

    // Generate points for polyline (connects all scores with straight lines)
    const points = scoreData.scores
      .map((score, index) => {
        const x = index * xStep;
        const y = chartHeight - (score / maxScore) * chartHeight;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <div className="score-chart-container">
        <div className="y-axis-labels">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>

        <div className="chart-area">
          <svg width={chartWidth} height={chartHeight} className="score-chart">
            {/* Grid lines */}
            <line
              x1="0"
              y1="0"
              x2={chartWidth}
              y2="0"
              stroke="#444"
              strokeDasharray="2"
            />
            <line
              x1="0"
              y1={chartHeight / 4}
              x2={chartWidth}
              y2={chartHeight / 4}
              stroke="#444"
              strokeDasharray="2"
            />
            <line
              x1="0"
              y1={chartHeight / 2}
              x2={chartWidth}
              y2={chartHeight / 2}
              stroke="#444"
              strokeDasharray="2"
            />
            <line
              x1="0"
              y1={(chartHeight * 3) / 4}
              x2={chartWidth}
              y2={(chartHeight * 3) / 4}
              stroke="#444"
              strokeDasharray="2"
            />
            <line
              x1="0"
              y1={chartHeight}
              x2={chartWidth}
              y2={chartHeight}
              stroke="#444"
              strokeDasharray="2"
            />

            {/* Pass threshold line (70%) */}
            <line
              x1="0"
              y1={chartHeight - (70 / maxScore) * chartHeight}
              x2={chartWidth}
              y2={chartHeight - (70 / maxScore) * chartHeight}
              stroke="#e67e22"
              strokeWidth="1.5"
              strokeDasharray="5,3"
            />
            <text
              x="5"
              y={chartHeight - (70 / maxScore) * chartHeight - 5}
              fill="#e67e22"
              fontSize="10"
            >
              Pass threshold (70%)
            </text>

            {/* Draw the line graph with clear points */}
            <polyline
              fill="none"
              stroke="#646cff"
              strokeWidth="2"
              points={points}
            />

            {/* Draw points at each score */}
            {scoreData.scores.map((score, index) => {
              const x = index * xStep;
              const y = chartHeight - (score / maxScore) * chartHeight;
              return (
                <g key={index} className="data-point">
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#646cff"
                    stroke="#fff"
                    strokeWidth="1"
                  />
                  <text
                    x={x}
                    y={y - 10}
                    fill="#fff"
                    fontSize="10"
                    textAnchor="middle"
                    className="point-label"
                  >
                    {score}%
                  </text>
                </g>
              );
            })}
          </svg>

          {/* X-axis labels */}
          <div className="x-axis-labels">
            {scoreData.labels.map((label, index) => (
              <span
                key={index}
                style={{
                  left: `${
                    scoreData.scores.length > 1
                      ? (index / (scoreData.scores.length - 1)) * 100
                      : 50
                  }%`,
                  transform: "translateX(-50%)",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="content-wrapper">
        <div className="loading-container">
          <FontAwesomeIcon icon={faSpinner} spin className="loading-spinner" />
          <p>Loading your statistics...</p>
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
          <h3>Error loading statistics</h3>
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

  // Calculate all statistics
  const stats = calculateStats();
  const beginnerStats = calculateDifficultyStats("beginner");
  const intermediateStats = calculateDifficultyStats("intermediate");
  const advancedStats = calculateDifficultyStats("advanced");

  return (
    <div className="content-wrapper">
      <div className="statistics-container">
        <div className="statistics-header">
          <h2>Statistics</h2>
          <h3>Track your quiz progress over time!</h3>
        </div>

        {/* Tab selection for statistics views */}
        <div className="statistics-tabs">
          <button
            className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <FontAwesomeIcon icon={faChartLine} className="tab-icon" />
            Overview
          </button>
          <button
            className={`tab-btn ${activeTab === "quizzes" ? "active" : ""}`}
            onClick={() => setActiveTab("quizzes")}
          >
            <FontAwesomeIcon icon={faQuestionCircle} className="tab-icon" />
            Quiz Details
          </button>
          <button
            className={`tab-btn ${activeTab === "streaks" ? "active" : ""}`}
            onClick={() => setActiveTab("streaks")}
          >
            <FontAwesomeIcon icon={faCalendarCheck} className="tab-icon" />
            Streaks
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="statistics-tab-content">
            <div className="stats-grid overview-grid">
              {/* Score Metrics Card */}
              <div className="stats-card score-metrics">
                <h3 className="card-title">Score Metrics</h3>
                <div className="metrics-grid">
                  <div className="metric-item">
                    <div className="metric-icon average-icon">
                      <FontAwesomeIcon icon={faChartLine} />
                    </div>
                    <div className="metric-content">
                      <span className="metric-label">Average Score</span>
                      <span className="metric-value">
                        {stats.averageScore}%
                      </span>
                    </div>
                  </div>

                  <div className="metric-item">
                    <div className="metric-icon highest-icon">
                      <FontAwesomeIcon icon={faArrowUp} />
                    </div>
                    <div className="metric-content">
                      <span className="metric-label">Highest Score</span>
                      <span className="metric-value">
                        {stats.highestScore}%
                      </span>
                    </div>
                  </div>

                  <div className="metric-item">
                    <div className="metric-icon lowest-icon">
                      <FontAwesomeIcon icon={faArrowDown} />
                    </div>
                    <div className="metric-content">
                      <span className="metric-label">Lowest Score</span>
                      <span className="metric-value">{stats.lowestScore}%</span>
                    </div>
                  </div>

                  <div className="metric-item">
                    <div className="metric-icon pass-icon">
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <div className="metric-content">
                      <span className="metric-label">Pass Rate</span>
                      <span className="metric-value">{stats.passRate}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Score History Card - Fixed implementation */}
              <div className="stats-card score-history-card">
                <h3 className="card-title">Quiz Score History</h3>
                {renderScoreChart()}
              </div>

              {/* Quiz Completion Stats */}
              <div className="stats-card quiz-completions-card">
                <h3 className="card-title">Quiz Completions</h3>
                <div className="completions-grid">
                  <div className="completion-stat">
                    <div className="stat-number">{stats.totalCompletions}</div>
                    <div className="stat-label">Total Completions</div>
                  </div>

                  <div className="completion-stat">
                    <div className="stat-number">{stats.uniqueDays}</div>
                    <div className="stat-label">Unique Quiz Days</div>
                  </div>

                  <div className="completion-stat">
                    <div className="stat-number">{stats.beginner}</div>
                    <div className="stat-label">Beginner Quizzes</div>
                  </div>

                  <div className="completion-stat">
                    <div className="stat-number">{stats.intermediate}</div>
                    <div className="stat-label">Intermediate Quizzes</div>
                  </div>

                  <div className="completion-stat">
                    <div className="stat-number">{stats.advanced}</div>
                    <div className="stat-label">Advanced Quizzes</div>
                  </div>
                </div>
              </div>

              {/* Module Progress Card */}
              <div className="stats-card module-progress-card">
                <h3 className="card-title">Module Progress</h3>
                <div className="progress-items">
                  <div className="progress-item">
                    <div className="progress-label">
                      <span className="module-name">Beginner</span>
                      <span className="module-score">
                        {stats.beginnerHighest}%
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill beginner-fill"
                        style={{ width: `${stats.beginnerHighest}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="progress-label">
                      <span className="module-name">Intermediate</span>
                      <span className="module-score">
                        {stats.intermediateHighest}%
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill intermediate-fill"
                        style={{ width: `${stats.intermediateHighest}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="progress-label">
                      <span className="module-name">Advanced</span>
                      <span className="module-score">
                        {stats.advancedHighest}%
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill advanced-fill"
                        style={{ width: `${stats.advancedHighest}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quizzes Tab */}
        {activeTab === "quizzes" && (
          <div className="statistics-tab-content">
            <div className="stats-grid quizzes-grid">
              {/* Beginner Quiz Stats */}
              <div className="stats-card difficulty-card beginner-card">
                <div className="difficulty-header">
                  <div className="difficulty-icon beginner-icon">
                    <FontAwesomeIcon icon={faListAlt} />
                  </div>
                  <h3 className="card-title">Beginner Quizzes</h3>
                </div>

                {beginnerStats.attempts > 0 ? (
                  <div className="difficulty-stats">
                    <div className="stat-row">
                      <div className="stat-column">
                        <div className="stat-item">
                          <span className="stat-value">
                            {beginnerStats.attempts}
                          </span>
                          <span className="stat-label">Attempts</span>
                        </div>

                        <div className="stat-item">
                          <span className="stat-value">
                            {beginnerStats.highestScore}%
                          </span>
                          <span className="stat-label">Highest Score</span>
                        </div>
                      </div>

                      <div className="stat-column">
                        <div className="stat-item">
                          <span className="stat-value">
                            {beginnerStats.averageScore}%
                          </span>
                          <span className="stat-label">Average Score</span>
                        </div>

                        <div className="stat-item">
                          <span className="stat-value">
                            {beginnerStats.passRate}%
                          </span>
                          <span className="stat-label">Pass Rate</span>
                        </div>
                      </div>
                    </div>

                    {beginnerStats.recentScore !== null && (
                      <div className="recent-score">
                        <div className="recent-score-label">
                          Most Recent Score:
                        </div>
                        <div className="recent-score-value">
                          {beginnerStats.recentScore}%
                          {beginnerStats.trend === "up" && (
                            <FontAwesomeIcon
                              icon={faArrowUp}
                              className="trend-up"
                            />
                          )}
                          {beginnerStats.trend === "down" && (
                            <FontAwesomeIcon
                              icon={faArrowDown}
                              className="trend-down"
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="no-data-message">
                    <p>No beginner quizzes completed yet</p>
                  </div>
                )}
              </div>

              {/* Intermediate Quiz Stats */}
              <div className="stats-card difficulty-card intermediate-card">
                <div className="difficulty-header">
                  <div className="difficulty-icon intermediate-icon">
                    <FontAwesomeIcon icon={faListAlt} />
                  </div>
                  <h3 className="card-title">Intermediate Quizzes</h3>
                </div>

                {intermediateStats.attempts > 0 ? (
                  <div className="difficulty-stats">
                    <div className="stat-row">
                      <div className="stat-column">
                        <div className="stat-item">
                          <span className="stat-value">
                            {intermediateStats.attempts}
                          </span>
                          <span className="stat-label">Attempts</span>
                        </div>

                        <div className="stat-item">
                          <span className="stat-value">
                            {intermediateStats.highestScore}%
                          </span>
                          <span className="stat-label">Highest Score</span>
                        </div>
                      </div>

                      <div className="stat-column">
                        <div className="stat-item">
                          <span className="stat-value">
                            {intermediateStats.averageScore}%
                          </span>
                          <span className="stat-label">Average Score</span>
                        </div>

                        <div className="stat-item">
                          <span className="stat-value">
                            {intermediateStats.passRate}%
                          </span>
                          <span className="stat-label">Pass Rate</span>
                        </div>
                      </div>
                    </div>

                    {intermediateStats.recentScore !== null && (
                      <div className="recent-score">
                        <div className="recent-score-label">
                          Most Recent Score:
                        </div>
                        <div className="recent-score-value">
                          {intermediateStats.recentScore}%
                          {intermediateStats.trend === "up" && (
                            <FontAwesomeIcon
                              icon={faArrowUp}
                              className="trend-up"
                            />
                          )}
                          {intermediateStats.trend === "down" && (
                            <FontAwesomeIcon
                              icon={faArrowDown}
                              className="trend-down"
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="no-data-message">
                    <p>No intermediate quizzes completed yet</p>
                  </div>
                )}
              </div>

              {/* Advanced Quiz Stats */}
              <div className="stats-card difficulty-card advanced-card">
                <div className="difficulty-header">
                  <div className="difficulty-icon advanced-icon">
                    <FontAwesomeIcon icon={faListAlt} />
                  </div>
                  <h3 className="card-title">Advanced Quizzes</h3>
                </div>

                {advancedStats.attempts > 0 ? (
                  <div className="difficulty-stats">
                    <div className="stat-row">
                      <div className="stat-column">
                        <div className="stat-item">
                          <span className="stat-value">
                            {advancedStats.attempts}
                          </span>
                          <span className="stat-label">Attempts</span>
                        </div>

                        <div className="stat-item">
                          <span className="stat-value">
                            {advancedStats.highestScore}%
                          </span>
                          <span className="stat-label">Highest Score</span>
                        </div>
                      </div>

                      <div className="stat-column">
                        <div className="stat-item">
                          <span className="stat-value">
                            {advancedStats.averageScore}%
                          </span>
                          <span className="stat-label">Average Score</span>
                        </div>

                        <div className="stat-item">
                          <span className="stat-value">
                            {advancedStats.passRate}%
                          </span>
                          <span className="stat-label">Pass Rate</span>
                        </div>
                      </div>
                    </div>

                    {advancedStats.recentScore !== null && (
                      <div className="recent-score">
                        <div className="recent-score-label">
                          Most Recent Score:
                        </div>
                        <div className="recent-score-value">
                          {advancedStats.recentScore}%
                          {advancedStats.trend === "up" && (
                            <FontAwesomeIcon
                              icon={faArrowUp}
                              className="trend-up"
                            />
                          )}
                          {advancedStats.trend === "down" && (
                            <FontAwesomeIcon
                              icon={faArrowDown}
                              className="trend-down"
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="no-data-message">
                    <p>No advanced quizzes completed yet</p>
                  </div>
                )}
              </div>

              {/* Recent Quizzes */}
              <div className="stats-card recent-quizzes-card">
                <h3 className="card-title">Recent Quiz Activity</h3>

                <div className="recent-quizzes-list">
                  {stats.recentQuizzes.length > 0 ? (
                    stats.recentQuizzes.map((quiz, index) => (
                      <div key={index} className="recent-quiz-item">
                        <div className="quiz-date-time">
                          <FontAwesomeIcon
                            icon={faCalendarAlt}
                            className="date-icon"
                          />
                          <span>
                            {formatTimeAgo(quiz.completion_date || quiz.date)}
                          </span>
                        </div>

                        <div className="quiz-details">
                          <div className="quiz-type">
                            <span
                              className={`difficulty-badge ${getDifficultyClass(
                                quiz.quiz_id
                              )}`}
                            >
                              {getDifficultyName(quiz.quiz_id)}
                            </span>
                          </div>

                          <div className="quiz-score">
                            <span
                              className={`score ${
                                quiz.score >= 70 ? "passing" : "failing"
                              }`}
                            >
                              {quiz.score}%
                              {quiz.score >= 70 ? (
                                <FontAwesomeIcon
                                  icon={faCheckCircle}
                                  className="pass-icon"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faTimesCircle}
                                  className="fail-icon"
                                />
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-quiz-data">
                      <p>No quiz activity yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Streaks Tab */}
        {activeTab === "streaks" && (
          <div className="statistics-tab-content">
            <div className="stats-grid streaks-grid">
              {/* Current Streaks Card */}
              <div className="stats-card current-streaks-card">
                <h3 className="card-title">Current Streaks</h3>

                <div className="streaks-container">
                  <div className="streak-item">
                    <div className="streak-icon-container login-streak-icon">
                      <FontAwesomeIcon
                        icon={faCalendarCheck}
                        className="streak-icon"
                      />
                    </div>
                    <div className="streak-content">
                      <div className="streak-value">
                        {userData?.login_streak || 0}
                      </div>
                      <div className="streak-label">
                        Day Login Streak
                        <div className="streak-subtitle">
                          Consecutive days logged in
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="streak-item">
                    <div className="streak-icon-container quiz-streak-icon">
                      <FontAwesomeIcon
                        icon={faQuestionCircle}
                        className="streak-icon"
                      />
                    </div>
                    <div className="streak-content">
                      <div className="streak-value">
                        {userData?.quiz_streak || 0}
                      </div>
                      <div className="streak-label">
                        Day Quiz Streak
                        <div className="streak-subtitle">
                          Consecutive days with quizzes
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Record Streaks Card */}
              <div className="stats-card record-streaks-card">
                <h3 className="card-title">Record Streaks</h3>

                <div className="streaks-container">
                  <div className="streak-item">
                    <div className="streak-icon-container login-record-icon">
                      <FontAwesomeIcon
                        icon={faTrophy}
                        className="streak-icon"
                      />
                    </div>
                    <div className="streak-content">
                      <div className="streak-value">
                        {userData?.longest_login_streak || 0}
                      </div>
                      <div className="streak-label">
                        Longest Login Streak
                        <div className="streak-subtitle">
                          Best consecutive login days
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="streak-item">
                    <div className="streak-icon-container quiz-record-icon">
                      <FontAwesomeIcon
                        icon={faTrophy}
                        className="streak-icon"
                      />
                    </div>
                    <div className="streak-content">
                      <div className="streak-value">
                        {userData?.longest_quiz_streak || 0}
                      </div>
                      <div className="streak-label">
                        Longest Quiz Streak
                        <div className="streak-subtitle">
                          Best consecutive quiz days
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Streak Information Card */}
              <div className="stats-card streak-info-card">
                <h3 className="card-title">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    style={{ marginRight: "8px" }}
                  />
                  About Streaks
                </h3>

                <div className="streak-info-content">
                  <p>
                    <strong>Login Streak:</strong> This counter increases each
                    day you log in to the application. It resets to zero if you
                    don't log in for 24 hours.
                  </p>

                  <p>
                    <strong>Quiz Streak:</strong> This counter increases each
                    day you complete at least one quiz. It resets to zero if you
                    don't complete a quiz for 24 hours.
                  </p>

                  <div className="streak-benefits">
                    <h4>Benefits of Maintaining Streaks:</h4>
                    <ul>
                      <li>Unlock special achievements</li>
                      <li>Track your consistency</li>
                      <li>Build security awareness habits</li>
                      <li>Compete on the leaderboard</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        /* Main container */
        .statistics-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 2rem;
        }

        .statistics-header {
          margin-bottom: 1.5rem;
        }

        .statistics-header h2 {
          color: #ffffff;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .statistics-header h3 {
          color: #e0e0e0;
          font-size: 1rem;
          font-weight: normal;
          margin-top: 0.5rem;
        }

        .statistics-subtitle {
          color: #ffffff;
          font-size: 1rem;
          font-weight: 300;
        }

        /* Tabs styling */
        .statistics-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #333;
          padding-bottom: 0.5rem;
        }

        .tab-btn {
          background: none;
          border: none;
          color: #ffffff;
          padding: 0.75rem 1.25rem;
          border-radius: 6px 6px 0 0;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .tab-btn:hover {
          color: #ffffff;
          background-color: rgba(60, 60, 80, 0.6);
        }

        .tab-btn.active {
          color: #ffffff;
          background-color: rgba(60, 60, 80, 0.8);
          border-bottom: 3px solid #646cff;
        }

        .tab-icon {
          font-size: 1rem;
        }

        /* Stats grid layout */
        .stats-grid {
          display: grid;
          gap: 1.5rem;
        }

        .overview-grid {
          grid-template-columns: repeat(2, 1fr);
          grid-template-areas:
            "scores history"
            "completions modules";
        }

        .quizzes-grid {
          grid-template-columns: repeat(2, 1fr);
          grid-template-areas:
            "beginner intermediate"
            "advanced recent";
        }

        .streaks-grid {
          grid-template-columns: repeat(2, 1fr);
          grid-template-areas:
            "current record"
            "info info";
        }

        /* Card styling */
        .stats-card {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .card-title {
          color: #ffffff;
          font-size: 1.2rem;
          margin-top: 0;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
        }

        /* Score Metrics Card */
        .score-metrics {
          grid-area: scores;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .metric-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background-color: #242424;
          padding: 1rem;
          border-radius: 8px;
        }

        .metric-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .average-icon {
          background-color: rgba(100, 108, 255, 0.15);
          color: #646cff;
        }

        .highest-icon {
          background-color: rgba(46, 204, 113, 0.15);
          color: #2ecc71;
        }

        .lowest-icon {
          background-color: rgba(231, 76, 60, 0.15);
          color: #e74c3c;
        }

        .pass-icon {
          background-color: rgba(241, 196, 15, 0.15);
          color: #f1c40f;
        }

        .metric-content {
          display: flex;
          flex-direction: column;
        }

        .metric-label {
          color: #aaaaaa;
          font-size: 0.9rem;
        }

        .metric-value {
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: 600;
        }

        /* Score History Chart */
        .score-history-card {
          grid-area: history;
        }

        .score-chart-container {
          display: flex;
          height: 250px;
        }

        .y-axis-labels {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-right: 10px;
          color: #aaaaaa;
          font-size: 0.8rem;
        }

        .chart-area {
          flex: 1;
          position: relative;
        }

        .score-chart {
          background-color: #242424;
          border-radius: 8px;
          padding: 10px;
        }

        .x-axis-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          color: #aaaaaa;
          font-size: 0.8rem;
          position: relative;
          height: 20px;
        }

        .x-axis-labels span {
          position: absolute;
          transform: translateX(-50%);
        }

        /* Fix for the data point labels - make them always visible */
        .point-label {
          display: block !important; /* Override to ensure visibility */
        }

        .data-point:hover .point-label {
          display: block;
        }

        /* Quiz Completions Card */
        .quiz-completions-card {
          grid-area: completions;
        }

        .completions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 1rem;
        }

        .completion-stat {
          background-color: #242424;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
        }

        .stat-number {
          color: #646cff;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: #aaaaaa;
          font-size: 0.9rem;
        }

        /* Module Progress Card */
        .module-progress-card {
          grid-area: modules;
        }

        .progress-items {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .progress-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .progress-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .module-name {
          color: #ffffff;
          font-weight: 500;
        }

        .module-score {
          color: #aaaaaa;
          font-size: 0.9rem;
        }

        .progress-bar {
          height: 10px;
          background-color: #333;
          border-radius: 5px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 5px;
          transition: width 0.3s ease;
        }

        .beginner-fill {
          background-color: #3498db;
        }

        .intermediate-fill {
          background-color: #2ecc71;
        }

        .advanced-fill {
          background-color: #e74c3c;
        }

        /* Difficulty Cards */
        .difficulty-card {
          padding: 1.25rem;
        }

        .beginner-card {
          grid-area: beginner;
        }

        .intermediate-card {
          grid-area: intermediate;
        }

        .advanced-card {
          grid-area: advanced;
        }

        .difficulty-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .difficulty-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .beginner-icon {
          background-color: rgba(52, 152, 219, 0.15);
          color: #3498db;
        }

        .intermediate-icon {
          background-color: rgba(46, 204, 113, 0.15);
          color: #2ecc71;
        }

        .advanced-icon {
          background-color: rgba(231, 76, 60, 0.15);
          color: #e74c3c;
        }

        .difficulty-stats {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .stat-row {
          display: flex;
          gap: 1rem;
        }

        .stat-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .stat-item {
          background-color: #242424;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
        }

        .stat-value {
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          color: #aaaaaa;
          font-size: 0.85rem;
        }

        .recent-score {
          background-color: #242424;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 0.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .recent-score-label {
          color: #aaaaaa;
          font-size: 0.9rem;
        }

        .recent-score-value {
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .trend-up {
          color: #2ecc71;
        }

        .trend-down {
          color: #e74c3c;
        }

        /* Recent Quizzes Card */
        .recent-quizzes-card {
          grid-area: recent;
        }

        .recent-quizzes-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: 350px;
          overflow-y: auto;
        }

        .recent-quiz-item {
          background-color: #242424;
          padding: 1rem;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .quiz-date-time {
          color: #aaaaaa;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .date-icon {
          font-size: 0.8rem;
        }

        .quiz-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .difficulty-badge {
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }

        .beginner-badge {
          background-color: rgba(52, 152, 219, 0.15);
          color: #3498db;
        }

        .intermediate-badge {
          background-color: rgba(46, 204, 113, 0.15);
          color: #2ecc71;
        }

        .advanced-badge {
          background-color: rgba(231, 76, 60, 0.15);
          color: #e74c3c;
        }

        .quiz-score {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .score {
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .passing {
          color: #2ecc71;
        }

        .failing {
          color: #e74c3c;
        }

        .pass-icon {
          font-size: 0.9rem;
          color: #2ecc71;
        }

        .fail-icon {
          font-size: 0.9rem;
          color: #e74c3c;
        }

        /* Streak Cards */
        .current-streaks-card {
          grid-area: current;
        }

        .record-streaks-card {
          grid-area: record;
        }

        .streak-info-card {
          grid-area: info;
        }

        .streaks-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .streak-item {
          background-color: #242424;
          padding: 1rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .streak-icon-container {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          flex-shrink: 0;
        }

        .login-streak-icon {
          background-color: rgba(52, 152, 219, 0.15);
          color: #3498db;
        }

        .quiz-streak-icon {
          background-color: rgba(46, 204, 113, 0.15);
          color: #2ecc71;
        }

        .login-record-icon,
        .quiz-record-icon {
          background-color: rgba(241, 196, 15, 0.15);
          color: #f1c40f;
        }

        .streak-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .streak-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: #ffffff;
          min-width: 50px;
          text-align: center;
        }

        .streak-label {
          display: flex;
          flex-direction: column;
          color: #ffffff;
          font-weight: 500;
        }

        .streak-subtitle {
          color: #aaaaaa;
          font-size: 0.85rem;
          font-weight: 400;
          margin-top: 0.25rem;
        }

        .streak-info-content {
          color: #e0e0e0;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .streak-info-content p {
          margin-bottom: 1rem;
        }

        .streak-benefits {
          background-color: #242424;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1rem;
        }

        .streak-benefits h4 {
          color: #ffffff;
          margin-top: 0;
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }

        .streak-benefits ul {
          margin: 0;
          padding-left: 1.5rem;
          color: #e0e0e0;
        }

        .streak-benefits li {
          margin-bottom: 0.5rem;
        }

        /* No data message */
        .no-data-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          color: #aaaaaa;
          font-style: italic;
          text-align: center;
          gap: 1rem;
        }

        .info-icon {
          font-size: 2rem;
          color: #3498db;
        }

        .no-quiz-data {
          padding: 2rem;
          text-align: center;
          color: #aaaaaa;
          font-style: italic;
        }

        /* Loading/Error states */
        .loading-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 300px;
          color: #ecf0f1;
        }

        .loading-spinner {
          font-size: 2rem;
          color: #3498db;
          margin-bottom: 1rem;
        }

        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background-color: #1a1a1a;
          border-radius: 8px;
          color: #ecf0f1;
        }

        .error-icon {
          color: #e74c3c;
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .retry-btn {
          margin-top: 1rem;
          background-color: #3498db;
          color: white;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
        }

        .retry-btn:hover {
          background-color: #2980b9;
        }

        /* Responsive styles */
        @media (max-width: 992px) {
          .statistics-container {
            padding: 1.5rem;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .overview-grid,
          .quizzes-grid,
          .streaks-grid {
            grid-template-columns: 1fr;
            grid-template-areas: none;
          }

          .stats-card {
            grid-area: auto !important;
          }

          .tab-btn {
            padding: 0.5rem 0.75rem;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .statistics-container {
            padding: 0.5rem;
            width: 100%;
            margin: 0;
          }

          .statistics-header {
            padding: 0.5rem;
          }

          .statistics-tabs {
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .tab-btn {
            flex: 1;
            justify-content: center;
            min-width: 100px;
            font-size: 0.9rem;
          }

          .tab-icon {
            display: none;
          }

          .stat-row {
            flex-direction: column;
          }

          .streak-content {
            flex-direction: column;
            align-items: flex-start;
          }

          .streak-value {
            min-width: auto;
            text-align: left;
          }
        }
      `}</style>
    </div>
  );

  // Helper functions
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

  function getDifficultyClass(quizId) {
    switch (quizId) {
      case 1:
        return "beginner-badge";
      case 2:
        return "intermediate-badge";
      case 3:
        return "advanced-badge";
      default:
        return "";
    }
  }
};

export default Statistics;
