import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  faTimes
} from '@fortawesome/free-solid-svg-icons';

// Achievement notification component that can be used globally
const AchievementNotification = ({ achievement, onClose }) => {
  const [animationState, setAnimationState] = useState('showing');
  
  // Auto-dismiss after 5 seconds
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setAnimationState('hiding');
    }, 5000);
    
    const hideTimer = setTimeout(() => {
      if (onClose) onClose();
    }, 5500); // Additional 500ms for hiding animation
    
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [onClose]);
  
  // Helper function to get appropriate icon
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
  
  return (
    <div className={`achievement-notification ${animationState}`}>
      <div className="achievement-content">
        <div 
          className="achievement-icon" 
          style={{backgroundColor: achievement.color || '#646cff'}}
        >
          <FontAwesomeIcon icon={getIconForAchievement(achievement)} />
        </div>
        <div className="achievement-details">
          <h3>Achievement Unlocked!</h3>
          <h4>{achievement.title}</h4>
          <p>{achievement.description}</p>
        </div>
        <button className="close-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      
      <style jsx>{`
        .achievement-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
          width: 320px;
          max-width: 90vw;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          border-radius: 12px;
          overflow: hidden;
          background-color: #1a1a1a;
          transform: translateX(400px);
          transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .achievement-notification.showing {
          transform: translateX(0);
        }
        
        .achievement-notification.hiding {
          transform: translateX(400px);
        }
        
        .achievement-content {
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .achievement-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        
        .achievement-details {
          flex: 1;
        }
        
        .achievement-details h3 {
          color: #646cff;
          margin: 0 0 0.25rem 0;
          font-size: 0.9rem;
        }
        
        .achievement-details h4 {
          color: #ffffff;
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
        }
        
        .achievement-details p {
          color: #b3b3b3;
          margin: 0;
          font-size: 0.85rem;
        }
        
        .close-btn {
          background: none;
          border: none;
          color: #b3b3b3;
          font-size: 1rem;
          cursor: pointer;
          padding: 4px;
          line-height: 1;
          align-self: flex-start;
        }
        
        .close-btn:hover {
          color: #ffffff;
        }
      `}</style>
    </div>
  );
};

export default AchievementNotification;