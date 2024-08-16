document.addEventListener('DOMContentLoaded', () => {
    const checkIdButton = document.getElementById('checkIdButton');
    const idInput = document.getElementById('id');
    const messageDiv = document.querySelector('.duplicated-message');

    checkIdButton.addEventListener('click', async () => {
        const idValue = idInput.value.trim();
        
        if (idValue === '') {
            messageDiv.innerHTML = '<p style="co lor: red;">ID를 입력해주세요.</p>';
            return;
        }

        try {
            const response = await fetch('/check-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: idValue })
            });

            const result = await response.json();

            if (result.exists) {
                messageDiv.innerHTML = '<p style="color: red;">중복된 ID입니다.</p>';
            } else {
                messageDiv.innerHTML = '<p style="color: green;">사용 가능한 ID입니다.</p>';
            }
        } catch (error) {
            console.error('Error:', error);
            messageDiv.innerHTML = '<p style="color: red;">중복 검사 중 오류가 발생했습니다.</p>';
        }
    });
});
