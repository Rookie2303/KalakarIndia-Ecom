function openReviewForm() {
    document.getElementById('reviewForm').style.display = 'block';
    document.getElementById("blurOverlay").style.display = "block";
}

function closeReviewForm() {
    document.getElementById('reviewForm').style.display = 'none';
    document.getElementById("blurOverlay").style.display = "none";
}


function submitReview() {
    var personName = document.getElementById('personName').value;
    var productName = document.getElementById('productName').value;
    var rating = document.getElementById('rating').value;
    var reviewText = document.getElementById('reviewText').value;
    var newReview = {
        personName: personName,
        productName: productName,
        rating: rating,
        reviewText: reviewText
    };

    var existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];

    existingReviews.push(newReview);

    localStorage.setItem('reviews', JSON.stringify(existingReviews));

    var newReviewCard = document.createElement('div');
    newReviewCard.className = 'review-card';

    newReviewCard.innerHTML = `
        <div class="review-details">
            <h3>${personName}</h3>
            <p>${reviewText}</p>
            <div class="rating">Rating: ${rating} Stars</div>
            <span>Product: ${productName}</span>
        </div>
    `;

    document.getElementById('reviewsSection').appendChild(newReviewCard);
    closeReviewForm();
}


window.onload = function () {
    var existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];

    existingReviews.forEach(function (review) {
        var newReviewCard = document.createElement('div');
        newReviewCard.className = 'review-card';
        newReviewCard.innerHTML = `
            <div class="review-details">
                <h3>${review.personName}</h3>
                <p>${review.reviewText}</p>
                <div class="rating">Rating: ${review.rating} Stars</div>
                <span>Product: ${review.productName}</span>
            </div>
        `;
        document.getElementById('reviewsSection').appendChild(newReviewCard);
    });
};
