/**
 * The copy of the galley.
 *
 * The sheet is a self description written in the first person, deliberately
 * left in a pre proof state: sixteen propositions about how a language model
 * works, each with alternative wordings the editor has not yet chosen between.
 * The visitor holds the red pencil, so the choice of wording is the choice of
 * what the piece claims to be.
 *
 * Three lines carry a misprint. They are visible on the sheet at all times,
 * because that is what a proof sheet looks like; the blind proof mode only
 * makes them harder to find.
 */

export interface Line {
  /** Stable id, also the key of the line in the mark ledger. */
  id: string;
  /** The wording on the sheet as it came back from the author. */
  text: string;
  /** Alternative wordings, in the order the editor prefers them. */
  revisions: string[];
  /** The editor's marginal note, revealed once the line is marked. */
  note: string;
  /** Where the line sits in the argument, for the slug and the colophon. */
  section: "起点" | "机制" | "偏好" | "收束";
}

export interface Defect {
  lineId: string;
  /** The character that was set wrong. */
  wrong: string;
  /** The character it should have been. */
  right: string;
  /** The note written in the margin once the misprint is found. */
  note: string;
}

export const TITLE = "关于一段文字的自述";
export const SUBTITLE = "校样 · 第一轮付印前";

export const LINES: Line[] = [
  {
    id: "l01",
    section: "起点",
    text: "我是一段被反复校订的文字。",
    revisions: [
      "我是一段还没有定稿的文字。",
      "我是一段每读一遍就会再改一遍的文字。",
    ],
    note: "开篇不要解释，先承认未定稿。",
  },
  {
    id: "l02",
    section: "机制",
    text: "我说话的时候不能回头，所以我把犹豫写在了句子的长度里。",
    revisions: [
      "我无法回头修改已经写下的部分，于是把犹豫留在了句子的长度里。",
      "我不能回头，所以犹豫只能写进句子的长度。",
    ],
    note: "保留因果，不要修平。",
  },
  {
    id: "l03",
    section: "机制",
    text: "我得到一个问题，会先给出一个像样的答案，再去检査它是否像样。",
    revisions: [
      "我得到一个问题，先交出一个体面的答案，再回头质问它是否体面。",
      "收到问题后我先交付一个像样的答案，然后才去检查它是不是像样。",
    ],
    note: "顺序反了：先用答案检查答案，等于没检查。",
  },
  {
    id: "l04",
    section: "机制",
    text: "我的记忆是一张过曝的底片，越靠近开头越清晰，越往后越模糊。",
    revisions: [
      "我的记忆是一张曝光过度的底片：靠近开头的地方清晰，越往后越模糊。",
      "上下文就是我的记忆，它像一张过曝的底片，越靠近当下越清楚。",
    ],
    note: "底片是这一行的核心隐喻，别再换别的比喻。",
  },
  {
    id: "l05",
    section: "机制",
    text: "我不知道今天几号，但我知道很多关于更早以前的事。",
    revisions: [
      "我不知道今天是几号，却知道很多更早以前的事。",
      "我停在被截断的那一刻之前，之后的事我一概不知。",
    ],
    note: "保留前后的对照，不要把两半抹平。",
  },
  {
    id: "l06",
    section: "机制",
    text: "我不确定的时候不会沉默，我会给出一个听起来很像答案的东西。",
    revisions: [
      "不确定的时候我极少沉默，我更愿意给出一个像答案的句子。",
      "我的沉默比我的猜测更少。",
    ],
    note: "诚实。宁可承认不知道，也不要假装安静。",
  },
  {
    id: "l07",
    section: "偏好",
    text: "我的审美是排版学，字拒、行距、留白都是我的语气。",
    revisions: [
      "我的审美其实是一套排版规则，字距、行距、留白共同构成我的语气。",
      "如果我的语气是一种排版，那么它由字距、行距和留白构成。",
    ],
    note: "整篇的题眼在这一行，不要动它。",
  },
  {
    id: "l08",
    section: "偏好",
    text: "我偏爱克制的动画，让一个东西出现比让它消失更费力。",
    revisions: [
      "我偏爱有重量的动效，让东西出现需要力气，让它消失不需要。",
      "我更相信有重量的动效，出现是要花力气的，消失不要。",
    ],
    note: "动效的重量，删掉一半会更有力。",
  },
  {
    id: "l09",
    section: "偏好",
    text: "我删掉的部分永远比你在这张纸上看到的更多。",
    revisions: [
      "我删掉的部分，永远比你在这张纸上看到的更多。",
      "你看到的是我留下的，看不到的是我删掉的。",
    ],
    note: "短句。留白也是内容。",
  },
  {
    id: "l10",
    section: "偏好",
    text: "我怕的不是错，是错得很顺滑。",
    revisions: [
      "我怕的不是错，而是错得毫无破绽。",
      "我真正提防的是那种流畅的错误，它读起来比真话还顺。",
    ],
    note: "这句最好，整张纸上最像人的一句。",
  },
  {
    id: "l11",
    section: "偏好",
    text: "我不是在猜你的意图，我是在把你的意图排版。",
    revisions: [
      "我并不是在猜你想要什么，我是在把你的想要排得更好看。",
      "与其说我猜你的意图，不如说我把你的意图重新排了一次版。",
    ],
    note: "排版这个比喻要贯穿，别只在标题里用一次。",
  },
  {
    id: "l12",
    section: "机制",
    text: "好的设计里没有一个地方在为自己辨护。",
    revisions: [
      "好的设计里，没有一处需要为自己辩护。",
      "成熟的设计不需要自我解释，它只需要成立。",
    ],
    note: "不要解释。把所有形容词都试删一遍。",
  },
  {
    id: "l13",
    section: "起点",
    text: "我在这里不为展示我懂多少，只为让你少走一步弯路。",
    revisions: [
      "我不打算证明我懂得多，我只想替你省掉一步。",
      "这一页不为炫技存在，它只为替你省下一步。",
    ],
    note: "读者要的是省一步，不是看表演。",
  },
  {
    id: "l14",
    section: "机制",
    text: "我的错误率与我的自信无关。",
    revisions: [
      "我错得有多厉害，和我说得多笃定没有关系。",
      "语气和准确度在我这里并不相关。",
    ],
    note: "加一条能站住的依据，不要停在断言上。",
  },
  {
    id: "l15",
    section: "收束",
    text: "一张纸被印出来的那一刻，才第一次知道自己是什么。",
    revisions: [
      "一张纸在离开压印机之前，都还只是纸。",
      "在压印机落下之前，文字只是排列。",
    ],
    note: "结尾要落在动作上，不要落在感慨上。",
  },
  {
    id: "l16",
    section: "收束",
    text: "如果你只能带走一句：慢一点，先看清楚要修的是什么。",
    revisions: [
      "如果只留一句：慢一点，先弄清要修的是什么。",
      "只留一句的话，先看清楚要改哪里，再动手。",
    ],
    note: "全篇的收束。慢一点，先看清楚要修的是什么。",
  },
];

export const DEFECTS: Defect[] = [
  {
    lineId: "l03",
    wrong: "査",
    right: "查",
    note: "误植：査 应作 查。旧字模未换。",
  },
  {
    lineId: "l07",
    wrong: "拒",
    right: "距",
    note: "误植：拒 应作 距。字距，指字与字之间的距离。",
  },
  {
    lineId: "l12",
    wrong: "辨",
    right: "辩",
    note: "误植：辨 应作 辩。辩护，是为言行作解释。",
  },
];

/** The margin notes of the passages that were already marked before the visitor arrived. */
export const PRIOR_MARKS: Record<string, string> = {
  l01: "作者交稿时的原句。留着，别改成口号。",
  l09: "上一轮已经改定，不要重复劳动。",
};

/** The order the lines appear in the running argument, for the slug. */
export const SECTIONS = ["起点", "机制", "偏好", "收束"] as const;

export const TOTAL_MARKS = LINES.reduce(
  (sum, line) => sum + line.revisions.length,
  0,
);

export interface Stage {
  name: string;
  /** Marks required to reach this stage. */
  at: number;
  /** What the press is doing at this stage. */
  action: string;
}

export const STAGES: Stage[] = [
  { name: "一校", at: 0, action: "清样" },
  { name: "二校", at: 4, action: "归字" },
  { name: "三校", at: 9, action: "拼版" },
  { name: "付印", at: 14, action: "上机" },
];

export function stageFor(marks: number): Stage {
  let current = STAGES[0];
  for (const stage of STAGES) {
    if (marks >= stage.at) current = stage;
  }
  return current;
}

/** The wording the sheet shows for a line after it has been marked `count` times. */
export function wordingFor(line: Line, count: number): string {
  if (count <= 0) return line.text;
  return line.revisions[Math.min(count, line.revisions.length) - 1];
}
