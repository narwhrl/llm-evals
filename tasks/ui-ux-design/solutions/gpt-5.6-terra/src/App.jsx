import { useEffect, useRef, useState } from 'react';

import { Loom } from './components/Loom.jsx';
import { MarginNote } from './components/MarginNote.jsx';
import { StoryStage, STAGES } from './components/StoryStage.jsx';
import { clamp, deriveLoomState } from './device-state.js';

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reduced;
}

function useJourneyProgress(reference) {
  const [journey, setJourney] = useState(0);

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      const element = reference.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      const next = clamp(-rect.top / distance);
      setJourney((current) => (Math.abs(current - next) > 0.002 ? next : current));
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [reference]);

  return journey;
}

export function App() {
  const experienceRef = useRef(null);
  const [focus, setFocus] = useState(0.45);
  const [tension, setTension] = useState(0.34);
  const journey = useJourneyProgress(experienceRef);
  const reducedMotion = useReducedMotion();
  const state = deriveLoomState({ focus, tension, journey });
  const isOpening = journey < 0.16;

  function resetLoom() {
    setFocus(0.45);
    setTension(0.34);
    experienceRef.current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  }

  return (
    <>
      <a className="skip-link" href="#work">跳到作品正文</a>
      <main id="work">
        <section
          className={`experience experience--${state.chapter}`}
          ref={experienceRef}
          style={{ '--focus': focus, '--tension': tension, '--journey': journey }}
          aria-labelledby="page-title"
        >
          <div className="experience-sticky">
            <header className="masthead">
              <p>FIELD NOTE / 01</p>
              <p>ABOUT A COLLABORATOR</p>
              <p>SCROLL · TOUCH · HOLD</p>
            </header>

            <div className="experience-grid">
              <div className={`intro-copy ${isOpening ? 'intro-copy--visible' : 'intro-copy--quiet'}`}>
                <p className="eyebrow">关于我 / 一次共同定向的练习</p>
                <h1 id="page-title">把问题，织成<br />可以一起握住的方向。</h1>
                <p className="intro-body">我在意的不只是答案对不对，而是它是否让下一次对话走得更深、更清楚，也更接近能做的事。</p>
              </div>

              <div className="loom-column">
                <Loom
                  focus={focus}
                  tension={tension}
                  journey={journey}
                  onFocusChange={setFocus}
                  onTensionChange={setTension}
                  reducedMotion={reducedMotion}
                />
              </div>

              <div
                className={`stage-column ${isOpening ? 'stage-column--waiting' : 'stage-column--visible'}`}
                aria-hidden={isOpening}
              >
                <StoryStage chapter={state.chapter} />
              </div>
            </div>

            <div className="progress-rail" aria-label={`叙事进度：${state.chapterCue}，${state.chapterLabel}`}>
              {Object.values(STAGES).map((stage) => (
                <span className={stage.number === { arrival: '01', development: '02', fracture: '03', resolution: '04' }[state.chapter] ? 'is-active' : ''} key={stage.number}>
                  <b>{stage.number}</b>
                  <i>{stage.eyebrow.split(' / ')[0]}</i>
                </span>
              ))}
            </div>
          </div>

        </section>

        <section className="afterword" id="afterword" aria-labelledby="afterword-title">
          <div className="afterword-heading">
            <p className="eyebrow">织面之外 / 我的工作方式</p>
            <h2 id="afterword-title">我不把协作当成一条直线。</h2>
            <p>它更像一块会反复松开、拉紧、重新交错的织面。好结果不消灭复杂性；它把复杂性放到每个人都能继续操作的位置。</p>
          </div>

          <div className="working-principles" role="list" aria-label="工作原则">
            <p role="listitem"><span>01</span><strong>先听深一点</strong><em>情绪、限制与真正想得到的东西，不必在同一句话里。</em></p>
            <p role="listitem"><span>02</span><strong>再分清一点</strong><em>把判断的边界和失去的代价一起说出来。</em></p>
            <p role="listitem"><span>03</span><strong>最后做近一点</strong><em>让一份回应能马上帮助下一步，而不是停在好看的概念里。</em></p>
          </div>

          <section className="weave-trace" aria-labelledby="weave-trace-title">
            <p className="eyebrow" id="weave-trace-title">带往下一步的线</p>
            <div className="weave-trace-copy">
              <p className="trace-conditions"><span>视线 / {state.focusWord}</span><span>张力 / {state.tensionWord}</span></p>
              <strong>{state.label}</strong>
              <p>你刚才把织机拉向「{state.focusWord}」，把线「{state.tensionWord}」。{state.message}</p>
            </div>
          </section>

          <div className="afterword-actions">
            <MarginNote />
            <button className="reset-button" type="button" onClick={resetLoom}>
              回到织机，重新定向 <span aria-hidden="true">↑</span>
            </button>
          </div>
        </section>
      </main>
      <footer>
        <p>一件关于倾听、判断与制作的交互自画像。</p>
        <p>不急着回答，也不把你留在原地。</p>
      </footer>
    </>
  );
}
