document.addEventListener('DOMContentLoaded', async () => {
    try {
        const user_number = 'your-user-number'; // 실제 사용자 번호로 대체하세요

        // 서버에서 사용자 도감을 가져옵니다
        const response = await fetch(`/api/user-catalog`, {
            method: 'POST', // 데이터를 보내는 경우 POST 사용
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_number })
        });

        if (!response.ok) {
            throw new Error('네트워크 응답이 정상적이지 않습니다.');
        }

        const data = await response.json();

        if (data.success) {
            const whiteboard = document.getElementById('whiteboard');

            data.userAnimals.forEach(animal => {
                const photoBox = document.createElement('div');
                photoBox.className = `photo-box photo-background`;
                photoBox.dataset.id = animal.animal_number;

                const clip = document.createElement('div');
                clip.className = `clip clip${animal.animal_number}`;
                photoBox.appendChild(clip);

                const img = document.createElement('img');
                img.src = `../public/img/animal${animal.animal_number}.png`; 
                img.alt = `Animal ${animal.animal_number}`;
                photoBox.appendChild(img);

                whiteboard.appendChild(photoBox);
            });
        } else {
            console.error('사용자 도감 가져오기 실패:', data.message);
        }
    } catch (error) {
        console.error('사용자 도감 가져오기 오류:', error);
    }
});
