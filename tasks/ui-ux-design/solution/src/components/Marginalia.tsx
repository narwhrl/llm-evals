import { useEffect, useState } from 'react';
import { MARGINALIA } from '../ink/text';

interface Props {
  idle: boolean;
  reduced: boolean;
  chapterIndex: number;
}

/**
 * 页边批注：唯一的"反交互"——只有静止才会出现。
 * 每次进入静止，轮换一条私语；任何活动即刻隐去。
 */
export function Marginalia({ idle, reduced, chapterIndex }: Props) {
  const [episodes, setEpisodes] = useState(0);
  useEffect(() => {
    if (idle) setEpisodes((n) => n + 1);
  }, [idle]);
  const note = MARGINALIA[(chapterIndex + episodes) % MARGINALIA.length];
  return (
    <aside
      aria-hidden="true"
      className={`marginalia${idle ? ' show' : ''}${reduced ? ' reduced' : ''}`}
    >
      <span>{note}</span>
    </aside>
  );
}
