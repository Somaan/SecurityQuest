import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CAPTCHA = ({ onSuccess }) => {
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  //array to define correct cells in CAPTCHA
  const correctCellsMap = [
    new Set([4, 5, 6, 7, 8]), //set1 = 4, 5, 6, 7, 8
    new Set([0, 1, 3, 4]),    //set2 = 0, 1, 3, 4
    new Set([2, 3, 4, 5, 8])  //set3 = 2, 3, 4, 5, 8
  ];

  const busImages = [
    '/src/images/bus1.jpg',
    '/src/images/bus2.jpg',
    '/src/images/bus3.jpg'
  ];

  // Prevent navigation across unidentified pages
  useEffect(() => {
    const preventNavigation = (e) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    const preventBackButton = (e) => {
      e.preventDefault();
      window.history.pushState(null, null, window.location.pathname);
    };

    window.addEventListener('beforeunload', preventNavigation);
    window.addEventListener('popstate', preventBackButton);
    window.history.pushState(null, null, window.location.pathname);

    return () => {
      window.removeEventListener('beforeunload', preventNavigation);
      window.removeEventListener('popstate', preventBackButton);
    };
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    
    const currentCorrectCells = correctCellsMap[currentImageIndex];
    const isCorrect = selectedCells.size === currentCorrectCells.size && 
      [...selectedCells].every(cell => currentCorrectCells.has(cell));
    
      if (isCorrect) {
        onSuccess(); // Just call the success callback, let parent handle navigation
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
        setCurrentImageIndex((prev) => (prev + 1) % busImages.length);
      }
  };

  return (
    <div className="captcha-container">
      <div className="captcha-overlay"></div>
      <div className="captcha-modal">
        <div className="captcha-header">
          <p className="captcha-title">Select all images that includes:</p>
          <p className="captcha-subtitle">A bus</p>
          <p className="captcha-note">If there are none, click skip</p>
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
    </div>
  );
};

export default CAPTCHA;