const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',        
    host: 'localhost',
    database: 'social_engineering_game',  
    password: 'M@nchester 123', 
    port: 5432,
});

module.exports = pool;