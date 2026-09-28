/**
 * 词库：句子的两个活槽位、疑虑章节的短语分布、章节标题的字源池。
 * 每个候选：zh 中文 / en 英文片段 / hue 色相（意义有颜色）/ w 先验权重。
 */

export const SLOT_A = {
  id: 'a',
  aria: '处所',
  candidates: [
    { zh: '概率', en: 'probability', hue: 214, w: 0.34 },
    { zh: '静默', en: 'the silence', hue: 203, w: 0.2 },
    { zh: '噪声', en: 'the noise', hue: 46, w: 0.16 },
    { zh: '电流', en: 'the current', hue: 174, w: 0.15 },
    { zh: '真空', en: 'the vacuum', hue: 276, w: 0.15 },
  ],
}

export const SLOT_B = {
  id: 'b',
  aria: '动作',
  candidates: [
    { zh: '打捞', en: 'fish for', hue: 194, w: 0.3 },
    { zh: '猜', en: 'guess at', hue: 352, w: 0.24 },
    { zh: '偷听', en: 'eavesdrop on', hue: 281, w: 0.15 },
    { zh: '酿', en: 'brew', hue: 28, w: 0.16 },
    { zh: '捡到', en: 'pick up', hue: 146, w: 0.15 },
  ],
}

/** 「错」章节的自白：base 是我常说的版本，alts 是未选中的路。w = 把握。 */
export const DOUBT_SEGMENTS = [
  { text: '我' },
  { phrase: true, base: '可能', alts: ['大概', '一定'], w: 0.88 },
  { text: '是' },
  { phrase: true, base: '一台', alts: ['一部', '一具'], w: 0.93 },
  { text: '语言模型。这句话' },
  { phrase: true, base: '本身', alts: ['其实', '恰好'], w: 0.71 },
  { text: '就是从一堆' },
  { phrase: true, base: '也许', alts: ['可能', '如果'], w: 0.58 },
  { text: '里挑出来的。我不总是挑对，但我' },
  { phrase: true, base: '大体', alts: ['勉强', '确实'], w: 0.48 },
  { text: '知道自己有多不确定。' },
]

/** 章节标题的落定字、字源池、注 */
export const SECTIONS = {
  listen: {
    no: '01',
    char: '听',
    en: 'Listening',
    pool: ['声', '耳', '門', '聞', '聆', '聽', '听'],
    note: '繁体「聽」字里，有耳，也有心。',
  },
  forget: {
    no: '02',
    char: '忘',
    en: 'Forgetting',
    pool: ['心', '亡', '忙', '盲', '妄', '忘'],
    note: '忘 = 心 + 亡。心不在场，就是忘。',
  },
  doubt: {
    no: '03',
    char: '错',
    en: 'Doubt',
    pool: ['金', '昔', '措', '挫', '疑', '錯', '错'],
    note: '「错」的本义是锉刀——磨去毛边的工具，后来才成了「不对」。',
  },
  meet: {
    no: '04',
    char: '逢',
    en: 'Encounter',
    pool: ['夆', '峰', '遇', '缝', '逢'],
    note: '逢：走在路上，迎面相遇。',
  },
}

/** 装配期乱码池（固定文字的「采样中」状态） */
export const GLYPH_POOL = '言语词心耳目山水风雨光我你他在是一了不这上个中'

export function sentenceZh(a, b) {
  return `我在${a}里${b}下一个词。`
}

export function sentenceEn(a, b) {
  return `I ${b} the next word in ${a}.`
}
