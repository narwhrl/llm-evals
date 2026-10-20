import { DEFECTS, LINES, stageFor, type Line } from "./content";

export interface ProofState {
  /** How many times each line has been marked. */
  marks: Record<string, number>;
  /** The lines the visitor found in blind proof mode. */
  found: string[];
  /** Blind proof mode: the sheet dims and the pencil checks for misprints. */
  blind: boolean;
  /** The press has run. */
  pressed: boolean;
  /** The line the keyboard caret is on. */
  caret: number;
  /** The lines the visitor marked, in the order it happened. */
  trail: string[];
}

export type Action =
  | { type: "mark"; id: string }
  | { type: "find"; id: string }
  | { type: "miss"; id: string }
  | { type: "blind"; on: boolean }
  | { type: "press" }
  | { type: "unpress" }
  | { type: "reset" }
  | { type: "caret"; index: number };

export const initialState: ProofState = {
  marks: {},
  found: [],
  blind: false,
  pressed: false,
  caret: 0,
  trail: [],
};

const DEFECT_LINES = new Set(DEFECTS.map((defect) => defect.lineId));

function nextCaret(current: number, delta: number): number {
  const next = current + delta;
  if (next < 0) return 0;
  if (next > LINES.length - 1) return LINES.length - 1;
  return next;
}

export function reducer(state: ProofState, action: Action): ProofState {
  switch (action.type) {
    case "mark": {
      const count = (state.marks[action.id] ?? 0) + 1;
      return {
        ...state,
        marks: { ...state.marks, [action.id]: count },
        trail: [...state.trail, action.id],
        caret: Math.max(state.caret, LINES.findIndex((line) => line.id === action.id)),
      };
    }
    case "find":
      return state.found.includes(action.id)
        ? state
        : { ...state, found: [...state.found, action.id] };
    case "miss":
      return state;
    case "blind":
      return { ...state, blind: action.on };
    case "press":
      return { ...state, pressed: true, blind: false };
    case "unpress":
      return { ...state, pressed: false };
    case "reset":
      return { ...initialState };
    case "caret":
      return { ...state, caret: nextCaret(state.caret, action.index) };
  }
}

export function markCount(state: ProofState): number {
  return LINES.reduce((sum, line) => sum + (state.marks[line.id] ?? 0), 0);
}

export function lineById(id: string): Line | undefined {
  return LINES.find((line) => line.id === id);
}

export function isDefect(id: string): boolean {
  return DEFECT_LINES.has(id);
}

export { stageFor };
