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

// Function to handle redirection
function handleRedirect() {
  window.location.href = 'startmain.html'; // Redirect to startmain.html
}

// Function to handle Enter key press
function handleEnterKey(event) {
  if (event.key === 'Enter') {
    handleRedirect();
  }
}

// Function to handle click anywhere on the last slide
function handleSlideClick() {
  handleRedirect();
}

// Check if the current slide is the last one
swiper.on('slideChange', function () {
  if (swiper.isEnd) {
    // Add event listener for Enter key press
    document.addEventListener('keydown', handleEnterKey);

    // Add event listener for click anywhere on the slide container
    document.querySelector('.swiper').addEventListener('click', handleSlideClick);
  } else {
    // Remove event listeners when not on the last slide
    document.removeEventListener('keydown', handleEnterKey);
    document.querySelector('.swiper').removeEventListener('click', handleSlideClick);
  }
});
