import Validator from "validator";
import isEmpty from "./isEmpty";
import { EXCHANGES } from "../config/constants";

export default data => {
  let errors = {};

  data.exchange = !isEmpty(data.exchange) ? data.exchange : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.apiKey = !isEmpty(data.apiKey) ? data.apiKey : "";
  data.apiSecret = !isEmpty(data.apiSecret) ? data.apiSecret : "";

  if (!Validator.isEmpty(data.exchange)) {
    errors.exchange = "Exchange name is required";
  } else {
    // Check if exchange name is in EXCHANGES constant
    if (!EXCHANGES.includes(data.exchange)) {
      errors.exchange = "Exchange is not known";
    }
  }
  if (!Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
