document.addEventListener("DOMContentLoaded", function () {
    const animals = document.querySelectorAll(".animal");
    const dialogue = document.getElementById("dialogue");

    let logData = []; // JSON 데이터를 저장할 배열
    let currentIndex = 0; // 클릭할 때마다 증가시킬 인덱스

    // JSON 파일을 불러오는 함수
    fetch('../public/log/log.json')
        .then(response => response.json())
        .then(data => {
            // theme_number로 데이터 선택
            logData = data.data[0];
        })
        .catch(error => console.error('Error loading JSON:', error));

    animals.forEach(animal => {
        animal.addEventListener("click", function handler() {
            console.log("animal ID:", animal.id); // 클릭된 동물의 ID를 콘솔에 출력
            console.log("index", currentIndex); // 클릭 전에 현재 인덱스를 콘솔에 출력

            if (logData.length > 0 && currentIndex < logData.length) {
                let currentLog = logData[currentIndex];
                let exceptions = Array.isArray(currentLog.exception) ? currentLog.exception : [currentLog.exception];
                let n = currentIndex;

                if (exceptions.includes(animal.id)) {
                    // 예외에 포함된 경우, 유효한 대사를 찾기 위한 루프
                    while (exceptions.includes(animal.id)) {
                        if (n < logData.length) {
                            n++;
                            currentLog = logData[n];
                            exceptions = Array.isArray(currentLog.exception) ? currentLog.exception : [currentLog.exception];
                        } else {
                            break; // 더 이상 유효한 대사가 없을 때 루프 종료
                        }

                        dialogue.textContent = currentLog.line;
                    }
                }
                else {
                    dialogue.textContent = currentLog.line;
                    // 다음 인덱스로 이동
                    currentIndex++;
                }
            }

            // 기존 동물 클릭 시 transform 및 z-index 처리
            animals.forEach(a => {
                a.style.transform = "";
                a.style.zIndex = "1";
            });

            this.style.transform = "translate(0px, -35%) scale(1.7)";
            this.style.zIndex = "10";

            // 클릭된 동물의 클릭 이벤트 리스너 제거
            this.removeEventListener("click", handler);
        });
    });
});
