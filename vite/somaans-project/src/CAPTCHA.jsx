import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ROUTES } from './Routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSpinner, 
  faExclamationCircle 
} from '@fortawesome/free-solid-svg-icons';

/** 
- Implements a custom image-based CAPTCHA system
- Users must select correct cells containing a bus to verify they are human
*/

const CAPTCHA = ({ onSuccess, onCancel }) => {
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

const busImages = [
  '/assets/images/bus1.jpg',
  '/assets/images/bus2.jpg',
  '/assets/images/bus3.jpg',
  '/assets/images/bus4.jpg',
  '/assets/images/bus5.jpg'
];
  // Array to define correct cells in CAPTCHA
  const correctCellsMap = [
    new Set([4, 5, 6, 7, 8]), 
    new Set([0, 1, 3, 4]),    
    new Set([2, 3, 4, 5, 8]),  
    new Set([4, 5, 7, 8]),
    new Set([0, 3, 6])
  ];

  // Detailed logging for image loading
  useEffect(() => {
    console.log('Bus images:', busImages);
    busImages.forEach((imagePath, index) => {
      console.log(`Attempting to load image ${index}:`, imagePath);
      const img = new Image();
      img.onload = () => {
        console.log(`Image ${index} loaded successfully:`, imagePath);
        console.log(`Image ${index} naturalWidth:`, img.naturalWidth);
        console.log(`Image ${index} naturalHeight:`, img.naturalHeight);
      };
      img.onerror = (e) => {
        console.error(`Failed to load image ${index}:`, imagePath, e);
        setError(`Failed to load image ${index}: ${imagePath}`);
      };
      img.src = imagePath;
    });
  }, []);

  // Randomize image
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * busImages.length);
    setCurrentImageIndex(randomIndex);
  };

  // Initialise with random image
  useEffect(() => {
    getRandomImage();
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate a slight delay to show loading state
    setTimeout(() => {
      const currentCorrectCells = correctCellsMap[currentImageIndex];
      const isCorrect = selectedCells.size === currentCorrectCells.size && 
        [...selectedCells].every(cell => currentCorrectCells.has(cell));
      
      if (isCorrect) {
        // Set authentication in session storage
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('username', sessionStorage.getItem('username') || 'User');
        
        // Show success toast
        toast.success("CAPTCHA verified successfully!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark"
        });
        
        // Call success callback
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
        
        // Reset selection and get a new image
        setSelectedCells(new Set());
        getRandomImage();
      }
      
      setIsLoading(false);
    }, 1000);
  };

  // Cancel/close CAPTCHA
  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  // If there's an error loading images, show error state
  if (error) {
    return (
      <div className="captcha-container">
        <div className="captcha-modal error-state">
          <FontAwesomeIcon icon={faExclamationCircle} className="error-icon" />
          <h3>Image Loading Error</h3>
          <p>{error}</p>
          <button onClick={handleCancel} className="cancel-btn">Close</button>
        </div>
      </div>
    );
  }

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
            onError={(e) => {
              console.error('Image load error:', e);
              console.log('Current image path:', busImages[currentImageIndex]);
              setError(`Failed to load image: ${busImages[currentImageIndex]}`);
            }}
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
            onClick={handleCancel} 
            type="button" 
            className="captcha-cancel-btn"
          >
            Cancel
          </button>
          <button
            onClick={handleVerify}
            type="button"
            className="captcha-verify-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin /> Verifying...
              </>
            ) : (
              'Verify'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CAPTCHA;