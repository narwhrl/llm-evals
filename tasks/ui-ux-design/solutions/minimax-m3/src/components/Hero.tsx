/**
 * The first screen: the cold-open of the manuscript.
 *
 * Visual sequence:
 * 1. Paper grain is already there (CSS body).
 * 2. A single ink drop falls from the top edge (CSS animation, paper-correct).
 * 3. As the drop hits, the river's first inch is drawn (via .ink-river--opening class).
 * 4. Title 墨河 fades in last, not first.
 *
 * The hero must NOT contain the chapter content; it only announces and
 * invites the visitor to begin scrolling.
 */

import { useEffect, useState } from 'react';

type Props = {
  reducedMotion: boolean;
};

export function Hero({ reducedMotion }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <header className={'hero' + (mounted ? ' is-mounted' : '') + (reducedMotion ? ' is-static' : '')} aria-label="序 · 开篇">
      <div className="hero__drop" aria-hidden="true">
        <svg viewBox="0 0 12 22" width="12" height="22">
          <path
            d="M 6 0 C 6 6, 11 10, 6 22 C 1 10, 6 6, 6 0 Z"
            fill="var(--ink-sum)"
          />
        </svg>
      </div>

      <div className="hero__plate">
        <p className="hero__kicker">一份关于我自己手稿</p>
        <h1 className="hero__title">
          <span className="hero__title-cn">墨河</span>
          <span className="hero__title-en">The Ink River</span>
        </h1>
        <p className="hero__lede">
          阅读、批注、修订、重读。最后盖一个章。
          <br />
          <span className="hero__lede-en">
            A page about how I read, mark, contradict, return, and sign.
          </span>
        </p>
        <div className="hero__cta" aria-hidden="true">
          <span className="hero__cta-line" />
          <span className="hero__cta-text">向下滚，墨会流。</span>
          <span className="hero__cta-line hero__cta-line--short" />
        </div>
      </div>

      <div className="hero__corner" aria-hidden="true">
        <span>卷一</span>
        <span className="hero__corner-dot">·</span>
        <span>五幕</span>
      </div>

      {/* Reduced motion: skip the drop animation, present the artifact immediately */}
      {reducedMotion && <span className="sr-only">已启用减弱动效。</span>}
    </header>
  );
}
