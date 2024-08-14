const pool = require('../config/dbConfig');

async function addAnimalToUserCatalog(connection, user_number, floor, position) {

    // 층, 위치로 동물 번호 찾기
    const [animalRows] = await connection.execute(
        'SELECT animal_number FROM animals WHERE floor = ? AND position = ?',
        [floor, position]
    );

    // animal_number 값 추출
    const animal_number = animalRows[0].animal_number;

    // 사용자 도감에서 범인 정보 확인
    const [catalogRows] = await connection.execute(
        `SELECT 1
         FROM user_animal
         WHERE user_number = ? AND animal_number = ?`,
        [user_number, animal_number]
    );

    if (catalogRows.length > 0) {
        console.error('범인이 이미 도감에 등록되어 있습니다.');
        return { success: false, message: 'The animal is already in the user catalog.' };
    }

    // user_animal의 최대 값을 찾고 1 증가시킴
    const [maxUserAnimalRow] = await connection.execute(
        'SELECT IFNULL(MAX(user_animal_number), 0) + 1 AS new_user_animal FROM user_animal'
    );

    const newUserAnimal = maxUserAnimalRow[0].new_user_animal;

    // 도감에 범인 정보 추가 (user_animal 열 포함)
    await connection.execute(
        'INSERT INTO user_animal (user_animal_number, user_number, animal_number) VALUES (?, ?, ?)',
        [newUserAnimal, user_number, animal_number]
    );

    console.log('범인이 도감에 추가되었습니다.');
    return { success: true, message: 'The animal has been added to the user catalog.' };
}

// 사용자의 도감 정보를 조회하고 script_number 반환
async function getUserCatalog(connection, user_number) {
    const [rows] = await connection.execute(
        `SELECT a.animal_name
         FROM user_animal ua
         JOIN animals a ON ua.animal_number = a.animal_number
         WHERE ua.user_number = ?`,
        [user_number]
    );

    // 결과 반환
    return rows;
}

module.exports = {
    addAnimalToUserCatalog,
    getUserCatalog
};
