var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: false,
});

function handleKeyPress(event) {
  if (event.code === 'Space' || event.code === 'Enter') {
    // 엔터키와 스페이스바 누르면 startmain 화면으로 이동하기
    window.location.href = 'startmain.html';
  }
}
document.addEventListener('keydown', handleKeyPress);

function handleScreenClick() {
  // 화면을 클릭하면 startmain 화면으로 이동하기
  window.location.href = 'startmain.html';
}
document.addEventListener('click', handleScreenClick);

// Check the current slide's ID when the transition ends
swiper.on('transitionEnd', function () {
  var currentSlideId = swiper.slides[swiper.activeIndex].id;

  if (currentSlideId === 'slide_08') { // Check if the current slide is the last one
    document.querySelector('.swiper-button-next').addEventListener('click', handleRedirect);
    document.addEventListener('keydown', handleEnterKey);
    document.querySelector('.swiper').addEventListener('click', handleRedirect);
  } else {
    // Remove all existing event listeners if not on the last slide
    document.querySelector('.swiper-button-next').removeEventListener('click', handleRedirect);
    document.removeEventListener('keydown', handleEnterKey);
    document.querySelector('.swiper').removeEventListener('click', handleRedirect);
  }
});
