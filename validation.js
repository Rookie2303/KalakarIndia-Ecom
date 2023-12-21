function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("blurOverlay").style.display = "block";
}
  

function closeForm1() {
    document.getElementById("signUpForm").style.display = "none";
    document.getElementById("blurOverlay").style.display = "none";
}

function showLoginForm() {
    document.getElementById("signUpForm").style.display = "none";
    document.getElementById("myForm").style.display = "block";

}

function showSignUpForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("signUpForm").style.display = "block";

}


var suEerror = "";
var suPerror = "";
 
 var email = document.getElementById('suemail');
 var pass = document.getElementById('supw');
 console.log(email,pass)
 
 email.addEventListener('input', isValidEmail);
 function isValidEmail() {
    var email = document.getElementById('suemail').value;
 
    if (email === "") {
        suEerror = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        suEerror = "Invalid email address.";
    } else {
        suEerror = "";
    }
    updateErrorDisplay('suEerror', suEerror);
 }
 
 pass.addEventListener('input', isvalidPassword);
 function isvalidPassword() {
        var password = document.getElementById('supw').value;
 
        if (password === "") {
            suPerror = "Password is required.";
        } else if (password.length < 8) {
            suPerror = "Password must be at least 8 characters long.";
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)){
            suPerror = "Invalid Password"
        } else {
            suPerror = "";
        }
        updateErrorDisplay('suPerror', suPerror);
 }
 
 function updateErrorDisplay(errorElementId, errorMessage) {
       var errorElement = document.getElementById(errorElementId);
        if (errorElement) {
            errorElement.textContent = errorMessage;
       }
 }
 
 
    
 function SubmitEvent(event) {
       isValidEmail();
       isvalidPassword();
 
        if (suEerror === "" && suPerror === "") {
            alert("Account Created successfully!");
       } else {
            event.preventDefault();
       }
}