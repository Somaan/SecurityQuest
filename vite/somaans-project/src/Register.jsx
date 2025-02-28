import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validator from "validator";
import { toast } from "react-toastify";
import CAPTCHA from './CAPTCHA';
import 'react-toastify/dist/ReactToastify.css';
import { ROUTES } from './Routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const navigate = useNavigate();
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [emailError, setEmailError] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const MAX_LENGTH = 20;

  //password regex patterns
  const passwordPatterns = {
    minLength: /.{10,}/,
    minNumber: /\d/,
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/
  };

  //password requirements states
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    minNumber: false,
    hasSpecial: false
  });

  //checking password against regex reqs
  const checkPasswordRequirements = (password) => {
    setPasswordRequirements({
      minLength: passwordPatterns.minLength.test(password),
      minNumber: passwordPatterns.minNumber.test(password),
      hasSpecial: passwordPatterns.hasSpecial.test(password)
    });
  };

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
    } else if (name === 'password') {
      if (value.length <= MAX_LENGTH) {
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
        checkPasswordRequirements(value);
      }
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


    //checking if all reqs are met
    const isPasswordValid = Object.entries(passwordPatterns).every(([key, pattern]) =>
      pattern.test(formData.password)
  );

  if (!isPasswordValid) {
    toast.error('Password does not meet all requirements');
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
            <h3 className="sidebar-title">Register a new account here</h3>
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
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Create a password"
                      className="form-input"
                      value={formData.password}
                      onChange={handleInputChange}
                      onFocus={() => setShowPasswordRequirements(true)}
                      onBlur={() => setShowPasswordRequirements(false)}
                      required
                    />
                    <button 
                      type="button" 
                      className="toggle-password-btn" 
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <FontAwesomeIcon 
                        icon={showPassword ? faEye : faEyeSlash} 
                        style={{ color: "#ffffff" }}
                      />
                    </button>
                    <span className="char-count">
                      {formData.password.length}/{MAX_LENGTH}
                    </span>
                    {showPasswordRequirements && (
                      <div className="password-requirements-dropdown">
                        <ul>
                          <li className={passwordRequirements.minLength ? 'requirements-met' : 'requirements-not-met'}>
                            Minimum 10 characters
                          </li>
                          <li className={passwordRequirements.minNumber ? 'requirements-met' : 'requirements-not-met'}>
                            Contains at least one number
                          </li>
                          <li className={passwordRequirements.hasSpecial ? 'requirements-met' : 'requirements-not-met'}>
                            Contains atleast one special character
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="confirmPassword">
                    Confirm Password:
                  </label>
                  <div className="input-wrapper">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      className="form-input"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                    <button 
                      type="button" 
                      className="toggle-password-btn" 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      <FontAwesomeIcon 
                        icon={showConfirmPassword ? faEye : faEyeSlash} 
                        style={{ color: "#ffffff" }}
                      />
                    </button>
                    <span className="char-count">
                      {formData.confirmPassword.length}/{MAX_LENGTH}
                    </span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="login-btn register-btn"
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
                      <span>Sign Up</span>
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
                    
                    .login-btn, .register-btn {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      gap: 10px;
                    }
                    
                    .login-icon {
                      margin-left: 8px;
                    }
                    
                    .password-requirements-dropdown {
                      position: absolute;
                      top: 100%;
                      left: 0;
                      width: 100%;
                      background-color: #1a1a1a;
                      border-radius: 6px;
                      padding: 0.75rem;
                      margin-top: 0.25rem;
                      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                      z-index: 10;
                      box-sizing: border-box;
                    }
                    
                    .password-requirements-dropdown ul {
                      list-style: none;
                      padding: 0;
                      margin: 0;
                    }
                    
                    .password-requirements-dropdown li {
                      padding: 0.25rem 0;
                      display: flex;
                      align-items: center;
                      font-size: 0.85em;
                    }
                    
                    .password-requirements-dropdown li::before {
                      content: "•";
                      margin-right: 0.5rem;
                    }
                    
                    .requirements-met {
                      color: #4caf50;
                    }
                    
                    .requirements-not-met {
                      color: #ff4444;
                    }
                    
                    .toggle-password-btn {
                      position: absolute;
                      right: 4.5px;
                      top: 50%;
                      transform: translateY(-50%);
                      background: none;
                      border: none;
                      cursor: pointer;
                      padding: 6px;
                      font-size: 20px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      z-index: 10;
                    }

                    /* Adjust input field to avoid text overlapping with the icon */
                    .form-input {
                      padding-right: 40px;
                    }
                    
                    /* Move character count to avoid overlap */
                    .char-count {
                      position: absolute;
                      right: 45px;
                      top: 50%;
                      transform: translateY(-50%);
                      font-size: 0.9rem;
                      color: #666;
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