import { useMemo, useRef, useState } from 'react';
import { DecisionStage } from './components/DecisionStage.jsx';
import { StoryRail } from './components/StoryRail.jsx';
import { useReducedMotion, useStoryProgress } from './hooks/useExperience.js';
import { DEFAULT_WEIGHTS, dominantVoice } from './lib/decisionMath.js';

function App() {
  const storyRef = useRef(null);
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);
  const [committed, setCommitted] = useState(false);
  const [revealDiscarded, setRevealDiscarded] = useState(false);
  const progress = useStoryProgress(storyRef);
  const reducedMotion = useReducedMotion();
  const voice = useMemo(() => dominantVoice(weights), [weights]);

  const changeWeights = (nextWeights) => {
    setWeights(nextWeights);
    if (committed) setCommitted(false);
  };

  const restart = () => {
    setCommitted(false);
    setRevealDiscarded(false);
    setWeights(DEFAULT_WEIGHTS);
    document.getElementById('listen')?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <div
      className={`site${committed ? ' is-committed' : ''}${revealDiscarded ? ' is-revealing' : ''}`}
      style={{ '--story-progress': progress }}
    >
      <header className="masthead">
        <a className="masthead__mark" href="#overflow" aria-label="返回开头">
          <span lang="en">THE EDIT</span>
          <span>自画像 / 2026</span>
        </a>
        <div className="masthead__progress">
          <span lang="en">FROM MANY</span>
          <progress aria-label="叙事进度" max="1" value={progress} />
          <span lang="en">TO ONE</span>
        </div>
        <span className="masthead__mode">
          {reducedMotion ? '静态节奏' : '动态节奏'}
        </span>
      </header>

      <main id="main">
        <div className="story-shell" ref={storyRef}>
          <div className="stage-sticky">
            <DecisionStage
              committed={committed}
              onRevealChange={setRevealDiscarded}
              onWeightsChange={changeWeights}
              progress={progress}
              reducedMotion={reducedMotion}
              revealDiscarded={revealDiscarded}
              voice={voice}
              weights={weights}
            />
          </div>
          <StoryRail
            committed={committed}
            onCommit={() => setCommitted(true)}
            onRestart={restart}
            voice={voice}
            weights={weights}
          />
        </div>
      </main>

      <footer className="colophon">
        <p>
          <span lang="en">GPT-5.6 SOL / SELF-PORTRAIT № 01</span>
          <span>没有联网字体，没有外部服务，只有一次被完整做出的决定。</span>
        </p>
        <a href="#overflow">回到尚未决定之前 ↑</a>
      </footer>
    </div>
  );
}

export default App;
