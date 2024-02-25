// ------------------------------------ Elements ------------------------------------
// Password-related elements and variables
const passwordArea = document.getElementById("passwordArea");
const generatedPassword = document.getElementById("generatedPassword");
const passwordStrength = document.getElementById("passwordStrength");
let pass = [];

// Password length adjustment elements
const increaseButton = document.getElementById("increaseButton");
const decreaseButton = document.getElementById("decreaseButton");
const lengthValue = document.getElementById("lengthValue");
const lengthSlider = document.getElementById("lengthSlider");

// Password options elements
const uppercaseCheckbox = document.getElementById("uppercaseCheckbox");
const lowercaseCheckbox = document.getElementById("lowercaseCheckbox");
const numbersCheckbox = document.getElementById("numbersCheckbox");
const symbolsCheckbox = document.getElementById("symbolsCheckbox");
const customSymbolsField = document.getElementById("customSymbolsField");
const customSymbolsDiv = document.getElementById("customSymbolsDiv");
const resetSymbolsButton = document.getElementById("resetSymbolsButton");
const passwordOptions = document.querySelectorAll(".password-option");

// Generating buttons
const generateButton = document.getElementById("generateButton");
const refreshButton = document.getElementById("refreshButton");

// Password character lists
const uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ".split("");
const lowercase = "abcdefghijkmnpqrstuvwxyz".split("");
const numbers = "123456789".split("");

// ------------------------------------ Event Listeners ------------------------------------
// Increase password length
increaseButton.addEventListener("click", () => {
  const currentLength = parseInt(lengthSlider.value);
  const maxLength = parseInt(lengthSlider.max);
  if (currentLength < maxLength) {
    lengthSlider.value = currentLength + 1;
    refreshValue();
    generatePassword();
  }
});

// Decrease password length
decreaseButton.addEventListener("click", () => {
  const currentLength = parseInt(lengthSlider.value);
  const minLength = parseInt(lengthSlider.min);
  if (currentLength > minLength) {
    lengthSlider.value = currentLength - 1;
    refreshValue();
    generatePassword();
  }
});

// Update displayed password length and generate a password
lengthSlider.addEventListener("input", () => {
  refreshValue();
  generatePassword();
});

// If symbols are checked, display custom symbols text input.
symbolsCheckbox.addEventListener("change", () => {
  if (symbolsCheckbox.checked) {
    customSymbolsDiv.style.opacity = "1";
    customSymbolsDiv.classList.remove("invisible");

    customSymbolsField.disabled = false;
  } else {
    customSymbolsDiv.style.opacity = "0";
    customSymbolsDiv.classList.add("invisible");

    customSymbolsField.disabled = true;
  }
});

// Set the custom symbols field's value to its default value.
resetSymbolsButton.addEventListener("click", () => {
  customSymbolsField.value = "!@#$%^&*()_-+=<>?/[]{},.:;";
});

// Update the password character set and generate a new password
generateButton.addEventListener("click", () => {
  updatePass();
  generatePassword();
});

// Generate a new password
refreshButton.addEventListener("click", generatePassword);

// Handle password copy on click
let isCopyingPassword = false;
generatedPassword.addEventListener("click", () => {
  if (isCopyingPassword) {
    return;
  }

  const oldText = generatedPassword.textContent;
  const oldFontSize = generatedPassword.style.fontSize;

  passwordArea.classList.add("bg-primary");
  refreshButton.classList.add("text-primary");
  passwordArea.classList.add("bg-primary");
  generatedPassword.style.fontSize = "16px";

  // Copy the text inside the text field
  navigator.clipboard.writeText(generatedPassword.textContent);
  isCopyingPassword = true;

  generatedPassword.textContent = "Copied!";
  setTimeout(() => {
    passwordArea.classList.remove("bg-primary");
    generatedPassword.textContent = oldText;
    refreshButton.classList.remove("text-primary");
    generatedPassword.style.fontSize = oldFontSize;
    isCopyingPassword = false;
  }, 1000);
});

// Ensuring at least one checkbox remains selected at all times.
passwordOptions.forEach((option) => {
  option.addEventListener("change", (event) => {
    const atLeastOne = Array.from(passwordOptions).some(
      (option) => option.checked
    );

    if (!atLeastOne) {
      event.target.checked = true;
      event.target.dispatchEvent(new Event("change"));
    }
    updatePass();
    generatePassword();
  });
});

// Initialize password characters and generate a password
window.addEventListener("load", () => {
  updatePass();
  generatePassword();
});

// ------------------------------------ Functions ------------------------------------
// Function to update displayed password length value.
function refreshValue() {
  lengthValue.textContent = lengthSlider.value;
}

// Function to update the password character set based on options.
function updatePass() {
  pass = [];
  const symbols = new Set(
    customSymbolsField.value.replaceAll(" ", "").split("")
  );

  if (lowercaseCheckbox.checked) {
    pass.push(...lowercase);
  }
  if (uppercaseCheckbox.checked) {
    pass.push(...uppercase);
  }
  if (numbersCheckbox.checked) {
    pass.push(...numbers);
  }
  if (symbolsCheckbox.checked) {
    pass.push(...symbols);
  }
}
// Function to generate a random password based on the character set and length.
function generatePassword() {
  let passwordLength = lengthSlider.value;
  let numOfElements = pass.length;
  let password = "";

  // Generate a random password
  for (let i = 0; i < passwordLength; i++) {
    let x = Math.floor(Math.random() * numOfElements);
    password = password + pass[x];
  }

  // Adjust the font size based on the length of password
  if (passwordLength < 25) {
    generatedPassword.style.fontSize = "16px";
  } else if (passwordLength < 30) {
    generatedPassword.style.fontSize = "14px";
  } else if (passwordLength < 35) {
    generatedPassword.style.fontSize = "12px";
  } else if (passwordLength < 40) {
    generatedPassword.style.fontSize = "10px";
  } else if (passwordLength > 40) {
    generatedPassword.style.fontSize = "8px";
  }

  // Display the generated password
  generatedPassword.textContent = password;

  // Check the strength of the generated password using (zxcvbn) and update the progress element based on the score of password.
  let result = zxcvbn(password);
  passwordStrength.classList.remove(
    "progress-error",
    "progress-warning",
    "progress-success"
  );

  if (result.score == 0) {
    passwordStrength.value = 1;
    passwordStrength.classList.add("progress-error");
  } else if (result.score < 3) {
    passwordStrength.value = 3;
    passwordStrength.classList.add("progress-error");
  } else if (result.score == 3) {
    passwordStrength.value = 5;
    passwordStrength.classList.add("progress-warning");
  } else if (result.score == 4) {
    passwordStrength.value = 8;
    passwordStrength.classList.add("progress-success");
  }
}
