const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '34.64.171.82',
    user: 'root',
    password: 'robin66!',
    database: 'Davinci',
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;