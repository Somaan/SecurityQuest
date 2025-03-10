import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMedal, 
    faTrophy,
    faAward,
    faCircleUser,
    faChevronUp,
    faChevronDown,
    faEquals,
    faEye,
    faGlobe,
    faUserFriends,
    faCalendarDay,
    faCalendarWeek,
    faInfinity,
    faExclamationTriangle,
    faFire,
    faBook,
    faSignIn,
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { API_ENDPOINTS } from './constants';
import { toast } from "react-toastify";

const Leaderboard = () => {
    // Filter and data states
    const [timeFilter, setTimeFilter] = useState('weekly');
    const [viewFilter, setViewFilter] = useState('global');
    const [streakFilter, setStreakFilter] = useState('combined'); // 'combined', 'login', or 'quiz'
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedUser, setExpandedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get user from session storage
    const currentUsername = sessionStorage.getItem('username') || '';

    // Initial data fetch
    useEffect(() => {
        fetchUsers();
    }, [timeFilter, viewFilter, streakFilter]);
    
    // Get day difference between now and a date
    const getDayDifference = (date) => {
        if (!date) return Infinity;
        
        const now = new Date();
        const targetDate = new Date(date);
        
        // Calculate difference in days
        const diffTime = Math.abs(now - targetDate);
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_ENDPOINTS.GET_USERS}`);

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();

            // Process users with actual streak data and apply frontend streak validation
            const processedUsers = data.users.map(user => {
                // Validate login streak - if more than 1 day has passed since last login, reset to 0
                const loginDayDifference = getDayDifference(user.last_login);
                const validatedLoginStreak = loginDayDifference > 1 ? 0 : (user.login_streak || 0);
                
                // Validate quiz streak - if more than 1 day has passed since last quiz update, reset to 0
                const quizDayDifference = getDayDifference(user.last_quiz_update);
                const validatedQuizStreak = quizDayDifference > 1 ? 0 : (user.quiz_streak || 0);
                
                // Calculate combined streak using the validated individual streaks
                const combinedStreak = validatedLoginStreak + validatedQuizStreak;
                
                // Debug logging for streak validation
                if (user.login_streak !== validatedLoginStreak || user.quiz_streak !== validatedQuizStreak) {
                    console.log(`User ${user.username}: Login streak: ${user.login_streak} → ${validatedLoginStreak} (${loginDayDifference} days since last login)`);
                    console.log(`User ${user.username}: Quiz streak: ${user.quiz_streak} → ${validatedQuizStreak} (${quizDayDifference} days since last quiz)`);
                }
                
                return {
                    id: user.id,
                    username: user.username,
                    score: Math.floor(Math.random() * 1000) + 5000, // Keep random for now
                    accuracy: Math.floor(Math.random() * 30) + 70, // Keep random for now
                    completedChallenges: user.quiz_days_count || Math.floor(Math.random() * 20) + 5,
                    // All streak types - using validated values
                    loginStreak: validatedLoginStreak,
                    quizStreak: validatedQuizStreak,
                    combinedStreak: combinedStreak,
                    // Original values for reference
                    originalLoginStreak: user.login_streak || 0,
                    originalQuizStreak: user.quiz_streak || 0,
                    // Longest streaks
                    longestLoginStreak: user.longest_login_streak || 0,
                    longestQuizStreak: user.longest_quiz_streak || 0,
                    // Use the active streak type based on filter
                    streak: streakFilter === 'login' 
                        ? validatedLoginStreak 
                        : streakFilter === 'quiz' 
                            ? validatedQuizStreak 
                            : combinedStreak,
                    change: ['up', 'down', 'same'][Math.floor(Math.random() * 3)], // Keep random for now
                    lastLogin: user.last_login,
                    lastLoginUpdate: user.last_login_update,
                    lastQuizUpdate: user.last_quiz_update,
                    // Track if streaks were reset for this user
                    streakReset: {
                        login: user.login_streak > 0 && validatedLoginStreak === 0,
                        quiz: user.quiz_streak > 0 && validatedQuizStreak === 0
                    }
                };
            });

            // Sort users based on the active streak filter
            processedUsers.sort((a, b) => {
                // Primary sort by the selected streak type
                const streakDiff = b.streak - a.streak;
                if (streakDiff !== 0) return streakDiff;
                
                // Secondary sort by score
                return b.score - a.score;
            });

            setUsers(processedUsers);
            
            // Count users with reset streaks for better notification
            const usersWithResetLoginStreaks = processedUsers.filter(u => u.streakReset.login).length;
            const usersWithResetQuizStreaks = processedUsers.filter(u => u.streakReset.quiz).length;
            
            // Show toast notification about streak resets if needed
            if (usersWithResetLoginStreaks > 0 || usersWithResetQuizStreaks > 0) {
                let message = "Streak information updated:\n";
                
                if (usersWithResetLoginStreaks > 0) {
                    message += `• ${usersWithResetLoginStreaks} user(s) had login streaks reset.\n`;
                }
                
                if (usersWithResetQuizStreaks > 0) {
                    message += `• ${usersWithResetQuizStreaks} user(s) had quiz streaks reset.\n`;
                }
                
                message += "Streaks reset after 24 hours of inactivity.";
                
                toast.info(
                    <div>
                        <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '8px' }} />
                        <span style={{ whiteSpace: 'pre-line' }}>{message}</span>
                    </div>,
                    {
                        position: "top-center",
                        autoClose: 6000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "dark"
                    }
                );
            }
        } catch (err) {
            console.error('Error fetching users', err);
            setError(err.message);
            toast.error('Failed to load leaderboard data');
        } finally {
            setLoading(false);
        }
    };

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

    // Change icon based on position movement in leaderboard
    const getChangeIcon = (change) => {
        switch (change) {
            case 'up':
                return <FontAwesomeIcon icon={faChevronUp} className="change-icon up" />;
            case 'down':
                return <FontAwesomeIcon icon={faChevronDown} className="change-icon down" />;
            default:
                return <FontAwesomeIcon icon={faEquals} className="change-icon same" />;
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
            // Check if it's today
            if (date.getDate() === now.getDate() && 
                date.getMonth() === now.getMonth() && 
                date.getFullYear() === now.getFullYear()) {
                return 'Today';
            }
            return 'Yesterday';
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

    // Get the appropriate streak icon based on streak type
    const getStreakIcon = (streakType) => {
        switch (streakType) {
            case 'login':
                return <FontAwesomeIcon icon={faSignIn} className="streak-type-icon login" />;
            case 'quiz':
                return <FontAwesomeIcon icon={faBook} className="streak-type-icon quiz" />;
            case 'combined':
                return <FontAwesomeIcon icon={faFire} className="streak-type-icon combined" />;
            default:
                return <FontAwesomeIcon icon={faFire} className="streak-type-icon" />;
        }
    };

    // Handle streak filter change
    const handleStreakFilterChange = (filter) => {
        setStreakFilter(filter);
    };

    if (loading) {
        return (
            <div className="content-wrapper">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
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

                    <div className="leaderboard-filters">
                        <div className="filter-group">
                            <button
                                className={`filter-btn ${timeFilter === 'daily' ? 'active' : ''}`}
                                onClick={() => setTimeFilter('daily')}
                            >
                                <FontAwesomeIcon icon={faCalendarDay} />
                                <span>Daily</span>
                            </button>
                            <button
                                className={`filter-btn ${timeFilter === 'weekly' ? 'active' : ''}`}
                                onClick={() => setTimeFilter('weekly')}
                            >
                                <FontAwesomeIcon icon={faCalendarWeek} />
                                <span>Weekly</span>
                            </button>
                            <button
                                className={`filter-btn ${timeFilter === 'alltime' ? 'active' : ''}`}
                                onClick={() => setTimeFilter('alltime')}
                            >
                                <FontAwesomeIcon icon={faInfinity} />
                                <span>All Time</span>
                            </button>
                        </div>

                        <div className="filter-group">
                            <button
                                className={`filter-btn ${viewFilter === 'global' ? 'active' : ''}`}
                                onClick={() => setViewFilter('global')}
                            >
                                <FontAwesomeIcon icon={faGlobe} />
                                <span>Global</span>
                            </button>
                            <button
                                className={`filter-btn ${viewFilter === 'friends' ? 'active' : ''}`}
                                onClick={() => setViewFilter('friends')}
                            >
                                <FontAwesomeIcon icon={faUserFriends} />
                                <span>Friends</span>
                            </button>
                        </div>
                        
                        {/* Streak type filter */}
                        <div className="filter-group streak-filter-group">
                            <button
                                className={`filter-btn ${streakFilter === 'combined' ? 'active' : ''}`}
                                onClick={() => handleStreakFilterChange('combined')}
                            >
                                <FontAwesomeIcon icon={faFire} />
                                <span>Combined Streaks</span>
                            </button>
                            <button
                                className={`filter-btn ${streakFilter === 'login' ? 'active' : ''}`}
                                onClick={() => handleStreakFilterChange('login')}
                            >
                                <FontAwesomeIcon icon={faSignIn} />
                                <span>Login Streaks</span>
                            </button>
                            <button
                                className={`filter-btn ${streakFilter === 'quiz' ? 'active' : ''}`}
                                onClick={() => handleStreakFilterChange('quiz')}
                            >
                                <FontAwesomeIcon icon={faBook} />
                                <span>Quiz Streaks</span>
                            </button>
                        </div>
                    </div>
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
                                    <div className="streak-column">
                                        {streakFilter === 'login' ? 'Login Streak' : 
                                         streakFilter === 'quiz' ? 'Quiz Streak' : 
                                         'Combined Streak'}
                                    </div>
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
                                            {getChangeIcon(user.change)}
                                        </div>
                                        <div className="score-column">{user.score.toLocaleString()}</div>
                                        <div className="accuracy-column">{user.accuracy}%</div>
                                        
                                        {/* Updated streak column with type indicator */}
                                        <div 
                                            className={`streak-column tooltip-container ${user.streakReset.login || user.streakReset.quiz ? 'streak-reset' : ''}`}
                                            data-streak={
                                                user.streak >= 30 ? "30" : 
                                                user.streak >= 10 ? "10" : 
                                                user.streak >= 5 ? "5" : "0"
                                            }
                                        >
                                            {getStreakIcon(streakFilter)}
                                            <span className="streak-value">
                                                {user.streak} {user.streak === 1 ? 'day' : 'days'}
                                            </span>
                                            
                                            <div className="tooltip">
                                                <p className="tooltip-title">Streak Details</p>
                                                <p>
                                                    <span className="tooltip-label">Login Streak:</span> 
                                                    {user.loginStreak} days
                                                    {user.streakReset.login && 
                                                        <span className="streak-reset-indicator"> (Reset due to inactivity)</span>
                                                    }
                                                </p>
                                                <p>
                                                    <span className="tooltip-label">Quiz Streak:</span> 
                                                    {user.quizStreak} days
                                                    {user.streakReset.quiz && 
                                                        <span className="streak-reset-indicator"> (Reset due to inactivity)</span>
                                                    }
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
                                                <FontAwesomeIcon icon={faEye} />
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
                                                        <span className="detail-value">
                                                            {user.loginStreak} days
                                                            {user.streakReset.login && 
                                                                <span className="streak-reset-indicator smaller"> (Reset)</span>
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="detail-item">
                                                        <span className="detail-label">Quiz Streak</span>
                                                        <span className="detail-value">
                                                            {user.quizStreak} days
                                                            {user.streakReset.quiz && 
                                                                <span className="streak-reset-indicator smaller"> (Reset)</span>
                                                            }
                                                        </span>
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
                                                        {getChangeIcon(user.change)}
                                                    </div>
                                                    <div className="score-column">{user.score.toLocaleString()}</div>
                                                    <div className="accuracy-column">{user.accuracy}%</div>
                                                    
                                                    {/* Updated streak column with type indicator */}
                                                    <div 
                                                        className={`streak-column tooltip-container ${user.streakReset.login || user.streakReset.quiz ? 'streak-reset' : ''}`}
                                                        data-streak={
                                                            user.streak >= 30 ? "30" : 
                                                            user.streak >= 10 ? "10" : 
                                                            user.streak >= 5 ? "5" : "0"
                                                        }
                                                    >
                                                        {getStreakIcon(streakFilter)}
                                                        <span className="streak-value">
                                                            {user.streak} {user.streak === 1 ? 'day' : 'days'}
                                                        </span>
                                                        
                                                        <div className="tooltip">
                                                            <p className="tooltip-title">Streak Details</p>
                                                            <p>
                                                                <span className="tooltip-label">Login Streak:</span> 
                                                                {user.loginStreak} days
                                                                {user.streakReset.login && 
                                                                    <span className="streak-reset-indicator"> (Reset due to inactivity)</span>
                                                                }
                                                            </p>
                                                            <p>
                                                                <span className="tooltip-label">Quiz Streak:</span> 
                                                                {user.quizStreak} days
                                                                {user.streakReset.quiz && 
                                                                    <span className="streak-reset-indicator"> (Reset due to inactivity)</span>
                                                                }
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
                                                            <FontAwesomeIcon icon={faEye} />
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
                                                                    <span className="detail-value">
                                                                        {user.loginStreak} days
                                                                        {user.streakReset.login && 
                                                                            <span className="streak-reset-indicator smaller"> (Reset)</span>
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="detail-item">
                                                                    <span className="detail-label">Quiz Streak</span>
                                                                    <span className="detail-value">
                                                                        {user.quizStreak} days
                                                                        {user.streakReset.quiz && 
                                                                            <span className="streak-reset-indicator smaller"> (Reset)</span>
                                                                        }
                                                                    </span>
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
                
                {/* Extra helpful information about streaks */}
                <div className="streak-info-card">
                    <h3><FontAwesomeIcon icon={faInfoCircle} /> Streak Information</h3>
                    <p>Streaks are updated based on your activity:</p>
                    <ul>
                        <li><strong>Login Streak:</strong> Increases each day you log in, resets after 24 hours of inactivity</li>
                        <li><strong>Quiz Streak:</strong> Increases each day you complete at least one quiz, resets after 24 hours of inactivity</li>
                        <li><strong>Combined Streak:</strong> The sum of your login and quiz streaks</li>
                    </ul>
                    <p className="note">Note: If you see a "Reset" indicator, it means the streak was reset due to inactivity.</p>
                </div>
            </div>
            
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
                
                .leaderboard-filters {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1.5rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                }
                
                .filter-group {
                    display: flex;
                    gap: 0.5rem;
                }
                
                .streak-filter-group {
                    flex-basis: 100%;
                    justify-content: center;
                    margin-top: 0.5rem;
                }
                
                .filter-btn {
                    background-color: #2c3e50;
                    color: #ecf0f1;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .filter-btn:hover {
                    background-color: #34495e;
                }
                
                .filter-btn.active {
                    background-color: #3498db;
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
                
                .change-icon {
                    margin-left: 0.5rem;
                    font-size: 0.875rem;
                }
                
                .change-icon.up {
                    color: #2ecc71;
                }
                
                .change-icon.down {
                    color: #e74c3c;
                }
                
                .change-icon.same {
                    color: #95a5a6;
                }
                
                .score-column, .accuracy-column {
                    color: #ecf0f1;
                    font-weight: 500;
                }
                
                /* Updated streak column styling */
                .streak-column {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #ecf0f1;
                    font-weight: 500;
                    position: relative;
                }
                
                .streak-type-icon {
                    color: #3498db;
                }
                
                .streak-type-icon.login {
                    color: #3498db;
                }
                
                .streak-type-icon.quiz {
                    color: #2ecc71;
                }
                
                .streak-type-icon.combined {
                    color: #e74c3c;
                }
                
                .streak-value {
                    display: flex;
                    align-items: center;
                }
                
                /* Streak flame indicators */
                .streak-column[data-streak="5"]:after,
                .streak-column[data-streak="10"]:after,
                .streak-column[data-streak="30"]:after {
                    content: "🔥";
                    margin-left: 5px;
                    font-size: 1.2rem;
                }
                
                .streak-column[data-streak="10"]:after {
                    content: "🔥🔥";
                }
                
                .streak-column[data-streak="30"]:after {
                    content: "🔥🔥🔥";
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
                    width: 40px;
                    height: 40px;
                    border: 4px solid rgba(52, 152, 219, 0.3);
                    border-top-color: #3498db;
                    border-radius: 50%;
                    animation: spin 1s infinite linear;
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
                
                .streak-card {
                    grid-column: span 2;
                }
                
                /* New styles for streak reset indicators */
                .streak-reset {
                    position: relative;
                }
                
                .streak-reset:after {
                    content: "Reset";
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background-color: #e74c3c;
                    color: white;
                    font-size: 0.65rem;
                    padding: 2px 5px;
                    border-radius: 3px;
                    font-weight: bold;
                }
                
                .streak-reset-indicator {
                    color: #e74c3c;
                    font-size: 0.85em;
                    font-style: italic;
                }
                
                .streak-reset-indicator.smaller {
                    font-size: 0.75em;
                }
                
                /* Streak Info Card */
                .streak-info-card {
                    background-color: #1a1a1a;
                    border-radius: 14px;
                    padding: 1.25rem;
                    margin-top: 1.5rem;
                    margin-bottom: -1rem;
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
                
                .streak-info-card .note {
                    font-style: italic;
                    color: #95a5a6;
                    font-size: 0.85rem;
                    margin-top: 0.75rem;
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
                    
                    .leaderboard-filters {
                        flex-direction: column;
                        gap: 0.75rem;
                    }
                    
                    .filter-group {
                        justify-content: center;
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