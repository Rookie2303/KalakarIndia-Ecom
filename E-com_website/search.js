function searchProducts() {
    var searchTerm = document.getElementById("searchInput").value.toLowerCase();
    var cards = document.querySelectorAll(".cards .item");

    cards.forEach(function (card) {
        var productName = card.querySelector(".card-description p").innerText.toLowerCase();

        if (productName.includes(searchTerm)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}