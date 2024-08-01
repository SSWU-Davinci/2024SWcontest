function handleKeyPress(event) {
    if (event.code === 'Space' || event.code === 'Enter') {
        // gameScreen.html로 페이지 이동 --> 이건 내가 임의로 설정한 파일이름임!!!! 엔터나 스페이스바 치면 게임 화면으로 넘어감
        window.location.href = 'gameScreen.html';
    }
}
document.addEventListener('keydown', handleKeyPress);