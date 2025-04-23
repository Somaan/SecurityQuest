import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ROUTES } from './Routes';

/** 
- Implements a custom image-based CAPTCHA system
- Users must select correct cells containing a bus to verify they are human
*/

const CAPTCHA = ({ onSuccess }) => {
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Available bus images - Fix the paths to look in the right location
  const busImages = [
    '/images/bus1.jpg',
    '/images/bus2.jpg',
    '/images/bus3.jpg',
    '/images/bus4.jpg',
    '/images/bus5.jpg'
  ];

  // Array to define correct cells in CAPTCHA
  const correctCellsMap = [
    new Set([4, 5, 6, 7, 8]), 
    new Set([0, 1, 3, 4]),    
    new Set([2, 3, 4, 5, 8]),  
    new Set([4, 5, 7, 8]),
    new Set([0, 3, 6])
  ];

  // Randomize image
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * busImages.length);
    setCurrentImageIndex(randomIndex);
  };

  // Initialize with random image
  useEffect(() => {
    getRandomImage();
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    
    const currentCorrectCells = correctCellsMap[currentImageIndex];
    const isCorrect = selectedCells.size === currentCorrectCells.size && 
      [...selectedCells].every(cell => currentCorrectCells.has(cell));
    
    if (isCorrect) {
      // Set authentication in session storage
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('username', sessionStorage.getItem('username') || 'User');
      
      // Show success toast
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      });
      
      // Redirect to dashboard immediately
      window.location.href = ROUTES.DASHBOARD;
      
      // Also call the onSuccess callback if needed
      if (onSuccess) onSuccess();
    } else {
      toast.error("Incorrect selection. Please try again.", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      });
      setSelectedCells(new Set());
      getRandomImage(); // new image on incorrect instance
    }
  };

  return (
    <div className="captcha-container">
      <div className="captcha-overlay"></div>
      <div className="captcha-modal">
        <div className="captcha-header">
          <p className="captcha-title">Select all images that includes:</p>
          <p className="captcha-subtitle">A bus</p>
          
        </div>
        <div className="captcha-image-container">
          <img 
            src={busImages[currentImageIndex]}
            alt="CAPTCHA"
            className="captcha-image"
          />
          <div className="captcha-grid">
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className={`captcha-cell ${selectedCells.has(index) ? 'selected' : ''}`}
                onClick={() => {
                  const newSelected = new Set(selectedCells);
                  if (newSelected.has(index)) {
                    newSelected.delete(index);
                  } else {
                    newSelected.add(index);
                  }
                  setSelectedCells(newSelected);
                }}
              >
                <span className="captcha-cell-index">{index}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="captcha-actions">
          <button
            onClick={handleVerify}
            type="button"
            className="captcha-verify-btn"
          >
            Verify
          </button>
        </div>
      </div>
      
      <style>
        {`
        .captcha-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 9998;
        }
        
        .captcha-modal {
          width: 360px;
          background-color: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          z-index: 9999;
        }
        
        .captcha-header {
          background-color: #4A90E2;
          padding: 16px;
          color: white;
          text-align: center;
        }
        
        .captcha-title {
          font-size: 18px;
          margin-bottom: 4px;
        }
        
        .captcha-subtitle {
          font-size: 24px;
          font-weight: bold;
        }
        
        .captcha-note {
          font-size: 14px;
          margin-top: 4px;
          opacity: 0.9;
        }
        
        .captcha-image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
        }
        
        .captcha-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(1.2);
        }
        
        .captcha-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 2px;
        }
        
        .captcha-cell {
          border: 2px solid rgba(255, 255, 255, 0.7);
          cursor: pointer;
          background-color: rgba(255, 255, 255, 0.1);
          transition: all 0.2s ease;
          position: relative;
        }
        
        .captcha-cell.selected {
          background-color: rgba(66, 133, 244, 0.5);
        }
        
        .captcha-cell-index {
          position: absolute;
          top: 5px;
          left: 5px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
          transition: all 0.2s ease;
          box-shadow: none;
        }
        
        .captcha-cell.selected .captcha-cell-index {
          background: rgba(66, 133, 244, 0.9);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .captcha-actions {
          padding: 12px;
          display: flex;
          justify-content: flex-end;
          border-top: 1px solid #ddd;
          background-color: #f9f9f9;
        }
        
        .captcha-verify-btn {
          background-color: #4A90E2;
          color: white;
          padding: 8px 24px;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          text-transform: uppercase;
          transition: background-color 0.2s;
        }
        
        .captcha-verify-btn:hover {
          background-color: #357ABD;
        }
        `}
      </style>
    </div>
  );
};

export default CAPTCHA;