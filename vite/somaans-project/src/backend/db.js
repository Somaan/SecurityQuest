// db.js
const { Pool } = require('pg');

// Check for production environment (Heroku)
const isProduction = process.env.NODE_ENV === 'production';

// Use your existing connection config for local development
const localConfig = {
  user: 'postgres',        
  host: 'localhost',
  database: 'social_engineering_game',  
  password: 'M@nchester 123', 
  port: 5432,
};

// Create pool based on environment
const pool = isProduction 
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false  // Required for Heroku PostgreSQL
      }
    })
  : new Pool(localConfig);

// Test the connection
pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;