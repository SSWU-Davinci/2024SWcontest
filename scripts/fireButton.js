import { setCriminal, getCriminal, getFire } from './logLoad.js';

document.addEventListener('DOMContentLoaded', function () {
    const fireButton = document.getElementById('fire');
    const dialogue = document.getElementById('dialogue'); // 대사를 표시하는 요소를 가져옵니다.

    fireButton.addEventListener('click', function() {
        const criminal = getCriminal();
        const fire = getFire();

        if (fire === 1) {  // fire가 1일 때만 클릭 동작을 허용
            if (criminal === 0) {
                window.location.href = 'gameover.html';
            } else if (criminal === 1) {
                window.location.href = 'loading.html';
            }
        } else {
        }
    });
});