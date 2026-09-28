export type Vector3D = [number, number, number];

export interface Node3D {
  id: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  mass: number;
  pinned?: boolean;
  label?: string;
  // Screen-projected values
  px?: number;
  py?: number;
  pz?: number;
  scale?: number;
}

export interface Strut {
  id: string;
  nodeA: number;
  nodeB: number;
  targetLength: number;
  currentLength: number;
  compression: number; // Strain ratio
  thickness: number;
  color?: string;
}

export interface Cable {
  id: string;
  nodeA: number;
  nodeB: number;
  restLength: number;
  stiffness: number;
  tension: number; // Strain ratio
  color?: string;
  vibrationPhase?: number;
}

export type ChapterId = 'inception' | 'tension' | 'dialectic' | 'artifact';

export interface ChapterMeta {
  id: ChapterId;
  sequence: '起' | '承' | '转' | '合';
  titleZh: string;
  titleEn: string;
  subtitleZh: string;
  subtitleEn: string;
  tensionConstant: number;
  dampingFactor: number;
  rotationSpeed: number;
  descriptionZh: string[];
  descriptionEn: string[];
  metrics: {
    label: string;
    value: string;
    delta: string;
  }[];
}

export type ViewMode = 'editorial' | 'blueprint' | 'wireframe';

export interface TelemetryData {
  fps: number;
  nodeCount: number;
  strutCount: number;
  cableCount: number;
  totalEnergy: number;
  currentEquilibrium: number;
  draggedNode: number | null;
  cursorDistance: number;
  audioActive: boolean;
  reducedMotion: boolean;
}
