import Validator from "validator";
import isEmpty from "./isEmpty";

export default data => {
  let errors = {};

  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : new Date().toISOString();
  data.timestamp = !isEmpty(data.timestamp) ? data.timestamp : "";
  data.assets = Array.isArray(data.assets) ? data.assets : [];

  if (!Validator.isDate(data.from)) {
    errors.from = "From date is not a date";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "From date is required";
  }
  if (!Validator.isDate(data.to)) {
    errors.to = "To date is not a date";
  }
  if (!Validator.isNumeric(data.timeframe)) {
    errors.timeframe = "Timeframe should be numeric";
  }
  if (Validator.isEmpty(data.timeframe)) {
    errors.timeframe = "Timeframe is required";
  }
  // Assets validation (array)
  if (!isEmpty(data.assets)) {
    let assetErrors = [];
    data.assets.forEach(asset => {
      if (typeof asset === "object") {
        let assetErrors = {};
        const first = !isEmpty(asset.first) ? asset.first : "";
        const second = !isEmpty(asset.second) ? asset.second : "";
        if (Validator.isEmpty(first)) {
          assetErrors.first = "Please specify first pair";
        }
        if (Validator.isEmpty(second)) {
          assetErrors.second = "Please specify second pair";
        }
        if (!isEmpty(assetErrors)) {
          assetErrors.push({ asset, error: assetErrors });
        }
      } else {
        assetErrors.push({ asset, error: "Asset must be an object" });
      }
    });
    if (!isEmpty(assetErrors)) {
      errors.assets = assetErrors;
    }
  } else {
    errors.assets = "At least one asset is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
