import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';

const Statistics = () => {
  // Get username from session storage (same as Dashboard.jsx)
  const username = sessionStorage.getItem('username') || 'User';

  // Placeholder data for the line chart (would come from API/backend in a real app)
  const scoreData = [65, 75, 70, 85, 80, 90];
  
  // Create points for the line chart
  const chartWidth = 500;
  const chartHeight = 100;
  const xStep = chartWidth / (scoreData.length - 1);
  const maxScore = 100;
  const points = scoreData.map((score, index) => {
    const x = index * xStep;
    const y = chartHeight - (score / maxScore) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

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
                {/* Grid lines */}
                <line x1="0" y1="0" x2={chartWidth} y2="0" stroke="#444" strokeDasharray="2" />
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

          {/* Module Progress Card */}
          <div className="statistics-card module-progress-card">
            <h3>Module Progress</h3>
            <div className="module-progress-item">
              <p>Beginner - 100%</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>

          {/* Accuracy Card */}
          <div className="statistics-card accuracy-card">
            <h3>Accuracy</h3>
            <div className="accuracy-circle">
              <div className="progress-circle">
                <div className="progress-circle-inner">
                  <span className="progress-percentage">30%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Streak Card */}
          <div className="statistics-card streak-card">
            <h3>Current Streak</h3>
            <div className="streak-content">
              <p>
                5 Days - <span className="streak-badge">"Dedicated Learner"</span>
                <FontAwesomeIcon icon={faMedal} style={{ color: '#FFD700', marginLeft: '6px' }} />
              </p>
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
          max-width: 700px;
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
        
        .streak-content {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.5rem;
        }
        
        .streak-content p {
          font-size: 1.2rem;
          color: #e0e0e0;
        }
        
        .streak-badge {
          color: #FFD700;
          font-weight: bold;
        }
        
        .accuracy-circle {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
        }
        
        .progress-circle {
          width: 120px;
          height: 120px;
          position: relative;
          background: conic-gradient(#646cff 108deg, #333 0);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .progress-circle-inner {
          width: 90px;
          height: 90px;
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
        
        @media (max-width: 768px) {
          .statistics-grid {
            grid-template-columns: 1fr;
          }
          
          .score-history-card,
          .streak-card {
            grid-column: span 1;
          }
          
          .dashboard-container {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Statistics;