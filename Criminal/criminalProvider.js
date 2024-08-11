const pool = require('../config/dbConfig');
const criminalDao = require('./criminalDao');

exports.addAnimalToUserCatalog = async function(user_number, script_number, animal_number) {
    let connection;
    try {
        connection = await pool.getConnection();
        await criminalDao.addAnimalToUserCatalog(connection, user_number, script_number, animal_number);
        return { success: true, message: 'Animal added to user catalog successfully' };
    } catch (error) {
        console.error(`Error adding animal to user catalog: ${error.message}`);
        return { success: false, message: 'Database query error' };
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

exports.getUserCatalog = async function(user_number) {
    let connection;
    try {
        connection = await pool.getConnection();
        // Assumes script_number should be passed or is defined somewhere in context
        const userAnimals = await criminalDao.getUserCatalog(connection, user_number);
        return { success: true, userAnimals };
    } catch (error) {
        console.error(`Error in getUserCatalog: ${error.message}`);
        return { success: false, message: 'Database query error' };
    } finally {
        if (connection) {
            connection.release();
        }
    }
};
