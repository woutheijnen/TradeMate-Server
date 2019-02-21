import Validator from "validator";
import isEmpty from "./isEmpty";

export default data => {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.role = !isEmpty(data.role) ? data.role : "";
  data.masterPassword = !isEmpty(data.masterPassword) ? data.masterPassword : "";

  // Check if endpoint is activated and master password is correct
  if (isEmpty(process.env.REGISTRATION_MASTER_PASSWORD)) {
    errors.masterPassword = "This endpoint has been disabled, please activate it server-sidely.";
  } else {
    if (!Validator.equals(process.env.REGISTRATION_MASTER_PASSWORD, data.masterPassword)) {
      errors.masterPassword = "Wrong master password.";
    }
  }
  if (!isEmpty(errors)) {
    return {
      errors,
      isValid: false
    };
  }

  // Check if data fields are correctly set
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  if (Validator.isEmpty(data.role)) {
    errors.role = "Role is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
