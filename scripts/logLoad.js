import { getThemeNumber } from './themaNumCnt.js';
import { setCriminal, getCriminal, setFire, getFire } from './criminal.js';

document.addEventListener("DOMContentLoaded", function () {
    const animals = document.querySelectorAll(".animal");
    const dialogue = document.getElementById("dialogue");
    const name_text = document.getElementById("name_text");

    let logData = []; // 데이터를 저장할 배열
    let currentIndex = 0; // 클릭할 때마다 증가시킬 인덱스
    let animalsClicked = new Set(); // 클릭된 동물들을 저장할 Set
    let allAnimalsClicked = false; // 모든 동물이 클릭되었는지 확인
    let finalClickRequired = false; // 모든 대사를 확인한 후 클릭 필요 여부

    // 동물 ID와 한국어 이름의 매핑
    const animalNames = {
        fish: '물고기',
        pig: '멧돼지',
        giraffe: '기린',
        bear: '북극곰'
    };

    // JSON 파일을 불러오는 함수
    fetch('../public/log/log.json')
        .then(response => response.json())
        .then(data => {
            // theme_number로 데이터 선택
            const themeNumber = getThemeNumber(); 
            logData = data.data[themeNumber - 1]; // 현재 테마에 맞는 데이터를 가져옵니다.
        })
        .catch(error => console.error('Error loading JSON:', error));

    animals.forEach(animal => {
        animal.addEventListener("click", function handler() {
            console.log("animal ID:", animal.id); // 클릭된 동물의 ID
            console.log("index", currentIndex); // 현재 인덱스

            if (finalClickRequired) {
                // 모든 대사를 확인한 후 클릭했을 때
                resetAnimalStyles();
                name_text.textContent = "햄부장";
                dialogue.textContent = "모든 직원을 확인했뵤! 해고할 직원을 골라뵤~~";
                selectAnimalStyles();
                setFire(1);
                return;
            }

            if (logData.length > 0 && currentIndex < logData.length) {
                let currentLog = logData[currentIndex];
                let exceptions = Array.isArray(currentLog.exception) ? currentLog.exception : [currentLog.exception];
                let n = currentIndex;

                // 동물 ID에 해당하는 한국어 이름 설정
                name_text.textContent = animalNames[animal.id] || animal.id;

                if (exceptions.includes(animal.id)) {
                    // 예외 동물인 경우
                    while (exceptions.includes(animal.id)) {
                        if (n < logData.length) {
                            n++;
                            currentLog = logData[n];
                            exceptions = Array.isArray(currentLog.exception) ? currentLog.exception : [currentLog.exception];
                        } else {
                            break; // 더 이상 유효한 대사가 없을 때 루프 종료
                        }
                    }
                    dialogue.textContent = currentLog.line;
                    setCriminal(currentLog.criminal); // criminal 값을 설정
                } else {
                    dialogue.textContent = currentLog.line;
                    setCriminal(currentLog.criminal); // criminal 값을 설정
                    // 다음 인덱스로 이동
                    currentIndex++;
                }

                // 클릭된 동물을 Set에 추가
                animalsClicked.add(animal.id);

                // 모든 동물이 클릭되었는지 확인
                if (animalsClicked.size === animals.length) {
                    allAnimalsClicked = true;
                    finalClickRequired = true;
                }
            }

            // 동물 앞으로 나오게
            animals.forEach(a => {
                a.style.transform = "";
                a.style.zIndex = "1";
            });

            this.style.transform = "translate(0px, -35%) scale(1.7)";
            this.style.zIndex = "10";

            // 2번 클릭 못하도록
            this.removeEventListener("click", handler);
        });
    });

    // 화면 클릭 시 동물 스타일 리셋
    document.addEventListener("click", function (event) {
        if (!event.target.classList.contains("animal")) {
            if (finalClickRequired) {
                // 모든 대사를 확인한 후, 화면의 다른 곳을 클릭했을 때
                resetAnimalStyles();
                name_text.textContent = "햄부장";
                dialogue.textContent = "모든 직원을 확인했뵤! 해고할 직원을 골라뵤~~";
                selectAnimalStyles();
                setFire(1);
            } else if (allAnimalsClicked) {
                // 모든 동물이 클릭되었지만, 아직 추가 클릭이 필요 없는 경우
                resetAnimalStyles();
                name_text.textContent = "햄부장";
                dialogue.textContent = "모든 직원을 확인했뵤! 해고할 직원을 골라뵤~~";
                selectAnimalStyles();
                setFire(1);
            } else {
                // 클릭된 곳이 동물이 아닌 경우에만 스타일 리셋
                animals.forEach(a => {
                    a.style.transform = "";
                    a.style.zIndex = "1";
                });

                if (currentIndex < logData.length) {
                    name_text.textContent = "햄부장";
                    dialogue.textContent = "신중하게 모든 직원을 확인해뵤...";
                }
            }
        }
    });

    // 동물들의 크기 및 위치를 초기 상태로 되돌리는 함수
    function resetAnimalStyles() {
        animals.forEach(a => {
            a.style.transform = "";
            a.style.zIndex = "1";
        });
    }

    function selectAnimalStyles() {
        // 모든 동물들에게 커졌다 작아졌다 하는 애니메이션 적용
        animals.forEach(a => {
            a.style.transition = "transform 0.3s ease-in-out";
            a.style.animation = "bounce 1s infinite";
    
            // 커졌다 작아졌다 하는 keyframes 애니메이션 정의
            a.style.animationName = "grow-shrink";
            a.style.animationDuration = "1s";
            a.style.animationTimingFunction = "ease-in-out";
            a.style.animationIterationCount = "infinite";
        });
    
        // 클릭된 동물에게는 커졌다 작아졌다 하는 애니메이션 적용
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
    
    // keyframes 정의 (스타일 시트에 추가해야 함)
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
});