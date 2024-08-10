// 동물 ID와 set_number 매핑 객체
const setNumberMap = {
    'fish': 0,
    'pig': 1,
    'giraffe': 2,
    'bear': 3
};

// JSON 데이터를 불러와 처리하는 코드
fetch('../public/log/log.json')
    .then(response => response.json())
    .then(data => {
        // 범인 동물 랜덤 선정
        const criminals = data.filter(item => item.criminal === 1 && item.theme_number === 1);
        if (criminals.length > 0) {
            // 범인 데이터를 랜덤으로 선택
            const randomCriminal = criminals[Math.floor(Math.random() * criminals.length)];
            criminalAnimalId = randomCriminal.exception;
        }
        
        // 동물 클릭 이벤트 처리
        document.querySelectorAll('.animal').forEach(animal => {
            animal.addEventListener('click', function() {
                const animalId = this.id;

                // 모든 동물의 스타일 초기화
                document.querySelectorAll('.animal').forEach(a => {
                    a.style.transform = "";
                    a.style.zIndex = "1";
                });

                // 클릭된 동물 스타일 변경
                this.style.transform = "translate(0px, -35%) scale(1.7)";
                this.style.zIndex = "10";

                // 클릭된 동물의 set_number 가져오기
                const set_number = setNumberMap[animalId];

                if (set_number !== undefined) {
                    // 선택된 동물의 대사 필터링
                    const dialogue = data.find(item => item.theme_number === 1 && item.set_number === set_number);
                    
                    if (dialogue) {
                        // 범인 동물이 클릭된 경우
                        if (dialogue.exception === criminalAnimalId) {
                            document.getElementById('dialogue').textContent = dialogue.line;
                        } else {
                            document.getElementById('dialogue').textContent = dialogue.line;
                        }
                    } else {
                        document.getElementById('dialogue').textContent = '대사를 찾을 수 없습니다.';
                    }
                }
            });
        });
    })
    .catch(error => console.error('Error loading JSON:', error));



/*
// JSON 데이터를 불러와 처리하는 코드
    fetch('../public/log/log.json')
        .then(response => response.json())
        .then(data => {
            // theme_number가 1이고 criminal이 1인 대사 필터링
            const dialogue = data.find(item => item.theme_number === 1 && item.set_number === 0);
            
            // 해당 대사가 있는 경우 "대사입니다." 부분에 대사 삽입
            if (dialogue) {
                document.getElementById('dialogue').textContent = dialogue.line;
            }
        })
        .catch(error => console.error('Error loading JSON:', error));
*/