import Validator from "validator";
import isEmpty from "./isEmpty";

export default data => {
  let errors = {};

  // Sets validation (array)
  if (Array.isArray(data.sets)) {
    data.sets.forEach(set => {
      if (typeof set === "object") {
        const first = !isEmpty(set.first) ? set.first : "";
        const second = !isEmpty(set.second) ? set.second : "";
        const lastUpdate = !isEmpty(set.lastUpdate) ? set.lastUpdate : "";
        const key = `${first ? first : "(none)"} ${second ? second : "(none)"}`;
        if (Validator.isEmpty(first)) {
          errors[key].first = "Please specify first pair";
        }
        if (Validator.isEmpty(second)) {
          errors[key].second = "Please specify second pair";
        }
        if (Validator.isNumeric(lastUpdate)) {
          errors[key].lastUpdate = "Last update must be numeric";
        }
        if (Validator.isEmpty(lastUpdate)) {
          errors[key].lastUpdate = "Last update date is required";
        }
      } else {
        if (!Array.isArray(errors.sets)) {
          errors.sets = [];
        }
        errors.sets.push({ set, error: "Set must be an object" });
      }
    });
    if (!isEmpty(assetErrors)) {
      errors.assets = assetErrors;
    }
  } else {
    errors.sets = "The sets field must be an array";
  }

  // Candles validation (array)
  if (Array.isArray(data.candles)) {
    data.candles.forEach(candle => {
      if (typeof candle === "object") {
        const time = !isEmpty(set.first) ? set.first : "";
        const close = !isEmpty(set.second) ? set.second : "";
        const vol = !isEmpty(set.lastUpdate) ? set.lastUpdate : "";
        if (Validator.isEmpty(time)) {
          errors[time ? time : 0].time = "Timestamp is required";
        }
        if (Validator.isEmpty(close)) {
          errors[time ? time : 0].close = "Close price is required";
        }
        if (Validator.isEmpty(vol)) {
          errors[time ? time : 0].vol = "Volume is required";
        }
      } else {
        if (!Array.isArray(errors.sets)) {
          errors.sets = [];
        }
        errors.sets.push({ set, error: "Set must be an object" });
      }
    });
  } else {
    errors.sets = "The candles field must be an array";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
