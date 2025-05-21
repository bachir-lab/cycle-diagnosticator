
export type DiagnosticQuestion = {
  id: string;
  text: string;
  subtext?: string;
  type: 'binary';
  component: 'seatpost' | 'stem' | 'fork' | 'frame' | 'crankset' | 'brake';
  nextStep?: {
    yes: 'dismantle' | 'continue' | string;
    no?: 'continue' | 'keep' | string;
  };
};

export type DiagnosticResult = {
  decision: 'keep' | 'dismantle';
  component?: 'seatpost' | 'stem' | 'fork' | 'frame' | 'crankset' | 'brake';
  reason?: string;
};
