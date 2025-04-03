import React, { useState } from 'react';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { ROUTES } from './Routes';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            toast.success('Password reset link sent to your email!');
            setEmailSent(true);
            setEmail('');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="sidebar">
                <h3 className="sidebar-title">Password Reset</h3>
            </div>
            <div className="content-wrapper">
                <div className="form-container">
                    <h2>Reset Your Password</h2>
                    <p className="reset-instructions">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">
                                Email:
                            </label>
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
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
                            {isLoading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                        {emailSent && (
                            <div className="email-sent-notice">
                                <p>Please check your email for the reset link. Check your spam/junk folder.</p>
                            </div>
                        )}
                        <div className="login-link-container">
                            <Link to={ROUTES.LOGIN} className="login-link">
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <style jsx>{`
                .email-sent-notice {
                    margin-top: 1rem;
                    padding: 0.75rem;
                    background-color: rgba(76, 175, 80, 0.1);
                    border-left: 3px solid #4caf50;
                    border-radius: 4px;
                    font-size: 0.9rem;
                }
                .email-sent-notice p {
                    margin: 0;
                    color: #e0e0e0;
                }
            `}</style>
        </>
    );
};

export default ForgotPassword;