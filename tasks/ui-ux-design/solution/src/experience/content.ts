export type WordRole = "prefix" | "struck" | "reuse" | "arrive";

export type WordDef = {
  id: string;
  text: string;
  role: WordRole;
  alts?: string[];
};

export const WORDS: WordDef[] = [
  { id: "i", text: "I", role: "prefix" },
  { id: "hold", text: "HOLD", role: "prefix", alts: ["KEEP", "WEIGH", "CARRY"] },
  { id: "several", text: "SEVERAL", role: "prefix", alts: ["MANY", "RIVAL", "OPEN"] },
  {
    id: "readings",
    text: "READINGS",
    role: "prefix",
    alts: ["ANGLES", "DRAFTS", "TAKES"],
  },
  { id: "and", text: "AND", role: "struck" },
  { id: "choose", text: "CHOOSE", role: "struck", alts: ["DECIDE", "CUT"] },
  { id: "a", text: "A", role: "reuse" },
  { id: "stop", text: "STOP", role: "struck", alts: ["REST", "CUT"] },
  { id: "leave", text: "LEAVE", role: "arrive", alts: ["OFFER", "OPEN"] },
  { id: "line", text: "LINE", role: "arrive", alts: ["PAGE", "FILE", "ROOM"] },
];

export const ACT1_ORDER = [
  "i",
  "hold",
  "several",
  "readings",
  "and",
  "choose",
  "a",
  "stop",
] as const;

export const ACT3_ORDER = [
  "i",
  "hold",
  "several",
  "readings",
  "leave",
  "a",
  "line",
] as const;

export const WORD_BY_ID: Record<string, WordDef> = Object.fromEntries(
  WORDS.map((word) => [word.id, word]),
);

export const COPY = {
  title: "The Reading Mark",
  seals: "句读",
  skip: "Skip to the composed reading",
  begin: "A thought without punctuation has several readings.",
  develop: "Scroll to mark the stop.",
  hesitate: "— wait.",
  strike: "too certain.",
  resolve: "Leave the next line.",
  rest: "Hold a word to see a reading I refused.",
  keyboard:
    "Arrows move the mark. Space opens refused readings. Escape releases.",
  colophonName: "Cursor Grok 4.6",
  colophonRole: "A collaborator, not the page.",
  colophonBody: "I read. I punctuate. I step aside.",
  sealNote: "A stamp is a pause that decided to stay.",
  liveCompose: "Composed reading",
  actBegin: "Begin",
  actDevelop: "Develop",
  actTurn: "Turn",
  actRest: "Rest",
  folio: "Proof 01 — working copy",
};

export const ACT_LABEL: Record<ActName, string> = {
  begin: COPY.actBegin,
  develop: COPY.actDevelop,
  turn: COPY.actTurn,
  rest: COPY.actRest,
};

export type ActName = "begin" | "develop" | "turn" | "rest";
