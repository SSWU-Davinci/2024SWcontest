// document.addEventListener("DOMContentLoaded", function() {
//     const photoBoxes = document.querySelectorAll(".photo-box, .big-photo-box, .large-photo-box");

//     photoBoxes.forEach(box => {
//         box.addEventListener("click", function(event) {
//             event.stopPropagation();
//             const id = this.getAttribute("data-id");

//             fetch('data.json')
//                 .then(response => response.json())
//                 .then(data => {
//                     const currentBubbles = this.querySelectorAll('.speech-bubble');
//                     if (currentBubbles.length >= 3) return;

//                     const bubble = document.createElement('div');
//                     bubble.classList.add('speech-bubble');
//                     bubble.textContent = data[id];

//                     const offset = currentBubbles.length * 25;
                    
//                     bubble.style.bottom = `${120 + offset}%`;
//                     bubble.style.left = `50%`;
//                     bubble.style.transform = `translateX(-50%)`;

//                     this.appendChild(bubble);

//                     setTimeout(() => { bubble.remove(); }, 3000);
//                 })
//                 .catch(error => console.error("Error fetching data:", error));
//         });
//     });

//     document.addEventListener("click", function() {
//         document.querySelectorAll(".speech-bubble").forEach(bubble => {
//             bubble.remove();
//         });
//     });
// });

// 범인 캐릭터에 따라 CSS 클래스 설정하는 함수
function applyCriminalStyles(criminal) {
    const animalElements = document.querySelectorAll('.animal');

    animalElements.forEach(animal => {
        // 기본 클래스 제거
        animal.classList.remove('photo-box', 'big-photo-box', 'large-photo-box');

        // 범인 캐릭터에 맞는 CSS 클래스 추가
        if (criminal === 'fish' || criminal === 'pig') {
            animal.classList.add('photo-box');
        } else if (criminal === 'giraffe') {
            animal.classList.add('big-photo-box');
        } else if (criminal === 'bear') {
            animal.classList.add('large-photo-box');
        }
    });
}

// 범죄자 동물을 화면에 띄우기 위한 함수
function displayCriminal() {
    const criminal = getCriminal();
    if (criminal) {
        applyCriminalStyles(criminal); // CSS 클래스 설정
        const criminalImage = document.querySelector(`.background img.${criminal}`);
        if (criminalImage) {
            criminalImage.style.display = 'block';
        }
    }
}

// 문서 로드 후 범죄자 동물 표시
document.addEventListener("DOMContentLoaded", function () {
    displayCriminal();
});
