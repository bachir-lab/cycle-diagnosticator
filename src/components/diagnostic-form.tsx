
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { cn } from "@/lib/utils";
import { DiagnosticResult } from "@/types/diagnostic";
import { diagnosticQuestions, additionalChecks } from "@/data/diagnostic-questions";
import { 
  ArrowLeft, Bike, Wrench, 
  RotateCcw, Check, X
} from "lucide-react";

export function DiagnosticForm() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [additionalIssues, setAdditionalIssues] = useState<string[]>([]);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = diagnosticQuestions[currentQuestionIndex];

  const handleAnswer = (answer: boolean) => {
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    if (currentQuestion.nextStep) {
      const nextAction = answer ? currentQuestion.nextStep.yes : currentQuestion.nextStep.no;

      if (nextAction === "dismantle") {
        setResult({
          decision: "dismantle",
          additionalTasks: []
        });
        setShowResults(true);
      } else if (nextAction === "continue") {
        if (currentQuestionIndex < diagnosticQuestions.length - 1) {
          setTimeout(() => {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          }, 300);
        }
      }
    }
  };

  const handleAdditionalChecks = (checkId: string, checked: boolean) => {
    setAdditionalIssues(prev => 
      checked 
        ? [...prev, checkId]
        : prev.filter(id => id !== checkId)
    );
  };

  const finalizeCheck = () => {
    const additionalTasks = additionalIssues.map(issueId => {
      const check = additionalChecks.find(c => c.id === issueId);
      return {
        task: check?.text || "",
        timeEstimate: check?.timeEstimate || 0
      };
    });

    const totalTime = additionalTasks.reduce((acc, task) => acc + task.timeEstimate, 0);

    setResult({
      decision: totalTime > 60 ? "dismantle" : "keep",
      additionalTasks,
      totalAdditionalTime: totalTime
    });
    setShowResults(true);
  };

  const resetDiagnostic = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setAdditionalIssues([]);
    setResult(null);
    setShowResults(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <ProgressIndicator
              currentStep={currentQuestionIndex + 1}
              totalSteps={diagnosticQuestions.length}
              className="mb-8"
            />

            <Card className="p-6 shadow-lg">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-medium tracking-tight mb-2">
                    {currentQuestion.text}
                  </h2>
                  {currentQuestion.subtext && (
                    <p className="text-muted-foreground text-sm">
                      {currentQuestion.subtext}
                    </p>
                  )}
                </div>

                {currentQuestion.type === "binary" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className={cn(
                        "h-auto py-6 px-4",
                        answers[currentQuestion.id] === true && "bg-destructive/10 border-destructive"
                      )}
                      onClick={() => handleAnswer(true)}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Check className="h-6 w-6 text-destructive" />
                        <span>Oui</span>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-auto py-6 px-4",
                        answers[currentQuestion.id] === false && "bg-primary/10 border-primary"
                      )}
                      onClick={() => handleAnswer(false)}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <X className="h-6 w-6 text-primary" />
                        <span>Non</span>
                      </div>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {additionalChecks.map((check) => (
                      <div key={check.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                        <Checkbox
                          id={check.id}
                          checked={additionalIssues.includes(check.id)}
                          onCheckedChange={(checked) => 
                            handleAdditionalChecks(check.id, checked as boolean)
                          }
                        />
                        <div className="space-y-1">
                          <label
                            htmlFor={check.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {check.text}
                          </label>
                          <p className="text-sm text-muted-foreground">
                            {check.details}
                          </p>
                        </div>
                      </div>
                    ))}
                    <Button 
                      className="w-full mt-6"
                      onClick={finalizeCheck}
                    >
                      Terminer le diagnostic
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {currentQuestionIndex > 0 && currentQuestion.type === "binary" && (
              <Button
                variant="outline"
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                className="mt-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Question précédente
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Résultat du Diagnostic</h1>
              <p className="text-muted-foreground">
                Voici notre recommandation basée sur l'évaluation :
              </p>
            </div>

            <Card className={cn(
              "border-2 shadow-lg overflow-hidden",
              result?.decision === "keep" 
                ? "border-green-200 bg-green-50"
                : "border-red-200 bg-red-50"
            )}>
              <div className="p-8">
                <div className="text-center space-y-6">
                  <div className={cn(
                    "mx-auto w-20 h-20 rounded-full flex items-center justify-center border",
                    result?.decision === "keep"
                      ? "bg-green-100 border-green-200"
                      : "bg-red-100 border-red-200"
                  )}>
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: 0, ease: "easeInOut" }}
                    >
                      {result?.decision === "keep" ? (
                        <Check className="h-8 w-8 text-green-600" />
                      ) : (
                        <Wrench className="h-8 w-8 text-red-600" />
                      )}
                    </motion.div>
                  </div>

                  <div>
                    <h2 className={cn(
                      "text-2xl font-semibold mb-3",
                      result?.decision === "keep" ? "text-green-800" : "text-red-800"
                    )}>
                      {result?.decision === "keep" 
                        ? "Le vélo peut être conservé"
                        : "Le vélo doit être démonté"}
                    </h2>
                    
                    {result?.additionalTasks && result.additionalTasks.length > 0 && (
                      <div className="mt-6 text-left">
                        <h3 className="text-lg font-medium mb-3">
                          Tâches de maintenance nécessaires :
                        </h3>
                        <ul className="space-y-2">
                          {result.additionalTasks.map((task, index) => (
                            <li 
                              key={index}
                              className="flex items-center justify-between p-3 rounded-lg bg-white/50 border"
                            >
                              <span>{task.task}</span>
                              <span className="text-sm font-medium text-muted-foreground">
                                +{task.timeEstimate} min
                              </span>
                            </li>
                          ))}
                        </ul>
                        {result.totalAdditionalTime && (
                          <p className="mt-4 text-sm font-medium text-muted-foreground">
                            Temps total estimé : {result.totalAdditionalTime} minutes
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <Button
              onClick={resetDiagnostic}
              className="w-full shadow-md"
              size="lg"
            >
              <Bike className="mr-2 h-5 w-5" />
              Commencer un nouveau diagnostic
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
