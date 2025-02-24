import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import CAPTCHA from './CAPTCHA';
import { ROUTES } from './Routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

/**
- Handles user authentification and login process
- Features:
  - Username/password validation
  - CAPTCHA verification
  - Error handling and user feedback 
  - Redirect on successful login to Dashboard
 */

const LoginForm = () => {
  const navigate = useNavigate();
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const MAX_LENGTH = 20;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (value.length <= MAX_LENGTH) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      //api call
      console.log('Attempting login with:', {username: formData.username });
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        }),
      });

      //checks response before setting timeout
      const data = await response.json();
      console.log('server response:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Login Failed');
      }
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setShowCaptcha(true);
    }, 1500); // 1.5 second delay

  } catch (error) {
    console.error('Login error:', error);
    setIsLoading(false);
    toast.error(error.message);
  }
};
  const handleCaptchaSuccess = () => {
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('username', formData.username);
    toast.success("Login successful!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      onClose: () => {
        resetAllFields();
        navigate('/dashboard'); // lowercase, navigate after toast closes
      }
    });
  };

  const resetAllFields = () => {
    setFormData({
      username: '',
      password: '',
    });
  };

  return (
    <>
      {!showCaptcha ? (
        <>
          <div className="sidebar">
            <h3 className="sidebar-title">Social Engineering Application</h3>
          </div>
          <div className="content-wrapper">
            <div className="form-container">
              <h2>Welcome Back!</h2>
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="username">
                    Username:
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Enter your Username"
                      className="form-input"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                    <span className="char-count">
                      {formData.username.length}/{MAX_LENGTH}
                    </span>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    Password:
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      className="form-input"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                    <div className="forgot-password-container">
                      <Link to={ROUTES.FORGOT_PASSWORD} className="forgot-password-link">
                      Forgot Password?
                      </Link>
                    </div>
                    <span className="char-count">
                      {formData.password.length}/{MAX_LENGTH}
                    </span>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="login-btn"
                  disabled={isLoading}
                  style={{
                    position: 'relative',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.7 : 1
                  }}
                >
                  {isLoading ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                      <span 
                        style={{ 
                          width: '20px', 
                          height: '20px', 
                          border: '3px solid #ffffff',
                          borderTop: '3px solid transparent',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }} 
                      />
                      Verifying...
                    </div>
                  ) : (
                    <>
                      <span>Login</span>
                      <FontAwesomeIcon icon={faRightToBracket} className="login-icon" />
                    </>
                  )}
                </button>
                <style>
                  {`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                    
                    .login-btn {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      gap: 10px;
                    }
                    
                    .login-icon {
                      margin-left: 8px;
                    }
                  `}
                </style>
                <div className="register-container">
                  <span>Don't have an account? </span>
                  <Link to={ROUTES.REGISTER} className="register-link">Register here</Link>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <CAPTCHA
          onSuccess={handleCaptchaSuccess}
          onCancel={() => setShowCaptcha(false)}
        />
      )}
    </>
  );
};

export default LoginForm;