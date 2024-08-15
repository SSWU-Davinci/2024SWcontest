document.getElementById('joinForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('/user/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, id, password })
        });

        const result = await response.json();
        const messageDiv = document.querySelector('.message');

        if (result.success) {
            messageDiv.innerHTML = `<p>${result.message}</p>`;
            setTimeout(() => {
                window.location.href = '../pages/inventory.html'; // 성공 시 리디렉션
            }); // 2초 후 리디렉션
        }
        else {
            messageDiv.innerHTML = `<p style="color: red;">${result.message}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.querySelector('.message').innerHTML = '<p style="color: red;">등록 중 오류가 발생했습니다.</p>';
    }
});