import { incrementThemeNumber, getThemeNumber, logCurrentThemeNumber } from './themaNumCnt.js';

document.addEventListener("DOMContentLoaded", function() {
    const prisonImage = document.querySelector('.prison');
    const firedText = document.querySelector('.fired');
    const homeButton = document.getElementById('home');
    const nextStageButton = document.getElementById('nextstage');

    if (prisonImage && firedText) {
            prisonImage.addEventListener('animationend', function() {
            firedText.style.opacity = 1;
        });
    }

    if (homeButton) {
        homeButton.addEventListener('click', function() {
            incrementThemeNumber();
            window.location.href = 'inventory.html'; // 인벤토리 페이지로 이동
        });
    }

    if (nextStageButton) {
        nextStageButton.addEventListener('click', function() {
            incrementThemeNumber(); // 테마 번호 증가

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



// criminal과 fire 다른 파일에서도 사용 가능하도록
let criminal = null;
let fire = null;

function setCriminal(value) {
    criminal = value;
}

function getCriminal() {
    return criminal;
}

function setFire(value) {
    fire = value;
}

function getFire() {
    return fire;
}

export { setCriminal, getCriminal, setFire, getFire };