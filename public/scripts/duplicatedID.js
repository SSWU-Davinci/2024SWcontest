document.addEventListener('DOMContentLoaded', () => {
    const checkIdButton = document.getElementById('checkIdButton');
    const idInput = document.getElementById('id');
    const duplicatedMessage = document.querySelector('.duplicated-message');
  
    checkIdButton.addEventListener('click', async () => {
      const id = idInput.value;
  
      if (id) {
        // Firestore에서 ID 중복 여부를 확인
        try {
          const response = await fetch('https://us-central1-swcontest-e2cf1.cloudfunctions.net/checkId', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
          });
  
          const result = await response.json();
          
          if (result.exists) {
            duplicatedMessage.textContent = '이미 사용 중인 email입니다.';
            duplicatedMessage.style.color = 'red';
          } else {
            duplicatedMessage.textContent = '사용 가능한 email입니다.';
            duplicatedMessage.style.color = 'green';
          }
        } catch (error) {
          console.error('ID 검사 오류:', error);
          duplicatedMessage.textContent = 'email을 입력해주세요';
        }
      } else {
        duplicatedMessage.textContent = 'email을 입력해주세요.';
        duplicatedMessage.style.color = 'red';
      }
    });
  });
  