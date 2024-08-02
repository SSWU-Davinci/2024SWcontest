function handleKeyPress(event) {
    if (event.code === 'Space' || event.code === 'Enter') {
        // 엔터나 스페이스바 누르면 로딩중 화면으로 이동
        // 아직 확실히 결정된건 아님!!!!
        window.location.href = 'loading.html';
    }
}
document.addEventListener('keydown', handleKeyPress);