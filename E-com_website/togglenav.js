function toggleNav() {
    var filterNav = document.getElementById("mySidemenu");
    var arrowIcon = document.getElementById("arrowIcon");
    var mainContent = document.getElementById("main");

    if (filterNav.style.width === "250px") {
        filterNav.style.width = "0";
        filterNav.style.display = "none";
        mainContent.style.marginLeft = "0";
        arrowIcon.classList.remove("rotate");
    } else {
        filterNav.style.width = "250px";
        mainContent.style.marginLeft = "0px";
        filterNav.style.display = "block";
        filterNav.style.padding = "25px";
        arrowIcon.classList.add("rotate");
    }
}
