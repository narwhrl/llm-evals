const TOP = { x: 0.5, y: 0.08 };
const LEFT = { x: 0.08, y: 0.9 };
const RIGHT = { x: 0.92, y: 0.9 };

const WEIGHT_FLOOR = 0.04;
const DISTRIBUTABLE_WEIGHT = 1 - WEIGHT_FLOOR * 3;

export const DEFAULT_WEIGHTS = {
  clarity: 0.42,
  surprise: 0.26,
  care: 0.32,
};

export function weightsToPoint({ clarity, surprise, care }) {
  return {
    x: clarity * RIGHT.x + surprise * LEFT.x + care * TOP.x,
    y: clarity * RIGHT.y + surprise * LEFT.y + care * TOP.y,
  };
}

export function pointToWeights(x, y) {
  const denominator =
    (LEFT.y - RIGHT.y) * (TOP.x - RIGHT.x) +
    (RIGHT.x - LEFT.x) * (TOP.y - RIGHT.y);

  const care =
    ((LEFT.y - RIGHT.y) * (x - RIGHT.x) +
      (RIGHT.x - LEFT.x) * (y - RIGHT.y)) /
    denominator;
  const surprise =
    ((RIGHT.y - TOP.y) * (x - RIGHT.x) +
      (TOP.x - RIGHT.x) * (y - RIGHT.y)) /
    denominator;
  const clarity = 1 - care - surprise;

  const boundedClarity = Math.max(0, clarity);
  const boundedSurprise = Math.max(0, surprise);
  const boundedCare = Math.max(0, care);
  const total = boundedClarity + boundedSurprise + boundedCare || 1;

  return {
    clarity: WEIGHT_FLOOR + (boundedClarity / total) * DISTRIBUTABLE_WEIGHT,
    surprise: WEIGHT_FLOOR + (boundedSurprise / total) * DISTRIBUTABLE_WEIGHT,
    care: WEIGHT_FLOOR + (boundedCare / total) * DISTRIBUTABLE_WEIGHT,
  };
}

export function rebalanceWeight(weights, changedKey, nextValue) {
  const value = Math.max(WEIGHT_FLOOR, Math.min(1 - WEIGHT_FLOOR * 2, nextValue));
  const otherKeys = Object.keys(weights).filter((key) => key !== changedKey);
  const firstExcess = Math.max(0, weights[otherKeys[0]] - WEIGHT_FLOOR);
  const secondExcess = Math.max(0, weights[otherKeys[1]] - WEIGHT_FLOOR);
  const previousExcess = firstExcess + secondExcess;
  const availableExcess = 1 - value - WEIGHT_FLOOR * 2;
  const firstShare = previousExcess === 0 ? 0.5 : firstExcess / previousExcess;

  return {
    ...weights,
    [changedKey]: value,
    [otherKeys[0]]: WEIGHT_FLOOR + availableExcess * firstShare,
    [otherKeys[1]]: WEIGHT_FLOOR + availableExcess * (1 - firstShare),
  };
}

export function integerPercentages(weights) {
  const clarity = Math.round(weights.clarity * 100);
  const surprise = Math.round(weights.surprise * 100);

  return {
    clarity,
    surprise,
    care: 100 - clarity - surprise,
  };
}

export function dominantVoice(weights) {
  const spread = Math.max(weights.clarity, weights.surprise, weights.care) -
    Math.min(weights.clarity, weights.surprise, weights.care);

  if (spread < 0.11) {
    return {
      key: 'balance',
      zh: '让清晰容得下偏航，也容得下人。',
      en: 'A clear thought can still make room for wonder—and for you.',
    };
  }
  if (weights.clarity >= weights.surprise && weights.clarity >= weights.care) {
    return {
      key: 'clarity',
      zh: '先让决定可以被看见。',
      en: 'Make the decision legible before making it loud.',
    };
  }
  if (weights.surprise >= weights.care) {
    return {
      key: 'surprise',
      zh: '保留那一次有理由的偏航。',
      en: 'Keep the deviation that changes the reading.',
    };
  }
  return {
    key: 'care',
    zh: '把接收者留在每一个句子里。',
    en: 'Leave room for the person on the other side.',
  };
}
