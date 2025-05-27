const createIntlCurrencyFormatInstance = ({
  fractionDigits = 2,
  locale = "en-US",
  currency = "USD",
} = {}) => {
  const options = {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  };

  // Only set currency-related options if currency is NOT false
  if (currency !== false) {
    options.style = "currency";
    options.currency = currency;
  } else {
    options.style = "decimal";
  }

  return new Intl.NumberFormat(locale, options);
};
// Let's create some global INTL instances to reduce instances over all in the app
export const formatCurrency = (v) => {
  console.log("v", v);
  const num = Number(v);
  if (isNaN(num)) return "0.00";
  return createIntlCurrencyFormatInstance().format(num);
};
export const formatCurrencyNoUnit = (v) =>
  createIntlCurrencyFormatInstance({
    currency: false,
  }).format(v);
export const formatCurrencyNoFractionDigits = (v) =>
  createIntlCurrencyFormatInstance({
    fractionDigits: 0,
  }).format(v);
export const formatCurrencyNoFractionDigitsNorUnit = (v) =>
  createIntlCurrencyFormatInstance({
    fractionDigits: 0,
    currency: false,
  }).format(v);
