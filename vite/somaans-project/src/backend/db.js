const { Pool } = require('pg');
require('dotenv').config();

// Create pool configuration
const pool = new Pool({
  user: process.env.DB_USER,
  // Explicitly convert password to string to avoid the SASL error
  password: String(process.env.DB_PASSWORD),
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// Log successful connection
pool.on('connect', () => {
  console.log('Connected to local PostgreSQL database');
});

module.exports = pool;