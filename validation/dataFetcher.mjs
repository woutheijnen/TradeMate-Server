import Validator from "validator";
import isEmpty from "./isEmpty";

export default data => {
  let errors = {};

  data.exchange = !isEmpty(data.exchange) ? data.exchange : "";
  data.apiKey = !isEmpty(data.apiKey) ? data.apiKey : "";
  data.apiSecret = !isEmpty(data.apiSecret) ? data.apiSecret : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : new Date().toISOString();
  data.keepUpToDate = !isEmpty(data.keepUpToDate) ? data.keepUpToDate : "";
  data.timestamp = !isEmpty(data.timestamp) ? data.timestamp : "";
  data.assets = (Array.isArray(data.assets) ? data.assets : []).map(value => (!isEmpty(value) ? value : ""));

  if (Validator.isEmpty(data.exchange)) {
    errors.exchange = "Exchange is required";
  }
  if (Validator.isEmpty(data.apiKey)) {
    errors.apiKey = "API key is required";
  }
  if (Validator.isEmpty(data.apiSecret)) {
    errors.apiSecret = "API secret is required";
  }
  if (!Validator.isDate(data.from)) {
    errors.from = "From date is not a date";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "From date is required";
  }
  if (!Validator.isDate(data.to)) {
    errors.to = "From date is not a date";
  }
  if (!Validator.isBoolean(data.keepUpToDate)) {
    errors.keepUpToDate = "keepUpToDate field is not a boolean";
  }
  if (Validator.isEmpty(data.keepUpToDate)) {
    errors.keepUpToDate = "Please specify if data should be kept up-to-date";
  }
  if (!Validator.isNumeric(data.timeframe)) {
    errors.timeframe = "Timeframe should be numeric";
  }
  if (Validator.isEmpty(data.timeframe)) {
    errors.timeframe = "Timeframe is required";
  }
  // TODO implement assets validator

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
