document.addEventListener('scroll', function () {
  const scrollContent = document.querySelector('.scroll-content');
  const scrollPosition = window.scrollY;
  const maxScroll = 500;      // 배경을 완전 검정으로

  // .scroll-content 스크롤 점점 할수록 생기게 하기
  if (scrollPosition > 600) scrollContent.style.display = 'block';
  else scrollContent.style.display = 'none';

  // 스크롤 위치에 따라 배경 투명도 변하기
  const backgroundOpacity = Math.min(scrollPosition / maxScroll, 1);
  const backgroundColor = `rgba(0, 0, 0, ${backgroundOpacity})`
  document.body.style.backgroundColor = backgroundColor; // 배경이 점점 검정색으로
  document.body.style.backgroundBlendMode = 'overlay';
});