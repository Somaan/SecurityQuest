import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMedal, 
  faSpinner, 
  faExclamationTriangle 
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
        
        setUserData(data.userData || null);
        setQuizHistory(data.quizHistory || []);
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

  // Calculate score data for line chart from quiz history
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

  // Calculate average score
  const calculateAverageScore = () => {
    if (!quizHistory || quizHistory.length === 0) return 30; // Default
    
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
    
    // Find highest score
    const highestScore = Math.max(...matchingQuizzes.map(quiz => quiz.score));
    return highestScore;
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
              <div className="progress-circle" style={{background: `conic-gradient(#646cff ${calculateAverageScore() * 3.6}deg, #333 0)`}}>
                <div className="progress-circle-inner">
                  <span className="progress-percentage">{calculateAverageScore()}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Streak - Updated to match Dashboard style */}
          <div className="statistics-card streak-card">
            <h3>Current Streaks</h3>
            <div className="streaks-container">
              <div className="streak-item">
                <p>Login Streak: <span className="streak-value">{userData?.login_streak || 0} days</span></p>
              </div>
              <div className="streak-item">
                <p>Quiz Streak: <span className="streak-value">{userData?.quiz_streak || 0} days</span></p>
              </div>
              <div className="streak-item">
                <p>Longest Login Streak: <span className="streak-value">{userData?.longest_login_streak || 0} days</span></p>
              </div>
              <div className="streak-item">
                <p>Longest Quiz Streak: <span className="streak-value">{userData?.longest_quiz_streak || 0} days</span></p>
              </div>
              <div className="streak-item">
                <p>Total Quizzes Completed: <span className="streak-value">{quizHistory?.length || 0}</span></p>
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
        
        .streak-card {
          grid-column: span 2;
        }
        
        .streaks-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
        }
        
        .streak-item {
          background-color: #242424;
          padding: 0.75rem;
          border-radius: 6px;
        }
        
        .streak-item p {
          margin: 0;
          color: #e0e0e0;
        }
        
        .streak-value {
          font-weight: bold;
          color: #3498db;
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
        
        @media (max-width: 768px) {
          .statistics-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .score-history-card, 
          .streak-card {
            grid-column: span 1;
          }
          
          .dashboard-container {
            padding: 1rem;
          }
          
          .streaks-container {
            grid-template-columns: 1fr;
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
        }
      `}</style>
    </div>
  );
};

export default Statistics;