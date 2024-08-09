document.addEventListener("DOMContentLoaded", function() {
    const music = document.querySelector("audio");

    // 음악 자동 재생 및 반복 설정
    music.play();
    music.loop = true;
});
