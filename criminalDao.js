const pool = require('../config/dbConfig');

const addCriminalToUserCatalog = async (userId, criminal) => {
    let connection;
    try {
        connection = await pool.getConnection();

        // 범인이 맞는지 확인
        const [criminalRows] = await connection.execute('SELECT * FROM criminals WHERE criminal_id = ? AND is_real_criminal = 1', [criminal.criminalId]);
        if (criminalRows.length === 0) {
            throw new Error('선택한 범인이 실제 범인이 아닙니다.');
        }

        // 사용자 정보 조회
        const [userRows] = await connection.execute('SELECT * FROM users WHERE id = ?', [userId]);
        if (userRows.length === 0) {
            throw new Error('사용자를 찾을 수 없습니다.');
        }

        // 사용자 도감 조회
        const [catalogRows] = await connection.execute('SELECT * FROM user_catalog WHERE user_id = ? AND criminal_id = ?', [userId, criminal.criminalId]);
        if (catalogRows.length > 0) {
            throw new Error('범인이 이미 도감에 등록되어 있습니다.');
        }

        // 도감에 범인 정보 추가
        await connection.execute('INSERT INTO user_catalog (user_id, criminal_id, criminal_name, criminal_details) VALUES (?, ?, ?, ?)', 
        [userId, criminal.criminalId, criminal.name, criminal.details]);

    } catch (error) {
        throw new Error(error.message);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

// 사용자 도감에 범인 정보가 이미 있는지 확인
const checkCriminalInCatalog = async (userId, criminalId) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute('SELECT * FROM user_catalog WHERE user_id = ? AND criminal_id = ?', [userId, criminalId]);
        return rows.length > 0;
    } catch (error) {
        throw new Error(`Error checking criminal in catalog: ${error.message}`);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

// 범인 상세 정보 조회
const getCriminalDetails = async (criminalId) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute('SELECT * FROM criminals WHERE criminal_id = ?', [criminalId]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw new Error(`Error getting criminal details: ${error.message}`);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = {
    addCriminalToUserCatalog,
    checkCriminalInCatalog,
    getCriminalDetails
};