const pool = require('../config/dbConfig');
const criminalDao = require('./criminalDao');

exports.addAnimalToUserCatalog = async function(user_number, floor, position) {
    let connection;
    try {
        connection = await pool.getConnection();
        // DAO 함수 호출 및 결과 저장
        const result = await criminalDao.addAnimalToUserCatalog(connection, user_number, floor, position);

        // DAO 함수의 결과에 따라 응답 설정
        if (!result.success) {
            // 실패한 경우 결과에 따라 응답을 반환
            return { success: false, message: result.message };
        }

        // 성공한 경우
        return result; // 성공적인 결과를 반환
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
