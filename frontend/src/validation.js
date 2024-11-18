function Validation(username, email, password1, password2, t) {
  const errors = {};
  const validFields = {};

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
  const passwordPattern =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

  if (username === "") {
    errors.username = t("username-required");
    validFields.usernameIsValid = false;
  } else {
    validFields.usernameIsValid = true;
  }

  if (email === "") {
    errors.email = t("email-required");
    validFields.emailIsValid = false;
  } else if (!emailPattern.test(email)) {
    errors.email = t("email-not-valid");
    validFields.emailIsValid = false;
  } else {
    validFields.emailIsValid = true;
  }

  if (password1 === "") {
    errors.password = t("password-required");
    validFields.passwordIsValid = false;
  } else if (!passwordPattern.test(password1)) {
    errors.password = t("password-not-valid");
    validFields.passwordIsValid = false;
  } else {
    validFields.passwordIsValid = true;
  }

  if (password2 === "") {
    errors.confirmPassword = t("conf-password-required");
    validFields.confPasswordIsValid = false;
  } else if (password1 !== password2) {
    errors.confirmPassword = t("password-not-matched");
    validFields.confPasswordIsValid = false;
  } else {
    validFields.confPasswordIsValid = true;
  }

  return [errors, validFields];
}

export default Validation;
