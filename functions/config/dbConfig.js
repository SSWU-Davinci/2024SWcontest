const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '34.27.65.161',
  user: 'root',
  password: '0000',
  database: 'davinci',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;