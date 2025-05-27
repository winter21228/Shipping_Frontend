import * as React from "react";

import { cn } from "../../lib/util";

const Select = React.forwardRef(
  (
    { className, values = [], error, placeholder, showError = true, ...props },
    ref
  ) => {
    return (
      <div className={`flex flex-col w-full`}>
        <select
          className={cn(
            "w-full border-2 rounded-md px-3 py-2",
            error ? "border-red" : "",
            className
          )}
          ref={ref}
          {...props}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {values.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {error && showError && (
          <p className="text-red text-xs mt-1 ml-1 text-right">
            {error.message}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
