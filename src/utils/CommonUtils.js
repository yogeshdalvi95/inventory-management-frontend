import moment from "moment";

export const convertNumber = (
  val,
  isAmount,
  addCustomPrefix = false,
  prefix
) => {
  let num = 0;
  if (isAmount) {
    num = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(val);
    if (addCustomPrefix) {
      num = num + prefix;
    } else {
      num = num + " /-";
    }
  } else {
    num = new Intl.NumberFormat("en-IN", {}).format(val);
  }
  return num;
};

export function validateNumber(num) {
  if (isNaN(parseFloat(num))) {
    return 0;
  } else {
    return parseFloat(num);
  }
}

export const hasError = (field, object) => {
  if (object.hasOwnProperty(field)) {
    return true;
  } else {
    return false;
  }
};
