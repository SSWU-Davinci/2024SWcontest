const pool = require('../firebaseConfig');

async function userLogin(connection, id, password) {
  const query = `SELECT * FROM user WHERE id = ? AND password = ?`;
  const [rows] = await connection.execute(query, [id, password]);
  return rows;
}

async function userJoin(connection, name, id, password) {
  const query = "INSERT INTO user (user_name, id, password) VALUES (?,?,?)";
  const [result] = await connection.execute(query, [name, id, password]);
  return result;
}

async function nameCheck(connection, name) {
  const query = "SELECT COUNT(*) AS count FROM user WHERE user_name = ?";
  const [rows] = await connection.execute(query, [name]);
  return rows[0].count > 0;
}

async function idCheck(connection, id) {
  const query = "SELECT COUNT(*) AS count FROM user WHERE id = ?";
  const [rows] = await connection.execute(query, [id]);
  return rows[0].count > 0;
}

module.exports = {
  userLogin,
  userJoin,
  nameCheck,
  idCheck
};