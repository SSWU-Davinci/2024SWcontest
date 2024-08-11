import { incrementThemeNumber, logCurrentThemeNumber } from './themaNumCnt.js';

document.addEventListener("DOMContentLoaded", function() {
    const prisonImage = document.querySelector('.prison');
    const firedText = document.querySelector('.fired');

    if (prisonImage && firedText) {
        prisonImage.addEventListener('animationend', function() {
            firedText.style.opacity = 1;
        });
    } else {
        console.warn('prisonImage or firedText element not found.');
    }

    const homeButton = document.getElementById('home');
    if (homeButton) {
        homeButton.addEventListener('click', function() {
            console.log('Home button clicked'); // 로그 추가
            incrementThemeNumber();
            window.location.href = 'inventory.html';
        });
    } else {
        console.warn('homeButton element not found.');
    }

    const nextStageButton = document.getElementById('nextstage');
    if (nextStageButton) {
        nextStageButton.addEventListener('click', function() {
            console.log('Next Stage button clicked'); // 로그 추가
            window.location.href = 'home.html';
        });
    } else {
        console.warn('nextStageButton element not found.');
    }

    function handleKeyPress(event) {
        if (event.code === 'Space' || event.code === 'Enter') {
            window.location.href = 'ending.html';
        }
    }
    document.addEventListener('keydown', handleKeyPress);

    logCurrentThemeNumber();
});
