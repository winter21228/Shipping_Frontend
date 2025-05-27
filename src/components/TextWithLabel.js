import React from "react";
import { cn } from "../lib/util";

function TextWithLabel({ label, value, className, labelStyle, valueStyle }) {
  return (
    <div
      className={cn(
        "flex flex-row gap-1 items-center font-regular text-sm leading-5",
        className
      )}
    >
      <span className={cn(labelStyle ? labelStyle : "font-medium")}>
        {label || ""}
        {label && value ? ": " : ""}
        {value && (
          <span className={cn(valueStyle ? valueStyle : "font-regular")}>
            {value}
          </span>
        )}
      </span>
    </div>
  );
}

export default TextWithLabel;
