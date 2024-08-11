/*
<잠깐 뭐 좀 알아보고 다시 주석 풀게요,, - 이안>


async function loadDialogues() {
    try {
        const response = await fetch('../public/log/log.json');
        const data = await response.json();
        if (!data.success) throw new Error('Failed to load data');

        const dialogues = data.data;
        let currentTheme = parseInt(localStorage.getItem('currentTheme') || '1');           // 처음 테마는 1로 초기화
        let themesCompleted = JSON.parse(localStorage.getItem('themesCompleted') || '[]');  // 완료된 테마

        // 모든 테마가 완료된 경우
        if (themesCompleted.length === 3) {
            document.getElementById('dialogue').textContent = '게임이 끝났습니다!';
            return;
        }
        
        const themeDialogues = dialogues[currentTheme - 1];                                // 테마가 1,2,3 이 있으므로 인덱스로 들어갈 때에는 currentTheme - 1 형태
        if (themeDialogues) {
            const nonCriminalDialogues = themeDialogues.filter(d => d.criminal === 0);     // 범인이 아닌 대사 필터링

            // 대사 처리 및 다음 테마로 이동
            handleDialogues(nonCriminalDialogues, currentTheme, themesCompleted);
        } 
        else {
            console.error('No dialogues found for theme:', currentTheme);                   // 대사가 없는 경우
        }
    } 
    catch (error) {
        console.error('Error loading or processing data:', error);
    }
}


// 대사를 처리하고 다음 테마로 이동하는 함수
function handleDialogues(dialogues, currentTheme, themesCompleted) {
    if (dialogues.length > 0) {             // 범인이 아닌 동물의 대사가 있을 경우
        const randomIndex = Math.floor(Math.random() * dialogues.length);               // 랜덤으로
        const dialogue = dialogues[randomIndex];
        document.getElementById('dialogue').textContent = dialogue.line;

        // 현재 테마를 완료된 테마 리스트에 추가
        updateThemesCompleted(currentTheme);
    } 
    else {
        // 범인이 아닌 동물의 대사가 남아있지 않은 경우 처리
        updateThemesCompleted(currentTheme);
    }

    // 다음 테마로 이동
    const nextTheme = getNextAvailableTheme(themesCompleted);

    if (nextTheme === null) {
        document.getElementById('dialogue').textContent = '게임이 끝났습니다!';
        return;
    }

    localStorage.setItem('currentTheme', nextTheme);
    loadDialogues();  // 다음 대사 로드
}

// 현재 테마를 완료된 테마 리스트에 추가
function updateThemesCompleted(currentTheme) {
    let themesCompleted = JSON.parse(localStorage.getItem('themesCompleted') || '[]');
    if (!themesCompleted.includes(currentTheme)) {
        themesCompleted.push(currentTheme);
        localStorage.setItem('themesCompleted', JSON.stringify(themesCompleted));           // stringify: JavaScript 값이나 객체를 JSON 문자열로 변환하는 데 사용
    }
}


// 사용 가능한 다음 테마를 반환하는 함수
function getNextAvailableTheme(completedThemes) {
    for (let i = 1; i <= 3; i++) {
        if (!completedThemes.includes(i)) {
            return i;
        }
    }
    return null;        // 모든 테마가 완료된 경우
}

// DOMContentLoaded 이벤트에서 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 게임 초기화
    localStorage.removeItem('themesCompleted');                     // 이전 데이터 제거
    localStorage.setItem('currentTheme', '1');                      // 처음 테마로 설정
    loadDialogues();
});



*/
