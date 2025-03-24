
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
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Question {currentStep} sur {totalSteps}</span>
        <span>{Math.round(progress)}% terminé</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
