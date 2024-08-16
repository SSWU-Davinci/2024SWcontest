var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    loop: false,
    freeMode: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    slideChange: function () {
      var currentSlideId = swiper.slides[swiper.activeIndex].id;

      if (currentSlideId === 'slide_08') {
        this.autoplay.stop();
      }
    }
  }
});

function handleRedirect() {
  window.location.href = 'startmain.html';
}

// 엔터키와 스페이스바 누르면 startmain 화면으로 이동하기
function handleKeyPress(event) {
  if (event.code === 'Space' || event.code === 'Enter') {
    var currentSlideId = swiper.slides[swiper.activeIndex].id;
    if (currentSlideId === 'slide_08') {
      handleRedirect();
    }
  }
}

// 화면을 클릭하면 startmain 화면으로 이동하기
function handleScreenClick() {
  var currentSlideId = swiper.slides[swiper.activeIndex].id;
  if (currentSlideId === 'slide_08') {
    handleRedirect();
  }
}

document.addEventListener('keydown', handleKeyPress);
document.addEventListener('click', handleScreenClick);

swiper.on('transitionEnd', function () {
  var currentSlideId = swiper.slides[swiper.activeIndex].id;

  if (currentSlideId === 'slide_08') {
    document.querySelector('.swiper-button-next').addEventListener('click', handleRedirect);
    document.querySelector('.swiper-button-prev').addEventListener('click', function() {
      swiper.slidePrev();
    });
    document.addEventListener('keydown', handleKeyPress);
    document.querySelector('.swiper').addEventListener('click', handleRedirect);
  } else {
    document.querySelector('.swiper-button-next').removeEventListener('click', handleRedirect);
    document.querySelector('.swiper').removeEventListener('click', handleRedirect);
  }
});
