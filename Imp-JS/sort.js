var currentSortCriterion = 'featured';

function sortProducts(criterion) {
    currentSortCriterion = criterion;

    var productsContainer = document.querySelector('.cards');
    var products = Array.from(productsContainer.querySelectorAll('.item'));

    products.sort(function(a, b) {
        var productA, productB;


        switch (currentSortCriterion) {
            case 'featured':

                return 0;

            case 'price-low-to-high':
                productA = parseFloat(a.querySelector('.card-description p1').textContent.replace('Rs. ', ''));
                productB = parseFloat(b.querySelector('.card-description p1').textContent.replace('Rs. ', ''));
                return productA - productB;

            case 'price-high-to-low':
                productA = parseFloat(a.querySelector('.card-description p1').textContent.replace('Rs. ', ''));
                productB = parseFloat(b.querySelector('.card-description p1').textContent.replace('Rs. ', ''));
                return productB - productA;

            case 'name-a-to-z':
                productA = a.querySelector('p').textContent.toLowerCase();
                productB = b.querySelector('p').textContent.toLowerCase();
                return productA.localeCompare(productB);

            case 'name-z-to-a':
                productA = a.querySelector('p').textContent.toLowerCase();
                productB = b.querySelector('p').textContent.toLowerCase();
                return productB.localeCompare(productA);

            default:
                return 0;
        }
    });

    productsContainer.innerHTML = '';

    products.forEach(function(product) {
        productsContainer.appendChild(product);
    });
}

sortProducts('featured');
