// utils/userValidator.js
const validator = require("validator");

/**
 * Validate user input for name and email
 * @param {Object} data - { name: string, email: string }
 * @returns {Object} { isValid: boolean, errors: object }
 */
function validateRegUserInput(data) {
  const errors = {};

  // Trim and normalize input
  const username = data.username ? data.username.trim() : "";
  const email = data.email ? data.email.trim().toLowerCase() : "";
  const password = data.password ? data.password : "";

  // Name validation
  if (validator.isEmpty(username)) {
    errors.name = "Name is required";
  } else if (!validator.isLength(username, { min: 2, max: 50 })) {
    errors.name = "username must be between 2 and 50 characters";
  }

  // Email validation
  if (validator.isEmpty(email)) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }

  // password validation
  if (validator.isEmpty(password)) {
    errors.password = "Password is required";
  } else if (!validator.isLength(password, { min: 6, max: 100 })) {
    errors.password = "Password must be between 6 and 100 characters";
  }
  // else if (!validator.isStrongPassword(password,{
  //     minLength: 6,
  //     minUppercase: 1,
  //     minNumbers: 1,
  //     minSymbols: 1
  // })) {
  //   errors.password = {
  //         message : 'Password is too weak',
  //         suggestions : [
  //             'Use at least one uppercase letter',
  //             'Use at least one number',
  //             'Use at least one special character',
  //             'Make sure your password is at least 6 characters long'
  //         ]
  //   };
  // }

  // Return validation result
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

module.exports = validateRegUserInput;
