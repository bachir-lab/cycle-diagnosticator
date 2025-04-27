
import { DiagnosticQuestion } from "@/types/diagnostic";

export const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: "seat_stuck",
    text: "Le siège est-il coincé dans le cadre ?",
    subtext: "Vérifiez si la tige de selle peut être ajustée ou retirée normalement.",
    type: "binary",
    nextStep: {
      yes: "dismantle",
      no: "continue"
    }
  },
  {
    id: "pre_1980",
    text: "Le vélo a-t-il été fabriqué avant 1980 ?",
    subtext: "Si oui, vérifiez si la jante est en aluminium et si le moyeu est carré.",
    type: "binary",
    nextStep: {
      yes: "wheel_check",
      no: "continue"
    }
  },
  {
    id: "wheel_check",
    text: "La jante est-elle en aluminium et le moyeu est-il carré ?",
    subtext: "Cette vérification est importante pour les vélos d'avant 1980.",
    type: "binary",
    nextStep: {
      yes: "continue",
      no: "dismantle"
    }
  },
  {
    id: "frame_damage",
    text: "Le cadre est-il fissuré ou rouillé ?",
    subtext: "Examinez attentivement le cadre pour détecter des dommages structurels.",
    type: "binary",
    nextStep: {
      yes: "dismantle",
      no: "continue"
    }
  },
  {
    id: "drum_brakes",
    text: "Le vélo a-t-il des freins à tambour ?",
    subtext: "Les freins à tambour sont un système de freinage plus ancien.",
    type: "binary",
    nextStep: {
      yes: "dismantle",
      no: "continue"
    }
  },
  {
    id: "caliper_brakes",
    text: "Le vélo a-t-il d'anciens freins à étrier central ?",
    type: "binary",
    nextStep: {
      yes: "dismantle",
      no: "continue"
    }
  },
  {
    id: "fork_issues",
    text: "La fourche est-elle coincée dans le cadre ou tordue ?",
    subtext: "Vérifiez la mobilité et l'alignement de la fourche.",
    type: "binary",
    nextStep: {
      yes: "dismantle",
      no: "continue"
    }
  },
  {
    id: "major_play",
    text: "Le vélo présente-t-il des jeux importants ou des problèmes de friction nécessitant plus de 5 minutes de réparation ?",
    type: "binary",
    nextStep: {
      yes: "dismantle",
      no: "continue"
    }
  },
  {
    id: "pedal_issues",
    text: "Les pédales présentent-elles du jeu ou de la rouille ?",
    type: "binary",
    nextStep: {
      yes: "dismantle",
      no: "continue_derailleur"
    }
  },
  {
    id: "derailleur_adjustment",
    text: "Le dérailleur nécessite-t-il un réglage (environ 10 minutes de travail) ?",
    type: "binary",
    nextStep: {
      yes: "check_possible",
      no: "check_rust"
    }
  },
  {
    id: "derailleur_rust",
    text: "Y a-t-il de la rouille sur le dérailleur ?",
    type: "binary",
    nextStep: {
      yes: "dismantle",
      no: "additional_checks"
    }
  },
  {
    id: "additional_checks",
    text: "Vérifications supplémentaires",
    type: "check",
    subtext: "Cochez les éléments qui nécessitent une attention particulière :",
  }
];

export const additionalChecks = [
  {
    id: "cables",
    text: "Rouille, gaine endommagée, câbles effilochés ou coulissant mal",
    timeEstimate: 15,
    details: "Remplacement nécessaire (+15 minutes par câble et gaine)"
  },
  {
    id: "chain",
    text: "Maillons de chaîne endommagés ou mal espacés",
    timeEstimate: 10,
    details: "Remplacement nécessaire (+10 minutes)"
  },
  {
    id: "wheel_rim",
    text: "Jante rainurée par le freinage ou rouillée",
    timeEstimate: 15,
    details: "Remplacement nécessaire (+15 minutes par roue)"
  },
  {
    id: "chainring",
    text: "Dents du plateau usées (pointues) ou rouillées",
    timeEstimate: 10,
    details: "Remplacement nécessaire (+10 minutes)"
  },
  {
    id: "derailleur_damage",
    text: "Dérailleur tordu, galet endommagé, ou fourche usée/tordue",
    timeEstimate: 30,
    details: "Remplacement nécessaire (+30 minutes pour le dérailleur)"
  },
  {
    id: "crank_arms",
    text: "Manivelles tordues, desserrées ou rouillées",
    timeEstimate: 5,
    details: "Remplacement nécessaire (+5 minutes)"
  }
];
