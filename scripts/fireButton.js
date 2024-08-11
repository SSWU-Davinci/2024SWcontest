import { getCriminal, getFire } from './criminal.js';

document.addEventListener('DOMContentLoaded', function () {
    const fireButton = document.getElementById('fire');
    const dialogue = document.getElementById('dialogue');

    fireButton.addEventListener('click', function() {
        const criminal = getCriminal();
        const fire = getFire();

        console.log('Criminal:', criminal); // 디버깅용
        

        if (fire === 1) {
            if (criminal === 0) {
                window.location.href = 'gameover.html';
            } else if (criminal === 1) {
                window.location.href = 'loading.html';
            }
        } else {
            console.error("nameText 또는 dialogue 요소를 찾을 수 없습니다.");
        }
    })
});
