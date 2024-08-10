document.addEventListener("DOMContentLoaded", function() {

const animals = document.querySelectorAll(".animal");
const fireButton = document.getElementById('fire');

let animalData = [];

// JSON 데이터를 불러오기
fetch('../public/log/log.json')
    .then(response => response.json())
    .then(data => {
        animalData = data;

        if (fireButton) {
            fireButton.addEventListener('click', function() {
                console.log("Fire button clicked");

                // 선택된 동물 확인
                const selectedAnimal = Array.from(animals).find(animal => animal.dataset.selected);

                if (selectedAnimal) {
                    // JSON 데이터에서 선택된 동물의 범인 여부 찾기
                    const animalInfo = animalData.find(item => item.id === selectedAnimal.id);
                    const isCriminal = animalInfo ? animalInfo.isCriminal : false;

                    if (isCriminal) {
                        // 범인 선택 시 loading.html --> criminal.html로 이동
                        window.location.href = 'loading.html';
                    } 
                    else {
                        // 잘못된 동물 선택 시 gameover.html로 이동
                        window.location.href = 'gameover.html';
                    }
                } 
                else {
                    console.log("No animal selected");
                }
            });
        } 
        else {
            console.error("Fire button not found");
        }
    })
    .catch(error => console.error('Error loading JSON:', error));
});
