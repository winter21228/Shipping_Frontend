/**
 * Round a number to a maximum of maxDP decimal places
 */
export const roundFloat = (n, maxDP) => {
  return Math.round((n + Number.EPSILON) * 10 ** maxDP) / 10 ** maxDP;
};
