import clamp from "./clamp";

export default function withOpacity(hex, opacity) {
  const hexOpacity = clamp(+Math.round(opacity * 255).toString(16), 0, 255);
  return `${hex}${hexOpacity}`;
}
