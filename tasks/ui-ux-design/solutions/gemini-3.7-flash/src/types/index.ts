export type PhaseId = 'genesis' | 'dialectic' | 'cocreation' | 'archive';

export interface TensionParameters {
  rigor: number;       // 0 - 1: Structural precision vs organic drift
  intuition: number;   // 0 - 1: Poetic resonance vs deterministic alignment
  constraint: number;  // 0 - 1: Geometric lattice tightness
  emergence: number;   // 0 - 1: Higher-order harmonic wave dispersion
}

export interface DialecticConcept {
  id: string;
  axisName: string;
  axisTitle: string;
  leftPole: string;
  rightPole: string;
  value: number; // 0 to 1
  description: string;
  manifesto: string;
  codeSnippet: string;
  iconName: string;
}

export interface CoCreationSeed {
  id: string;
  title: string;
  subtitle: string;
  category: 'architecture' | 'poetics' | 'symbiosis' | 'dialectic';
  harmonicFrequency: number;
  parameters: TensionParameters;
  description: string;
  crystallizedQuote: string;
}

export interface SequenceStage {
  step: number;
  name: string;
  title: string;
  description: string;
  durationMs: number;
}
