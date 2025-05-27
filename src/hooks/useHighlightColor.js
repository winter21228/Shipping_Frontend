import { useEffect, useState } from "react";

export const useHighlightColor = (error, focused) => {
  const [highlightColor, setHighlightColor] = useState("border-grey30");

  useEffect(() => {
    if (error) {
      setHighlightColor("border-red");
    } else if (focused) {
      setHighlightColor("border-blue");
    } else {
      setHighlightColor("border-grey30");
    }
  }, [error, focused]);

  return highlightColor;
};
