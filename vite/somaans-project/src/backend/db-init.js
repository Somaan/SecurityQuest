const pool = require('./pg');

 const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
 });


async function initialiseTables() {
    try {
        // Create users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                email VARCHAR(255) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                last_login TIMESTAMP,
                login_streak INTEGER,
                longest_login_streak INTEGER,
                last_login_update DATE,
                quiz_streak INTEGER,
                longest_quiz_streak INTEGER,
                last_quiz_update DATE
            )
        `);

        // Create remember_tokens table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS remember_tokens (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                token VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                expires_at TIMESTAMP NOT NULL,
                is_used BOOLEAN NOT NULL DEFAULT FALSE
            )
        `);

        // Create password_reset table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS password_reset (
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                token VARCHAR(255) NOT NULL,
                expires_at TIMESTAMP NOT NULL
            )
        `);

        // Create user_logins table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS user_logins (
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                login_date TIMESTAMP NOT NULL DEFAULT NOW()
            )
        `);

        // Create quiz_completions table
        await pool.query(`
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

        // Create quiz_answers table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS quiz_answers (
                completion_id INTEGER NOT NULL REFERENCES quiz_completions(id) ON DELETE CASCADE,
                question_index INTEGER,
                question TEXT,
                user_answer TEXT,
                correct_answer TEXT,
                is_correct BOOLEAN
            )
        `);

        console.log('Database tables initialised successfully');
    } catch (error) {
        console.error('Error initialising database tables:', error);
    } finally {
        await pool.end();
    }
}

initialiseTables();