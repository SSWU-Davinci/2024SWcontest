const pool = require('../config/dbConfig');

async function getRandomSet(connection, theme_number) {
    const query = 'SELECT DISTINCT set_number FROM script WHERE theme_number = ? ORDER BY RAND() LIMIT 1';
    const [rows] = await connection.execute(query, [theme_number]);
    return rows[0];
}

async function getScript(connection, theme_number, set_number) {
    const query = 'SELECT theme_number, set_number, line, criminal, exception FROM script WHERE theme_number = ? AND set_number = ?';
    const [rows] = await connection.execute(query, [theme_number, set_number]);
    return rows;
}

module.exports = {
    getRandomSet,
    getScript
};