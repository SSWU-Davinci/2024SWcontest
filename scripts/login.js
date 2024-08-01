document.addEventListener("DOMContentLoaded", function() {
    const user = document.getElementById("user");
    const container = document.querySelectorAll(".container");


    user.addEventListener("click", function() 
    {
        // Toggle the display of container
        if (container.style.display === "none" || container.style.display === "") {
            container.style.display = "block";
        } else {
            container.style.display = "none";
        }

        // Toggle the display of overlay
        if (overlay.style.display === "none" || overlay.style.display === "") {
            overlay.style.display = "block";
        } else {
            overlay.style.display = "none";
        }
    });

});
