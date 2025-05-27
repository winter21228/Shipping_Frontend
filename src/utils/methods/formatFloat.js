import { roundFloat } from "./roundFloat";

// convert a number to a string representation of that number with given precision
// if exactPrecision is set to false, any trailing zeroes will be removed from the string
export const formatFloat = (value, precision, exactPrecision = false) => {
  const roundedValue = roundFloat(value, precision).toString();
  const dps =
    roundedValue.indexOf(".") === -1
      ? 0
      : roundedValue.length - roundedValue.indexOf(".") - 1; // how many numbers are after the comma
  if (exactPrecision && precision > dps) {
    return `${roundedValue}${dps === 0 ? "." : ""}${"0".repeat(
      precision - dps
    )}`;
  }
  return roundedValue;
};
