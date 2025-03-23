
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { cn } from "@/lib/utils";
import { 
  ArrowRight, ArrowLeft, Bike, Wrench, 
  RefreshCw, RotateCcw, AlertCircle, CheckCircle2 
} from "lucide-react";

type DiagnosticCriteria = {
  [key: string]: number;
};

type QuestionOption = {
  label: string;
  value: string;
  score: {
    refurbish: number;
    salvage: number;
    recycle: number;
  };
  icon?: React.ReactNode;
};

type Question = {
  id: string;
  text: string;
  subtext?: string;
  options: QuestionOption[];
};

// Define the questions for the diagnostic
const diagnosticQuestions: Question[] = [
  {
    id: "frame",
    text: "Quel est l'état du cadre du vélo ?",
    subtext: "Examinez le cadre pour détecter des fissures, des bosses, de la rouille ou d'autres dommages.",
    options: [
      {
        label: "Excellent",
        value: "excellent",
        score: { refurbish: 10, salvage: 0, recycle: 0 },
        icon: <CheckCircle2 className="text-green-500 h-5 w-5" />,
      },
      {
        label: "Bon",
        value: "good",
        score: { refurbish: 7, salvage: 0, recycle: 0 },
        icon: <CheckCircle2 className="text-green-400 h-5 w-5" />,
      },
      {
        label: "Moyen",
        value: "fair",
        score: { refurbish: 4, salvage: 3, recycle: 0 },
        icon: <AlertCircle className="text-amber-400 h-5 w-5" />,
      },
      {
        label: "Mauvais",
        value: "poor",
        score: { refurbish: 0, salvage: 5, recycle: 2 },
        icon: <AlertCircle className="text-red-400 h-5 w-5" />,
      },
      {
        label: "Irréparable",
        value: "beyond",
        score: { refurbish: 0, salvage: 0, recycle: 10 },
        icon: <AlertCircle className="text-red-600 h-5 w-5" />,
      },
    ],
  },
  {
    id: "wheels",
    text: "Comment évaluez-vous l'état des roues ?",
    subtext: "Vérifiez les dommages sur les jantes, la tension des rayons et si elles sont dévoilées.",
    options: [
      {
        label: "Excellent",
        value: "excellent",
        score: { refurbish: 8, salvage: 0, recycle: 0 },
        icon: <CheckCircle2 className="text-green-500 h-5 w-5" />,
      },
      {
        label: "Bon",
        value: "good",
        score: { refurbish: 6, salvage: 0, recycle: 0 },
        icon: <CheckCircle2 className="text-green-400 h-5 w-5" />,
      },
      {
        label: "Moyen",
        value: "fair",
        score: { refurbish: 3, salvage: 3, recycle: 0 },
        icon: <AlertCircle className="text-amber-400 h-5 w-5" />,
      },
      {
        label: "Mauvais",
        value: "poor",
        score: { refurbish: 0, salvage: 5, recycle: 0 },
        icon: <AlertCircle className="text-red-400 h-5 w-5" />,
      },
      {
        label: "Irréparable",
        value: "beyond",
        score: { refurbish: 0, salvage: 2, recycle: 7 },
        icon: <AlertCircle className="text-red-600 h-5 w-5" />,
      },
    ],
  },
  {
    id: "drivetrain",
    text: "Quel est l'état de la transmission (chaîne, cassette, pédalier) ?",
    subtext: "Vérifiez l'usure, la rouille et le bon fonctionnement.",
    options: [
      {
        label: "Excellent",
        value: "excellent",
        score: { refurbish: 7, salvage: 0, recycle: 0 },
        icon: <CheckCircle2 className="text-green-500 h-5 w-5" />,
      },
      {
        label: "Bon",
        value: "good",
        score: { refurbish: 5, salvage: 0, recycle: 0 },
        icon: <CheckCircle2 className="text-green-400 h-5 w-5" />,
      },
      {
        label: "Moyen",
        value: "fair",
        score: { refurbish: 3, salvage: 2, recycle: 0 },
        icon: <AlertCircle className="text-amber-400 h-5 w-5" />,
      },
      {
        label: "Mauvais",
        value: "poor",
        score: { refurbish: 0, salvage: 4, recycle: 1 },
        icon: <AlertCircle className="text-red-400 h-5 w-5" />,
      },
      {
        label: "Irréparable",
        value: "beyond",
        score: { refurbish: 0, salvage: 1, recycle: 6 },
        icon: <AlertCircle className="text-red-600 h-5 w-5" />,
      },
    ],
  },
  {
    id: "brakes",
    text: "Comment évaluez-vous le système de freinage ?",
    subtext: "Évaluez les plaquettes de frein, les câbles et la puissance de freinage.",
    options: [
      {
        label: "Excellent",
        value: "excellent",
        score: { refurbish: 7, salvage: 0, recycle: 0 },
        icon: <CheckCircle2 className="text-green-500 h-5 w-5" />,
      },
      {
        label: "Bon",
        value: "good",
        score: { refurbish: 5, salvage: 0, recycle: 0 },
        icon: <CheckCircle2 className="text-green-400 h-5 w-5" />,
      },
      {
        label: "Moyen",
        value: "fair",
        score: { refurbish: 3, salvage: 2, recycle: 0 },
        icon: <AlertCircle className="text-amber-400 h-5 w-5" />,
      },
      {
        label: "Mauvais",
        value: "poor",
        score: { refurbish: 1, salvage: 4, recycle: 0 },
        icon: <AlertCircle className="text-red-400 h-5 w-5" />,
      },
      {
        label: "Irréparable",
        value: "beyond",
        score: { refurbish: 0, salvage: 2, recycle: 4 },
        icon: <AlertCircle className="text-red-600 h-5 w-5" />,
      },
    ],
  },
  {
    id: "shifting",
    text: "Comment fonctionne le système de changement de vitesse ?",
    subtext: "Vérifiez les manettes, les dérailleurs et la performance du changement de vitesse.",
    options: [
      {
        label: "Excellent",
        value: "excellent",
        score: { refurbish: 7, salvage: 0, recycle: 0 },
        icon: <CheckCircle2 className="text-green-500 h-5 w-5" />,
      },
      {
        label: "Bon",
        value: "good",
        score: { refurbish: 5, salvage: 0, recycle: 0 },
        icon: <CheckCircle2 className="text-green-400 h-5 w-5" />,
      },
      {
        label: "Moyen",
        value: "fair",
        score: { refurbish: 3, salvage: 2, recycle: 0 },
        icon: <AlertCircle className="text-amber-400 h-5 w-5" />,
      },
      {
        label: "Mauvais",
        value: "poor",
        score: { refurbish: 1, salvage: 4, recycle: 0 },
        icon: <AlertCircle className="text-red-400 h-5 w-5" />,
      },
      {
        label: "Irréparable",
        value: "beyond",
        score: { refurbish: 0, salvage: 1, recycle: 4 },
        icon: <AlertCircle className="text-red-600 h-5 w-5" />,
      },
    ],
  },
  {
    id: "accessories",
    text: "Quel est l'état des accessoires et autres composants ?",
    subtext: "Selle, guidon, pédales, etc.",
    options: [
      {
        label: "Excellent",
        value: "excellent",
        score: { refurbish: 5, salvage: 0, recycle: 0 },
        icon: <CheckCircle2 className="text-green-500 h-5 w-5" />,
      },
      {
        label: "Bon",
        value: "good",
        score: { refurbish: 4, salvage: 0, recycle: 0 },
        icon: <CheckCircle2 className="text-green-400 h-5 w-5" />,
      },
      {
        label: "Moyen",
        value: "fair",
        score: { refurbish: 2, salvage: 1, recycle: 0 },
        icon: <AlertCircle className="text-amber-400 h-5 w-5" />,
      },
      {
        label: "Mauvais",
        value: "poor",
        score: { refurbish: 0, salvage: 3, recycle: 0 },
        icon: <AlertCircle className="text-red-400 h-5 w-5" />,
      },
      {
        label: "Irréparable",
        value: "beyond",
        score: { refurbish: 0, salvage: 1, recycle: 3 },
        icon: <AlertCircle className="text-red-600 h-5 w-5" />,
      },
    ],
  },
  {
    id: "condition",
    text: "Quel est l'état cosmétique général ?",
    subtext: "Considérez la peinture, les décalcomanies et l'apparence générale.",
    options: [
      {
        label: "Excellent",
        value: "excellent",
        score: { refurbish: 6, salvage: 0, recycle: 0 },
        icon: <CheckCircle2 className="text-green-500 h-5 w-5" />,
      },
      {
        label: "Bon",
        value: "good",
        score: { refurbish: 4, salvage: 0, recycle: 0 },
        icon: <CheckCircle2 className="text-green-400 h-5 w-5" />,
      },
      {
        label: "Moyen",
        value: "fair",
        score: { refurbish: 2, salvage: 1, recycle: 0 },
        icon: <AlertCircle className="text-amber-400 h-5 w-5" />,
      },
      {
        label: "Mauvais",
        value: "poor",
        score: { refurbish: 1, salvage: 2, recycle: 0 },
        icon: <AlertCircle className="text-red-400 h-5 w-5" />,
      },
      {
        label: "Irréparable",
        value: "beyond",
        score: { refurbish: 0, salvage: 0, recycle: 3 },
        icon: <AlertCircle className="text-red-600 h-5 w-5" />,
      },
    ],
  },
];

export function DiagnosticForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<DiagnosticCriteria>({
    refurbish: 0,
    salvage: 0,
    recycle: 0,
  });
  const [showResults, setShowResults] = useState(false);
  const totalQuestions = diagnosticQuestions.length;

  const handleOptionSelect = (questionId: string, option: QuestionOption) => {
    const newAnswers = { ...answers, [questionId]: option.value };
    setAnswers(newAnswers);

    const newScores = { ...scores };
    newScores.refurbish += option.score.refurbish;
    newScores.salvage += option.score.salvage;
    newScores.recycle += option.score.recycle;
    setScores(newScores);

    // Auto advance after selection
    if (currentStep < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 400);
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 400);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      // Subtract the scores from the previous answer
      const prevQuestion = diagnosticQuestions[currentStep - 1];
      const prevAnswer = answers[prevQuestion.id];
      
      if (prevAnswer) {
        const prevOption = prevQuestion.options.find(
          (opt) => opt.value === prevAnswer
        );
        
        if (prevOption) {
          const newScores = { ...scores };
          newScores.refurbish -= prevOption.score.refurbish;
          newScores.salvage -= prevOption.score.salvage;
          newScores.recycle -= prevOption.score.recycle;
          setScores(newScores);
        }
        
        // Remove the answer
        const newAnswers = { ...answers };
        delete newAnswers[prevQuestion.id];
        setAnswers(newAnswers);
      }
      
      setCurrentStep(currentStep - 1);
    }
  };

  const resetDiagnostic = () => {
    setCurrentStep(0);
    setAnswers({});
    setScores({
      refurbish: 0,
      salvage: 0,
      recycle: 0,
    });
    setShowResults(false);
  };

  const getRecommendation = () => {
    const maxScore = Math.max(
      scores.refurbish,
      scores.salvage,
      scores.recycle
    );

    if (maxScore === scores.refurbish) {
      return {
        type: "refurbish",
        title: "Remettre à Neuf",
        description:
          "Ce vélo est en assez bon état pour être remis à neuf et revendu. Il peut nécessiter quelques réparations, mais dans l'ensemble, il vaut la peine d'être restauré.",
        icon: <RefreshCw className="h-8 w-8 text-green-500" />,
        color: "bg-green-100 text-green-800 border-green-200",
      };
    } else if (maxScore === scores.salvage) {
      return {
        type: "salvage",
        title: "Récupérer les Pièces",
        description:
          "Bien que ce vélo ne vaille peut-être pas la peine d'être remis à neuf dans son ensemble, beaucoup de ses pièces sont encore en bon état et peuvent être récupérées pour être réutilisées.",
        icon: <Wrench className="h-8 w-8 text-amber-500" />,
        color: "bg-amber-100 text-amber-800 border-amber-200",
      };
    } else {
      return {
        type: "recycle",
        title: "Recycler",
        description:
          "Ce vélo est au-delà d'une réparation économique et les pièces ne sont pas en assez bon état pour être récupérées. Il devrait être envoyé pour un recyclage approprié.",
        icon: <RotateCcw className="h-8 w-8 text-blue-500" />,
        color: "bg-blue-100 text-blue-800 border-blue-200",
      };
    }
  };

  const currentQuestion = diagnosticQuestions[currentStep];
  const recommendation = getRecommendation();

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
              currentStep={currentStep + 1}
              totalSteps={totalQuestions}
              className="mb-8"
            />

            <Card className="diagnostic-card">
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

                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        handleOptionSelect(currentQuestion.id, option)
                      }
                      className={cn(
                        "w-full text-left p-4 rounded-xl border transition-all duration-200 diagnostic-button",
                        answers[currentQuestion.id] === option.value
                          ? "bg-primary/10 border-primary"
                          : "bg-card hover:bg-secondary/50 border-border"
                      )}
                    >
                      <div className="flex items-center">
                        <div className="mr-3">{option.icon}</div>
                        <span className="font-medium">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={goToPreviousStep}
                disabled={currentStep === 0}
                className="diagnostic-button"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Précédent
              </Button>
            </div>
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
              <h1 className="text-3xl font-bold mb-2">Résultats du Diagnostic</h1>
              <p className="text-muted-foreground">
                Selon votre évaluation, voici notre recommandation:
              </p>
            </div>

            <Card
              className={cn(
                "diagnostic-card border-2",
                recommendation.color
              )}
            >
              <div className="text-center space-y-6">
                <div className="mx-auto w-16 h-16 rounded-full bg-white flex items-center justify-center border">
                  {recommendation.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    {recommendation.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {recommendation.description}
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <div className="text-xl font-semibold text-green-600">
                  {Math.round((scores.refurbish / 50) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Remettre à Neuf</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-xl font-semibold text-amber-600">
                  {Math.round((scores.salvage / 25) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Récupérer</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-xl font-semibold text-blue-600">
                  {Math.round((scores.recycle / 37) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Recycler</div>
              </Card>
            </div>

            <Button
              onClick={resetDiagnostic}
              className="w-full diagnostic-button"
            >
              <Bike className="mr-2 h-5 w-5" />
              Commencer une Nouvelle Évaluation
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
