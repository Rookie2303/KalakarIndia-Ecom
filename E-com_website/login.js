function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("blurOverlay").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("blurOverlay").style.display = "none";
}

function showSignUpForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("signUpForm").style.display = "block";

}

function showLoginForm() {
    document.getElementById("signUpForm").style.display = "none";
    document.getElementById("myForm").style.display = "block";

}

function closeFormIfLoggedIn() {
    if (isLoggedIn()) {
        closeForm();
    }
}


const users = {
    "user@example.com": "password123",
    "anotheruser@example.com": "securepassword",
    "vaishnavidhulipala@gmail.com": "12345@abc",
    "dummy@email.com": "dummy678",
};
function setLoggedInUser(email) {
    sessionStorage.setItem('loggedInUser', email);
}

// Function to check if the user is logged in
function isLoggedIn() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    return loggedInUser !== null && loggedInUser !== undefined;
}

// Function to clear the logged-in user from the session (logout)
function logout() {
    sessionStorage.removeItem('loggedInUser');
}


function login() {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("pw");
    const emailerror = document.getElementById("Eerror");
    const passerror = document.getElementById("Perror");

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailerror.textContent = "Invalid email format. Please enter a valid email address.";
        emailInput.focus();
        return;
    }
    if (!users.hasOwnProperty(email)) {
        emailerror.textContent = "User not found. Please enter a valid email address.";
        passerror.textContent = "";
        emailInput.focus();
        return;
    }
    if (users[email] !== password) {
        passerror.textContent = "Incorrect password. Please enter the correct password.";
        emailerror.textContent = "";
        passwordInput.focus();
        return;
    }
    if (users[email] === password) {
        setLoggedInUser(email);
        emailerror.textContent = "";
        passerror.textContent = "";
        alert("Login successful!");
        closeForm();
    }
    
}

function userLogout() {
    // ... (your existing logout logic)

    // Clear the loggedInUser from the session
    logout();
    // ... (rest of your logout logic)
}


function SubmitLogin(event) {
    login();
    event.preventDefault();
}
