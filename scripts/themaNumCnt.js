async function themaNumCnt() {
    try {
        // 테마 상태
        let currentTheme = parseInt(localStorage.getItem('currentTheme') || '1');       // 현재 테마 (기본값 1)
        let themesCompleted = JSON.parse(localStorage.getItem('themesCompleted') || '[]');      // 완료된 테마

        // 모든 테마가 완료된 경우
        if (themesCompleted.length === 3) {
            document.getElementById('dialogue').textContent = '준비된 모든 테마가 소진되었습니다!';
            return;
        }

        // 현재 테마가 완료된 테마 리스트에 추가
        if (!themesCompleted.includes(currentTheme)) {
            themesCompleted.push(currentTheme);
            localStorage.setItem('themesCompleted', JSON.stringify(themesCompleted));  // // stringify: JavaScript 값이나 객체를 JSON 문자열로 변환하는 데 사용
        }

        // 다음 테마로 이동
        const nextTheme = getNextAvailableTheme(themesCompleted);
        if (nextTheme === null) {
            document.getElementById('dialogue').textContent = '준비된 모든 테마가 소진되었습니다!';
            return;
        }

        localStorage.setItem('currentTheme', nextTheme);

    } catch (error) {
        console.error('Error processing themes:', error);
    }
}

// 사용 가능한 다음 테마를 반환하는 함수
function getNextAvailableTheme(completedThemes) {
    for (let i = 1; i <= 3; i++) {
        if (!completedThemes.includes(i)) {
            return i;
        }
    }
    return null;  // 모든 테마가 완료된 경우
}

// DOMContentLoaded 이벤트에서 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 게임 초기화
>>>>>>> 93ba1d6f40205a8d80ace2c1e2d57d42b4787d8c
    localStorage.removeItem('themesCompleted');  // 이전 데이터 제거
    localStorage.setItem('currentTheme', '1');  // 처음 테마로 설정
    themaNumCnt();  // 테마 확인 및 업데이트
});
=======
    localStorage.removeItem('themesCompleted');                     // 이전 데이터 제거
    localStorage.setItem('currentTheme', '1');                      // 처음 테마로 설정
    loadDialogues();
});
>>>>>>> 96094dbe2300d00cbf52cf834a69dccf46db6fb0
