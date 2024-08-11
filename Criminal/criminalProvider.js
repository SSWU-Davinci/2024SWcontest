const pool = require('../config/dbConfig');
const criminalDao = require('./criminalDao');

exports.addCriminalToUserCatalog = async function(user_number, script_number) {
    let connection;
    try {
        connection = await pool.getConnection();
        await criminalDao.addCriminalToUserCatalog(connection, user_number, script_number);
        return { success: true, message: 'Criminal added to user catalog successfully' };
    } catch (error) {
        console.error(`Error adding criminal to user catalog: ${error.message}`);
        return { success: false, message: 'Database query error' };
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

exports.getUserCatalog = async function(userId) {
    let connection;
    try {
        connection = await pool.getConnection();
        // Assumes script_number should be passed or is defined somewhere in context
        const script_numbers = await criminalDao.getUserCatalog(connection, userId);
        return { success: true, script_numbers };
    } catch (error) {
        console.error(`Error in getUserCatalog: ${error.message}`);
        return { success: false, message: 'Database query error' };
    } finally {
        if (connection) {
            connection.release();
        }
    }
};
