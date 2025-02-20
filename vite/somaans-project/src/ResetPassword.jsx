import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import { ROUTES } from './Routes';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState('');
    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Password regex patterns
    const passwordPatterns = {
        minLength: /.{10,}/,
        minNumber: /\d/,
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/
    };

    // Password requirements states
    const [passwordRequirements, setPasswordRequirements] = useState({
        minLength: false,
        minNumber: false,
        hasSpecial: false
    });

    // Checking password against regex reqs
    const checkPasswordRequirements = (password) => {
        setPasswordRequirements({
            minLength: passwordPatterns.minLength.test(password),
            minNumber: passwordPatterns.minNumber.test(password),
            hasSpecial: passwordPatterns.hasSpecial.test(password)
        });
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const resetToken = params.get('token');
        if (!resetToken) {
            toast.error('Invalid reset link');
            navigate(ROUTES.LOGIN);
        }
        setToken(resetToken);
    }, [navigate, location]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        // Check if all password requirements are met
        const isPasswordValid = Object.entries(passwordPatterns).every(([key, pattern]) =>
            pattern.test(password)
        );

        if (!isPasswordValid) {
            toast.error('Password does not meet all requirements');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    newPassword: password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            toast.success('Password successfully reset!');
            navigate(ROUTES.LOGIN);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="sidebar">
                <h3 className="sidebar-title">Reset Password</h3>
            </div>
            <div className="content-wrapper">
                <div className="form-container">
                    <h2>Create New Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="password">
                                New Password:
                            </label>
                            <div className="input-wrapper">
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        checkPasswordRequirements(e.target.value);
                                    }}
                                    onFocus={() => setShowPasswordRequirements(true)}
                                    onBlur={() => setShowPasswordRequirements(false)}
                                    placeholder="Enter new password"
                                    className="form-input"
                                    required
                                />
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
                                                Contains at least one special character
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
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="login-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                </div>
            </div>

            <style jsx>{`
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
                
                .input-wrapper {
                    position: relative;
                }
            `}</style>
        </>
    );
};

export default ResetPassword;