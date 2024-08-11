// 테마 번호를 가져오거나 초기값을 설정
function getThemeNumber() {
    return parseInt(localStorage.getItem('themeNumber')) || 1;
}

// 테마 번호를 증가시키고 저장
function incrementThemeNumber() {
    let themeNumber = getThemeNumber();
    if (themeNumber >= 4) {  // 테마 번호가 4에 도달하면 리셋
        themeNumber = 1;
    } else {
        themeNumber += 1;
    }
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

// DOMContentLoaded 이벤트에서 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 페이지가 로드될 때 로컬 스토리지에 테마 번호가 설정되지 않았으면 초기화
    if (!localStorage.getItem('themeNumber')) {
        localStorage.setItem('themeNumber', '1');
    }

    // 현재 테마 번호를 콘솔에 출력 (디버깅 용도)
    logCurrentThemeNumber();
});

// DOMContentLoaded 이벤트에서 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 페이지가 로드될 때 로컬 스토리지에 테마 번호가 설정되지 않았으면 초기화
    if (!localStorage.getItem('themeNumber')) {
        localStorage.setItem('themeNumber', '1');
    }

    // 현재 테마 번호를 콘솔에 출력 (디버깅 용도)
    logCurrentThemeNumber();
});

// DOMContentLoaded 이벤트에서 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 초기화
    localStorage.removeItem('themesCompleted');  // 이전 데이터 제거
    if (!localStorage.getItem('themeNumber')) {  // 테마 번호가 없을 경우만 설정
        localStorage.setItem('themeNumber', '1');  // 처음 테마로 설정
    }

    // 현재 테마 번호를 로그에 출력
    logCurrentThemeNumber();
});

// 외부에서 사용할 수 있도록 함수들을 export
export { getThemeNumber };
