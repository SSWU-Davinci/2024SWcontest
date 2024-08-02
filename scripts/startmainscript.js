function handleKeyPress(event) {
    if (event.code === 'Space' || event.code === 'Enter') {
        // 엔터나 스페이스바 누르면 홈 게임화면으로 이동
        window.location.href = 'home.html';
    }
}
document.addEventListener('keydown', handleKeyPress);