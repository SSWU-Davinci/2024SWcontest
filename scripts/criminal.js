document.addEventListener("DOMContentLoaded", function() {
    const prisonImage = document.querySelector('.prison');
    const firedText = document.querySelector('.fired');

    // 애니메이션 완료 후 "FIRED!!" 텍스트를 나타나게 하기
    prisonImage.addEventListener('animationend', function() {
        firedText.style.opacity = 1;
    });

    // 인벤토리로 이동하기
    const homeButton = document.getElementById('home');
    homeButton.addEventListener('click', function() {
        window.location.href = 'inventory.html';
    });

    // 다음 스테이지로 이동하기
    const nextStageButton = document.getElementById('nextstage');
    nextStageButton.addEventListener('click', function() {
        window.location.href = 'home.html';
    });

    // 엔딩으로 이동하기
    function handleKeyPress(event) {
        if (event.code === 'Space' || event.code === 'Enter') {
            // 엔터키와 스페이스바 누르면 엔딩 화면으로 이동하기
            window.location.href = 'ending.html';
        }
    }
    document.addEventListener('keydown', handleKeyPress);
});