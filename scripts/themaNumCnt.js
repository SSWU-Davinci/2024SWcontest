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
