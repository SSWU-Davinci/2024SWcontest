// inventoryLoad.js

// 서버에서 범죄자 정보를 가져오는 함수
async function fetchCriminal(userNumber) {
    try {
        const response = await fetch('/api/get-criminal', { // API 엔드포인트
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            params: { user_number: userNumber }
        });
        if (!response.ok) throw new Error('Failed to fetch criminal data');
        const data = await response.json();
        return data.criminal;
    } catch (error) {
        console.error('Error fetching criminal data:', error);
    }
}

// CSS 클래스를 적용하는 함수
function applyCriminalStyles(criminal) {
    const animalElements = document.querySelectorAll('.animal img');

    animalElements.forEach(animal => {
        // 부모 요소(photo-box, big-photo-box, large-photo-box) 초기화
        const photoBox = animal.closest('.photo-box, .big-photo-box, .large-photo-box');
        if (photoBox) {
            photoBox.classList.remove('photo-box', 'big-photo-box', 'large-photo-box');
        }

        // 범인 캐릭터에 맞는 CSS 클래스 추가
        if (criminal === 1 || criminal === 2) {
            animal.closest('.photo-box').classList.add('photo-box');
        } else if (criminal === 3) {
            animal.closest('.big-photo-box').classList.add('big-photo-box');
        } else if (criminal === 4) {
            animal.closest('.large-photo-box').classList.add('large-photo-box');
        }
    });
}

document.addEventListener("DOMContentLoaded", async function () {
    const userNumber = 'user123'; // 사용자의 번호를 적절히 설정
    const criminal = await fetchCriminal(userNumber);
    if (criminal) {
        applyCriminalStyles(criminal);
        const criminalImage = document.querySelector(`img[alt="${criminal}"]`);
        if (criminalImage) {
            criminalImage.style.display = 'block';
        }
    }
});

// // 범인 캐릭터에 따라 CSS 클래스 설정하는 함수
// function applyCriminalStyles(criminal) {
//     const animalElements = document.querySelectorAll('.animal img');

//     animalElements.forEach(animal => {
//         // 부모 요소(photo-box, big-photo-box, large-photo-box) 초기화
//         const photoBox = animal.closest('.photo-box, .big-photo-box, .large-photo-box');
//         if (photoBox) {
//             photoBox.classList.remove('photo-box', 'big-photo-box', 'large-photo-box');
//         }

//         // 범인 캐릭터에 맞는 CSS 클래스 추가
//         if (criminal === 'fish' || criminal === 'pig') {
//             animal.closest('.photo-box').classList.add('photo-box');
//         } else if (criminal === 'giraffe') {
//             animal.closest('.big-photo-box').classList.add('big-photo-box');
//         } else if (criminal === 'bear') {
//             animal.closest('.large-photo-box').classList.add('large-photo-box');
//         }
//     });
// }

// // 범죄자 동물을 화면에 띄우기 위한 함수
// function displayCriminal() {
//     const criminal = getCriminal(); // 서버에서 범인 ID를 받아오는 함수
//     if (criminal) {
//         applyCriminalStyles(criminal); // CSS 클래스 설정
//         const criminalImage = document.querySelector(`img[alt="${criminal.charAt(0).toUpperCase() + criminal.slice(1)}"]`);
//         if (criminalImage) {
//             criminalImage.style.display = 'block';
//         }
//     }
// }

// // 문서 로드 후 범죄자 동물 표시
// document.addEventListener("DOMContentLoaded", function () {
//     displayCriminal();
// });
