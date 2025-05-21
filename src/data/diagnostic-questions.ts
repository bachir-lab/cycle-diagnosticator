
import { DiagnosticQuestion } from "@/types/diagnostic";

export const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: "seatpost_stuck",
    text: "TIGE DE SELLE BLOQUÉE DANS LE CADRE?",
    subtext: "Est-ce que la tige de selle est coincée et ne peut pas être retirée du cadre?",
    type: "binary",
    component: "seatpost",
    nextStep: {
      yes: "dismantle",
      no: "continue"
    }
  },
  {
    id: "stem_stuck",
    text: "POTENCE BLOQUÉE DANS LE PIVOT DE FOURCHE?",
    subtext: "Est-ce que la potence est coincée et ne peut pas être ajustée ou retirée?",
    type: "binary",
    component: "stem",
    nextStep: {
      yes: "dismantle",
      no: "continue"
    }
  },
  {
    id: "fork_damaged",
    text: "FOURCHE TORDUE, ABIMÉE, DÉFECTUEUSE?",
    subtext: "La fourche présente-t-elle des signes de torsion, de dommages ou de défauts?",
    type: "binary",
    component: "fork",
    nextStep: {
      yes: "dismantle",
      no: "continue"
    }
  },
  {
    id: "frame_damaged",
    text: "CADRE FISSURÉ OU ROUILLÉ?",
    subtext: "Le cadre présente-t-il des fissures ou une rouille importante?",
    type: "binary",
    component: "frame",
    nextStep: {
      yes: "dismantle",
      no: "continue"
    }
  },
  {
    id: "cotter_pins",
    text: "CLAVETTES?",
    subtext: "Le pédalier utilise-t-il des clavettes (système de fixation ancien)?",
    type: "binary",
    component: "crankset",
    nextStep: {
      yes: "dismantle",
      no: "continue"
    }
  },
  {
    id: "traditional_brakes",
    text: "ÉTRIERS À TIRAGE CENTRAL OU LATÉRAL TRADITIONNEL POUR FREINAGE SUR JANTE ACIER?",
    subtext: "Les freins sont-ils d'un modèle ancien (tirage central ou latéral) conçus pour des jantes en acier?",
    type: "binary",
    component: "brake",
    nextStep: {
      yes: "dismantle",
      no: "keep"
    }
  }
];
