const filterCorrectHalf = (n) =>
  n === 1
    ? (w) => w.replace("[", "").replace(/\|.*\]/, "") // replace [singular|plural] with singular
    : (w) => w.replace(/\[.*\|/, "").replace("]", ""); // replace [singular|plural] with plural

// a utility to determine a rendered string based on a number and a string
// alternate words are to be defined in square brackets with a bar separating the singular and plural options, e.g. [is|are]
// additionally, you can use "%d" in place of the number you want to represent in the string itself
// check the corresponding test file for multiple examples
export const pluralize = (text, n) => {
  return text
    .split(/(\[.*?\])/g) // split text into units bound by square bracket pairs
    .map((w) => (w.match(/^\[.*\|.*\]$/) ? filterCorrectHalf(n)(w) : w)) // filter relevant half from units that match [a|b]
    .join("")
    .replaceAll(/ {2,}/g, " ") // cleanup instances of multiple spaces, i.e. "Get  Quotes" => "Get Quotes"
    .replaceAll("%d", `${n}`); // use %d number replacement pattern if needed (i.e. the number needed further pluralization is present in the string)
};
