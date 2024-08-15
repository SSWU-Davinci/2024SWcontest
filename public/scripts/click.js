document.addEventListener("DOMContentLoaded", function() {
    const animals = document.querySelectorAll(".animal");

    animals.forEach(animal => {
        animal.addEventListener("click", function handler() {
            // 다른 동물들의 z-index 및 transform 초기화
            animals.forEach(a => {
                a.style.transform = "";
                a.style.zIndex = "1";
            });

            // 클릭된 동물의 transform 및 z-index 설정
            this.style.transform = "translate(0px, -35%) scale(1.7)";
            this.style.zIndex = "10";

            // 클릭된 동물의 클릭 이벤트 리스너 제거
            this.removeEventListener("click", handler);
        });
    });
});
