const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const pool = require('./db');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const app = express();

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Initial API key check
console.log('Testing environment setup...');
console.log('SendGrid API Key loaded:', process.env.SENDGRID_API_KEY ? 'Yes' : 'No');
console.log('API Key length:', process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY.length : 0);

// Middleware
app.use(cors({
    origin: 'http://localhost:5173' 
}));
app.use(express.json());

// Login endpoint with Remember Me support
app.post('/api/login', async (req, res) => {
    const { username, password, remember_me } = req.body;
    console.log('Login attempt:', { username, remember_me: !!remember_me });

    try {
        // Check if user exists
        console.log('Checking if user exists...');
        const userResult = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (userResult.rows.length === 0) {
            console.log('User not found');
            return res.status(401).json({ error: 'User not found' });
        }

        const user = userResult.rows[0];
        console.log('User found, ID:', user.id);

        // Check password
        console.log('Verifying password...');
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            console.log('Invalid password');
            return res.status(401).json({ error: 'Invalid password' });
        }
        console.log('Password verified successfully');

        // Update last login time
        await pool.query(
            'UPDATE users SET last_login = NOW() WHERE id = $1',
            [user.id]
        );
        console.log('Updated last login time');

        // Generate and store a remember token if remember_me is true
        let rememberToken = null;
        if (remember_me) {
            try {
                // Generate a secure token
                rememberToken = crypto.randomBytes(32).toString('hex');
                console.log('Generated remember token for user ID:', user.id);
                
                // Check if remember_tokens table exists
                const tableExists = await pool.query(`
                    SELECT EXISTS (
                        SELECT FROM information_schema.tables 
                        WHERE table_schema = 'public' 
                        AND table_name = 'remember_tokens'
                    );
                `);
                
                if (!tableExists.rows[0].exists) {
                    console.log('remember_tokens table does not exist, creating it now...');
                    
                    // Create the table if it doesn't exist
                    await pool.query(`
                        CREATE TABLE IF NOT EXISTS remember_tokens (
                            id SERIAL PRIMARY KEY,
                            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                            token VARCHAR(255) NOT NULL,
                            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                            expires_at TIMESTAMP NOT NULL,
                            is_used BOOLEAN NOT NULL DEFAULT FALSE
                        );
                        
                        CREATE INDEX IF NOT EXISTS remember_tokens_token_idx 
                            ON remember_tokens(token);
                        
                        CREATE INDEX IF NOT EXISTS remember_tokens_user_id_idx 
                            ON remember_tokens(user_id);
                    `);
                    
                    console.log('remember_tokens table created successfully');
                }
                
                // Store token in database 
                const now = new Date();
                const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
                
                console.log('Storing token in database...');
                console.log('Expiry date:', expiresAt.toISOString());
                
                const tokenResult = await pool.query(
                    `INSERT INTO remember_tokens 
                    (user_id, token, created_at, expires_at, is_used) 
                    VALUES ($1, $2, NOW(), $3, FALSE) RETURNING id`,
                    [user.id, rememberToken, expiresAt]
                );
                
                console.log('Token stored successfully with ID:', tokenResult.rows[0].id);
                
                // Verify the token was stored properly
                const verifyToken = await pool.query(
                    `SELECT * FROM remember_tokens WHERE id = $1`,
                    [tokenResult.rows[0].id]
                );
                
                console.log('Verification result:', verifyToken.rows[0]);
            } catch (tokenError) {
                console.error('Error storing remember token:', tokenError);
                // Continue login process even if token storage fails
            }
        }

        // Send success response
        res.json({
            success: true,
            user: {
                id: user.id,
                username: user.username
            },
            remember_token: rememberToken
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Register endpoint
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if username or email already exists
        const existingUser = await pool.query(
            'SELECT * FROM users WHERE username = $1 OR email = $2',
            [username, email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                error: 'Username or email already exists'
            });
        }

        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Insert new user
        const newUser = await pool.query(
            `INSERT INTO users (username, email, password_hash, created_at) 
             VALUES ($1, $2, $3, NOW()) 
             RETURNING id, username, email`,
            [username, email, passwordHash]
        );

        res.status(201).json({
            success: true,
            user: newUser.rows[0]
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Forgot Password endpoint
app.post('/api/forgot-password', async (req, res) => {
    const { email } = req.body;
    console.log('Received forgot password request for email:', email);

    try {
        // Check if user exists
        console.log('Checking if user exists...');
        const userResult = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        console.log('User query result:', userResult.rows);

        if (userResult.rows.length === 0) {
            console.log('No user found with this email');
            return res.status(404).json({ error: 'Email not found' });
        }

        const user = userResult.rows[0];
        console.log('User found:', user.id);

        // Generate timed reset token
        const token = crypto.randomBytes(32).toString('hex');
        const expires_at = new Date(Date.now() + 3600000); // 1 hour from now
        console.log('Generated token:', token);

        // Save token to database
        console.log('Saving token to database...');
        await pool.query(
            `INSERT INTO password_reset 
            (user_id, token, expires_at) 
            VALUES ($1, $2, $3)`,
            [user.id, token, expires_at]
        );
        console.log('Token saved successfully');

        // Send reset email using SendGrid API
        console.log('Preparing to send email via SendGrid API...');
        try {
            const msg = {
                to: email,
                from: {
                    email: 'somaan.mirza@uea.ac.uk',
                    name: 'Reset your password here'
                },
                subject: 'Social Engineering Platform',
                html: `
                    <div style="background-color: #f4f4f4; padding: 20px;">
                        <div style="background-color: white; padding: 20px; border-radius: 5px; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
                            <p>You have requested to reset your password.</p>
                            <p>Click the button below to reset your password.</p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="http://localhost:5173/reset-password?token=${token}" 
                                   style="background-color: #007bff; color: white; padding: 12px 24px; 
                                          text-decoration: none; border-radius: 4px; display: inline-block;">
                                    Reset Password
                                </a>
                            </div>
                            <p style="color: #666; font-size: 0.9em;">If you didn't request this password reset, please ignore this email.</p>
                            <p style="color: #666; font-size: 0.9em;">For security, this link will expire in 1 hour.</p>
                            <p style="color: #666; font-size: 0.9em;">Please check your spam folder if you don't see this email in your inbox.</p>
                        </div>
                    </div>
                `
            };
            
            console.log('SendGrid message configuration:', {
                to: msg.to,
                from: msg.from,
                subject: msg.subject
            });
            
            const response = await sgMail.send(msg);
            console.log('Email sent successfully via SendGrid API:', response);
        } catch (error) {
            console.error('SendGrid API error:', error);
            if (error.response) {
                console.error('Error body:', error.response.body);
            }
            throw error;
        }

        res.json({ message: 'Password reset email sent' });

    } catch (error) {
        console.error('Password reset request error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Reset Password endpoint
app.post('/api/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    console.log('Received password reset request');

    try {
        // Find valid token
        console.log('Checking token validity...');
        const tokenResult = await pool.query(
            `SELECT * FROM password_reset 
            WHERE token = $1 
            AND used = FALSE 
            AND expires_at > NOW()`,
            [token]
        );
        console.log('Token query result:', tokenResult.rows.length > 0);

        if (tokenResult.rows.length === 0) {
            console.log('Token invalid or expired');
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        const resetToken = tokenResult.rows[0];

        // Hash new password
        console.log('Hashing new password...');
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(newPassword, saltRounds);

        // Update password
        console.log('Updating password...');
        await pool.query(
            'UPDATE users SET password_hash = $1 WHERE id = $2',
            [passwordHash, resetToken.user_id]
        );

        // Mark token as used
        console.log('Marking token as used...');
        await pool.query(
            'UPDATE password_reset SET used = TRUE WHERE id = $1',
            [resetToken.id]
        );
        console.log('Password reset completed successfully');

        res.json({ message: 'Password successfully reset' });

    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Invalidate Remember Token endpoint
app.post('/api/invalidate-remember-token', async (req, res) => {
    const { username } = req.body;
    console.log('Invalidating remember tokens for user:', username);
    
    try {
        // Find user by username
        const userResult = await pool.query(
            'SELECT id FROM users WHERE username = $1',
            [username]
        );
        
        if (userResult.rows.length > 0) {
            const userId = userResult.rows[0].id;
            console.log('User found, ID:', userId);
            
            // Mark all tokens for this user as used
            const updateResult = await pool.query(
                'UPDATE remember_tokens SET is_used = TRUE WHERE user_id = $1 RETURNING id',
                [userId]
            );
            
            console.log(`Invalidated ${updateResult.rows.length} tokens`);
            res.json({ 
                success: true, 
                invalidated_count: updateResult.rows.length 
            });
        } else {
            console.log('User not found');
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error invalidating remember token:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Test endpoint for remember_tokens table
app.get('/api/test/remember-tokens', async (req, res) => {
    try {
        // Check if remember_tokens table exists
        const tableExists = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'remember_tokens'
            );
        `);
        
        if (!tableExists.rows[0].exists) {
            return res.json({ 
                exists: false, 
                message: 'remember_tokens table does not exist' 
            });
        }
        
        // Get recent tokens
        const recentTokens = await pool.query(`
            SELECT id, user_id, 
                  substring(token, 1, 10) || '...' as token_preview, 
                  created_at, expires_at, is_used
            FROM remember_tokens
            ORDER BY created_at DESC
            LIMIT 5
        `);
        
        res.json({ 
            exists: true, 
            recent_tokens: recentTokens.rows,
            count: recentTokens.rows.length
        });
    } catch (error) {
        console.error('Error testing remember tokens:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});