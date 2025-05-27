import * as React from "react";

import { cn } from "../../lib/util";

const Input = React.forwardRef(
  ({ className, type, StartIcon, error, showError = true, ...props }, ref) => {
    return (
      <div className={`flex flex-col w-full`}>
        <div className="flex flex-row">
          {StartIcon && (
            <div className="flex flex-row items-center p-3 bg-grey20 rounded-s-md">
              <span className="text-grey50 border-none">{StartIcon}</span>
            </div>
          )}
          <div
            className={cn(
              "relative border-2 border-grey20 w-full",
              StartIcon ? "rounded-e-md" : "rounded-md",
              error ? "border-red" : ""
            )}
          >
            <input
              type={type}
              className={cn(
                "flex h-9 w-full bg-transparent pl-4 px-4 py-4 text-xs shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                StartIcon ? "rounded-e-md" : "rounded-md",
                className
              )}
              ref={ref}
              {...props}
            />
          </div>
        </div>
        {error && showError && (
          <p className="text-red text-end text-xs mt-1 ml-1">{error.message}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
