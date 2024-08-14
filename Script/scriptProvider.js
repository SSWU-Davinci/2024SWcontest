const pool = require("../config/dbConfig");
const scriptDao = require("../Script/scriptDao");

exports.getRandomScripts = async function() {
    try {
        // 커넥션 풀에서 연결 가져오기
        const connection = await pool.getConnection(async(conn) => conn);

        // 테마 1, 2, 3 각각에 대해 세트를 랜덤으로 선택
        const themeNumbers = [1, 2, 3];
        const finalScripts = [];

        for (const themeNumber of themeNumbers) {
            // 랜덤 세트 가져오기
            const set = await scriptDao.getRandomSet(connection, themeNumber);
            const setNumber = set.set_number;

            // 해당 테마와 세트의 스크립트 가져오기
            const scripts = await scriptDao.getScript(connection, themeNumber, setNumber);
            const shuffleScripts = scripts.sort(() => 0.5 - Math.random());

            finalScripts.push(shuffleScripts);
        }

        // 커넥션 반납
        connection.release();

        // 결과를 2차원 배열 형태로 반환
        return finalScripts;

    } catch (error) {
        console.error('Error getting scripts for themes:', error);
        throw error;
    }
<<<<<<< HEAD
};

=======
};
>>>>>>> Chaeyeon
