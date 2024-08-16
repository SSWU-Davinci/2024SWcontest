// 로컬 스토리지에 데이터 저장하기
function saveAnimalDataToLocalStorage(animal) {
    const animals = JSON.parse(localStorage.getItem('animalDoc')) || [];
    animals.push(animal);
    localStorage.setItem('animalDoc', JSON.stringify(animals));
}

// 로컬 스토리지에서 데이터 가져오기
function getAnimalDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem('animalDoc')) || [];
}

// 동물 도감에 동물 정보 표시하기
function displayAnimalDoc() {
    const animalDocContainer = document.getElementById('animalDoc');
    const animals = getAnimalDataFromLocalStorage();

    animalDocContainer.innerHTML = '';

    animals.forEach((animal, index) => {
        const animalDiv = document.createElement('div');
        animalDiv.classList.add('animal');

        const name = document.createElement('h2');
        name.textContent = animal.name;

        const description = document.createElement('p');
        description.textContent = animal.description;

        const quote = document.createElement('p');
        quote.textContent = `"${animal.quote}"`;

        const removeButton = document.createElement('button');
        removeButton.textContent = '삭제';
        removeButton.onclick = () => {
            removeAnimalFromLocalStorage(index);
            displayAnimalDoc();
        };

        animalDiv.appendChild(name);
        animalDiv.appendChild(description);
        animalDiv.appendChild(quote);
        animalDocContainer.appendChild(animalDiv);
    });
}

// 특정 동물 선택 시 처리
function selectAnimal(animalName) {
    const animals = getAnimalDataFromLocalStorage();
    const selectedAnimal = animals.find((animal) => animal.name === animalName);
    if (selectedAnimal) {
        saveAnimalDataToLocalStorage(selectedAnimal);
        displayAnimalDoc();
    } else {
        alert('선택한 동물을 찾을 수 없습니다.');
    }
}

// 페이지 로드 시 도감 표시
document.addEventListener('DOMContentLoaded', () => {
    displayAnimalDoc();
});

// 예시로 동물 선택 버튼 클릭 시 실행되는 코드
document.getElementById('selectLion').onclick = () => selectAnimal('사자');
document.getElementById('selectElephant').onclick = () => selectAnimal('코끼리');
document.getElementById('selectPenguin').onclick = () => selectAnimal('펭귄');