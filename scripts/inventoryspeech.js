document.addEventListener("DOMContentLoaded", function () {
  const photoBoxes = document.querySelectorAll(".photo-box, .big-photo-box, .large-photo-box");

  photoBoxes.forEach(box => {
    box.addEventListener("click", function (event) {
      event.stopPropagation();
      const id = this.getAttribute("data-id");

      fetch('data.json')
        .then(response => response.json())
        .then(data => {
          const currentBubbles = this.querySelectorAll('.speech-bubble');
          if (currentBubbles.length >= 3) return; // 세 개까지만 말풍선이 뜨도록 제한

          const bubble = document.createElement('div');
          bubble.classList.add('speech-bubble');
          bubble.textContent = data[id];

          const offset = currentBubbles.length * 25; // 말풍선이 위로 올라가도록 오프셋 설정 (더 겹치게)

          bubble.style.bottom = `${120 + offset}%`;
          bubble.style.left = `50%`;
          bubble.style.transform = `translateX(-50%)`;

          this.appendChild(bubble);

          setTimeout(() => { bubble.remove(); }, 3000);
        })
        .catch(error => console.error("Error fetching data:", error));
    });
  });

  document.addEventListener("click", function () {
    document.querySelectorAll(".speech-bubble").forEach(bubble => {
      bubble.remove();
    });
  });
});
