document.addEventListener('scroll', function() {
  const scrollContent = document.querySelector('.scroll-content');
  const scrollPosition = window.scrollY;
  const maxScroll = 500;

  // 스크롤 위치에 따라 배경 투명도 변하기
  const backgroundOpacity = Math.min(scrollPosition / maxScroll, 1);
  const backgroundColor = `rgba(0, 0, 0, ${backgroundOpacity})`;
  document.body.style.backgroundColor = backgroundColor;
  document.body.style.backgroundBlendMode = 'overlay';

  // .scroll-content 스크롤 시 서서히 나타나게 하기
  if (scrollPosition > 600) {
    const opacity = Math.min((scrollPosition - 600) / 200, 1); // 서서히 나타나도록 opacity 조절
    const translateY = Math.max(50 - (scrollPosition - 600) / 4, 0); // 서서히 위로 올라오도록 translate 조절
    scrollContent.style.opacity = opacity;
    scrollContent.style.transform = `translateY(${translateY}px)`;
  } else {
    scrollContent.style.opacity = 0;
    scrollContent.style.transform = 'translateY(50px)'; // 스크롤이 600 이하일 때 콘텐츠를 아래로 숨김
  }
});
