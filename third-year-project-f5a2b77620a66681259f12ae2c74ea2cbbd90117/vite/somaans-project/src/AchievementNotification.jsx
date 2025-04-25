import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  faTimes,
  faUser,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

// Achievement notification component that can be used globally
const AchievementNotification = ({ achievement, onClose }) => {
  const [animationState, setAnimationState] = useState("hidden");
  const [iconAnimation, setIconAnimation] = useState("");

  // Start animations when component mounts
  useEffect(() => {
    // Guard against null/undefined achievement
    if (!achievement) {
      console.warn("Received null or undefined achievement in notification");
      if (onClose) onClose();
      return;
    }

    console.log("Showing achievement notification:", achievement);

    // Start animations with a slight delay to ensure smooth rendering
    setTimeout(() => {
      setAnimationState("showing");
      setIconAnimation("pulse");
    }, 100);

    // Auto-dismiss after 5 seconds
    const showTimer = setTimeout(() => {
      setAnimationState("hiding");
      setIconAnimation("");
    }, 5000);

    const hideTimer = setTimeout(() => {
      if (onClose) onClose();
    }, 5500); // Additional 500ms for hiding animation

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [onClose, achievement]);

  // Helper function to get appropriate icon
  const getIconForAchievement = (achievement) => {
    // Guard against null/undefined achievement
    if (!achievement) {
      return faStar;
    }

    // If the achievement has an icon property, use it
    if (achievement.icon && typeof achievement.icon === "string") {
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
        case "user":
          return faUser;
        default:
          return faStar;
      }
    }

    // Otherwise, try to determine icon from title
    const title = achievement.title || "";
    if (title.includes("Star") || title.includes("Learner")) {
      return faStar;
    } else if (title.includes("Champion") || title.includes("Security")) {
      return faShield;
    } else if (
      title.includes("Streak") ||
      title.includes("Login") ||
      title.includes("Dedicated") ||
      title.includes("Weekly") ||
      title.includes("Monthly")
    ) {
      return faCalendarCheck;
    } else if (title.includes("Master")) {
      return faTrophy;
    } else {
      return faMedal;
    }
  };

  // Guard against null/undefined achievement
  if (!achievement) {
    return null;
  }

  // Safely extract achievement properties with defaults
  const {
    title = "Achievement Unlocked",
    description = "You've earned a new achievement!",
    color = "#646cff",
  } = achievement;

  return (
    <div className={`achievement-notification ${animationState}`}>
      <div className="achievement-content">
        <div
          className={`achievement-icon ${iconAnimation}`}
          style={{ backgroundColor: color }}
        >
          <FontAwesomeIcon icon={getIconForAchievement(achievement)} />
        </div>
        <div className="achievement-details">
          <h3>Achievement Unlocked!</h3>
          <h4>{title}</h4>
          <p>{description}</p>
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
          opacity: 0;
          transform: translateX(400px) translateY(-20px);
          transition: transform 0.6s cubic-bezier(0.17, 0.67, 0.21, 1.69),
            opacity 0.5s ease;
        }

        .achievement-notification.hidden {
          opacity: 0;
          transform: translateX(400px) translateY(-20px);
          pointer-events: none;
        }

        .achievement-notification.showing {
          opacity: 1;
          transform: translateX(0) translateY(0);
          pointer-events: all;
          animation: bounceIn 0.6s cubic-bezier(0.17, 0.67, 0.21, 1.69);
        }

        .achievement-notification.hiding {
          opacity: 0;
          transform: translateX(400px) translateY(0);
          transition: transform 0.5s cubic-bezier(0.55, 0.08, 0.68, 0.53),
            opacity 0.5s ease;
        }

        @keyframes bounceIn {
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
            transform: translateX(0) translateY(0);
          }
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
          position: relative;
          overflow: hidden;
        }

        .achievement-icon:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(255, 255, 255, 0) 70%
          );
          opacity: 0;
        }

        .achievement-icon.pulse {
          animation: iconPulse 2s ease-in-out infinite;
        }

        .achievement-icon.pulse:after {
          animation: iconGlow 2s ease-in-out infinite;
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

        .achievement-content {
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }

        .achievement-content:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(
            to right,
            ${typeof color === "string" ? color : "#646cff"},
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
          opacity: 0.7;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .close-btn:hover {
          color: #ffffff;
          opacity: 1;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default AchievementNotification;
