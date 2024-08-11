const pool = require('../config/dbConfig');

async function addCriminalToUserCatalog(connection, user_number, script_number) {
    try {
        // 범인 여부와 해당 animal_number 조회
        const [criminalRows] = await connection.execute(
            `SELECT S.script_number, A.animal_number
             FROM SCRIPT S
             JOIN ANIMALS A ON S.script_number = A.animal_number
             WHERE S.criminal = 1 AND S.script_number = ?`,
            [script_number]
        );

        if (criminalRows.length === 0) {
            console.log('선택한 범인이 실제 범인이 아닙니다.');
            return; // 범인이 아닐 경우 함수 종료
        }

        // 범인의 animal_number 추출
        const { animal_number } = criminalRows[0];

        // 사용자 도감에서 범인 정보 확인
        const [catalogRows] = await connection.execute(
            'SELECT * FROM USER_ANIMAL WHERE user_number = ? AND animal_number = ?',
            [user_number, animal_number]
        );

        if (catalogRows.length > 0) {
            console.error('범인이 이미 도감에 등록되어 있습니다.');
            return; // 이미 도감에 있는 경우 함수 종료
        }

        // 도감에 범인 정보 추가
        await connection.execute(
            'INSERT INTO USER_ANIMAL (user_number, animal_number) VALUES (?, ?)',
            [user_number, animal_number]
        );

        console.log('범인이 도감에 추가되었습니다.');
    } catch (error) {
        console.error(`Error adding criminal to user catalog: ${error.message}`);
        throw error;
    }
}

// 사용자의 도감 정보를 조회하고 script_number 반환
async function getUserCatalog(connection, user_number) {
    try {
        const [catalogRows] = await connection.execute(
            `SELECT S.script_number
         FROM USER_ANIMAL UA
         JOIN SCRIPT S ON UA.animal_number = S.script_number
         WHERE UA.user_number = ?`,
            [user_number]
        );
        return catalogRows.map(row => row.script_number);
    } catch (error) {
        console.error(`Error getting user catalog with script numbers: ${error.message}`);
        throw error;
    }
}

module.exports = {
    addCriminalToUserCatalog,
    getUserCatalog
};
