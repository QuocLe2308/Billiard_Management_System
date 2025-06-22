function validPhoneNumber(phoneNumber) {
    const regex = /^(^\+84|^84|^0)?(8|9|7|5|3)\d{8}$/;
    return regex.test(phoneNumber);
}


function validEmail(email) {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/gm;
    return regex.test(email);
}

function validFullName(name) {
    // Rule: Name should contain at least two words
    const words = name.trim().split(/\s+/);
    if (words.length < 2) {
        return false; // Less than two words
    }

    // Rule: Each word should be at least two characters long
    for (const word of words) {
        if (word.length < 2) {
            return false; // Word is too short
        }
    }

    // Rule: Name should contain only alphabetic characters and spaces
    const regex = /^[a-zA-Z\s]+$/;

    // Check if the name matches the regex
    return regex.test(name);
}

function validateUsername(username) {
    // Rule 1: Length between 3 and 20 characters
    const lengthRegex = /^.{3,20}$/;

    // Rule 2: Only alphanumeric characters, underscores, and periods
    const characterRegex = /^[A-Za-z0-9_.]+$/;

    // Rule 3: Starts with an alphabet character
    const startWithAlphabetRegex = /^[A-Za-z]/;

    // Rule 4: No consecutive underscores or periods
    const noConsecutiveSpecialCharsRegex = /^(?!.*[_.]{2})/;

    // Rule 5: No spaces
    const noSpacesRegex = /^\S*$/;

    return (
        lengthRegex.test(username) &&
        characterRegex.test(username) &&
        startWithAlphabetRegex.test(username) &&
        noConsecutiveSpecialCharsRegex.test(username) &&
        noSpacesRegex.test(username)
    );
}
function validateString(str) {
    // Rule: Should not begin with space or empty, and not with special characters or numbers
    const regex = /^(?!\s)(?!\d)(?!.*[~`!@#$%^&*()_+={}[\]:;'"<>?,./])[^\s].*/;

    return regex.test(str);
}

function validatePassword(password) {
    // Rule: Password length should be between 8 and 20 characters
    const lengthRegex = /^.{8,20}$/;

    // Rule: Password should contain at least one uppercase letter
    const uppercaseRegex = /[A-Z]/;

    // Rule: Password should contain at least one lowercase letter
    const lowercaseRegex = /[a-z]/;

    // Rule: Password should contain at least one digit
    const digitRegex = /\d/;

    // Rule: Password should contain at least one special character
    const specialCharRegex = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/;

    // Check if password meets all criteria
    const isValidLength = lengthRegex.test(password);
    const hasUppercase = uppercaseRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasDigit = digitRegex.test(password);
    const hasSpecialChar = specialCharRegex.test(password);

    return isValidLength && hasUppercase && hasLowercase && hasDigit && hasSpecialChar;
}

function validateInput(input) {
    const regex = /^[^0-9\s!@#$%^&*()-=_+|;:'",.<>?]+$/;
    return regex.test(input);
}
function validateNotNullOrSpace(input) {
    return input !== null && input.trim() !== '';
}

function validateVerificationCode(code) {
    return /^\d{6}$/.test(code);
}

function validatePrice(price) {
    // Check if the price is a positive number
    return !isNaN(price) && parseFloat(price) > 0;
  }


  

export {validPhoneNumber,validEmail, validFullName, validateUsername, validatePassword,
     validateString, validateInput,validateNotNullOrSpace,validateVerificationCode, validatePrice};

