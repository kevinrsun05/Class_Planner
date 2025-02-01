const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'password0531',
    host: 'localhost',
    port: 5432,
    database: 'classplanner'
});

module.exports = pool;