document.addEventListener("DOMContentLoaded", function() {
    const music = document.querySelector("audio");

    // 음악을 재생하려고 시도
    function attemptPlayMusic() {
        music.play().catch(error => {
            console.log('자동 재생 실패. 사용자 상호작용 필요:', error);
        });
    }
    // 페이지가 로드될 때 음악 재생 시도
    attemptPlayMusic();

    // 사용자가 클릭하거나 화면을 터치했을 때 음악 재생 --> 자동 실행이 잘 안되는 것 같아서 그냥 유저가 화면 어디든 클릭했을 때 음원 나오도록 수정함
    document.addEventListener("click", attemptPlayMusic, { once: true });
    document.addEventListener("touchstart", attemptPlayMusic, { once: true });
});
