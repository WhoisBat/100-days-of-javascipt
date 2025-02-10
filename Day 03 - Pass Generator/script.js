const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()",
};

const generatePassword = () => {
  let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;

  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        staticPassword += ` ${staticPassword} `;
      } else {
        excludeDuplicate = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }
  passwordInput.value = randomPassword;
  updatePassIndicator();
};


// This code is used previously but removed due to some changes.
// const updatePassIndicator1 = () => {  // This logic is only meant for the length if the length is less than 8
//   passIndicator.id =                  // then show red and if it is strong then show the green.
//     lengthSlider.value <= 8
//       ? "weak"
//       : lengthSlider.value <= 16
//       ? "medium"
//       : "strong";
// };

// const updateSlider = () => {
//   // document.querySelector(".pass-length span").innerText = lengthSlider.value;
//   // generatePassword();
//   updatePassIndicator();
// };
// updateSlider(); // this is responsible for the password to be generated when the window loads because function is called immediately after initialization.


// This is the actual logic to test whether it is a strong password or the weak password.
const updatePassIndicator = () => {
  const password = passwordInput.value;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);

  if (hasUpperCase && hasNumbers && hasSymbols && hasLowerCase) {
    passIndicator.id = "strong";
  } else if ((hasUpperCase && hasNumbers) || (hasLowerCase && hasSymbols)) {
    passIndicator.id = "medium";
  } else {
    passIndicator.id = "weak";
  }
};
const changeSliderValue = () => {
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
};

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.innerText = "check";
  copyIcon.style.color = "#4285f4";
  setTimeout(() => {
    copyIcon.innerText = "copy_all";
    copyIcon.style.color = "#707070";
  }, 1500);
};

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", changeSliderValue);
generateBtn.addEventListener("click", generatePassword);
