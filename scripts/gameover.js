document.addEventListener("DOMContentLoaded", function () {
  const homeButton = document.getElementById('home');
  if (homeButton) {
    homeButton.addEventListener('click', function () {
      window.location.href = 'inventory.html';
    });
  } else {
    console.error('Home button not found');
  }
});
