function opencart() {
    document.getElementById("chartnav").style.width = "400px";
}
  
function closecart() {
    document.getElementById("chartnav").style.width = "0";
}

function handleCardNum(event) {
    if (event.target.value.length > event.target.maxLength) event.target.value = event.target.value.slice(0, event.target.maxLength);
}

function handleCvvNum(event) {
    if (event.target.value.length > event.target.maxLength) event.target.value = event.target.value.slice(0, event.target.maxLength);
}


function openPaymentModal() {
    var paymentModal = document.getElementById('paymentModal');
    var totalAmount = calculateTotalAmount();
    document.getElementById('paymentModalTotal').textContent = `Total Amount: Rs. ${totalAmount.toFixed(2)}`;
    paymentModal.style.display = 'block';
}

function closePaymentModal() {
    var paymentModal = document.getElementById('paymentModal');
    paymentModal.style.display = 'none';
}

function completePayment() {
    document.getElementById("cardError").innerText = "";
    document.getElementById("cvvError").innerText = "";
    document.getElementById("dateError").innerText = "";

    var cardNumber = document.getElementById("card").value.trim();
    var expirationDate = document.getElementById("date").value.trim();
    var cvv = document.getElementById("cvv").value.trim();

    if (!isValidCardNumber(cardNumber)) {
        document.getElementById("cardError").innerText = "Invalid card number";
        return;
    }

    if (!isValidDate(expirationDate)) {
        document.getElementById("dateError").innerText = "Invalid expiration date (use MM/YYYY format)";
        return;
    }

    if (!isValidCVV(cvv)) {
        document.getElementById("cvvError").innerText = "Invalid CVV (use 3 digits)";
        return;
    }

    alert("Payment Successful!");

    cart = [];
    saveCartToLocalStorage();
    updateCartDisplay();
    updateAddToCartButtonText();
    closePaymentModal();
}

function isValidCardNumber(cardNumber) {
    return /^\d{16}$/.test(cardNumber);
}

function isValidDate(date) {
    var dateParts = date.split('/');
    var month = parseInt(dateParts[0], 10);
    var year = parseInt(dateParts[1], 10);
    return (month >= 1 && month <= 12) && (year >= 2023 && year <= 9999);
}

function isValidCVV(cvv) {
    var isValid = /^\d{3}$/.test(cvv);

    if (!isValid) {
        console.log("CVV is invalid:", cvv);
    }

    return isValid;
}



var cart = [];

function loadCartFromLocalStorage() {
    var storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartDisplay();
    }
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

loadCartFromLocalStorage();


function addToCart(productName, price, imageUrl) {
    var existingItem = cart.find(item => item.name === productName);

    

    if (existingItem) {
        existingItem.quantity++;
    } else {
        var item = { name: productName, price: parseFloat(price), quantity: 1, gift: false, letter: '', image: imageUrl };
        cart.push(item);
    }
    updateAddToCartButtonText();
    
    updateCartDisplay();

    saveCartToLocalStorage();
}

function updateAddToCartButtonText() {
    var addToCartButtons = document.querySelectorAll('#addToCartButton');

    addToCartButtons.forEach(button => {
        var productName = button.getAttribute('data-product');
        var item = cart.find(item => item.name === productName);

        if (item) {
            button.textContent = `Added to Cart - ${item.quantity}`;
        } else {
            button.textContent = 'Add to Cart';
        }
    });
}


function updateCartDisplay() {
    var cartItems = document.getElementById('cartItems');
    var cartTotalContainer = document.getElementById('cartTotalContainer');
    var checkoutButtonContainer = document.getElementById('checkoutButtonContainer');
    var total = 0;

    cartItems.innerHTML = '';
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="margin: 30px; font-size: x-large">No items in the cart.</p>';
        checkoutButtonContainer.style.display = 'none';
        cartTotalContainer.innerHTML = '';
    } else {
    cart.forEach((item, index) => {
        var listItem = document.createElement('div');
        listItem.innerHTML = `
        <div class="pur-details">
            <img src="${item.image}" alt="${item.name}" style="width: 150px; height: 150px; margin-right: 10px;">
            <div class="item-price">
                <p>${item.name}</p>
                <p>Price: Rs. ${item.price.toFixed(2)}</p>
                <p>Quantity: 
                    <button onclick="decreaseQuantity(${index})">-</button>
                    ${item.quantity}
                    <button onclick="increaseQuantity(${index})">+</button>
                </p>
                </div>
                </div>
                <div class="gift">
                <label><input type="checkbox" id = "checkbox" onclick="toggleGift(${index})"> Gift</label>
                ${item.gift ? `
                    <input type="text" placeholder="Add a letter" id = "txt" onchange="updateLetter(${index}, this.value)">
                ` : ''}
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItems.appendChild(listItem);

        total += item.price * item.quantity;
    });

    updateAddToCartButtonText();


    var cartTotal = document.createElement('div');
    cartTotal.innerHTML = `Total: Rs. ${total.toFixed(2)}`;
    cartTotalContainer.innerHTML = '';
    cartTotalContainer.appendChild(cartTotal);

    var checkoutButton = document.createElement('button');
    checkoutButton.textContent = 'Checkout';
    checkoutButton.onclick = checkout;
    checkoutButtonContainer.innerHTML = '';
    checkoutButtonContainer.appendChild(checkoutButton);
    checkoutButtonContainer.style.display = 'block';
}
}

function toggleGift(index) {
    cart[index].gift = !cart[index].gift;
    saveCartToLocalStorage();

    updateCartDisplay();
}

function updateLetter(index, letter) {
    cart[index].letter = letter;
    saveCartToLocalStorage();

}

function removeFromCart(index) {
    cart.splice(index, 1);

    saveCartToLocalStorage();

    updateCartDisplay();
}

function resetAddToCartMessages() {
    var addToCartButtons = document.querySelectorAll('#addToCartButton');

    addToCartButtons.forEach(button => {
        button.textContent = 'Add to Cart';
    });
}

function calculateTotalAmount() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function checkout() {

    if (!isLoggedIn()) {
        // If not logged in, open the login form
        openForm();
        return;
    }
    console.log('Checkout:', cart);

    openPaymentModal();
}

function increaseQuantity(index) {
    cart[index].quantity++;
    saveCartToLocalStorage();

    updateCartDisplay();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }
    updateCartDisplay();
    saveCartToLocalStorage();

}


var cartTotalContainer = document.createElement('div');
cartTotalContainer.id = 'cartTotalContainer';
document.querySelector('.add-chart').appendChild(cartTotalContainer);

var checkoutButtonContainer = document.createElement('div');
checkoutButtonContainer.id = 'checkoutButtonContainer';
document.querySelector('.add-chart').appendChild(checkoutButtonContainer);

updateCartDisplay();