import { incrementThemeNumber, getThemeNumber, logCurrentThemeNumber } from './themaNumCnt.js';

document.addEventListener("DOMContentLoaded", function() {
    const prisonImage = document.querySelector('.prison');
    const firedText = document.querySelector('.fired');

    if (prisonImage && firedText) {
            prisonImage.addEventListener('animationend', function() {
            firedText.style.opacity = 1;
        });
    }

    const homeButton = document.getElementById('home');
    if (homeButton) {
        homeButton.addEventListener('click', function() {
            incrementThemeNumber();         // 테마번호
            window.location.href = 'inventory.html';            // 인벤토리 페이지로 이동
        });
    }

    const nextStageButton = document.getElementById('nextstage');
    if (nextStageButton) {
        nextStageButton.addEventListener('click', function() {
            incrementThemeNumber();         // 테마 번호 증가

            // 테마 번호가 4이면 inventory.html로 이동, 그렇지 않으면 home.html로 이동
            if (getThemeNumber() === 4) {
                nextstage.style.display = "none";
            } 
            else {
                window.location.href = 'home.html';
            }
        });
    }

    function handleKeyPress(event) {
        if (event.code === 'Space' || event.code === 'Enter') {
            window.location.href = 'ending.html'; // 엔딩 페이지로 이동
        }
    }
    document.addEventListener('keydown', handleKeyPress);

    logCurrentThemeNumber(); // 페이지 로드 시 현재 테마 번호를 콘솔에 출력
});

