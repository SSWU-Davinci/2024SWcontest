const pool = require("../config/dbConfig");
const userDao = require("../User/userDao");

exports.loginCheck = async function (id, password) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    const loginUser = await userDao.userLogin(connection, id, password);

    connection.release();

    if (loginUser != null) {
      return { success: true, user: loginUser[0] };
    } else {
      return { success: false, message: "Invalid username or password" };
    }
  } catch (err) {
    console.error(`Error in loginCheck: ${err.message}`);
    return { success: false, message: "Database query error" };
  }
}

exports.joinCheck = async function (name, id, password) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    const joinUser = await userDao.userJoin(connection, name, id, password);

    connection.release();

    if (joinUser != null) {
      return { success: true, user: joinUser[0] };
    } else {
      return { success: false, message: "Invalid join" };
    }
  } catch (err) {
    console.error(`Error in Join: ${err.message}`);
    return { success: false, message: "Database query error" };
  }
}

exports.nameCheck = async function (name) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    const nameExist = await userDao.nameCheck(connection, name);

    connection.release();

    return { success: true, exists: nameExist };
  } catch (err) {
    console.error(`Error in nameCheck: ${err.message}`);
    return { success: false, message: "Database query error" };
  }
}

exports.idCheck = async function (id) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    const idExists = await userDao.idCheck(connection, id);

    connection.release();

    return { success: true, exists: idExists };
  } catch (err) {
    console.error(`Error in idCheck: ${err.message}`);
    return { success: false, message: "Database query error" };
  }
}