const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const pool = require('./db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173' // Your Vite frontend URL
}));
app.use(express.json());

//using gmails 2fa to generate a passkey code
//user clicks forget password
//server generates token and saves to database
//server uses gmail account (via given password) to send an email to the user's address
//user receives email regardless of email provider - taken to site with token, site then verifies and can create new password - NOT WORKING (authentifcation issues)
const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587, //smtp port
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: "apikey",
        pass: "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" //constructed api key from sendgrid
    }
});

// Verify SMTP connection
transporter.verify(function(error, success) {
    if (error) {
        console.log("SMTP connection error:", error);
    } else {
        console.log("SMTP server is ready to take our messages");
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const userResult = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: 'User not found' });
        }

        const user = userResult.rows[0];

        // Check password
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Update last login time
        await pool.query(
            'UPDATE users SET last_login = NOW() WHERE id = $1',
            [user.id]
        );

        // Send success response
        res.json({
            success: true,
            user: {
                id: user.id,
                username: user.username
            }
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

        // Generate reset token
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

        // Send reset email
        console.log('Attempting to send email...');
        await transporter.sendMail({
            from: "somaan.mirza@uea.ac.uk",
            to: email,
            subject: 'Password Reset Request',
            html: `
                <div style="background-color: #f4f4f4; padding: 20px;">
                    <div style="background-color: white; padding: 20px; border-radius: 5px; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
                        <p>You have requested to reset your password.</p>
                        <p>Click the button below to reset your password. This link will expire in 1 hour.</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="http://localhost:5173/reset-password?token=${token}" 
                               style="background-color: #007bff; color: white; padding: 12px 24px; 
                                      text-decoration: none; border-radius: 4px; display: inline-block;">
                                Reset Password
                            </a>
                        </div>
                        <p style="color: #666; font-size: 0.9em;">If you didn't request this password reset, please ignore this email.</p>
                        <p style="color: #666; font-size: 0.9em;">For security, this link will expire in 1 hour.</p>
                    </div>
                </div>
            `
        });
        console.log('Email sent successfully');

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});