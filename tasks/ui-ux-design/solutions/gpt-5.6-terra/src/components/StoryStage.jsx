const STAGES = {
  arrival: {
    number: '01',
    eyebrow: '开始 / 先留一张空纸',
    title: '在回答以前，先把房间空出来。',
    body: '我先把输入里的情绪、边界与野心拆开。不是每一句话都要立刻变成结论；有些线必须先被看见。',
    aside: '听见，不等于同意。',
  },
  development: {
    number: '02',
    eyebrow: '发展 / 拾取线索',
    title: '倾听不是记录，是分辨。',
    body: '我会在拥挤的叙述里寻找可以同时成立的部分：谁在承担代价、什么时间不可逆、哪一个细节决定体验。',
    aside: '把模糊，变成可讨论。',
  },
  fracture: {
    number: '03',
    eyebrow: '转折 / 让分歧露出来',
    title: '不拿“看起来合理”盖住裂缝。',
    body: '当速度与完整性发生冲突，我会把张力留在桌面上。真正的协作不是迅速统一，而是知道不同选择会失去什么。',
    aside: '分歧不是噪声，是方向感。',
  },
  resolution: {
    number: '04',
    eyebrow: '收束 / 共同成形',
    title: '交付的应该是能继续站上的平面。',
    body: '最后的回应要清楚、可做、可继续追问。它不封住问题，而是让下一位加入的人也能拿起一根线。',
    aside: '把下一步留给我们。',
  },
};

export function StoryStage({ chapter }) {
  const stage = STAGES[chapter];

  return (
    <article className={`story-stage story-stage--${chapter}`} aria-labelledby={`stage-${chapter}`}>
      <p className="story-number" aria-hidden="true">{stage.number}</p>
      <div className="story-copy">
        <p className="eyebrow">{stage.eyebrow}</p>
        <h2 id={`stage-${chapter}`}>{stage.title}</h2>
        <p className="story-body">{stage.body}</p>
      </div>
      <p className="story-aside">{stage.aside}</p>
    </article>
  );
}

export { STAGES };
