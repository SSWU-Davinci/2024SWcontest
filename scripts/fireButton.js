document.addEventListener("DOMContentLoaded", function() {
    const animals = document.querySelectorAll(".animal");
    const fireButton = document.getElementById('fire');

    // 범인과 범인 아닌 것의 여부 데이터 (임의로 하드코딩)
    /* const animalData = {
        'fish': false,
        'pig': false,
        'giraffe': false,
        'bear': true
    }; */

    if (fireButton) {
        fireButton.addEventListener('click', function() {
            console.log("Fire button clicked");

            // 선택된 동물 확인
            const selectedAnimal = Array.from(animals).find(animal => animal.dataset.selected);

            if (selectedAnimal && animalData[selectedAnimal.id]) {
                // 범인 선택 시 loading.html --> criminal.html로 이동
                window.location.href = 'loading.html';
            } 
            else {
                // 잘못된 동물 선택 시 gameover.html로 이동
                window.location.href = 'gameover.html';
            }
        });
    } else {
        console.error("Fire button not found");
    }
});
