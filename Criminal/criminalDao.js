const pool = require('../config/dbConfig');

async function addAnimalToUserCatalog(connection, user_number, script_number, animal_number) {

    /// 대사 번호에 해당하는 범인 여부 확인
    const [scriptRows] = await connection.execute(
        `SELECT criminal
         FROM script
         WHERE script_number = ?`,
        [script_number]
    );

    if (scriptRows.length === 0 || scriptRows[0].criminal !== 1) {
        console.log('선택한 대사는 범인이 아닙니다.');
        return; // 범인이 아닌 경우 함수 종료
    }

    // 사용자 도감에서 범인 정보 확인
    const [catalogRows] = await connection.execute(
        'SELECT * FROM user_animal WHERE user_number = ? AND animal_number = ?',
        [user_number, animal_number]
    );

    if (catalogRows.length > 0) {
        console.error('범인이 이미 도감에 등록되어 있습니다.');
        return; // 이미 도감에 있는 경우 함수 종료
    }

    // 도감에 범인 정보 추가
    await connection.execute(
        'INSERT INTO user_animal (user_number, animal_number) VALUES (?, ?)',
        [user_number, animal_number]
    );

    console.log('범인이 도감에 추가되었습니다.');
}

// 사용자의 도감 정보를 조회하고 script_number 반환
async function getUserCatalog(connection, user_number) {
    const [rows] = await connection.execute(
        'SELECT * FROM user_animal WHERE user_number = ?',
        [user_number]
    );

    // 결과 반환
    return rows;
}

module.exports = {
    addAnimalToUserCatalog,
    getUserCatalog
};
