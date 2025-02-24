import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireFlameSimple } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const username = sessionStorage.getItem('username') || 'User';

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
                <div className="progress-fill" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>

          <div className="dashboard-card intermediate-card">
            <h3>Intermediate</h3>
            <div className="course-item">
              <p>Advanced Vectors</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>

          <div className="dashboard-card advanced-card">
            <h3>Advanced</h3>
            <div className="course-item">
              <p>Corporate Security</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>

          <div className="dashboard-card progress-card">
            <h3>Overall Progress</h3>
            <div className="progress-circle">
              <div className="progress-circle-inner">
                <span className="progress-percentage">60%</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card activity-card">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <p>Completed Phishing Basics Module</p>
              <p>Earned "Quick Learner" Achievement <FontAwesomeIcon icon={faFireFlameSimple} style={{ color: '#ff6b6b', marginLeft: '6px' }} /></p>
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
          background: conic-gradient(#646cff 216deg, #333 0);
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

        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .activity-card {
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

export default Dashboard;