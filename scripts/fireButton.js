import { getCriminal, getFire } from './criminal.js';

document.addEventListener('DOMContentLoaded', function () {
    const fireButton = document.getElementById('fire');
    let criminal = getCriminal();

    fireButton.addEventListener('click', function () {
        const fire = getFire();

        if (fire === 1) {
            criminal = getCriminal();
            console.log(criminal);
            // criminal 값에 따라 페이지 이동
            if (criminal === 0) {
                window.location.href = 'gameover.html';
            } else if (criminal === 1) {
                window.location.href = 'loading.html';
            } else {
                console.error("criminal 값 예외 오류", criminal);
            }
        } else {
            console.error("fire 값이 1이 아닙니다.", fire);
        }
    });
});
