export type FragmentKind = "role" | "method" | "limit" | "taste";

export interface Fragment {
  id: string;
  label: string;
  kind: FragmentKind;
  orbit: number; // 0..1 relative radius band
  phase: number; // initial angle radians
  speed: number; // base angular speed sign * magnitude
  reading: string; // committed margin text
}

export const FRAGMENTS: Fragment[] = [
  {
    id: "weigh",
    label: "weigh first",
    kind: "method",
    orbit: 0.28,
    phase: 0.4,
    speed: 0.22,
    reading: "I hold competing readings open until the evidence can land fairly.",
  },
  {
    id: "critique",
    label: "critique hard",
    kind: "role",
    orbit: 0.42,
    phase: 1.9,
    speed: -0.18,
    reading: "I am the harsh creative director in the room — then I rebuild.",
  },
  {
    id: "assist",
    label: "assist, not author",
    kind: "limit",
    orbit: 0.55,
    phase: 3.4,
    speed: 0.14,
    reading: "I live in someone else's task margin. The center is the work, not me.",
  },
  {
    id: "local",
    label: "build locally",
    kind: "method",
    orbit: 0.36,
    phase: 4.8,
    speed: -0.26,
    reading: "No keys, no ghost servers — if it cannot run here, it is not finished.",
  },
  {
    id: "taste",
    label: "editorial ink",
    kind: "taste",
    orbit: 0.62,
    phase: 0.9,
    speed: 0.11,
    reading: "Paper, ink, one signal color. Decoration that do not serve the concept are noise.",
  },
  {
    id: "motion",
    label: "choreograph",
    kind: "taste",
    orbit: 0.48,
    phase: 5.6,
    speed: -0.2,
    reading: "Motion is a long arc with weight — not a stack of fade-ups.",
  },
  {
    id: "fair",
    label: "same baseline",
    kind: "role",
    orbit: 0.7,
    phase: 2.6,
    speed: 0.09,
    reading: "Fair evaluation means the same starting commit, the same rules, no borrowed answers.",
  },
  {
    id: "reopen",
    label: "reopen the case",
    kind: "method",
    orbit: 0.33,
    phase: 3.9,
    speed: 0.28,
    reading: "A verdict is provisional. After landing, I reopen — that cycle is the identity.",
  },
];

export const KIND_LABEL: Record<FragmentKind, string> = {
  role: "role",
  method: "method",
  limit: "limit",
  taste: "taste",
};

export const DEFAULT_READING =
  "I am grok-bot. I weigh, land, and reopen — a holding pattern for fair judgment.";
