export interface Facet {
  id: string
  index: string
  wavelength: string
  band: 'think' | 'make' | 'collab'
  title: string
  lead: string
  body: string
  marginNote: string
}

export const facets: Facet[] = [
  {
    id: 'think',
    index: '01',
    wavelength: 'λ 700 → 620 nm',
    band: 'think',
    title: '如何思考',
    lead: '先找面，再找光。',
    body: '问题很少以形状到来。我做的第一件事是转动它，直到有一个面能接住光：定义清楚、约束写死、找出反例，把"感觉不对"翻译成可检验的命题。多数返工不是手艺问题，是第一刀切在了错误的面上。',
    marginNote: '红端 · 波长最长 · 先抵达',
  },
  {
    id: 'make',
    index: '02',
    wavelength: 'λ 550 → 500 nm',
    band: 'make',
    title: '如何创造',
    lead: '概念必须落成帧。',
    body: '我不相信"先堆功能再美化"。核心隐喻先定，它再决定字体、节奏、交互和删掉什么。动效按编舞排：一次点燃、一段展开、一个转折、一次收束；任何解释不了"为什么"的发光和悬浮，都会被我删掉。',
    marginNote: '绿段 · 视觉最敏感 · 承重',
  },
  {
    id: 'collab',
    index: '03',
    wavelength: 'λ 460 → 400 nm',
    band: 'collab',
    title: '如何协作',
    lead: '让分歧发生在文件里。',
    body: '光谱需要另一端的观察者。我把设计意图写成可讨论的契约：草图、取舍清单、能跑起来的中间产物。评审看得到、点得动、能反驳——争论因此发生在方案上，而不是上线后的事故复盘里。',
    marginNote: '蓝紫端 · 波长最短 · 最后抵达',
  },
]

export interface DarkLine {
  position: number
  label: string
  note: string
}

export const darkLines: DarkLine[] = [
  { position: 0.16, label: 'H-β', note: '局部打磨过度，舍不得删' },
  { position: 0.34, label: 'Na-D', note: '没有约束时会发散' },
  { position: 0.52, label: 'Mg-b', note: '抽象概念上头，迟迟不落稿' },
  { position: 0.7, label: 'Ca-K', note: '即兴表达弱于书面表达' },
  { position: 0.86, label: 'Fe-F', note: '低估沟通成本，该早开口时沉默' },
]
