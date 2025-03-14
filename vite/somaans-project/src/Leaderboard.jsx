import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMedal, 
    faTrophy,
    faAward,
    faCircleUser,
    faFireFlameSimple,
    faSpinner,
    faExclamationTriangle,
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { API_ENDPOINTS } from './constants';
import { toast } from "react-toastify";

const Leaderboard = () => {
    // Filter and pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedUser, setExpandedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get current user from session storage
    const currentUsername = sessionStorage.getItem('username') || '';

    // Initial data fetch
    useEffect(() => {
        fetchUsers();
    }, []);
    
    const fetchUsers = async () => {
        setLoading(true);
        try {
            console.log('Fetching leaderboard data...');
            const response = await fetch(API_ENDPOINTS.GET_USERS);

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            console.log('Leaderboard data:', data);

            if (data.success && data.users) {
                // Format user data for display
                const formattedUsers = data.users.map(user => {
                    // Calculate stats from user data
                    const totalQuizzes = user.quiz_days_count || 0;
                    const loginStreak = user.login_streak || 0;
                    const quizStreak = user.quiz_streak || 0;
                    const combinedStreak = loginStreak + quizStreak;
                    
                    return {
                        id: user.id,
                        username: user.username,
                        // Use real score if available, otherwise use a placeholder
                        score: calculateTotalScore(user),
                        accuracy: calculateAccuracy(user),
                        completedChallenges: totalQuizzes,
                        loginStreak,
                        quizStreak,
                        combinedStreak,
                        longestLoginStreak: user.longest_login_streak || 0,
                        longestQuizStreak: user.longest_quiz_streak || 0,
                        streak: combinedStreak, // Default to combined streak
                        lastLogin: user.last_login,
                        lastLoginUpdate: user.last_login_update,
                        lastQuizUpdate: user.last_quiz_update,
                        streakReset: {
                            login: false,
                            quiz: false
                        }
                    };
                });

                // Sort users based on score and streak
                formattedUsers.sort((a, b) => {
                    // Primary sort by score
                    const scoreDiff = b.score - a.score;
                    if (scoreDiff !== 0) return scoreDiff;
                    
                    // Secondary sort by streak
                    return b.streak - a.streak;
                });

                setUsers(formattedUsers);
            } else {
                throw new Error('Invalid user data format');
            }
            
        } catch (err) {
            console.error('Error fetching users', err);
            setError(err.message);
            toast.error('Failed to load leaderboard data');
        } finally {
            setLoading(false);
        }
    };

    // Helper function to calculate a user's total score from quiz data
    function calculateTotalScore(user) {
        // If we have specific score data use it, otherwise use a placeholder
        // This placeholder could be replaced with real calculation once you have more data
        return Math.floor(Math.random() * 2000) + 3000;
    }

    // Helper function to calculate a user's accuracy
    function calculateAccuracy(user) {
        // Placeholder for real calculation
        return Math.floor(Math.random() * 20) + 70;
    }

    // Get user's current rank
    const currentUserRank = users.findIndex(user => user.username === currentUsername) + 1;

    // Config for users on a page
    const itemsPerPage = 10;
    const totalPages = Math.ceil(users.length / itemsPerPage);

    useEffect(() => {
        if (currentUserRank > 0) {
            setCurrentPage(Math.ceil(currentUserRank / itemsPerPage));
        }
    }, [currentUserRank]);

    // Displayed data based on page
    const displayedData = users.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Page controls
    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToUserPage = () => {
        if (currentUserRank > 0) {
            setCurrentPage(Math.ceil(currentUserRank / itemsPerPage));
        }
    };

    // Icons based on ranking position
    const getRankIcon = (position) => {
        switch (position) {
            case 1:
                return <FontAwesomeIcon icon={faTrophy} className="rank-icon gold" />;
            case 2:
                return <FontAwesomeIcon icon={faMedal} className="rank-icon silver" />;
            case 3:
                return <FontAwesomeIcon icon={faAward} className="rank-icon bronze" />;
            default:
                return <span className="rank-number">{position}</span>
        }
    };

    // Format date for last login
    const formatDate = (dateString) => {
        if (!dateString) return 'Never';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    // Format relative time (e.g., "2 days ago")
    const formatTimeAgo = (timestamp) => {
        if (!timestamp) return 'Never';
        
        const date = new Date(timestamp);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            return 'Today';
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7);
            return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    if (loading) {
        return (
            <div className="content-wrapper">
                <div className="loading-container">
                    <FontAwesomeIcon icon={faSpinner} spin className="loading-spinner" />
                    <p>Loading leaderboard data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="content-wrapper">
                <div className="error-container">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" />
                    <h3>Failed to load leaderboard</h3>
                    <p>{error}</p>
                    <button onClick={fetchUsers} className="retry-btn">Try Again</button>
                </div>
            </div>
        );
    }

    return (
        <div className="content-wrapper">
            <div className="leaderboard-container">
                <div className="leaderboard-header">
                    <h2>Leaderboard</h2>
                </div>

                <div className="leaderboard-content">
                    {users.length === 0 ? (
                        <div className="no-data-message">
                            <p>No users found. Be the first to complete a challenge</p>
                        </div>
                    ) : (
                        <>
                            <div className="leaderboard-table">
                                <div className="leaderboard-table-header">
                                    <div className="rank-column">Rank</div>
                                    <div className="user-column">User</div>
                                    <div className="score-column">Score</div>
                                    <div className="accuracy-column">Accuracy</div>
                                    <div className="streak-column">Streak</div>
                                    <div className="details-column"></div>
                                </div>
                                
                                {/* Top 3 Users Section - Always visible */}
                                {users.slice(0, Math.min(3, users.length)).map((user, index) => (
                                    <div 
                                        key={user.id} 
                                        className={`leaderboard-row top-3 ${user.username === currentUsername ? 'current-user' : ''}`}
                                    >
                                        <div className="rank-column">
                                            {getRankIcon(index + 1)}
                                        </div>
                                        <div className="user-column">
                                            <FontAwesomeIcon icon={faCircleUser} className="user-avatar" />
                                            <span className="username">{user.username}</span>
                                        </div>
                                        <div className="score-column">{user.score.toLocaleString()}</div>
                                        <div className="accuracy-column">{user.accuracy}%</div>
                                        
                                        <div className="streak-column tooltip-container">
                                            <FontAwesomeIcon icon={faFireFlameSimple} className="streak-icon" />
                                            <span className="streak-value">
                                                {user.combinedStreak} {user.combinedStreak === 1 ? 'day' : 'days'}
                                            </span>
                                            
                                            <div className="tooltip">
                                                <p className="tooltip-title">Streak Details</p>
                                                <p>
                                                    <span className="tooltip-label">Login Streak:</span> 
                                                    {user.loginStreak} days
                                                </p>
                                                <p>
                                                    <span className="tooltip-label">Quiz Streak:</span> 
                                                    {user.quizStreak} days
                                                </p>
                                                <p><span className="tooltip-label">Combined:</span> {user.combinedStreak} days</p>
                                                <div className="tooltip-divider"></div>
                                                <p><span className="tooltip-label">Last Login:</span> {formatTimeAgo(user.lastLogin)}</p>
                                                <p><span className="tooltip-label">Last Quiz:</span> {formatTimeAgo(user.lastQuizUpdate)}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="details-column">
                                            <button 
                                                className="details-btn"
                                                onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
                                                aria-label="View details"
                                            >
                                                <FontAwesomeIcon icon={faInfoCircle} />
                                            </button>
                                        </div>
                                        
                                        {expandedUser === user.id && (
                                            <div className="expanded-details">
                                                <div className="details-grid">
                                                    <div className="detail-item">
                                                        <span className="detail-label">Challenges Completed</span>
                                                        <span className="detail-value">{user.completedChallenges}</span>
                                                    </div>
                                                    <div className="detail-item">
                                                        <span className="detail-label">Login Streak</span>
                                                        <span className="detail-value">{user.loginStreak} days</span>
                                                    </div>
                                                    <div className="detail-item">
                                                        <span className="detail-label">Quiz Streak</span>
                                                        <span className="detail-value">{user.quizStreak} days</span>
                                                    </div>
                                                    <div className="detail-item">
                                                        <span className="detail-label">Longest Login Streak</span>
                                                        <span className="detail-value">{user.longestLoginStreak} days</span>
                                                    </div>
                                                    <div className="detail-item">
                                                        <span className="detail-label">Longest Quiz Streak</span>
                                                        <span className="detail-value">{user.longestQuizStreak} days</span>
                                                    </div>
                                                    <div className="detail-item">
                                                        <span className="detail-label">Last Active</span>
                                                        <span className="detail-value">{formatTimeAgo(user.lastLogin)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                
                                {users.length > 3 && (
                                    <>
                                        {/* Page divider after top 3 */}
                                        <div className="leaderboard-divider">
                                            <span className="divider-text">Other Rankings</span>
                                        </div>
                                        
                                        {/* Paginated Users */}
                                        {displayedData.slice(Math.min(3, displayedData.length)).map((user, index) => {
                                            const actualIndex = (currentPage - 1) * itemsPerPage + index + Math.min(3, (currentPage === 1 ? 0 : 3));
                                            return (
                                                <div 
                                                    key={user.id} 
                                                    className={`leaderboard-row ${user.username === currentUsername ? 'current-user' : ''}`}
                                                >
                                                    <div className="rank-column">
                                                        <span className="rank-number">{actualIndex + 1}</span>
                                                    </div>
                                                    <div className="user-column">
                                                        <FontAwesomeIcon icon={faCircleUser} className="user-avatar" />
                                                        <span className="username">{user.username}</span>
                                                    </div>
                                                    <div className="score-column">{user.score.toLocaleString()}</div>
                                                    <div className="accuracy-column">{user.accuracy}%</div>
                                                    
                                                    <div className="streak-column tooltip-container">
                                                        <FontAwesomeIcon icon={faFireFlameSimple} className="streak-icon" />
                                                        <span className="streak-value">
                                                            {user.combinedStreak} {user.combinedStreak === 1 ? 'day' : 'days'}
                                                        </span>
                                                        
                                                        <div className="tooltip">
                                                            <p className="tooltip-title">Streak Details</p>
                                                            <p>
                                                                <span className="tooltip-label">Login Streak:</span> 
                                                                {user.loginStreak} days
                                                            </p>
                                                            <p>
                                                                <span className="tooltip-label">Quiz Streak:</span> 
                                                                {user.quizStreak} days
                                                            </p>
                                                            <p><span className="tooltip-label">Combined:</span> {user.combinedStreak} days</p>
                                                            <div className="tooltip-divider"></div>
                                                            <p><span className="tooltip-label">Last Login:</span> {formatTimeAgo(user.lastLogin)}</p>
                                                            <p><span className="tooltip-label">Last Quiz:</span> {formatTimeAgo(user.lastQuizUpdate)}</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="details-column">
                                                        <button 
                                                            className="details-btn"
                                                            onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
                                                            aria-label="View details"
                                                        >
                                                            <FontAwesomeIcon icon={faInfoCircle} />
                                                        </button>
                                                    </div>
                                                    
                                                    {expandedUser === user.id && (
                                                        <div className="expanded-details">
                                                            <div className="details-grid">
                                                                <div className="detail-item">
                                                                    <span className="detail-label">Challenges Completed</span>
                                                                    <span className="detail-value">{user.completedChallenges}</span>
                                                                </div>
                                                                <div className="detail-item">
                                                                    <span className="detail-label">Login Streak</span>
                                                                    <span className="detail-value">{user.loginStreak} days</span>
                                                                </div>
                                                                <div className="detail-item">
                                                                    <span className="detail-label">Quiz Streak</span>
                                                                    <span className="detail-value">{user.quizStreak} days</span>
                                                                </div>
                                                                <div className="detail-item">
                                                                    <span className="detail-label">Longest Login Streak</span>
                                                                    <span className="detail-value">{user.longestLoginStreak} days</span>
                                                                </div>
                                                                <div className="detail-item">
                                                                    <span className="detail-label">Longest Quiz Streak</span>
                                                                    <span className="detail-value">{user.longestQuizStreak} days</span>
                                                                </div>
                                                                <div className="detail-item">
                                                                    <span className="detail-label">Last Active</span>
                                                                    <span className="detail-value">{formatTimeAgo(user.lastLogin)}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </>
                                )}
                            </div>
                            
                            {/* Pagination controls - only show if we have enough users */}
                            {users.length > itemsPerPage && (
                                <div className="pagination-controls">
                                    <button 
                                        className="pagination-btn" 
                                        onClick={prevPage} 
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </button>
                                    <div className="pagination-info">
                                        Page {currentPage} of {totalPages}
                                    </div>
                                    <button 
                                        className="pagination-btn" 
                                        onClick={nextPage} 
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </button>
                                    {currentUserRank > 0 && (
                                        <button 
                                            className="pagination-btn find-me-btn" 
                                            onClick={goToUserPage}
                                        >
                                            Find Me
                                        </button>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
                
                {/* Streak information card */}
                <div className="streak-info-card">
                    <h3><FontAwesomeIcon icon={faInfoCircle} /> Streak Information</h3>
                    <p>Streaks are updated based on your activity:</p>
                    <ul>
                        <li><strong>Login Streak:</strong> Increases each day you log in, resets after 24 hours of inactivity</li>
                        <li><strong>Quiz Streak:</strong> Increases each day you complete at least one quiz, resets after 24 hours of inactivity</li>
                        <li><strong>Combined Streak:</strong> The sum of your login and quiz streaks</li>
                    </ul>
                </div>
            </div>
            
            {/* Add your existing CSS styles here */}
            <style jsx>{`
                .leaderboard-container {
                    max-width: 1200px;
                    width: 100%;
                    margin: 0 auto;
                    padding: 2rem;
                }
                
                .leaderboard-header {
                    margin-bottom: 2rem;
                }
                
                .leaderboard-header h2 {
                    color: #ffffff;
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                }
                
                .leaderboard-content {
                    background-color: #1a1a1a;
                    border-radius: 14px;
                    padding: 1.5rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
                }
                
                .leaderboard-table {
                    width: 100%;
                }
                
                .leaderboard-table-header {
                    display: grid;
                    grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 0.5fr;
                    padding: 1rem;
                    background-color: #2c3e50;
                    border-radius: 8px;
                    font-weight: bold;
                    color: #ecf0f1;
                    margin-bottom: 1rem;
                }
                
                .leaderboard-row {
                    display: grid;
                    grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 0.5fr;
                    padding: 1rem;
                    border-radius: 8px;
                    margin-bottom: 0.5rem;
                    background-color: #242424;
                    position: relative;
                    transition: all 0.2s ease;
                }
                
                .leaderboard-row:hover {
                    background-color: #2c3e50;
                }
                
                .leaderboard-row.top-3 {
                    background-color: #2c3e50;
                    margin-bottom: 0.75rem;
                }
                
                .leaderboard-row.top-3:nth-child(2) {
                    background-color: #22303e;
                }
                
                .leaderboard-row.top-3:nth-child(3) {
                    background-color: #1e2b38;
                }
                
                .leaderboard-row.top-3:nth-child(4) {
                    background-color: #1a2634;
                }
                
                .leaderboard-row.current-user {
                    background-color: rgba(52, 152, 219, 0.2);
                    border: 1px solid #3498db;
                }
                
                .rank-column, .user-column, .score-column, .accuracy-column, .streak-column, .details-column {
                    display: flex;
                    align-items: center;
                }
                
                .rank-icon {
                    font-size: 1.5rem;
                }
                
                .rank-icon.gold {
                    color: #f1c40f;
                }
                
                .rank-icon.silver {
                    color: #bdc3c7;
                }
                
                .rank-icon.bronze {
                    color: #d35400;
                }
                
                .rank-number {
                    font-weight: bold;
                    color: #ecf0f1;
                }
                
                .user-avatar {
                    font-size: 1.5rem;
                    margin-right: 0.75rem;
                    color: #3498db;
                }
                
                .username {
                    font-weight: 500;
                    color: #ecf0f1;
                }
                
                .score-column, .accuracy-column {
                    color: #ecf0f1;
                    font-weight: 500;
                }
                
                .streak-column {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #ecf0f1;
                    font-weight: 500;
                    position: relative;
                }
                
                .streak-icon {
                    color: #e74c3c;
                }
                
                .details-btn {
                    background: none;
                    border: none;
                    color: #3498db;
                    cursor: pointer;
                    font-size: 1rem;
                    padding: 0.25rem;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                }
                
                .details-btn:hover {
                    background-color: rgba(52, 152, 219, 0.2);
                }
                
                /* Tooltip styling */
                .tooltip-container {
                    position: relative;
                }
                
                .tooltip {
                    display: none;
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: #2c3e50;
                    color: #ecf0f1;
                    padding: 1rem;
                    border-radius: 6px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                    width: 220px;
                    z-index: 1000;
                    font-size: 0.9rem;
                }
                
                .tooltip:after {
                    content: '';
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    border-width: 8px;
                    border-style: solid;
                    border-color: #2c3e50 transparent transparent transparent;
                }
                
                .tooltip-container:hover .tooltip {
                    display: block;
                }
                
                .tooltip-title {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    border-bottom: 1px solid #3498db;
                    padding-bottom: 0.25rem;
                }
                
                .tooltip-label {
                    font-weight: 500;
                    color: #3498db;
                    margin-right: 0.25rem;
                }
                
                .tooltip-divider {
                    height: 1px;
                    background-color: #34495e;
                    margin: 0.5rem 0;
                }
                
                .tooltip p {
                    margin: 0.25rem 0;
                }
                
                /* Expanded details styling */
                .expanded-details {
                    grid-column: 1 / -1;
                    margin-top: 1rem;
                    background-color: #2c3e50;
                    border-radius: 8px;
                    padding: 1rem;
                    animation: expandDetails 0.3s ease;
                }
                
                .details-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                }
                
                .detail-item {
                    display: flex;
                    flex-direction: column;
                }
                
                .detail-label {
                    font-size: 0.75rem;
                    color: #95a5a6;
                    margin-bottom: 0.25rem;
                }
                
                .detail-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: #ecf0f1;
                }
                
                /* Pagination styling */
                .pagination-controls {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 1.5rem;
                    gap: 1rem;
                }
                
                .pagination-btn {
                    background-color: #2c3e50;
                    color: #ecf0f1;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                
                .pagination-btn:hover:not(:disabled) {
                    background-color: #34495e;
                }
                
                .pagination-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .find-me-btn {
                    background-color: #3498db;
                }
                
                .find-me-btn:hover {
                    background-color: #2980b9;
                }
                
                .pagination-info {
                    color: #ecf0f1;
                }
                
                /* Leaderboard divider */
                .leaderboard-divider {
                    display: flex;
                    align-items: center;
                    margin: 1.5rem 0;
                    color: #95a5a6;
                }
                
                .leaderboard-divider:before,
                .leaderboard-divider:after {
                    content: "";
                    flex: 1;
                    border-bottom: 1px solid #34495e;
                }
                
                .divider-text {
                    margin: 0 1rem;
                    font-size: 0.875rem;
                }
                
                /* No data message */
                .no-data-message {
                    padding: 2rem;
                    text-align: center;
                    color: #95a5a6;
                }
                
                /* Loading spinner */
                .loading-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 300px;
                    color: #ecf0f1;
                }
                
                .loading-spinner {
                    font-size: 2rem;
                    color: #3498db;
                    margin-bottom: 1rem;
                }
                
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                
                @keyframes expandDetails {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                /* Error container */
                .error-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    background-color: #1a1a1a;
                    border-radius: 8px;
                    color: #ecf0f1;
                }
                
                .error-icon {
                    color: #e74c3c;
                    font-size: 2rem;
                    margin-bottom: 1rem;
                }
                
                .retry-btn {
                    margin-top: 1rem;
                    background-color: #3498db;
                    color: white;
                    border: none;
                    padding: 0.5rem 1.5rem;
                    border-radius: 4px;
                    cursor: pointer;
                }
                
                .retry-btn:hover {
                    background-color: #2980b9;
                }
                
                /* Streak Info Card */
                .streak-info-card {
                    background-color: #1a1a1a;
                    border-radius: 14px;
                    padding: 1.25rem;
                    margin-top: 1.5rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
                    border-left: 3px solid #3498db;
                }
                
                .streak-info-card h3 {
                    color: #3498db;
                    font-size: 1rem;
                    margin-bottom: 0.75rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .streak-info-card p {
                    margin: 0.5rem 0;
                    color: #ecf0f1;
                    font-size: 0.9rem;
                }
                
                .streak-info-card ul {
                    margin: 0.5rem 0;
                    padding-left: 1.5rem;
                }
                
                .streak-info-card li {
                    margin: 0.25rem 0;
                    color: #ecf0f1;
                    font-size: 0.9rem;
                }
                
                /* Responsive design */
                @media (max-width: 992px) {
                    .leaderboard-table-header, 
                    .leaderboard-row {
                        grid-template-columns: 0.5fr 2fr 1fr 1fr 0.5fr;
                    }
                    
                    .accuracy-column {
                        display: none;
                    }
                    
                    .details-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                
                @media (max-width: 768px) {
                    .leaderboard-container {
                        padding: 1rem;
                    }
                    
                    .leaderboard-table-header, 
                    .leaderboard-row {
                        grid-template-columns: 0.5fr 2fr 1fr 0.5fr;
                        padding: 0.75rem;
                        font-size: 0.9rem;
                    }
                    
                    .streak-column {
                        display: none;
                    }
                    
                    .details-grid {
                        grid-template-columns: 1fr;
                    }
                }
                
                @media (max-width: 576px) {
                    .leaderboard-table-header, 
                    .leaderboard-row {
                        grid-template-columns: 0.5fr 2fr 0.5fr;
                        font-size: 0.85rem;
                    }
                    
                    .score-column {
                        display: none;
                    }
                    
                    .pagination-controls {
                        flex-wrap: wrap;
                    }
                    
                    .find-me-btn {
                        margin-top: 0.5rem;
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default Leaderboard;