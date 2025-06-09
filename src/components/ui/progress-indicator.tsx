import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}
export function ProgressIndicator({
  currentStep,
  totalSteps,
  className
}: ProgressIndicatorProps) {
  const progress = currentStep / totalSteps * 100;
  return <div className={cn("space-y-3", className)}>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span className="font-medium">Question {currentStep} sur {totalSteps}</span>
        <span className="font-medium text-primary">{Math.round(progress)}% terminé</span>
      </div>
      <div className="h-2.5 bg-secondary/80 rounded-full overflow-hidden border border-border/30">
        <motion.div className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full" style={{
        width: `${progress}%`
      }} initial={{
        width: 0
      }} animate={{
        width: `${progress}%`
      }} transition={{
        duration: 0.5,
        ease: "easeOut"
      }} />
      </div>
      <div className="flex justify-between">
        <div className="flex space-x-1 w-0 ">
          {Array.from({
          length: totalSteps
        }).map((_, i) => <motion.div key={i} className={cn("h-1.5 w-1.5 rounded-full", i < currentStep ? "bg-primary" : "bg-secondary-foreground/20")} initial={{
          scale: 0.8,
          opacity: 0.5
        }} animate={{
          scale: i === currentStep - 1 ? 1.2 : 1,
          opacity: i < currentStep ? 1 : 0.5
        }} transition={{
          duration: 0.3
        }} />)}
        </div>
        <div className="text-xs text-muted-foreground italic">
          {totalSteps - currentStep > 0 ? `${totalSteps - currentStep} question${totalSteps - currentStep > 1 ? 's' : ''} restante${totalSteps - currentStep > 1 ? 's' : ''}` : 'Terminé!'}
        </div>
      </div>
    </div>;
}