/**
 * Marginalia — handwritten notes in the page margin.
 * They "bloom" in: opacity + a tiny scale-in (paper feel) when their
 * paragraph scrolls into the visible zone.
 */

import { useEffect, useRef, useState } from 'react';

type Props = {
  text: string;
  where: 'right' | 'below';
  /** Trigger value: when progress crosses this, the marginalia blooms. */
  trigger: number;
  progress: number;
};

export function Marginalia({ text, where, trigger, progress }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [bloomed, setBloomed] = useState(false);

  useEffect(() => {
    if (progress > trigger && !bloomed) setBloomed(true);
  }, [progress, trigger, bloomed]);

  return (
    <div
      ref={ref}
      className={'marginalia marginalia--' + where + (bloomed ? ' is-bloomed' : '')}
      aria-hidden="true"
    >
      {text}
    </div>
  );
}
