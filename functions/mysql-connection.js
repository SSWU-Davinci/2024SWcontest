// functions/mysql-connection.js
const mysql = require("mysql2/promise");

// MySQL 데이터베이스 연결 풀 생성
const pool = mysql.createPool({
  host: "/cloudsql/swcontest-e2cf1:us-central1-c:34.27.65.161", // Cloud SQL 연결
  user: "root",
  password: "0000",
  database: "davinci",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
