const { Pool } = require('pg');
require('dotenv').config();

// Create a dedicated pool for initialization
// This avoids conflicts with the regular pool in db.js
let poolConfig;

if (process.env.DATABASE_URL) {
  // For Heroku or production environment
  poolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  };
} else {
  // For local development
  poolConfig = {
    user: process.env.DB_USER || 'postgres',
    password: String(process.env.DB_PASSWORD || ''), // Explicitly convert to string
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'postgres',
  };
}

// Log connection info
console.log('Database Connection Configuration:');
console.log('Host:', poolConfig.connectionString ? new URL(poolConfig.connectionString).hostname : poolConfig.host);
console.log('Database:', poolConfig.connectionString ? new URL(poolConfig.connectionString).pathname.substring(1) : poolConfig.database);
console.log('User:', poolConfig.connectionString ? new URL(poolConfig.connectionString).username : poolConfig.user);

const initPool = new Pool(poolConfig);

async function initialiseTables() {
  try {
    console.log('Starting database initialization...');
    
    // Create users table
    await initPool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        last_login TIMESTAMP,
        login_streak INTEGER DEFAULT 0,
        longest_login_streak INTEGER DEFAULT 0,
        last_login_update DATE,
        quiz_streak INTEGER DEFAULT 0,
        longest_quiz_streak INTEGER DEFAULT 0,
        last_quiz_update DATE
      )
    `);
    
    console.log('Users table created');

    // Create remember_tokens table
    await initPool.query(`
      CREATE TABLE IF NOT EXISTS remember_tokens (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        expires_at TIMESTAMP NOT NULL,
        is_used BOOLEAN NOT NULL DEFAULT FALSE
      )
    `);
    
    console.log('Remember tokens table created');

    // Create password_reset table
    await initPool.query(`
      CREATE TABLE IF NOT EXISTS password_reset (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token VARCHAR(255) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    console.log('Password reset table created');

    // Create user_logins table
    await initPool.query(`
      CREATE TABLE IF NOT EXISTS user_logins (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        login_date TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    
    console.log('User logins table created');

    // Create quiz_completions table
    await initPool.query(`
      CREATE TABLE IF NOT EXISTS quiz_completions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        quiz_id INTEGER NOT NULL,
        score DECIMAL(5,2),
        completion_date TIMESTAMP NOT NULL DEFAULT NOW(),
        total_questions INTEGER,
        correct_answers INTEGER,
        completion_details JSONB,
        submission_id VARCHAR(255)
      )
    `);
    
    console.log('Quiz completions table created');

    // Create quiz_answers table
    await initPool.query(`
      CREATE TABLE IF NOT EXISTS quiz_answers (
        id SERIAL PRIMARY KEY,
        completion_id INTEGER NOT NULL REFERENCES quiz_completions(id) ON DELETE CASCADE,
        question_index INTEGER,
        question TEXT,
        user_answer TEXT,
        correct_answer TEXT,
        is_correct BOOLEAN
      )
    `);
    
    console.log('Quiz answers table created');

    // Create a test user if no users exist
    const userCount = await initPool.query('SELECT COUNT(*) FROM users');
    
    if (parseInt(userCount.rows[0].count) === 0) {
      // Create a test user (password: "test123!@#")
      const bcrypt = require('bcryptjs');
      const saltRounds = 10;
      const testPasswordHash = await bcrypt.hash('test123!@#', saltRounds);
      
      await initPool.query(`
        INSERT INTO users (username, email, password_hash)
        VALUES ('testuser', 'test@example.com', $1)
      `, [testPasswordHash]);
      
      console.log('Test user created with username: testuser, password: test123!@#');
    } else {
      console.log(`${userCount.rows[0].count} users already exist in the database`);
    }

    console.log('Database tables initialised successfully');
  } catch (error) {
    console.error('Error initialising database tables:', error);
    throw error; // Re-throw to be caught by the caller
  } finally {
    // Close the pool when done
    await initPool.end();
    console.log('Database connection closed');
  }
}

// Run the initialization
initialiseTables()
  .then(() => {
    console.log('Database initialization completed successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('Database initialization failed:', err);
    process.exit(1);
  });