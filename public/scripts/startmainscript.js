function handleScreenClick() {
    // 화면을 클릭하면 홈 화면으로 이동하기
    window.location.href = 'home.html';
}
document.addEventListener('click', handleScreenClick);

function handleKeyPress(event) {
    if (event.code === 'Space' || event.code === 'Enter') {
        // 엔터키와 스페이스바 누르면 홈 화면으로 이동하기
        window.location.href = 'home.html';
    }
}
document.addEventListener('keydown', handleKeyPress);

import { incrementThemeNumber } from "./themaNumCnt.js";
incrementThemeNumber();