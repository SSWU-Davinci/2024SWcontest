// 테마 번호를 가져오거나 초기값을 설정
function getThemeNumber() {
    return parseInt(localStorage.getItem('themeNumber')) || 1;
}

// 테마 번호를 증가시키고 저장
function incrementThemeNumber() {
    let themeNumber = getThemeNumber();
    themeNumber += 1;
    localStorage.setItem('themeNumber', themeNumber);
}

// 테마 번호를 로컬 스토리지에 저장된 값으로 설정
function setThemeNumber(number) {
    localStorage.setItem('themeNumber', number);
}

// 테마 번호를 콘솔에 출력하는 함수 (디버깅 용도)
function logCurrentThemeNumber() {
    console.log('Current theme number:', getThemeNumber());
}

// 외부에서 사용할 수 있도록 함수들을 export
export { getThemeNumber, incrementThemeNumber, setThemeNumber, logCurrentThemeNumber };

// DOMContentLoaded 이벤트에서 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 게임 초기화
    localStorage.removeItem('themesCompleted');  // 이전 데이터 제거
    localStorage.setItem('currentTheme', '1');  // 처음 테마로 설정
    themaNumCnt();  // 테마 확인 및 업데이트
});
