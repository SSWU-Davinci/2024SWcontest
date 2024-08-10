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