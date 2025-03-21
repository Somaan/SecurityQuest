import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireFlameSimple, faSpinner, faExclamationTriangle, faCalendarCheck, faQuestionCircle, faClock } from '@fortawesome/free-solid-svg-icons';
import { API_ENDPOINTS } from './constants';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const username = sessionStorage.getItem('username') || 'User';
  const userId = sessionStorage.getItem('userId') || '1';
  
  const [userData, setUserData] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data and achievements
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Fetch user streaks
        const streaksResponse = await fetch(API_ENDPOINTS.GET_USER_STREAKS.replace(':userId', userId));
        if (!streaksResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        const streaksData = await streaksResponse.json();
        
        // Fetch user achievements
        const achievementsResponse = await fetch(API_ENDPOINTS.GET_USER_ACHIEVEMENTS.replace(':userId', userId));
        if (!achievementsResponse.ok) {
          throw new Error('Failed to fetch achievements');
        }
        const achievementsData = await achievementsResponse.json();
        
        console.log('User streaks data:', streaksData);
        console.log('User achievements data:', achievementsData);
        
        setUserData(streaksData.userData || {});
        setQuizHistory(streaksData.quizHistory || []);
        setAchievements(achievementsData.achievements || []);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [userId]);

  // Calculate overall progress based on completed quizzes and achievements
  const calculateProgress = () => {
    if (!userData) return 0;
    
    // Calculate based on total quiz completions (not just unique days) and achievements
    const totalCompletions = userData.total_quizzes || quizHistory.length || 0;
    const unlockedAchievements = achievements.filter(a => a.unlocked).length || 0;
    
    // Simple algorithm for progress
    const progress = Math.min(100, (totalCompletions * 10 + unlockedAchievements * 5));
    
    return Math.round(progress) || 0;
  };

  if (loading) {
    return (
      <div className="content-wrapper">
        <div className="dashboard-container">
          <div className="dashboard-loading">
            <FontAwesomeIcon icon={faSpinner} spin className="loading-icon" />
            <p>Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-wrapper">
        <div className="dashboard-container">
          <div className="dashboard-error">
            <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" />
            <h3>Error loading dashboard</h3>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Get recent unlocked achievements
  const recentAchievements = achievements
    .filter(achievement => achievement.unlocked)
    .slice(0, 2);

  // Get most recent quiz completions
  const recentQuizzes = quizHistory
    .sort((a, b) => new Date(b.completion_date || b.date) - new Date(a.completion_date || a.date))
    .slice(0, 3); // Show up to 3 recent quizzes

  // Get total quiz completions
  const totalQuizCompletions = userData?.total_quizzes || quizHistory.length || 0;

  return (
    <div className="content-wrapper">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Welcome, {username}</h2>
        </div>
        
        <div className="dashboard-grid">
          <div className="dashboard-card beginner-card">
            <h3>Beginner</h3>
            <div className="course-item">
              <p>Phishing Basics</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ 
                  width: `${getBeginner()}%` 
                }}></div>
              </div>
            </div>
          </div>

          <div className="dashboard-card intermediate-card">
            <h3>Intermediate</h3>
            <div className="course-item">
              <p>Advanced Vectors</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ 
                  width: `${getIntermediate()}%` 
                }}></div>
              </div>
            </div>
          </div>

          <div className="dashboard-card advanced-card">
            <h3>Advanced</h3>
            <div className="course-item">
              <p>Corporate Security</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ 
                  width: `${getAdvanced()}%` 
                }}></div>
              </div>
            </div>
          </div>

          <div className="dashboard-card progress-card">
            <h3>Overall Progress</h3>
            <div className="progress-circle">
              <div className="progress-circle-inner">
                <span className="progress-percentage">{calculateProgress()}%</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card activity-card">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {recentQuizzes.length > 0 ? (
                recentQuizzes.map((quiz, index) => (
                  <p key={`quiz-${index}`}>
                    Completed {getDifficultyName(quiz.quiz_id)} quiz with a score of: {quiz.score}%
                    {quiz.score >= 70 && 
                      <FontAwesomeIcon icon={faFireFlameSimple} style={{ color: '#ff6b6b', marginLeft: '6px' }} />
                    }
                    <span className="quiz-timestamp">
                      {formatDate(quiz.completion_date || quiz.date)}
                    </span>
                  </p>
                ))
              ) : (
                <p>No quizzes completed yet. Try taking a quiz!</p>
              )}
              
              {recentAchievements.map((achievement, index) => (
                <p key={`achievement-${index}`}>
                  Earned "{achievement.title}" Achievement 
                  <FontAwesomeIcon icon={faFireFlameSimple} style={{ color: '#ff6b6b', marginLeft: '6px' }} />
                </p>
              ))}
              
              {userData && userData.login_streak > 1 && (
                <p>
                  Login streak: {userData.login_streak} days
                  <FontAwesomeIcon icon={faFireFlameSimple} style={{ color: '#ff6b6b', marginLeft: '6px' }} />
                </p>
              )}
              
              {(!userData || (recentQuizzes.length === 0 && recentAchievements.length === 0 && !(userData.login_streak > 1))) && (
                <p>No recent activity. Try taking a quiz!</p>
              )}
            </div>
          </div>
          
          <div className="dashboard-card quiz-stats-card">
            <h3>Quiz Statistics</h3>
            <div className="quiz-stats-grid">
              <div className="stat-item">
                <div className="stat-icon">
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </div>
                <div className="stat-label">Total Completions</div>
                <div className="stat-value">{totalQuizCompletions}</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <FontAwesomeIcon icon={faCalendarCheck} />
                </div>
                <div className="stat-label">Unique Quiz Days</div>
                <div className="stat-value">{userData?.quiz_days_count || 0}</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <FontAwesomeIcon icon={faFireFlameSimple} />
                </div>
                <div className="stat-label">Quiz Streak</div>
                <div className="stat-value">
                  {userData?.quiz_streak || 0}
                  <span className="stat-unit"> {userData?.quiz_streak === 1 ? 'day' : 'days'}</span>
                </div>
                <div className="stat-tooltip">
                  Consecutive days with at least one quiz
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div className="stat-label">Longest Streak</div>
                <div className="stat-value">
                  {userData?.longest_quiz_streak || 0}
                  <span className="stat-unit"> {userData?.longest_quiz_streak === 1 ? 'day' : 'days'}</span>
                </div>
              </div>
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

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: auto;
          gap: 1.5rem;
        }

        .dashboard-card {
          background-color: #1a1a1a;
          border-radius: 14px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }

        .dashboard-card h3 {
          color: #ffffff;
          margin-bottom: 1rem;
          font-size: 1.2rem;
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

        .activity-card {
          grid-column: span 2;
        }

        .activity-list p {
          color: #e0e0e0;
          margin: 0.5rem 0;
          padding: 0.5rem;
          border-radius: 4px;
          background-color: #242424;
        }

        .progress-circle {
          width: 150px;
          height: 150px;
          margin: 1rem auto;
          position: relative;
          background: conic-gradient(#646cff calc(var(--progress) * 3.6deg), #333 0);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          --progress: ${calculateProgress()};
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
        
        .dashboard-loading,
        .dashboard-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          text-align: center;
        }
        
        .loading-icon, 
        .error-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .error-icon {
          color: #e74c3c;
        }
        
        .retry-btn {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          margin-top: 1rem;
          cursor: pointer;
        }
        
        .retry-btn:hover {
          background-color: #2980b9;
        }
        
        .quiz-timestamp {
          font-size: 0.8rem;
          color: #999;
          margin-left: 10px;
          display: block;
        }
        
        .quiz-stats-card {
          grid-column: span 2;
        }
        
        .quiz-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        
        .stat-item {
          background-color: #242424;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          position: relative;
        }

        .stat-icon {
          background-color: rgba(100, 108, 255, 0.2);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.75rem;
          color: #646cff;
        }
        
        .stat-label {
          font-size: 0.9rem;
          color: #999;
          margin-bottom: 0.5rem;
        }
        
        .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: #646cff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-unit {
          font-size: 0.9rem;
          color: #aaa;
          font-weight: normal;
        }

        .stat-tooltip {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          background: #2c3e50;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 0.8rem;
          color: #ecf0f1;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
          z-index: 10;
          width: max-content;
          max-width: 200px;
          pointer-events: none;
        }

        .stat-tooltip:after {
          content: '';
          position: absolute;
          top: -5px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 0 5px 5px 5px;
          border-style: solid;
          border-color: transparent transparent #2c3e50 transparent;
        }

        .stat-item:hover .stat-tooltip {
          opacity: 1;
          visibility: visible;
          bottom: -30px;
        }
        
        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .activity-card, .quiz-stats-card {
            grid-column: span 1;
          }
          
          .quiz-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .dashboard-container {
            padding: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .quiz-stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
  
  // Helper functions
  function getBeginner() {
    // Check if user has completed beginner quizzes
    const beginnerQuizzes = quizHistory.filter(q => q.quiz_id === 1);
    if (beginnerQuizzes.length === 0) return 0;
    
    // Return highest score from all completions (not just one per day)
    const highestScore = Math.max(...beginnerQuizzes.map(q => q.score));
    return highestScore;
  }
  
  function getIntermediate() {
    // Check if user has completed intermediate quizzes
    const intermediateQuizzes = quizHistory.filter(q => q.quiz_id === 2);
    if (intermediateQuizzes.length === 0) return 0;
    
    // Return highest score from all completions
    const highestScore = Math.max(...intermediateQuizzes.map(q => q.score));
    return highestScore;
  }
  
  function getAdvanced() {
    // Check if user has completed advanced quizzes
    const advancedQuizzes = quizHistory.filter(q => q.quiz_id === 3);
    if (advancedQuizzes.length === 0) return 0;
    
    // Return highest score from all completions
    const highestScore = Math.max(...advancedQuizzes.map(q => q.score));
    return highestScore;
  }
  
  function getDifficultyName(quizId) {
    switch (quizId) {
      case 1: return 'Beginner';
      case 2: return 'Intermediate';
      case 3: return 'Advanced';
      default: return 'Unknown';
    }
  }
  
  function formatDate(dateString) {
    if (!dateString) return 'Unknown date';
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (e) {
      console.error('Error formatting date:', e);
      return 'Invalid date';
    }
  }
};

export default Dashboard;