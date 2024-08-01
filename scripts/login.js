document.addEventListener("DOMContentLoaded", function() {
    const user = document.getElementById("user");
    const container = document.querySelector(".container");
    const overlay = document.querySelector(".overlay");

    /*버튼을 두 번 눌러야 떠서 none 추가*/
    container.style.display = "none";
    overlay.style.display = "none";

    user.addEventListener("click", function() {
        if (container.style.display === "none") {
            container.style.display = "block";
        } else {
            container.style.display = "none";
        }

        if (overlay.style.display === "none") {
            overlay.style.display = "block";
        } else {
            overlay.style.display = "none";
        }
    });
});
