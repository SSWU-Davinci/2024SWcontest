import { getThemeNumber } from './themaNumCnt.js';

// 동물 ID와 CSS 선택자 매핑
const animalImages = {
    fish: '.fish',
    pig: '.pig',
    giraffe: '.giraffe',
    bear: '.bear'
};

// 범죄자 동물 ID를 가져오는 함수
function getCriminalAnimalIds() {
    const criminals = localStorage.getItem('criminals');
    return criminals ? JSON.parse(criminals) : [];
}

// 범인의 이미지를 띄우기
const criminalAnimalIds = getCriminalAnimalIds();

criminalAnimalIds.forEach(animalId => {
    const selector = animalImages[animalId];
    if (selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.style.display = 'block'; // 이미지 표시
            console.log(`범인 이미지 표시: ${selector}`);
        } else {
            console.warn(`범인 이미지 요소를 찾을 수 없음: ${selector}`);
        }
    } else {
        console.warn(`유효하지 않은 동물 ID: ${animalId}`);
    }
});
