document.addEventListener("DOMContentLoaded", function() {
    const user = document.querySelectorAll("user");
    const container = document.querySelectorAll(".container");
    const overlay = document.querySelectorAll(".overlay");

    user.addEventListener("click", function() {
        container.style.display = "block";
        overlay.style.display = "block";
    });

    // Overlay 클릭 시 컨테이너 닫기
    overlay.addEventListener("click", function() {
        container.style.display = "none";
        overlay.style.display = "none";
    });
});
