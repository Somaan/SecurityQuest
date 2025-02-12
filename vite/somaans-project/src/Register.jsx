import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validator from "validator";
import { toast } from "react-toastify";
import CAPTCHA from './CAPTCHA';
import 'react-toastify/dist/ReactToastify.css';
import { ROUTES } from './Routes';

const Register = () => {
  const navigate = useNavigate();
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [emailError, setEmailError] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const MAX_LENGTH = 20;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    if (name === 'email') {
      const isValid = validator.isEmail(value);
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
      setEmailError(!isValid && value !== '');
      setEmailValid(isValid && value !== '');
    } else if (value.length <= MAX_LENGTH) {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return false;
    }

    if (!emailValid) {
      toast.error('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      //API call
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration Failed');
      }
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setShowCaptcha(true);
    }, 1500);
  } catch (error) {
    setIsLoading(false);
    toast.error(error.message);
  }
};
  const handleCaptchaSuccess = () => {
    sessionStorage.setItem('isAuthenticated', 'true');
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
      email: '',
      password: '',
      confirmPassword: ''
    });
    setEmailError(false);
    setEmailValid(false);
  };

  return (
    <>
      {!showCaptcha ? (
        <>
          <div className="sidebar">
            <h3 className="sidebar-title">Welcome to the social engineering thing</h3>
          </div>
          <div className="content-wrapper">
            <div className="register-form-container">
              <h2>Create Account</h2>
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
                      placeholder="Choose a username"
                      className="form-input"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="char-count">
                      {formData.username.length}/{MAX_LENGTH}
                    </span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email:
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      className={`form-input ${emailError ? 'invalid' : ''} ${emailValid ? 'valid' : ''}`}
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    {emailError && (
                      <span className="error-message">Email is not valid</span>
                    )}
                    {emailValid && (
                      <span className="success-message">Email is valid</span>
                    )}
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
                      placeholder="Create a password"
                      className="form-input"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="char-count">
                      {formData.password.length}/{MAX_LENGTH}
                    </span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="confirmPassword">
                    Confirm Password:
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      className="form-input"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="char-count">
                      {formData.confirmPassword.length}/{MAX_LENGTH}
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
                    'Sign Up'
                  )}
                </button>
                <style>
                  {`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}
                </style>
                <div className="register-container">
                  <span>Already have an account? </span>
                  <Link to={ROUTES.LOGIN} className="register-link">Login here</Link>
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

export default Register;

