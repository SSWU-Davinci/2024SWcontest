const pool = require("../config/dbConfig");
const userDao = require("../Select/selectDao");

exports.getRandomScriptsForCharacters = async function() {
    try {
        // 커넥션 풀에서 연결 가져오기
        const connection = await pool.getConnection(async(conn)=> conn);

        // 랜덤 테마 가져오기
        const theme = await selectDao.getRandomTheme(connection);
        const themeNumber = theme.theme_number;

        // 랜덤 세트 가져오기
        const set = await selectDao.getRandomSet(connection, themeNumber);
        const setNumber = set.set_number;

        // 해당 테마와 세트의 스크립트 가져오기
        const scripts = await selectDao.getScript(connection, themeNumber, setNumber);

        // 랜덤하게 섞음
        const shuffleScripts = scripts.sort(() => 0.5 - Math.random());

        // 캐릭터에 스크립트 할당
        const characters = ['Character1', 'Character2', 'Character3', 'Character4'];
        const characterScripts = characters.map((character, index) => ({
            character,
            script: shuffledScripts[index]?.line || 'No script available' // 방어적 프로그래밍
        }));

        return {
            theme: theme.theme_name,
            set: setNumber,
            characterScripts
        };
    } catch (err) {
        console.error(`Error in getRandomScriptsForCharacters: ${err.message}`);
        return { success: false, message: 'Database query error' };
    } finally {
        if (connection) connection.release(); // 커넥션 반납
    }
};


module.exports = {
    getRandomScriptsForCharacters
};
