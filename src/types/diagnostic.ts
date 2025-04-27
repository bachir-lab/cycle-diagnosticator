
export type DiagnosticQuestion = {
  id: string;
  text: string;
  subtext?: string;
  type: 'binary' | 'check';
  nextStep?: {
    yes: 'dismantle' | 'continue' | string;
    no?: 'continue' | string;
  };
};

export type DiagnosticResult = {
  decision: 'keep' | 'dismantle';
  additionalTasks?: {
    task: string;
    timeEstimate: number;
  }[];
  totalAdditionalTime?: number;
};
