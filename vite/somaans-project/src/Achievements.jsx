import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrophy, 
  faMedal, 
  faShield, 
  faStar, 
  faCalendarCheck,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { API_ENDPOINTS } from './constants';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = sessionStorage.getItem('username') || 'User';

  useEffect(() => {
    // Since you may not have the backend endpoint implemented yet, we'll use mock data
    const fetchAchievements = async () => {
      setLoading(true);
      try {
        // For future integration with real API
        // const userId = sessionStorage.getItem('userId');
        // const response = await fetch(API_ENDPOINTS.GET_USER_ACHIEVEMENTS.replace(':userId', userId));
        // const data = await response.json();
        // setAchievements(data.achievements);
        
        // Mock data based on your mockup
        const mockAchievements = [
          {
            id: 1,
            title: 'Quick Learner',
            description: '3 correct in a row',
            icon: faStar,
            color: '#c0a43c', // gold
            unlocked: true,
            progress: 100
          },
          {
            id: 2,
            title: 'Rising Star',
            description: '3 correct in a row',
            icon: faStar,
            color: '#a9a9a9', // silver
            unlocked: false,
            progress: 66
          },
          {
            id: 3,
            title: 'Security Champion',
            description: '#1 on leaderboard',
            icon: faShield,
            color: '#b87333', // bronze
            unlocked: false,
            progress: 25
          },
          {
            id: 4,
            title: 'Dedicated Learner',
            description: '5 day login streak',
            icon: faCalendarCheck,
            color: '#a9a9a9', // silver
            unlocked: true,
            progress: 100
          }
        ];
        
        // Simulate API delay
        setTimeout(() => {
          setAchievements(mockAchievements);
          setLoading(false);
        }, 800);
      } catch (err) {
        console.error('Error fetching achievements:', err);
        setError('Failed to load achievements. Please try again later.');
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) {
    return (
      <div className="content-wrapper">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading achievements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-wrapper">
        <div className="error-container">
          <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" />
          <h3>Error</h3>
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
      <div className="achievements-container">
        <div className="achievements-header">
          <h2>Let's see how well you are doing, {username}</h2>
        </div>
        
        <div className="achievements-grid">
          {achievements.map(achievement => (
            <div key={achievement.id} className="achievement-card">
              <div 
                className={`achievement-icon ${!achievement.unlocked && 'locked'}`}
                style={{backgroundColor: achievement.unlocked ? achievement.color : '#ccc'}}
              >
                <FontAwesomeIcon icon={achievement.icon} />
              </div>
              
              <div className="achievement-details">
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                
                {achievement.unlocked ? (
                  <div className="achievement-unlocked">Unlocked!</div>
                ) : (
                  <div className="achievement-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{width: `${achievement.progress}%`}}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .achievements-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .achievements-header {
          margin-bottom: 2rem;
        }
        
        .achievements-header h2 {
          color: #ffffff;
          font-size: 1.5rem;
        }
        
        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        
        .achievement-card {
          background-color: #1a1a1a;
          border-radius: 14px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        
        .achievement-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        
        .achievement-icon.locked {
          opacity: 0.7;
          filter: grayscale(0.8);
        }
        
        .achievement-details {
          flex: 1;
        }
        
        .achievement-details h3 {
          color: #ffffff;
          margin: 0 0 0.5rem 0;
          font-size: 1.2rem;
        }
        
        .achievement-details p {
          color: #e0e0e0;
          margin: 0 0 1rem 0;
          font-size: 0.9rem;
        }
        
        .achievement-unlocked {
          color: #4caf50;
          font-weight: bold;
        }
        
        .achievement-progress {
          margin-top: 0.5rem;
        }
        
        .progress-bar {
          width: 100%;
          height: 10px;
          background-color: #333;
          border-radius: 5px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background-color: #646cff;
          border-radius: 5px;
          transition: width 0.3s ease;
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
          width: 40px;
          height: 40px;
          border: 4px solid rgba(52, 152, 219, 0.3);
          border-top-color: #3498db;
          border-radius: 50%;
          animation: spin 1s infinite linear;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
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
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .achievements-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .achievements-container {
            padding: 1rem;
          }
          
          .achievement-card {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Achievements;