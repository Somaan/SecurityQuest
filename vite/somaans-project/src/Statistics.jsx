import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMedal, 
  faSpinner, 
  faExclamationTriangle,
  faCalendarCheck,
  faQuestionCircle,
  faTrophy,
  faChartLine,
  faCheckCircle,
  faTimesCircle,
  faInfoCircle,
  faListAlt
} from '@fortawesome/free-solid-svg-icons';
import { API_ENDPOINTS } from './constants';
import { toast } from 'react-toastify';

const Statistics = () => {
  // Get username from session
  const username = sessionStorage.getItem('username') || 'User';
  const userId = sessionStorage.getItem('userId') || '1';
  
  // State variables for data
  const [userData, setUserData] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Track window width for responsive chart
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Fetch user data
  useEffect(() => {
    const fetchUserStats = async () => {
      setLoading(true);
      try {
        // Fetch user streaks
        const response = await fetch(API_ENDPOINTS.GET_USER_STREAKS.replace(':userId', userId));
        if (!response.ok) {
          throw new Error('Failed to fetch user statistics');
        }
        
        const data = await response.json();
        console.log('User stats data:', data);
        
        setUserData(data.userData || {});
        setQuizHistory(data.quizHistory || []);
        
        // Log the number of quiz completions
        console.log(`Loaded ${data.quizHistory?.length || 0} quiz completions for user ${userId}`);
      } catch (err) {
        console.error('Error fetching user statistics:', err);
        setError(err.message);
        toast.error('Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserStats();
  }, [userId]);
  
  // Determine chart width based on screen size
  const getChartWidth = () => {
    if (windowWidth <= 480) return 280;
    if (windowWidth <= 768) return 400;
    return 500;
  };

  // Calculate score data for line chart from quiz history - use ALL completions
  const calculateScoreData = () => {
    if (!quizHistory || quizHistory.length === 0) {
      // Default placeholder data
      return [65, 75, 36, 52, 74, 90];
    }
    
    // Sort by date
    const sortedHistory = [...quizHistory].sort((a, b) => 
      new Date(a.completion_date || a.date) - new Date(b.completion_date || b.date)
    );
    
    // Take the most recent 6 entries (or fewer if not available)
    // This now correctly uses ALL completions, not just one per day
    const recentEntries = sortedHistory.slice(-6);
    
    // Map to scores
    return recentEntries.map(entry => entry.score);
  };

  // Creating points for chart
  const scoreData = calculateScoreData();
  const chartWidth = getChartWidth();
  const chartHeight = 100;
  const xStep = chartWidth / (scoreData.length - 1 || 1); // Avoid division by zero
  const maxScore = 100;
  const points = scoreData.length > 1 
    ? scoreData.map((score, index) => {
        const x = index * xStep;
        const y = chartHeight - (score / maxScore) * chartHeight;
        return `${x},${y}`;
      }).join(' ')
    : `0,${chartHeight - (scoreData[0] / maxScore) * chartHeight} ${chartWidth},${chartHeight - (scoreData[0] / maxScore) * chartHeight}`;

  // Calculate average score - use ALL completions
  const calculateAverageScore = () => {
    if (!quizHistory || quizHistory.length === 0) return 0;
    
    const sum = quizHistory.reduce((total, quiz) => total + quiz.score, 0);
    return Math.round(sum / quizHistory.length);
  };
  
  // Calculate module progress
  const calculateModuleProgress = (difficulty) => {
    if (!quizHistory || quizHistory.length === 0) return 0;
    
    // Find quizzes for this difficulty
    const quizId = difficulty === 'beginner' ? 1 : (difficulty === 'intermediate' ? 2 : 3);
    const matchingQuizzes = quizHistory.filter(quiz => quiz.quiz_id === quizId);
    
    if (matchingQuizzes.length === 0) return 0;
    
    // Find highest score from ALL completions
    const highestScore = Math.max(...matchingQuizzes.map(quiz => quiz.score));
    return highestScore;
  };

  // Calculate difficulty specific stats
  const calculateDifficultyStats = (difficulty) => {
    const quizId = difficulty === 'beginner' ? 1 : (difficulty === 'intermediate' ? 2 : 3);
    const matchingQuizzes = quizHistory.filter(quiz => quiz.quiz_id === quizId);
    
    if (matchingQuizzes.length === 0) {
      return { 
        attempts: 0, 
        highestScore: 0, 
        averageScore: 0,
        passRate: 0
      };
    }
    
    const attempts = matchingQuizzes.length;
    const highestScore = Math.max(...matchingQuizzes.map(quiz => quiz.score));
    const averageScore = Math.round(matchingQuizzes.reduce((sum, quiz) => sum + quiz.score, 0) / attempts);
    const passedAttempts = matchingQuizzes.filter(quiz => quiz.score >= 70).length;
    const passRate = Math.round((passedAttempts / attempts) * 100);
    
    return { attempts, highestScore, averageScore, passRate };
  };

  // Format date function
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Unknown date';
    try {
      const date = new Date(dateStr);
      return date.toLocaleString();
    } catch (e) {
      console.error('Error formatting date:', e);
      return 'Invalid date';
    }
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
          <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" />
          <h3>Error loading statistics</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const beginnerStats = calculateDifficultyStats('beginner');
  const intermediateStats = calculateDifficultyStats('intermediate');
  const advancedStats = calculateDifficultyStats('advanced');
  
  // Get total quiz completions count
  const totalQuizCompletions = userData?.total_quizzes || quizHistory.length || 0;

  return (
    <div className="content-wrapper">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Let's see how well you are doing, {username}</h2>
        </div>
        
        <div className="statistics-grid">
          {/* Score History Card */}
          <div className="statistics-card score-history-card">
            <h3>Score History</h3>
            {quizHistory.length > 0 ? (
              <div className="chart-container">
                <svg width={chartWidth} height={chartHeight} className="line-chart">
                  {/* Grid Lines */}
                  <line x1="0" y1="0" x2={chartWidth} y2="0" stroke="#444" strokeDasharray="2"/>
                  <line x1="0" y1={chartHeight/2} x2={chartWidth} y2={chartHeight/2} stroke="#444" strokeDasharray="2" />
                  <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#444" strokeDasharray="2" />

                  {/* Line chart */}
                  <polyline
                    fill="none"
                    stroke="#646cff"
                    strokeWidth="2"
                    points={points}
                  />

                  {/* Points for each data point */}
                  {scoreData.map((score, index) => {
                    const x = index * xStep;
                    const y = chartHeight - (score / maxScore) * chartHeight;
                    return (
                      <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r="3"
                        fill="#646cff"
                      />
                    );
                  })}
                </svg>
              </div>
            ) : (
              <div className="no-data-message">
                <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                <p>Complete quizzes to see your score history</p>
              </div>
            )}
          </div>

          {/* Module Progress */}
          <div className="statistics-card module-progress-card">
            <h3>Module Progress</h3>
            <div className="module-progress-item">
              <p>Beginner - {calculateModuleProgress('beginner')}%</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: `${calculateModuleProgress('beginner')}%` }}></div>
              </div>
            </div>
            <div className="module-progress-item">
              <p>Intermediate - {calculateModuleProgress('intermediate')}%</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: `${calculateModuleProgress('intermediate')}%` }}></div>
              </div>
            </div>
            <div className="module-progress-item">
              <p>Advanced - {calculateModuleProgress('advanced')}%</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: `${calculateModuleProgress('advanced')}%` }}></div>
              </div>
            </div>
          </div>

          {/* Accuracy Card */}
          <div className="statistics-card accuracy-card">
            <h3>Average Score</h3>
            <div className="accuracy-circle">
              <div className="progress-circle" style={{
                background: `conic-gradient(#646cff ${calculateAverageScore() * 3.6}deg, #333 0)`
              }}>
                <div className="progress-circle-inner">
                  <span className="progress-percentage">{calculateAverageScore()}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quiz Completion Statistics */}
          <div className="statistics-card completion-stats-card">
            <h3>Quiz Completions</h3>
            <div className="completion-stats-grid">
              <div className="stat-item">
                <span className="stat-label">Total Completions</span>
                <span className="stat-value">{totalQuizCompletions}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Unique Quiz Days</span>
                <span className="stat-value">{userData?.quiz_days_count || 0}</span>
              </div>
              <div className="stat-item">
                <div className="stat-icon beginner-icon">
                  <FontAwesomeIcon icon={faListAlt} />
                </div>
                <span className="stat-label">Beginner Quizzes</span>
                <span className="stat-value">{userData?.difficulty_counts?.[1] || quizHistory.filter(q => q.quiz_id === 1).length}</span>
              </div>
              <div className="stat-item">
                <div className="stat-icon intermediate-icon">
                  <FontAwesomeIcon icon={faListAlt} />
                </div>
                <span className="stat-label">Intermediate Quizzes</span>
                <span className="stat-value">{userData?.difficulty_counts?.[2] || quizHistory.filter(q => q.quiz_id === 2).length}</span>
              </div>
              <div className="stat-item">
                <div className="stat-icon advanced-icon">
                  <FontAwesomeIcon icon={faListAlt} />
                </div>
                <span className="stat-label">Advanced Quizzes</span>
                <span className="stat-value">{userData?.difficulty_counts?.[3] || quizHistory.filter(q => q.quiz_id === 3).length}</span>
              </div>
            </div>
          </div>

          {/* Current Streak */}
          <div className="statistics-card streak-card">
            <h3>Streak Information</h3>
            <div className="streaks-container">
              <div className="streak-item">
                <div className="streak-icon-container">
                  <FontAwesomeIcon icon={faCalendarCheck} className="streak-icon" />
                </div>
                <div className="streak-info">
                  <p className="streak-label">Login Streak (consecutive days)</p>
                  <p className="streak-value">{userData?.login_streak || 0} {userData?.login_streak === 1 ? 'day' : 'days'}</p>
                </div>
              </div>
              <div className="streak-item">
                <div className="streak-icon-container">
                  <FontAwesomeIcon icon={faCalendarCheck} className="streak-icon" />
                </div>
                <div className="streak-info">
                  <p className="streak-label">Longest Login Streak</p>
                  <p className="streak-value">{userData?.longest_login_streak || 0} {userData?.longest_login_streak === 1 ? 'day' : 'days'}</p>
                </div>
              </div>
              <div className="streak-item">
                <div className="streak-icon-container">
                  <FontAwesomeIcon icon={faQuestionCircle} className="streak-icon" />
                </div>
                <div className="streak-info">
                  <p className="streak-label">Quiz Streak (consecutive days)</p>
                  <p className="streak-value">{userData?.quiz_streak || 0} {userData?.quiz_streak === 1 ? 'day' : 'days'}</p>
                </div>
              </div>
              <div className="streak-item">
                <div className="streak-icon-container">
                  <FontAwesomeIcon icon={faQuestionCircle} className="streak-icon" />
                </div>
                <div className="streak-info">
                  <p className="streak-label">Longest Quiz Streak</p>
                  <p className="streak-value">{userData?.longest_quiz_streak || 0} {userData?.longest_quiz_streak === 1 ? 'day' : 'days'}</p>
                </div>
              </div>
            </div>
            <div className="streak-info-box">
              <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
              <p>Streaks measure consecutive days of activity. For example, a quiz streak of 3 means you've completed at least one quiz per day for the last 3 days.</p>
            </div>
          </div>
          
          {/* Difficulty Stats Cards */}
          <div className="statistics-card difficulty-card beginner-difficulty">
            <h3>Beginner Level Stats</h3>
            {beginnerStats.attempts > 0 ? (
              <div className="difficulty-stats">
                <div className="stat-row">
                  <div className="stat-box">
                    <span className="stat-title">Attempts</span>
                    <span className="stat-value">{beginnerStats.attempts}</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-title">Average Score</span>
                    <span className="stat-value">{beginnerStats.averageScore}%</span>
                  </div>
                </div>
                <div className="stat-row">
                  <div className="stat-box">
                    <span className="stat-title">Highest</span>
                    <span className="stat-value">{beginnerStats.highestScore}%</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-title">Pass Rate</span>
                    <span className="stat-value">{beginnerStats.passRate}%</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-attempts">
                <p>No beginner quizzes completed yet</p>
              </div>
            )}
          </div>
          
          <div className="statistics-card difficulty-card intermediate-difficulty">
            <h3>Intermediate Level Stats</h3>
            {intermediateStats.attempts > 0 ? (
              <div className="difficulty-stats">
                <div className="stat-row">
                  <div className="stat-box">
                    <span className="stat-title">Attempts</span>
                    <span className="stat-value">{intermediateStats.attempts}</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-title">Average Score</span>
                    <span className="stat-value">{intermediateStats.averageScore}%</span>
                  </div>
                </div>
                <div className="stat-row">
                  <div className="stat-box">
                    <span className="stat-title">Highest</span>
                    <span className="stat-value">{intermediateStats.highestScore}%</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-title">Pass Rate</span>
                    <span className="stat-value">{intermediateStats.passRate}%</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-attempts">
                <p>No intermediate quizzes completed yet</p>
              </div>
            )}
          </div>
          
          {/* Recent Quiz Completions Card */}
          <div className="statistics-card completions-card">
            <h3>Recent Quiz Completions</h3>
            <div className="completions-list">
              {quizHistory.length > 0 ? (
                quizHistory
                  .sort((a, b) => new Date(b.completion_date || b.date) - new Date(a.completion_date || a.date))
                  .slice(0, 5)
                  .map((quiz, index) => (
                    <div key={index} className="completion-item">
                      <div className="completion-date">
                        {formatDate(quiz.completion_date || quiz.date)}
                      </div>
                      <div className="completion-info">
                        <span className="difficulty">{getDifficultyName(quiz.quiz_id)}</span>
                        <span className="score">
                          Score: {quiz.score}%
                          {quiz.score >= 70 ? (
                            <FontAwesomeIcon icon={faCheckCircle} className="pass-icon" />
                          ) : (
                            <FontAwesomeIcon icon={faTimesCircle} className="fail-icon" />
                          )}
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="no-completions">
                  <p>No quiz completions yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 2rem;
        }

        .dashboard-header {
          margin-bottom: 2rem;
        }

        .dashboard-header h2 {
          color: #ffffff;
          font-size: 1.5rem;
        }
        
        .statistics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: auto;
          gap: 1.5rem;
        }
        
        .statistics-card {
          background-color: #1a1a1a;
          border-radius: 14px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }
        
        .statistics-card h3 {
          color: #ffffff;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }
        
        .score-history-card {
          grid-column: span 2;
        }
        
        .chart-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 140px;
          padding: 20px 0;
        }
        
        .line-chart {
          background-color: #242424;
          border-radius: 8px;
          padding: 10px;
          width: 100%;
        }
        
        .module-progress-item {
          margin-bottom: 1rem;
        }
        
        .module-progress-item p {
          margin-bottom: 0.5rem;
          color: #e0e0e0;
        }
        
        .progress-bar {
          width: 100%;
          height: 10px;
          background-color: #333;
          border-radius: 5px;
          margin-top: 0.5rem;
        }

        .progress-fill {
          height: 100%;
          background-color: #646cff;
          border-radius: 5px;
          transition: width 0.3s ease;
        }
        
        .streak-card, .completions-card {
          grid-column: span 2;
        }
        
        .streaks-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
        }
        
        .streak-item {
          background-color: #242424;
          padding: 1rem;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .streak-icon-container {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(52, 152, 219, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3498db;
        }
        
        .streak-info {
          flex: 1;
        }
        
        .streak-label {
          margin: 0;
          color: #95a5a6;
          font-size: 0.9rem;
        }
        
        .streak-value {
          margin: 0;
          color: #ecf0f1;
          font-weight: bold;
          font-size: 1.2rem;
        }
        
        .streak-info-box {
          margin-top: 1rem;
          padding: 1rem;
          background-color: rgba(52, 152, 219, 0.1);
          border-radius: 6px;
          border-left: 3px solid #3498db;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }
        
        .streak-info-box .info-icon {
          color: #3498db;
          font-size: 1.2rem;
          margin-top: 2px;
        }
        
        .streak-info-box p {
          margin: 0;
          color: #e0e0e0;
          font-size: 0.9rem;
          line-height: 1.4;
        }
        
        .completion-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 1rem;
        }
        
        .stat-item {
          background-color: #242424;
          padding: 1rem;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .stat-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
          color: white;
        }
        
        .beginner-icon {
          background-color: rgba(52, 152, 219, 0.2);
          color: #3498db;
        }
        
        .intermediate-icon {
          background-color: rgba(46, 204, 113, 0.2);
          color: #2ecc71;
        }
        
        .advanced-icon {
          background-color: rgba(231, 76, 60, 0.2);
          color: #e74c3c;
        }
        
        .stat-label {
          color: #95a5a6;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }
        
        .stat-value {
          color: #ecf0f1;
          font-weight: bold;
          font-size: 1.5rem;
        }
        
        .completions-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .completion-item {
          background-color: #242424;
          padding: 0.75rem;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
        }
        
        .completion-date {
          font-size: 0.8rem;
          color: #999;
          margin-bottom: 0.25rem;
        }
        
        .completion-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .difficulty {
          font-weight: bold;
          color: #e0e0e0;
        }
        
        .score {
          color: #3498db;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .pass-icon {
          color: #2ecc71;
        }
        
        .fail-icon {
          color: #e74c3c;
        }
        
        .no-completions {
          color: #666;
          font-style: italic;
          text-align: center;
          padding: 1rem 0;
        }
        
        .accuracy-circle {
          display: flex;
          justify-content: center;
        }
        
        .progress-circle {
          width: 150px;
          height: 150px;
          position: relative;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .progress-circle-inner {
          width: 120px;
          height: 120px;
          background: #1a1a1a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .progress-percentage {
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: bold;
        }
        
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
        
        /* Difficulty stats styling */
        .difficulty-card {
          display: flex;
          flex-direction: column;
        }
        
        .difficulty-stats {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex: 1;
        }
        
        .stat-row {
          display: flex;
          gap: 1rem;
        }
        
        .stat-box {
          background-color: #242424;
          border-radius: 6px;
          padding: 0.75rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          flex: 1;
        }
        
        .stat-title {
          font-size: 0.8rem;
          color: #95a5a6;
          margin-bottom: 0.25rem;
        }
        
        .no-attempts, .no-data-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          color: #95a5a6;
          font-style: italic;
          flex: 1;
          text-align: center;
          gap: 0.5rem;
        }
        
        .info-icon {
          font-size: 1.5rem;
          color: #3498db;
        }
        
        @media (max-width: 768px) {
          .statistics-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .score-history-card, 
          .streak-card,
          .completions-card {
            grid-column: span 1;
          }
          
          .dashboard-container {
            padding: 1rem;
          }
          
          .streaks-container {
            grid-template-columns: 1fr;
          }
          
          .completion-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 480px) {
          .progress-circle {
            width: 100px;
            height: 100px;
          }
          
          .progress-circle-inner {
            width: 75px;
            height: 75px;
          }
          
          .progress-percentage {
            font-size: 1.2rem;
          }
          
          .completion-stats-grid {
            grid-template-columns: 1fr;
          }
          
          .stat-row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
  
  // Helper function
  function getDifficultyName(quizId) {
    switch (quizId) {
      case 1: return 'Beginner';
      case 2: return 'Intermediate';
      case 3: return 'Advanced';
      default: return 'Unknown';
    }
  }
};

export default Statistics;