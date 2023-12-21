function toggleNav() {
    var sidenav = document.getElementById("mySidenav");
    var arrowIcon = document.getElementById("arrowIcon");

    if (sidenav.style.width === "250px") {
        sidenav.style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        arrowIcon.classList.remove("rotate");
    } else {
        sidenav.style.width = "250px";
        document.getElementById("main").style.marginLeft = "0px";
        arrowIcon.classList.add("rotate");
    }
}


var lowerSlider = document.querySelector('#lower'),
   upperSlider = document.querySelector('#upper'),
   lowerVal = parseInt(lowerSlider.value);
   upperVal = parseInt(upperSlider.value);

upperSlider.oninput = function() {
   lowerVal = parseInt(lowerSlider.value);
   upperVal = parseInt(upperSlider.value);
   
   if (upperVal < lowerVal + 4) {
      lowerSlider.value = upperVal - 4;
      
      if (lowerVal == lowerSlider.min) {
         upperSlider.value = 4;
      }
   }
};


lowerSlider.oninput = function() {
   lowerVal = parseInt(lowerSlider.value);
   upperVal = parseInt(upperSlider.value);
   
   if (lowerVal > upperVal - 4) {
      upperSlider.value = lowerVal + 4;
      
      if (upperVal == upperSlider.max) {
         lowerSlider.value = parseInt(upperSlider.max) - 4;
      }

   }
};

var output = document.getElementById("min");
output.innerHTML = lowerSlider.value;

var output1 = document.getElementById("max");
output1.innerHTML = upperSlider.value;

lowerSlider.oninput = function() {
   output.innerHTML = this.value;
}

upperSlider.oninput = function() {
   output1.innerHTML = this.value;
}


function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("blurOverlay").style.display = "block";
 }
  
 function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("blurOverlay").style.display = "none";
 }
 
 var Eerror = "";
 var Perror = "";
 
 var email = document.getElementById('email');
 var pass = document.getElementById('pw')
 console.log(email,pass)
 
 email.addEventListener('input', isValidEmail);
 function isValidEmail() {
    var email = document.getElementById('email').value;
 
    if (email === "") {
        Eerror = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        Eerror = "Invalid email address.";
    } else {
        Eerror = "";
    }
    updateErrorDisplay('Eerror', Eerror);
 }
 
 pass.addEventListener('input', isvalidPassword);
 function isvalidPassword() {
        var password = document.getElementById('pw').value;
 
        if (password === "") {
            Perror = "Password is required.";
        } else if (password.length < 8) {
            Perror = "Password must be at least 8 characters long.";
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)){
            Perror = "Invalid Password"
        } else {
            Perror = "";
        }
        updateErrorDisplay('Perror', Perror);
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
 
        if (Eerror === "" && Perror === "") {
            alert("Form submitted successfully!");
       } else {
            event.preventDefault();
       }
 }