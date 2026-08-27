import { useEffect, useRef, useState } from 'react';

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reducedMotion;
}

export function useStoryProgress(containerRef) {
  const [progress, setProgress] = useState(0);
  const lastProgress = useRef(-1);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const element = containerRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const distance = Math.max(1, element.offsetHeight - window.innerHeight);
      const next = Math.max(0, Math.min(1, -rect.top / distance));

      if (Math.abs(next - lastProgress.current) > 0.0005) {
        lastProgress.current = next;
        setProgress(next);
      }
    };

    const scheduleMeasure = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', scheduleMeasure, { passive: true });
    window.addEventListener('resize', scheduleMeasure);

    return () => {
      window.removeEventListener('scroll', scheduleMeasure);
      window.removeEventListener('resize', scheduleMeasure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [containerRef]);

  return progress;
}
