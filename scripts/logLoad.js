import { getThemeNumber } from './themaNumCnt.js';

document.addEventListener("DOMContentLoaded", function () {
    const animals = document.querySelectorAll(".animal");
    const dialogue = document.getElementById("dialogue");

    let logData = []; // 데이터를 저장할 배열
    let currentIndex = 0; // 클릭할 때마다 증가시킬 인덱스

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
            logData = data.data[themeNumber-1]; // 현재 테마에 맞는 데이터를 가져옵니다.
        })
        .catch(error => console.error('Error loading JSON:', error));

    animals.forEach(animal => {
        animal.addEventListener("click", function handler() {
            console.log("animal ID:", animal.id); // 클릭된 동물의 ID
            console.log("index", currentIndex); // 현재 인덱스

            if (logData.length > 0 && currentIndex < logData.length) {
                let currentLog = logData[currentIndex];
                let exceptions = Array.isArray(currentLog.exception) ? currentLog.exception : [currentLog.exception];
                let n = currentIndex;

                // 동물 ID에 해당하는 한국어 이름 설정
                name_text.textContent = animalNames[animal.id] || animal.id;

                if (exceptions.includes(animal.id)) {
                    //예외 동물인 경우
                    while (exceptions.includes(animal.id)) {
                        if (n < logData.length) {
                            n++;
                            currentLog = logData[n];
                            exceptions = Array.isArray(currentLog.exception) ? currentLog.exception : [currentLog.exception];
                        } else {
                            break; // 더 이상 유효한 대사가 없을 때 루프 종료
                        }

                        dialogue.textContent = currentLog.line;
                        setCriminal(currentLog.criminal); // criminal 값을 설정
                    }
                }
                else {
                    dialogue.textContent = currentLog.line;
                    setCriminal(currentLog.criminal); // criminal 값을 설정
                    // 다음 인덱스로 이동
                    currentIndex++;
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
        // 클릭된 곳이 동물이 아닌 경우에만 스타일 리셋
        if (!event.target.classList.contains("animal")) {
            animals.forEach(a => {
                a.style.transform = "";
                a.style.zIndex = "1";

                if (currentIndex >= logData.length-1) {
                    name_text.textContent = "햄부장"
                    dialogue.textContent = "모든 직원을 확인했뵤! 해고할 직원을 골라뵤~~";
                    console.log("index", currentIndex);
                }
                else {
                    console.log("index", currentIndex);
                    name_text.textContent = "햄부장"
                    dialogue.textContent = "신중하게 고민해뵤...";
                }
            });
        }
    });
});

// criminal.js
let criminal = null;

function setCriminal(value) {
    criminal = value;
}

function getCriminal() {
    return criminal;
}

export { setCriminal, getCriminal };
