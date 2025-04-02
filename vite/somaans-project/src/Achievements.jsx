import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrophy, 
  faMedal, 
  faShield, 
  faStar, 
  faCalendarCheck,
  faExclamationTriangle,
  faSpinner,
  faAward,
  faGraduationCap,
  faCertificate,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { API_ENDPOINTS } from './constants';
import { toast } from 'react-toastify';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = sessionStorage.getItem('username') || 'User';
  const userId = sessionStorage.getItem('userId') || '1';

  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true);
      try {
        // Call the real API endpoint
        console.log('Fetching achievements for user:', userId);
        const response = await fetch(API_ENDPOINTS.GET_USER_ACHIEVEMENTS.replace(':userId', userId));
        
        if (!response.ok) {
          throw new Error('Failed to load achievements');
        }
        
        const data = await response.json();
        console.log('Achievements data:', data);
        
        if (data.success && data.achievements) {
          setAchievements(data.achievements);
        } else {
          throw new Error('Invalid achievement data format');
        }
      } catch (err) {
        console.error('Error fetching achievements:', err);
        setError(err.message);
        toast.error('Failed to load achievements');
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [userId]);

  // Helper function to get icon based on achievement title or icon property
  const getIconForAchievement = (achievement) => {
    // If the achievement has an icon property, use it
    if (achievement.icon) {
      switch (achievement.icon.toLowerCase()) {
        case 'star': return faStar;
        case 'shield': return faShield;
        case 'calendar-check': return faCalendarCheck;
        case 'trophy': return faTrophy;
        case 'medal': return faMedal;
        case 'award': return faAward;
        case 'certificate': return faCertificate;
        case 'graduation-cap': return faGraduationCap;
        case 'check': return faCheck;
        default: return faStar;
      }
    }
    
    // Otherwise, try to determine icon from title
    if (achievement.title.includes('Star') || achievement.title.includes('Learner')) {
      return faStar;
    } else if (achievement.title.includes('Champion') || achievement.title.includes('Security')) {
      return faShield;
    } else if (achievement.title.includes('Streak') || achievement.title.includes('Login')) {
      return faCalendarCheck;
    } else if (achievement.title.includes('Master')) {
      return faTrophy;
    } else {
      return faMedal;
    }
  };

  if (loading) {
    return (
      <div className="content-wrapper">
        <div className="loading-container">
          <FontAwesomeIcon icon={faSpinner} spin className="loading-spinner" />
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

  // Sort achievements: unlocked first, then by progress
  const sortedAchievements = [...achievements].sort((a, b) => {
    // First by unlocked status
    if (a.unlocked && !b.unlocked) return -1;
    if (!a.unlocked && b.unlocked) return 1;
    
    // Then by progress for locked achievements
    if (!a.unlocked && !b.unlocked) {
      return b.progress - a.progress;
    }
    
    // Then by title
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="content-wrapper">
      <div className="achievements-container">
        <div className="achievements-header">
          <h2>Let's see what achievements you've received, {username}</h2>
          <h3>As you complete quizzes, you will be able to view your achievements here.</h3>
        </div>
        
        <div className="achievements-grid">
          {sortedAchievements.length > 0 ? (
            sortedAchievements.map(achievement => (
              <div key={achievement.id} className="achievement-card">
                <div 
                  className={`achievement-icon ${!achievement.unlocked && 'locked'}`}
                  style={{backgroundColor: achievement.unlocked ? achievement.color || '#646cff' : '#ccc'}}
                >
                  <FontAwesomeIcon icon={getIconForAchievement(achievement)} />
                </div>
                
                <div className="achievement-details">
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                  
                  {achievement.unlocked ? (
                    <div className="achievement-unlocked">
                      <FontAwesomeIcon icon={faCheck} className="check-icon" /> Unlocked!
                    </div>
                  ) : (
                    <div className="achievement-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{width: `${achievement.progress}%`}}
                        ></div>
                      </div>
                      <span className="progress-text">{Math.round(achievement.progress)}%</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-achievements">
              <FontAwesomeIcon icon={faTrophy} className="no-achievements-icon" />
              <p>No achievements yet. Complete quizzes to earn achievements!</p>
            </div>
          )}
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
        
        .achievements-header h3 {
          color: #e0e0e0;
          font-size: 1rem;
          font-weight: normal;
          margin-top: 0.5rem;
        }
        
        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
          transition: transform 0.2s ease;
        }
        
        .achievement-card:hover {
          transform: translateY(-5px);
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
          transition: all 0.2s ease;
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
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .check-icon {
          font-size: 0.9rem;
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
          margin-bottom: 5px;
        }
        
        .progress-fill {
          height: 100%;
          background-color: #646cff;
          border-radius: 5px;
          transition: width 0.3s ease;
        }
        
        .progress-text {
          font-size: 0.8rem;
          color: #bdc3c7;
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
          margin-bottom: 1rem;
          color: #3498db;
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
        
        .no-achievements {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          background-color: #1a1a1a;
          border-radius: 14px;
          text-align: center;
        }
        
        .no-achievements-icon {
          font-size: 3rem;
          color: #95a5a6;
          margin-bottom: 1rem;
        }
        
        .no-achievements p {
          color: #e0e0e0;
          font-size: 1.1rem;
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