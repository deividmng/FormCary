// Function to move the label up when input is focused
function moveLabel(fieldId) {
    const label = document.querySelector(`label[for="${fieldId}"]`);
    label.classList.add("label-moved");
  }
  
  // Function to restore the label position if input is empty
  function restoreLabel(fieldId) {
    const input = document.getElementById(fieldId);
    const label = document.querySelector(`label[for="${fieldId}"]`);
  
    if (!input.value) {
      label.classList.remove("label-moved");
    }
  }
  
  // Execute when the DOM has fully loaded
  document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll(".input-container input");
  
    inputs.forEach(function (input) {
      const fieldId = input.id;
      const label = document.querySelector(`label[for="${fieldId}"]`);
  
      // Event listener for input focus
      input.addEventListener("focus", function () {
        moveLabel(fieldId);
      });
  
      // Event listener for input blur
      input.addEventListener("blur", function () {
        restoreLabel(fieldId);
      });
  
      // Handle initial load
      restoreLabel(fieldId);
  
      // Add validation for phone number input
      if (fieldId === "f-number") {
        input.addEventListener("input", validatePhoneNumber);
      }
  
      // Event listener for form submission
      const submitButton = document.getElementById("submitButton");
      submitButton.addEventListener("click", submit);
    });
  });
  
  // Function to check if passwords match
  function checkPasswordMatch() {
    const password = document.getElementById("user-password").value;
    const confirmPassword = document.getElementById("user-password-confirm").value;
    const passwordMatchError = document.getElementById("password-match-error");
    const passwordSafe = document.getElementById("password-safe");
    const createButton = document.querySelector(".create-button");
    const success = document.getElementById("success");

    // Password validation criteria
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (password !== confirmPassword) {
        passwordMatchError.textContent = "*The passwords do not match";
        createButton.textContent = "Create Account";
        createButton.style.backgroundColor = "red";
    } else if (!passwordPattern.test(password)) {
        passwordSafe.textContent = "*Password must include at least 1 capitalized letter, at least 1 number, and be at least 8 characters long.";
        createButton.textContent = "Create Account";
        createButton.style.backgroundColor = "red";
    } else {
        passwordMatchError.textContent = "";
        createButton.textContent = "Create Account";
        createButton.style.backgroundColor = "";  // Reset the style
    }
}

  // Function to validate phone number input
  function validatePhoneNumber() {
    const phoneNumberInput = document.getElementById('f-number').value;
    const phoneError = document.getElementById('phone-error');
  
    if (/\D/.test(phoneNumberInput)) {
      // Contains at least one letter
      phoneError.textContent = '*Please enter a valid phone number (no letters allowed).';
      phoneError.style.display = 'block';
      return false; // Indicate validation failure
    } else {
      phoneError.textContent = 'sss'; // Reset error message
      phoneError.style.display = 'none'; // Hide error message
      return true; // Indicate validation success
    }
  }
  
  // Function to handle form submission
  function submit() {
    const h1contact = document.getElementById("contact");
    const success = document.getElementById("success");
    const fNameInput = document.getElementById("f-name");
    const formulario = document.getElementById("inputs-form-clear");
    const section = document.getElementById("section-submit");
  
    // Check if all required inputs have values
    const requiredInputs = document.querySelectorAll(".input-container input[required]");
    let formValid = true;
  
    requiredInputs.forEach((input) => {
      if (!input.value.trim()) {
        formValid = false;
        input.classList.add("invalid");
      } else {
        input.classList.remove("invalid");
      }
    });
  
    if (!formValid) {
      // Show an error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields.',
      });
      return;
    }
  
    const fNameValue = fNameInput.value;
    success.innerHTML = `
      <div id="successContent" style="border: 3px solid #008000; padding: 10px; margin: 20px;">
        <p>Successful registration, ${fNameValue}! We appreciate you joining us. One of our representatives will contact you within 24 hours to provide you with all the information you need. We hope you have a great day!</p>
        <button id="additionalButton">Click me!</button>
      </div>
    `;
      
    // Hide other elements
    h1contact.style.display = "none";
    formulario.style.display = "none";
    section.style.display = "none";
  
    // Add click event listener to the new button
    const additionalButton = document.getElementById("additionalButton");
    additionalButton.addEventListener("click", handleAdditionalButtonClick);
  
    // Add slide-in class
    success.classList.add("slide-in");
  
    function handleAdditionalButtonClick() {
      // Action to perform when the additional button is clicked
      window.open('https://github.com/deividmng/FormCary', '_blank');
    }
  }
  

 
/// Password show || hide

function togglePasswordVisibility(inputId, errorId) {
    var passwordInput = document.getElementById(inputId);
    var toggleButton = passwordInput.closest('.input-container').querySelector(".toggle-password");
    var errorDiv = document.getElementById(errorId);
    var eyeIcon = toggleButton.querySelector('.eye');

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.src = "./assets/img/eye-outline.svg";
        errorDiv.style.display = "none";
    } else {
        passwordInput.type = "password";
        eyeIcon.src = "./assets/img/eye-off-outline.svg";
    }
}