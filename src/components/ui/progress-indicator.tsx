
import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  className,
}: ProgressIndicatorProps) {
  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex justify-between px-1">
        <span className="text-sm font-medium text-muted-foreground">
          Diagnostic
        </span>
        <span className="text-sm font-medium">
          {currentStep}/{totalSteps}
        </span>
      </div>
      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
}
