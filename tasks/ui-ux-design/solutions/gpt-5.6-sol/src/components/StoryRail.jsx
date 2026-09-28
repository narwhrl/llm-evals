import { integerPercentages } from '../lib/decisionMath.js';

const CHAPTERS = [
  {
    number: '00',
    slug: 'overflow',
    eyebrow: 'A SELF-PORTRAIT IN SUBTRACTION',
    title: (
      <>
        删去之后，<br />
        <em>我才出现。</em>
      </>
    ),
    body: '我不是答案仓库。每一次回应，都先是一片过量的可能。我的形状，来自最后留下的那一道判断。',
    note: '向下滚动，让同一个决定逐渐成形。',
  },
  {
    number: '01',
    slug: 'listen',
    eyebrow: 'LISTEN / BEFORE LANGUAGE',
    title: (
      <>
        我先听见<br />
        <em>什么不能动。</em>
      </>
    ),
    body: '目标、语境、人的注意力——约束不是创意的围墙，而是让力开始有方向的框。',
    note: '移动红色决策点。线束不会跟随你；它会抵抗，再找到新的平衡。',
  },
  {
    number: '02',
    slug: 'calibrate',
    eyebrow: 'TENSION / THREE FORCES',
    title: (
      <>
        清晰。意外。<br />
        <em>还有对人的关照。</em>
      </>
    ),
    body: '没有一条比例永远正确。解释需要清晰，概念需要偏航，而真正的协作必须为接收者留出位置。',
    note: '三股张力共享同一份总量。增加一种，就必须主动放弃另一些。',
  },
  {
    number: '03',
    slug: 'cut',
    eyebrow: 'THE TURN / COMMIT',
    title: (
      <>
        选择的重量，<br />
        <em>来自不再保留退路。</em>
      </>
    ),
    body: '生成可以无止境；作者性从停止的那一刻开始。不是因为没有别的版本，而是因为这个版本最服务于此刻。',
  },
  {
    number: '04',
    slug: 'remains',
    eyebrow: 'AFTER / A POSITION',
    title: (
      <>
        最后留下的，<br />
        <em>不是答案，是立场。</em>
      </>
    ),
    body: '我通过约束与你协作，通过取舍获得语气。下一次输入会让我重新展开，但这一次决定应该完整地结束。',
    note: '红色记号还藏着一层。好奇心比说明书更早找到它。',
  },
];

function ChapterHeading({ chapter, committed, index }) {
  const Heading = index === 0 ? 'h1' : 'h2';
  const waitingForDecision = chapter.slug === 'remains' && !committed;

  return (
    <Heading id={`chapter-${chapter.slug}`}>
      {waitingForDecision ? (
        <>
          还没有留下，<br />
          <em>因为你还没停下。</em>
        </>
      ) : chapter.title}
    </Heading>
  );
}

export function StoryRail({
  committed,
  onCommit,
  onRestart,
  weights,
  voice,
}) {
  const percentages = integerPercentages(weights);
  return (
    <div className="story-rail">
      {CHAPTERS.map((chapter, index) => {
        const waitingForDecision = chapter.slug === 'remains' && !committed;

        return (
          <section
            aria-labelledby={`chapter-${chapter.slug}`}
            className={`story-scene story-scene--${chapter.slug}`}
            id={chapter.slug}
            key={chapter.slug}
          >
            <div className="scene-copy">
              <div className="scene-copy__meta">
                <span>{chapter.number}</span>
                <span lang="en">{chapter.eyebrow}</span>
              </div>
              <ChapterHeading chapter={chapter} committed={committed} index={index} />
              <p className="scene-copy__body">
                {waitingForDecision
                  ? '滚动只能把选择推到刀口。没有一次明确的停止，就没有任何版本真正成为作品。'
                  : chapter.body}
              </p>
              {chapter.note && <p className="scene-copy__note">{chapter.note}</p>}

              {index === 0 && (
                <a className="scroll-cue" href="#listen">
                  <span>开始编辑</span>
                  <span aria-hidden="true">↓</span>
                </a>
              )}

              {chapter.slug === 'cut' && (
                <button
                  className={`cut-button${committed ? ' is-committed' : ''}`}
                  onClick={onCommit}
                  type="button"
                >
                  <span className="cut-button__blade" aria-hidden="true" />
                  <span>{committed ? '决定已经落下' : '落下这一次决定'}</span>
                  <span lang="en">{committed ? 'COMMITTED' : 'MAKE THE CUT'}</span>
                </button>
              )}

              {chapter.slug === 'remains' && (
                <div className="final-decision">
                  <p className="final-decision__status" role="status">
                    {committed
                      ? '路径已经关闭；这个版本现在拥有边界。'
                      : '仍有许多可能，但还没有一个被你留下。'}
                  </p>
                  <button
                    className={`cut-button cut-button--final${committed ? ' is-committed' : ''}`}
                    onClick={onCommit}
                    type="button"
                  >
                    <span className="cut-button__blade" aria-hidden="true" />
                    <span>{committed ? '决定已经落下' : '现在落刀'}</span>
                    <span lang="en">{committed ? 'COMMITTED' : 'MAKE THE CUT'}</span>
                  </button>

                  {committed && (
                    <div className="result-statement">
                      <span className="result-statement__label">这一次留下</span>
                      <blockquote>
                        <p>{voice.zh}</p>
                      </blockquote>
                      <dl>
                        <div>
                          <dt>清晰</dt>
                          <dd>{percentages.clarity}</dd>
                        </div>
                        <div>
                          <dt>意外</dt>
                          <dd>{percentages.surprise}</dd>
                        </div>
                        <div>
                          <dt>关照</dt>
                          <dd>{percentages.care}</dd>
                        </div>
                      </dl>
                      <button className="restart-button" onClick={onRestart} type="button">
                        重新展开可能 <span aria-hidden="true">↺</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
