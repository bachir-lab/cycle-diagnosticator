
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { cn } from "@/lib/utils";
import { DiagnosticResult } from "@/types/diagnostic";
import { diagnosticQuestions } from "@/data/diagnostic-questions";
import { 
  ArrowLeft, Bike, Wrench, 
  RotateCcw, Check, X,
  Frame, Settings, ChevronUp, Hammer
} from "lucide-react";
import { Link } from "react-router-dom";

export function DiagnosticForm() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = diagnosticQuestions[currentQuestionIndex];

  const getComponentIcon = (component: string) => {
    switch(component) {
      case "seatpost":
        return <ChevronUp className="h-8 w-8" />;
      case "stem":
        return <Hammer className="h-8 w-8" />;
      case "fork":
        return <Wrench className="h-8 w-8" />;
      case "frame":
        return <Frame className="h-8 w-8" />;
      case "crankset":
        return <Settings className="h-8 w-8" />;
      case "brake":
        return <Wrench className="h-8 w-8" />;
      default:
        return <Bike className="h-8 w-8" />;
    }
  };

  const handleAnswer = (answer: boolean) => {
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    if (currentQuestion.nextStep) {
      const nextAction = answer ? currentQuestion.nextStep.yes : currentQuestion.nextStep.no;

      if (nextAction === "dismantle") {
        setResult({
          decision: "dismantle",
          component: currentQuestion.component,
          reason: currentQuestion.text
        });
        setShowResults(true);
      } else if (nextAction === "keep") {
        setResult({
          decision: "keep"
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

  const resetDiagnostic = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
    setShowResults(false);
  };

  const getFailureReason = () => {
    if (!result || !result.component || !result.reason) return "";
    
    switch(result.component) {
      case "seatpost":
        return "Problème avec la tige de selle";
      case "stem":
        return "Problème avec la potence";
      case "fork":
        return "Problème avec la fourche";
      case "frame":
        return "Problème avec le cadre";
      case "crankset":
        return "Problème avec le pédalier";
      case "brake":
        return "Problème avec les freins";
      default:
        return "";
    }
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

            <Card className="p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 bg-primary" style={{ 
                width: `${((currentQuestionIndex + 1) / diagnosticQuestions.length) * 100}%`,
                transition: 'width 0.5s ease-in-out'
              }}></div>
              
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-primary/10 rounded-full mr-4">
                    {getComponentIcon(currentQuestion.component)}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                      {currentQuestion.component === "seatpost" ? "Tige de selle" : 
                       currentQuestion.component === "stem" ? "Potence" :
                       currentQuestion.component === "fork" ? "Fourche" :
                       currentQuestion.component === "frame" ? "Cadre" :
                       currentQuestion.component === "crankset" ? "Pédalier" :
                       "Étriers de frein"}
                    </h3>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {currentQuestion.text}
                    </h2>
                  </div>
                </div>
                
                {currentQuestion.subtext && (
                  <p className="text-muted-foreground">
                    {currentQuestion.subtext}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Button
                    variant="outline"
                    size="lg"
                    className={cn(
                      "h-auto py-6 px-4 border-2",
                      answers[currentQuestion.id] === true ? "bg-destructive/10 border-destructive" : "hover:border-destructive/50"
                    )}
                    onClick={() => handleAnswer(true)}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-10 w-10 rounded-full flex items-center justify-center bg-destructive/10">
                        <Check className="h-6 w-6 text-destructive" />
                      </div>
                      <span className="font-semibold text-lg">OUI</span>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className={cn(
                      "h-auto py-6 px-4 border-2",
                      answers[currentQuestion.id] === false ? "bg-primary/10 border-primary" : "hover:border-primary/50"
                    )}
                    onClick={() => handleAnswer(false)}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary/10">
                        <X className="h-6 w-6 text-primary" />
                      </div>
                      <span className="font-semibold text-lg">NON</span>
                    </div>
                  </Button>
                </div>
              </div>
            </Card>

            {currentQuestionIndex > 0 && (
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
                ? "border-green-200"
                : "border-red-200"
            )}>
              <div className={cn(
                "h-2",
                result?.decision === "keep" ? "bg-green-500" : "bg-red-500"
              )}/>
              <div className="p-8">
                <div className="text-center space-y-6">
                  <div className={cn(
                    "mx-auto w-24 h-24 rounded-full flex items-center justify-center border-4",
                    result?.decision === "keep"
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  )}>
                    <motion.div
                      initial={{ rotate: 0, scale: 0.8 }}
                      animate={{ rotate: 360, scale: 1 }}
                      transition={{ duration: 1, repeat: 0, ease: "easeOut" }}
                    >
                      {result?.decision === "keep" ? (
                        <Check className="h-12 w-12 text-green-600" />
                      ) : (
                        <Wrench className="h-12 w-12 text-red-600" />
                      )}
                    </motion.div>
                  </div>

                  <div>
                    <h2 className={cn(
                      "text-2xl font-bold mb-3",
                      result?.decision === "keep" ? "text-green-700" : "text-red-700"
                    )}>
                      {result?.decision === "keep" 
                        ? "ON GARDE LE VÉLO POUR RÉPARATION"
                        : "À DÉSOSSER"}
                    </h2>
                    
                    {result?.decision === "dismantle" && result.component && (
                      <div className="mt-6">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 border border-red-200 text-red-700">
                          <span className="font-medium">{getFailureReason()}</span>
                        </div>
                        <p className="mt-4 text-muted-foreground">
                          Ce vélo présente un problème important qui justifie son désossement plutôt que sa réparation.
                        </p>
                      </div>
                    )}
                    
                    {result?.decision === "keep" && (
                      <p className="text-green-700 mt-2">
                        Ce vélo ne présente pas de problèmes majeurs et peut être conservé pour réparation.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={resetDiagnostic}
                variant="outline"
                className="shadow-sm"
                size="lg"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Nouveau diagnostic
              </Button>
              
              <Link to="/" className="shadow-md">
                <Button className="w-full" size="lg">
                  <Bike className="mr-2 h-5 w-5" />
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
