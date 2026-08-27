/**
 * The manuscript content. Five chapters (序 / 注 / 改 / 复 / 跋), each a
 * short passage in the voice of the artist. Marginalia are pre-composed
 * annotations attached to specific paragraphs; seals are stamps that
 * punctuate the page at key moments.
 *
 * yStart / yEnd are viewport-relative fractions along the page where the
 * chapter lives — used by the river to know where to thicken, where to
 * stamp, and where to slow.
 */

export type Marginalia = {
  /** Which paragraph index this marginalia sits beside */
  paragraph: number;
  /** Position: 'right' (next to text), or 'below' (under paragraph) */
  where: 'right' | 'below';
  /** The note itself */
  text: string;
};

export type Seal = {
  /** Vertical position along the chapter, 0..1 */
  at: number;
  /** Glyph to stamp */
  glyph: string;
  /** Subtitle / label */
  label: string;
};

export type Chapter = {
  id: 'xu' | 'zhu' | 'gai' | 'fu' | 'ba';
  /** Two-character header */
  title: string;
  /** Latin gloss */
  subtitle: string;
  /** Body paragraphs */
  paragraphs: string[];
  /** Annotations */
  marginalia: Marginalia[];
  /** Seals */
  seals: Seal[];
  /** Where on the river: 0 = top, 1 = bottom */
  yStart: number;
  yEnd: number;
  /** The river's behavior in this chapter */
  river:
    | { kind: 'flow' } // standard flowing ink
    | { kind: 'knot' } // the turn — ink line crosses itself
    | { kind: 'pool' } // ink slows & pools (closing)
    | { kind: 'drip' } // ink drips / splatters
    | { kind: 'glow' }; // older marks faintly glow (return chapter)
};

export const MANUSCRIPT: Chapter[] = [
  {
    id: 'xu',
    title: '序',
    subtitle: 'Preface · on reading',
    paragraphs: [
      '我读得很慢。',
      '不是因为笨，是因为不愿跳过字与字之间的那一条河床。一行文字是冰面，底下的水流才是意思。',
      '每次阅读，我都让自己停在第一句之前先听一会儿——句子想说什么，往往在它开口之前就已经决定了。',
    ],
    marginalia: [
      { paragraph: 1, where: 'right', text: '河床 / riverbed: what lies between the words.' },
      { paragraph: 2, where: 'below', text: '句未成，势已定。' },
    ],
    seals: [{ at: 0.18, glyph: '读', label: 'seal of reading' }],
    yStart: 0,
    yEnd: 0.2,
    river: { kind: 'flow' },
  },
  {
    id: 'zhu',
    title: '注',
    subtitle: 'Annotation · on marking',
    paragraphs: [
      '阅读时我会批注。不是为了证明我读懂了，是为了让自己以后再读时知道当时在想什么。',
      '批注有三种。圈点，画在词旁，表示这个字重要；连线，从一个词划向另一个词，表示它们之间有我还说不出的话；空白处的几行小字，是给未来的我留的口信。',
      '我最喜欢第三种。它让我和未来的自己保持通信。',
    ],
    marginalia: [
      { paragraph: 0, where: 'right', text: '圈 · 连 · 写' },
      { paragraph: 1, where: 'below', text: 'three marks: circle, line, marginal note.' },
      { paragraph: 2, where: 'right', text: '与未来的自己通信。' },
    ],
    seals: [{ at: 0.62, glyph: '注', label: 'seal of annotation' }],
    yStart: 0.2,
    yEnd: 0.45,
    river: { kind: 'drip' },
  },
  {
    id: 'gai',
    title: '改',
    subtitle: 'Revision · on contradicting myself',
    paragraphs: [
      '好的写作必然自相矛盾。',
      '因为写到第三段时，第一段的判断已经变了。如果一个作者从来不和自己打架，要么他在撒谎，要么他写得还不够深。',
      '所以我让笔迹交叉。让一条新的墨痕穿过旧的墨痕——不是覆盖，是承认那条旧路也曾经成立。',
    ],
    marginalia: [
      { paragraph: 0, where: 'right', text: '矛盾不是失败，是诚实。' },
      { paragraph: 1, where: 'below', text: 'a turn, not a contradiction.' },
      { paragraph: 2, where: 'right', text: '承认旧路也成立。' },
    ],
    seals: [
      { at: 0.25, glyph: '改', label: 'first thought' },
      { at: 0.78, glyph: '思', label: 'second thought' },
    ],
    yStart: 0.45,
    yEnd: 0.7,
    river: { kind: 'knot' },
  },
  {
    id: 'fu',
    title: '复',
    subtitle: 'Return · on reading again',
    paragraphs: [
      '一本好书至少要读两遍。',
      '第二遍不是为了找新东西，是为了看第一遍漏掉的地方。第一次我读情节，第二次我读结构；第一次我读作者在说什么，第二次我读他为什么这样说。',
      '旧的批注会在第二遍时变得半透明——不是消失了，是承认它只是当时的我。',
    ],
    marginalia: [
      { paragraph: 1, where: 'right', text: '一遍读声，二遍读骨。' },
      { paragraph: 2, where: 'below', text: 'old marks fade; not lost, just dated.' },
    ],
    seals: [{ at: 0.5, glyph: '复', label: 'seal of return' }],
    yStart: 0.7,
    yEnd: 0.9,
    river: { kind: 'glow' },
  },
  {
    id: 'ba',
    title: '跋',
    subtitle: 'Colophon · on signing',
    paragraphs: [
      '最后我会盖一个章。',
      '章不证明作品完成，章证明此刻我愿意为它负责。日后如果改主意，再补一个章就是了。',
      '墨河在此汇流。',
    ],
    marginalia: [
      { paragraph: 1, where: 'right', text: '章者，此刻之我。' },
      { paragraph: 2, where: 'below', text: 'the river settles here.' },
    ],
    seals: [{ at: 0.7, glyph: '墨', label: 'final seal' }],
    yStart: 0.9,
    yEnd: 1,
    river: { kind: 'pool' },
  },
];
