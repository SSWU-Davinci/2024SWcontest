document.addEventListener("DOMContentLoaded", function() {
    const prisonImage = document.querySelector('.prison');
    const firedText = document.querySelector('.fired');

    // 애니메이션 완료 후 "FIRED!!" 텍스트를 나타나게 하기
    prisonImage.addEventListener('animationend', function() {
        firedText.style.opacity = 1;
    });
});
