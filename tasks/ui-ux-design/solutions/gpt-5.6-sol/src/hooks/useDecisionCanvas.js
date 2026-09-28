import { useEffect, useRef } from 'react';
import { drawDecisionField } from '../visual/drawDecisionField.js';

const SNAP_DISTANCE = 0.0008;

export function useDecisionCanvas({
  canvasRef,
  weights,
  progress,
  committed,
  revealDiscarded,
  reducedMotion,
}) {
  const target = useRef({
    ...weights,
    progress,
    cut: committed ? 1 : 0,
    reveal: revealDiscarded ? 1 : 0,
  });

  target.current.clarity = weights.clarity;
  target.current.surprise = weights.surprise;
  target.current.care = weights.care;
  target.current.progress = progress;
  target.current.cut = committed ? 1 : 0;
  target.current.reveal = revealDiscarded ? 1 : 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d', { alpha: true });
    const current = { ...target.current };
    let cssWidth = 0;
    let cssHeight = 0;
    let animationFrame = 0;
    let lastTime = performance.now();
    let visible = true;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
      cssWidth = Math.max(1, Math.round(bounds.width));
      cssHeight = Math.max(1, Math.round(bounds.height));
      const pixelWidth = Math.max(1, Math.round(cssWidth * ratio));
      const pixelHeight = Math.max(1, Math.round(cssHeight * ratio));

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const copyTargets = () => {
      current.clarity = target.current.clarity;
      current.surprise = target.current.surprise;
      current.care = target.current.care;
      current.progress = target.current.progress;
      current.cut = target.current.cut;
      current.reveal = target.current.reveal;
    };

    const animate = (time) => {
      animationFrame = 0;
      if (!visible) return;

      const elapsed = Math.min(48, time - lastTime);
      lastTime = time;

      if (reducedMotion) {
        copyTargets();
      } else {
        const amount = 1 - Math.exp(-elapsed * 0.0095);
        current.clarity += (target.current.clarity - current.clarity) * amount;
        current.surprise += (target.current.surprise - current.surprise) * amount;
        current.care += (target.current.care - current.care) * amount;
        current.progress += (target.current.progress - current.progress) * amount;
        current.cut += (target.current.cut - current.cut) * amount;
        current.reveal += (target.current.reveal - current.reveal) * amount;
      }

      drawDecisionField(context, cssWidth, cssHeight, current, reducedMotion ? 0 : time);

      const targetDistance =
        Math.abs(target.current.progress - current.progress) +
        Math.abs(target.current.clarity - current.clarity) +
        Math.abs(target.current.surprise - current.surprise) +
        Math.abs(target.current.care - current.care) +
        Math.abs(target.current.cut - current.cut) +
        Math.abs(target.current.reveal - current.reveal);

      if (!reducedMotion || targetDistance > SNAP_DISTANCE) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const requestDraw = () => {
      if (!animationFrame && visible) {
        lastTime = performance.now();
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      requestDraw();
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) requestDraw();
      else if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    });

    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    resize();
    requestDraw();

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [canvasRef, reducedMotion]);

  useEffect(() => {
    if (!reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    drawDecisionField(
      context,
      canvas.width / ratio,
      canvas.height / ratio,
      target.current,
      0,
    );
  }, [canvasRef, committed, progress, reducedMotion, revealDiscarded, weights]);
}
