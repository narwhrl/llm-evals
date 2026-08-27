/**
 * A 印 / seal — vermilion square stamp with a single glyph.
 * Stamps animate with weight + a tiny paper vibration when activated.
 */

import { useEffect, useState } from 'react';

type Props = {
  glyph: string;
  label: string;
  /** Trigger: when progress crosses this value, stamp. */
  trigger: number;
  progress: number;
  reducedMotion: boolean;
  /** Visual position offset from the river centerline, in px */
  dx?: number;
  /** Optional rotation jitter */
  tilt?: number;
};

export function Seal({
  glyph,
  label,
  trigger,
  progress,
  reducedMotion,
  dx = 0,
  tilt = 0,
}: Props) {
  const [stamped, setStamped] = useState(false);
  const [stamping, setStamping] = useState(false);

  useEffect(() => {
    if (progress <= trigger || stamped) return;
    setStamped(true);
    setStamping(true);
    const t = setTimeout(() => setStamping(false), 520);
    return () => clearTimeout(t);
  }, [progress, trigger, stamped, reducedMotion]);

  return (
    <div
      className={'seal' + (stamped ? ' is-stamped' : '') + (stamping ? ' is-stamping' : '')}
      style={{
        transform: `translate(${dx}px, 0) rotate(${tilt}deg)`,
      }}
      aria-hidden="true"
    >
      <div className="seal__face">
        <span className="seal__glyph">{glyph}</span>
      </div>
      <span className="seal__label">{label}</span>
    </div>
  );
}
