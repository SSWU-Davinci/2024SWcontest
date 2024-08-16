document.addEventListener("DOMContentLoaded", function() {
  const music = document.querySelector("audio");              // 문서 전체에서 <audio> 요소를 선택

  // 음악을 재생하려고 시도
  function attemptPlayMusic() {
    music.play().catch(error => {
      console.log('자동 재생 실패. 사용자 상호작용 필요:', error);
    });
  }
  // 페이지가 로드될 때 음악 재생 시도
  attemptPlayMusic();
});
