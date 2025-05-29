import * as React from "react";

import { cn } from "../../lib/util";

const Select = React.forwardRef(
  (
    {
      className,
      optionStyle,
      values = [],
      error,
      placeholder,
      showError = true,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col ${className}`}>
        <select
          className={cn(
            "relative h-full w-full border-2 p-3 border-grey20 rounded-md text-base",
            error ? "border-red" : "",
            optionStyle
          )}
          ref={ref}
          {...props}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {values.map((s) => (
            <option key={s.value} value={s.value} className="text-base">
              {s.label}
            </option>
          ))}
        </select>
        {error && showError && (
          <p className="text-red text-end text-xs mt-1 ml-1">{error.message}</p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
