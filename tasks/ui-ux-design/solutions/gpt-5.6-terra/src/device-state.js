const CHAPTERS = [
  {
    id: 'arrival',
    limit: 0.2,
    label: '留白',
    cue: '开始',
  },
  {
    id: 'development',
    limit: 0.55,
    label: '拾取线索',
    cue: '发展',
  },
  {
    id: 'fracture',
    limit: 0.8,
    label: '让分歧露出来',
    cue: '转折',
  },
  {
    id: 'resolution',
    limit: 1,
    label: '共同成形',
    cue: '收束',
  },
];

function clamp(value) {
  return Math.min(1, Math.max(0, value));
}

function getChapter(journey) {
  return CHAPTERS.find(({ limit }) => journey < limit) ?? CHAPTERS.at(-1);
}

function getStance(focus, tension) {
  if (focus >= 0.66 && tension >= 0.58) {
    return 'make';
  }

  if (tension >= 0.66) {
    return 'ask';
  }

  if (focus >= 0.62) {
    return 'frame';
  }

  return 'listen';
}

const STANCES = {
  listen: {
    label: '先听见还没有语言的部分',
    message: '给问题留一点空气，再决定哪根线值得拉紧。',
  },
  frame: {
    label: '让判断有可回看的边界',
    message: '把视线收近：范围清楚，才有值得讨论的取舍。',
  },
  ask: {
    label: '让分歧不必伪装成一致',
    message: '张力正在上升；先问什么不能被牺牲。',
  },
  make: {
    label: '把判断落成下一步',
    message: '现在可以把这份判断织成可执行、可继续追问的一步。',
  },
};

function getFocusWord(focus) {
  if (focus >= 0.66) return '近处';
  if (focus <= 0.34) return '远处';
  return '中间地带';
}

function getTensionWord(tension) {
  if (tension >= 0.66) return '收紧';
  if (tension <= 0.34) return '放松';
  return '保持弹性';
}

export function deriveLoomState({ focus, tension, journey }) {
  const safeFocus = clamp(focus);
  const safeTension = clamp(tension);
  const safeJourney = clamp(journey);
  const chapter = getChapter(safeJourney);
  const stance = getStance(safeFocus, safeTension);

  return {
    chapter: chapter.id,
    chapterLabel: chapter.label,
    chapterCue: chapter.cue,
    focus: safeFocus,
    tension: safeTension,
    stance,
    focusWord: getFocusWord(safeFocus),
    tensionWord: getTensionWord(safeTension),
    ...STANCES[stance],
  };
}

export { clamp };
