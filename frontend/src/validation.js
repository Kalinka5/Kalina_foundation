function Validation(username, email, password1, password2) {
  const errors = {};
  const validFields = {};

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (username === "") {
    errors.username = "username field is required";
    validFields.usernameIsValid = false;
  } else {
    validFields.usernameIsValid = true;
  }

  if (email === "") {
    errors.email = "email field is required";
    validFields.emailIsValid = false;
  } else if (!emailPattern.test(email)) {
    errors.email = "email is not valid";
    validFields.emailIsValid = false;
  } else {
    validFields.emailIsValid = true;
  }

  if (password1 === "") {
    errors.password = "password field is required";
    validFields.passwordIsValid = false;
  } else if (!passwordPattern.test(password1)) {
    errors.password = "password is not valid";
    validFields.passwordIsValid = false;
  } else {
    validFields.passwordIsValid = true;
  }

  if (password2 === "") {
    errors.confirmPassword = "confirm password field is required";
    validFields.confPasswordIsValid = false;
  } else if (password1 !== password2) {
    errors.confirmPassword = "password not matched";
    validFields.confPasswordIsValid = false;
  } else {
    validFields.confPasswordIsValid = true;
  }

  return [errors, validFields];
}

export default Validation;
