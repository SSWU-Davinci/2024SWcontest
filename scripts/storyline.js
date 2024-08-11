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

swiper.on('slideChange', function () {
  if (swiper.isEnd) {
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        window.location.href = 'startmain.html';
      }
    });
  } else {
    document.querySelector('.swiper-button-next').removeEventListener('click', handleRedirect);
    document.removeEventListener('keydown', handleEnterKey);
  }
});

function handleRedirect() {
  window.location.href = 'startmain.html';
}

function handleEnterKey(event) {
  if (event.key === 'Enter') {
    window.location.href = 'startmain.html';
  }
}
