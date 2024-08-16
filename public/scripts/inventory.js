import { chooseCriminal as fetchCriminal } from './logLoad.js';

const animalMapping = {
    1: 'pig',
    2: 'fish',
    3: 'giraffe',
    4: 'bear'
};

const animalIds = [1, 2, 3, 4];

function randomAnimals() {
    let animals = [];

    for (let i = 0; i < 3; i++) {
        animalIds.forEach(id => {
            animals.push(animalMapping[id]);
        });
    }

    animals = animals.sort(() => Math.random() - 0.5);
    return animals;
}

function createAnimalElement(animalType) {
    const animalDiv = document.createElement('div');
    const animalId = animalIds[Object.values(animalMapping).indexOf(animalType)];

    animalDiv.setAttribute('data-id', animalId);  // ID 설정

    switch (animalType) {
        case 'fish':
        case 'pig':
            animalDiv.classList.add('photo-box');
            break;
        case 'giraffe':
            animalDiv.classList.add('big-photo-box');
            break;
        case 'bear':
            animalDiv.classList.add('large-photo-box');
            break;
        default:
            animalDiv.classList.add('photo-box');
    }

    const img = document.createElement('img');
    img.src = `../img/${animalType}.png`;
    animalDiv.appendChild(img);

    return animalDiv;
}

function renderAnimals() {
    const animalContainer = document.getElementById('animalContainer');
    const animals = randomAnimals();

    animals.forEach(animalType => {
        const animalElement = createAnimalElement(animalType);
        animalContainer.appendChild(animalElement);
    });
}

function chooseCriminal() {
    const animalElements = document.querySelectorAll('.photo-box, .big-photo-box, .large-photo-box');

    animalElements.forEach(animal => {
        animal.addEventListener('click', () => {
            const animalId = parseInt(animal.getAttribute('data-id'));  // 데이터 ID 가져오기
            const criminalId = fetchCriminal(animalId);  // 범인 정보 가져오기
            const criminalValue = animalMapping[criminalId];

            console.log('범인 값:', criminalValue);

            if (criminalValue) {
                console.log(`동물 ID: ${animalId}, Criminal: ${criminalValue}`);
                setCriminal(criminalValue);
            } else {
                console.log(`동물 ID: ${animalId}에 해당하는 Criminal 값을 찾을 수 없습니다.`);
            }
        });
    });
}

function setCriminal(criminal) {
    console.log(`설정된 범인: ${criminal}`);
}

document.addEventListener('DOMContentLoaded', () => {
    renderAnimals();
    setTimeout(() => {
        chooseCriminal();
    }, 100);
    displayAnimalDoc();
});

//////////////////////////////////////////////////////////////////////////////

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