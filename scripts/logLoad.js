import { getThemeNumber } from './themaNumCnt.js';
import { setCriminal, setFire } from './criminal.js';

let findCriminal = null;

document.addEventListener("DOMContentLoaded", function () {
    const animals = document.querySelectorAll(".animal");
    const dialogue = document.getElementById("dialogue");
    const name_text = document.getElementById("name_text");

    let logData = [];
    let currentIndex = 0;
    let animalsClicked = new Set();
    let finalClickRequired = false;
    let currentCriminalValue = null;
    let currentLog = null;

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

    function handleClick(animal) {
        return function handler() {
            console.log("animal ID:", animal.id);
            console.log("index", currentIndex);
            console.log("fcss", findCriminal);

            if (finalClickRequired) {
                // 모든 동물이 클릭된 후
                resetAnimalStyles();
                name_text.textContent = "햄부장";
                dialogue.textContent = "모든 직원을 확인했뵤! 해고할 직원을 골라뵤~~";
                selectAnimalStyles();
                setFire(1);
                if (findCriminal !== null) {
                    currentCriminalValue = findCriminal;
                    setCriminal(currentCriminalValue);
                    console.log("범인 저장:", currentCriminalValue);
                }
                return;
            }

            if (logData.length > 0 && currentIndex < logData.length) {
                currentLog = logData[currentIndex];
                let exceptions = Array.isArray(currentLog.exception) ? currentLog.exception : [currentLog.exception];

                name_text.textContent = animalNames[animal.id] || animal.id;

                if (exceptions.includes(animal.id)) {
                    let n = currentIndex;
                    while (exceptions.includes(animal.id)) {
                        if (n < logData.length - 1) {
                            n++;
                            currentLog = logData[n];
                            exceptions = Array.isArray(currentLog.exception) ? currentLog.exception : [currentLog.exception];
                        } else {
                            break;
                        }
                    }
                    dialogue.textContent = currentLog.line;
                } else {
                    dialogue.textContent = currentLog.line;
                    currentIndex++;
                }

                // 클릭된 동물의 criminal 값을 currentCriminalValue에 저장
                currentCriminalValue = currentLog.criminal;
                findCriminal = currentCriminalValue;
                console.log("현재 criminal 값:", currentCriminalValue);

                animalsClicked.add(animal.id);

                if (animalsClicked.size === animals.length) {
                    finalClickRequired = true;
                }
            }

            animals.forEach(a => {
                a.style.transform = "";
                a.style.zIndex = "1";
            });

            this.style.transform = "translate(0px, -35%) scale(1.7)";
            this.style.zIndex = "10";

            if (!finalClickRequired) {
                this.removeEventListener("click", handler);
            }
        };
    }

    function resetAnimalStyles() {
        animals.forEach(a => {
            a.style.transform = "";
            a.style.zIndex = "1";
            a.style.animation = "";  // 애니메이션 초기화
            a.addEventListener("click", handleClick(a));  // 클릭 이벤트 재설정
        });
    }

    function selectAnimalStyles() {
        animals.forEach(a => {
            a.style.transition = "transform 0.3s ease-in-out";
            a.style.animation = "bounce 1s infinite";
            a.style.animationName = "grow-shrink";
            a.style.animationDuration = "1s";
            a.style.animationTimingFunction = "ease-in-out";
            a.style.animationIterationCount = "infinite";
        });

        animalsClicked.forEach(clickedAnimalId => {
            const clickedAnimal = document.getElementById(clickedAnimalId);
            if (clickedAnimal) {
                clickedAnimal.style.animationName = "grow-shrink-clicked";
                clickedAnimal.style.animationDuration = "1s";
                clickedAnimal.style.animationTimingFunction = "ease-in-out";
                clickedAnimal.style.animationIterationCount = "infinite";
            }
        });
    }

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes grow-shrink {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
        }

        @keyframes grow-shrink-clicked {
            0%, 100% {
                transform: scale(1.1);
            }
            50% {
                transform: scale(1.3);
            }
        }
    `;
    document.head.appendChild(style);

    animals.forEach(animal => {
        animal.addEventListener("click", handleClick(animal));
    });

    document.addEventListener("click", function (event) {
        if (!event.target.classList.contains("animal")) {
            if (finalClickRequired) {
                resetAnimalStyles();
                name_text.textContent = "햄부장";
                dialogue.textContent = "모든 직원을 확인했뵤! 해고할 직원을 골라뵤~~";
                selectAnimalStyles();
                setFire(1);
                if (findCriminal !== null) {
                    currentCriminalValue = findCriminal;
                    setCriminal(currentCriminalValue);
                    console.log("범인 저장:", currentCriminalValue);
                }
            } else {
                resetAnimalStyles();
                if (currentIndex < logData.length) {
                    name_text.textContent = "햄부장";
                    dialogue.textContent = "신중하게 모든 직원을 확인해뵤...";
                }
            }
        }
    });
});
