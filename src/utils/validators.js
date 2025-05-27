import { toOunces, toWeightObject } from "./methods/formatWeight";

const sortDims = (dimArray) => {
  return dimArray.sort((a, b) => b - a);
};
export const packageLength = (value) => {
  if (
    value == null ||
    !/^(\.+)?([0-9]+[.]?)+(["″]+)?([/]+[0-9]+)?([\s-]+)?([0-9]*?[/]+[0-9]+)?$/gm.test(
      value
    )
  ) {
    return "Enter a valid number e.g. 2, 2.25 or 2 1/4";
  }

  return undefined;
};
/**
 * Check the dimensions of a 2d package are within bounds given by the config (and MAX_ENVELOPE length)
 */
export const packageDimensions2d = (value, config) => {
  if (!config) return undefined;

  const guardedValue = value || { length: 0, width: 0 };
  const { length, width } = guardedValue;

  const MAX_ENVELOPE = 18;

  const { minLongSide = 6, minMiddleSide = 3 } = config;

  // sort values
  const [longSide, shortSide] = sortDims([length, width]);

  // Envelope/Softpack
  if (length === 0 && width === 0) {
    return undefined;
  }

  if (length === 0 || width === 0) {
    return "Enter both dimensions";
  }

  // Max Dimensions
  if (shortSide > MAX_ENVELOPE || longSide > MAX_ENVELOPE) {
    return `For envelopes larger than ${MAX_ENVELOPE}″ in either direction, you must use the box package type and enter all 3 dimensions of your final package`;
  }

  // Min Dimensions
  if (shortSide < minMiddleSide || longSide < minLongSide) {
    return `Your envelope is too small! The minimum dimensions are ${minLongSide}x${minMiddleSide}″`;
  }

  return undefined;
};

/**
 * Check the dimensions of a 3d package are within bounds given by the config
 */
export const packageDimensions3d = (value, config) => {
  if (!config) return undefined;
  const guardedValue = value || { length: 0, width: 0, height: 0 };
  const { length, width, height } = guardedValue;

  const {
    maxCombinedLength,
    maxLengthPlusGirth,
    maxLongSide,
    maxMiddleSide,
    maxShortSide,
    minShortSide = 0.25,
    minLongSide = 6,
    minMiddleSide = 3,
  } = config;

  let combinedLengthAndGirth = 0;
  let combinedLength = 0;

  // Combined Length + Girth: L + (W + H) * 2
  // Height will be 2" for all Envelopes/Softpacks
  const calcCombinedLengthAndGirth = () =>
    longSide + (middleSide + shortSide) * 2;

  // Combined Length: L + W + H
  // Height will be 2" for all Envelopes/Softpacks
  const calcCombinedLength = () => shortSide + middleSide + longSide;

  // sort values
  const [longSide, middleSide, shortSide] = sortDims([length, width, height]);

  combinedLengthAndGirth = calcCombinedLengthAndGirth(
    shortSide,
    middleSide,
    longSide
  );
  combinedLength = calcCombinedLength(shortSide, middleSide, longSide);
  if (length === 0 || width === 0 || height === 0) {
    return "Enter all 3 dimensions of your package";
  }

  // Min Dimensions
  if (
    shortSide < minShortSide ||
    middleSide < minMiddleSide ||
    longSide < minLongSide
  ) {
    return `Your package is too small! The minimum dimensions are ${minLongSide}x${minMiddleSide}x${minShortSide}″`;
  }

  // Max Combined Length + Girth: L + (W + H) * 2
  if (combinedLengthAndGirth > maxLengthPlusGirth) {
    return `Your package is too big! The maximum Length plus Girth (Width x 2 + Height x 2) is ${maxLengthPlusGirth}″, but your package is ${combinedLengthAndGirth}″`;
  }

  // Max Combined Length: L + W + H
  if (combinedLength > maxCombinedLength) {
    return `Your package is too big! The maximum combined Length (Length + Width + Height) is ${maxCombinedLength}″, but your box is ${combinedLength}″`;
  }

  // Max Dimensions
  if (
    shortSide > maxShortSide ||
    middleSide > maxMiddleSide ||
    longSide > maxLongSide
  ) {
    return `Your package is too big! The maximum dimensions are ${length}x${width}x${height}″`;
  }

  return undefined;
};

export const packageWeight = (value, config) => {
  if (value == null || Number.isNaN(value)) {
    return "Enter a weight";
  }
  const { weightOunces, weightPounds } = value;
  if (Number.isNaN(weightOunces) || Number.isNaN(weightPounds)) {
    return "One or more weights is not a number";
  }
  const weightInOunces = toOunces({
    pounds: weightPounds,
    ounces: weightOunces,
  });
  if (weightInOunces === 0) {
    return "Weight cannot be 0 lb";
  }

  if (!config) {
    return undefined;
  }

  const { pounds, ounces } = toWeightObject(weightInOunces); // "redistribute" weight in case user typed something over 16 ounces
  if (weightInOunces > config.maxWeight) {
    return `Maximum weight is ${
      config.maxWeight / 16
    } lb, you entered ${pounds} lb ${ounces > 0 ? `${ounces} oz` : ""}`;
  }
  return undefined;
};

export const maxAverageWeight = (value, config) => {
  if (!value || !config) return undefined;
  const allowedTotalWeight = config.parcelCount * config.max;
  if (value >= allowedTotalWeight) {
    return `Average parcel weight should not exceed ${config.max} lb`;
  }
  return undefined;
};

export const validateDomesticOrInternational = (fromCountry, toCountry) => {
  return fromCountry === toCountry ? "domestic" : "international";
};
