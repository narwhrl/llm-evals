// 工作室状态：修订计数、定稿台账、修补选择、钤印。
// 装置以批量节流方式写入，React 经 useSyncExternalStore 订阅，避免渲染风暴。

import { useSyncExternalStore } from 'react'

let snapshot = {
  revision: 0,
  settled: [], // [{key, ch}] —— 读光定稿台账（按首次定稿顺序）
  patch: null, // 'a' | 'b' | 'c' | null（最新选择）
  patchLog: [], // 全部尝试顺序
  sealed: false,
  sealRevision: null,
}
const listeners = new Set()
let flushTimer = null

function flush() {
  flushTimer = null
  snapshot = {
    ...snapshot,
    settled: snapshot.settled.slice(),
    patchLog: snapshot.patchLog.slice(),
  }
  listeners.forEach((l) => l())
}

function schedule() {
  if (flushTimer == null) flushTimer = setTimeout(flush, 400)
}

export const studio = {
  subscribe(l) {
    listeners.add(l)
    return () => listeners.delete(l)
  },
  get: () => snapshot,
  addRevision(n) {
    snapshot.revision += n
    schedule()
  },
  recordSettle(key, ch) {
    if (snapshot.settled.some((s) => s.key === key)) return
    snapshot.settled = [...snapshot.settled, { key, ch }]
    schedule()
  },
  choosePatch(id) {
    snapshot.patch = id
    snapshot.patchLog = [...snapshot.patchLog, id]
    schedule()
  },
  seal() {
    if (snapshot.sealed) return
    snapshot = { ...snapshot, sealed: true, sealRevision: snapshot.revision }
    flush()
  },
}

export function useStudio() {
  return useSyncExternalStore(studio.subscribe, studio.get, studio.get)
}
