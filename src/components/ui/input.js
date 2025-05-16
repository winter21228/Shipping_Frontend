import * as React from "react";

import { cn } from "../../lib/util";

const Input = React.forwardRef(
  ({ className, type, StartIcon, error, showError = true, ...props }, ref) => {
    return (
      <div className={`flex flex-col w-full`}>
        <div className="relative">
          {StartIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 border-none">
              {StartIcon}
            </span>
          )}
          <input
            type={type}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              error ? "border-red-500" : "",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && showError && (
          <p className="text-red-500 text-xs mt-1 ml-1">{error.message}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
