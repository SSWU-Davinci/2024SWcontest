import { getThemeNumber } from './themaNumCnt.js';
import { setCriminal, getCriminal, setFire, getFire } from './criminal.js';

document.addEventListener("DOMContentLoaded", function () {
    const animals = document.querySelectorAll(".animal");
    const dialogue = document.getElementById("dialogue");
    const name_text = document.getElementById("name_text");

    let logData = [];
    let currentIndex = 0;
    let animalsClicked = new Set();
    let allAnimalsClicked = false;
    let finalClickRequired = false;

    const animalNames = {
        fish: '물고기',
        pig: '멧돼지',
        giraffe: '기린',
        bear: '북극곰'
    };

    fetch('../public/log/log.json')
        .then(response => response.json())
        .then(data => {
            const themeNumber = getThemeNumber();
            logData = data.data[themeNumber - 1];
        })
        .catch(error => console.error('Error loading JSON:', error));

    animals.forEach(animal => {
        animal.addEventListener("click", function handler() {
            if (finalClickRequired) {
                resetAnimalStyles();
                name_text.textContent = "햄부장";
                dialogue.textContent = "모든 직원을 확인했뵤! 해고할 직원을 골라뵤~~";
                setFire(1);
                return;
            }

            if (logData.length > 0 && currentIndex < logData.length) {
                let currentLog = logData[currentIndex];
                let exceptions = Array.isArray(currentLog.exception) ? currentLog.exception : [currentLog.exception];
                let n = currentIndex;

                name_text.textContent = animalNames[animal.id] || animal.id;

                if (exceptions.includes(animal.id)) {
                    while (exceptions.includes(animal.id)) {
                        n++;
                        currentLog = logData[n];
                        exceptions = Array.isArray(currentLog.exception) ? currentLog.exception : [currentLog.exception];
                    }
                } else {
                    currentIndex++;
                }

                animalsClicked.add(animal.id);

                if (animalsClicked.size === animals.length && !allAnimalsClicked) {
                    allAnimalsClicked = true;
                    finalClickRequired = true;
                    name_text.textContent = "햄부장";
                    dialogue.textContent = "모든 직원을 확인했뵤! 해고할 직원을 골라뵤~~";
                } else if (n < logData.length) {
                    dialogue.textContent = currentLog.text;
                }
            } else if (currentIndex >= logData.length) {
                finalClickRequired = true;
                name_text.textContent = "햄부장";
                dialogue.textContent = "모든 직원을 확인했뵤! 해고할 직원을 골라뵤~~";
            }

            animals.forEach(animal => {
                animal.removeEventListener("click", handler);
            });
        });
    });
});

function resetAnimalStyles() {
    const animalElements = document.querySelectorAll('.animal img');
    animalElements.forEach(animal => {
        const photoBox = animal.closest('.photo-box, .big-photo-box, .large-photo-box');
        if (photoBox) {
            photoBox.classList.remove('photo-box', 'big-photo-box', 'large-photo-box');
        }
    });
}
