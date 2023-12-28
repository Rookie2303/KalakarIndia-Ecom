function toggleNav() {
    var filterNav = document.getElementById("mySidemenu");
    var arrowIcon = document.getElementById("arrowIcon");
    var mainContent = document.getElementById("main");

    if (filterNav.style.width === "180px") {
        filterNav.style.width = "0";
        filterNav.style.display = "none";
        mainContent.style.marginLeft = "25px";
        arrowIcon.classList.remove("rotate");
    } else {
        filterNav.style.width = "180px";
        // mainContent.style.marginLeft = "25px";
        filterNav.style.display = "block";
        filterNav.style.padding = "15px";
        filterNav.style.marginBottom="50px";
        arrowIcon.classList.add("rotate");
    }
}
