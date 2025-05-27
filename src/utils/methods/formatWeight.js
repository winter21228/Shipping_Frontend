import { formatFloat } from "./formatFloat";
import { pluralize } from "./pluralize";

/**
 * convert a partial weight object to a number of ounces
 */
export const toOunces = (weightObject) => {
  const p = weightObject.pounds || 0;
  const o = weightObject.ounces || 0;
  return p * 16 + o;
};

/**
 * convert a weight object (with potentially decimal pound values or ounce values over 16)
 * to a weight object with a whole numbered pound value and ounce value under 16
 */
const standardizeWeight = ({ pounds, ounces }) => {
  const weightInOunces = toOunces({ pounds, ounces });
  const standardizedPounds = Math.floor(weightInOunces / 16);
  const standardizedOunces = weightInOunces - standardizedPounds * 16;
  return { pounds: standardizedPounds, ounces: standardizedOunces };
};
/**
 * Convert ounces and pounds to a string representation
 * e.g.
 * 1 lbs 6.1 oz
 * 1 lbs
 * 6 oz
 */
export const formatWeight = ({ pounds, ounces }, precision = 3) => {
  const { pounds: standardizedPounds, ounces: standardizedOunces } =
    standardizeWeight({
      pounds,
      ounces,
    });
  const asPounds =
    standardizedPounds > 0 ? pluralize("%d [lb|lbs]", standardizedPounds) : "";

  const asOunces =
    standardizedOunces > 0
      ? `${formatFloat(standardizedOunces, precision)} oz`
      : "";
  return `${asPounds} ${asOunces}`.trim() || "0 oz";
};

export const toWeightObject = (weightInOunces, precision = 3) => {
  const normalizedPounds = Math.floor(weightInOunces / 16);
  const normalizedOunces = formatFloat(
    (weightInOunces / 16 - normalizedPounds) * 16,
    precision
  );
  return { pounds: normalizedPounds, ounces: +normalizedOunces };
};
