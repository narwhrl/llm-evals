// 两层状态：离散状态（驱动 React 章节重渲染）与读数（10Hz 推一次）。
// 帧循环里不碰 React，读数与离散状态各走各的订阅。

import { useSyncExternalStore } from "react";

const stateListeners = new Set();
const readoutListeners = new Set();

let state = {
  phase: "aperture",
  paragraph: 0,
  choice: null,
  marks: [],
  withdrawn: null,
  collapsed: false,
  hintSeen: false,
  canvasFailed: false,
  announce: "",
  announceId: 0,
};

let readout = {
  separation: 0,
  distance: 900,
  wavelength: 6.1,
  visibility: 0.32,
  fringes: 0,
  fps: 0,
  band: "并拢",
  rig: "单缝",
  marks: 0,
  demoed: false,
  seconds: 0,
  best: 0,
  developed: 0,
  blackouts: 0,
  adjustments: 0,
};

export function getState() {
  return state;
}

export function getReadout() {
  return readout;
}

function publishState(patch) {
  state = { ...state, ...patch };
  for (const listener of stateListeners) listener();
}

function publishReadout(patch) {
  readout = { ...readout, ...patch };
  for (const listener of readoutListeners) listener();
}

function subscribeTo(set) {
  return (listener) => {
    set.add(listener);
    return () => set.delete(listener);
  };
}

export const subscribeState = subscribeTo(stateListeners);
export const subscribeReadout = subscribeTo(readoutListeners);

export function useAppState() {
  return useSyncExternalStore(subscribeState, getState, getState);
}

export function useReadout() {
  return useSyncExternalStore(subscribeReadout, getReadout, getReadout);
}

export const setPhase = (phase) => publishState({ phase });
export const setParagraph = (paragraph) => publishState({ paragraph });
export const setChoice = (choice) => publishState({ choice });
export const setHintSeen = () => publishState({ hintSeen: true });
export const setCollapsed = (collapsed) => publishState({ collapsed });
export const setCanvasFailed = (canvasFailed) => publishState({ canvasFailed });
export const setWithdrawn = (withdrawn) => publishState({ withdrawn });

export function setMarks(marks) {
  publishState({ marks: marks.slice() });
}

/** 屏幕阅读器播报：只播离散事件，绝不播 10Hz 的读数。 */
export function announce(message) {
  publishState({ announce: message, announceId: state.announceId + 1 });
}

export function pushReadout(patch) {
  publishReadout(patch);
}

export function resetStore() {
  publishState({
    phase: "aperture",
    paragraph: 0,
    choice: null,
    marks: [],
    withdrawn: null,
    collapsed: false,
    hintSeen: false,
  });
}
