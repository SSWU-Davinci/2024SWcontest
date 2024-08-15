const pool = require('../config/dbConfig');
const criminalDao = require('./criminalDao');
// 사용자 번호와 위치 정보를 사용하여 도감에 동물을 추가하는 서비스 함수
exports.addAnimal = async function(user_number, floor, position) {
    let connection;
    try {
        // 데이터베이스 연결을 가져옴
        connection = await pool.getConnection();
        // DAO 함수 호출 및 결과를 받아옴
        const result = await criminalDao.addAnimal(connection, user_number, floor, position);
        // DAO 함수의 결과에 따라 응답을 설정
        if (!result.success) {
            return { success: false, message: result.message };
        }
        return result;
    } catch (error) {
        console.error(`Error adding animal to user catalog: ${error.message}`);
        return { success: false, message: 'Database query error' };
    } finally {
        // 데이터베이스 연결을 반환
        if (connection) {
            connection.release();
        }
    }
};
// 사용자 번호를 사용하여 도감에 있는 동물 목록을 가져오는 서비스 함수
exports.getAnimal = async function(user_number) {
    let connection;
    try {
        // 데이터베이스 연결을 가져옴
        connection = await pool.getConnection();
        // DAO 함수 호출 및 결과를 받아옴
        const userAnimals = await criminalDao.getAnimal(connection, user_number);
        return { success: true, userAnimals };
    } catch (error) {
        console.error(`Error in getUserCatalog: ${error.message}`);
        return { success: false, message: 'Database query error' };
    } finally {
        // 데이터베이스 연결을 반환
        if (connection) {
            connection.release();
        }
    }
};
