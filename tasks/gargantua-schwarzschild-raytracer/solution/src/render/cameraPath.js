import { wrapDegrees } from '../state/paramSchema.js';

const TAU = Math.PI * 2;

export const CINEMATIC_BLEND_SECONDS = 3.5;
export const PRESET_TRANSITION_SECONDS = 1.6;

// Cinematic loop: one slow orbit every 96 s while elevation, distance and FOV
// breathe on incommensurate periods, always staying in readable framings
// (elevation 3.5°–20.5°, distance 22.5–31.5 M).
export function cinematicPose(t, azimuthOrigin, out) {
  out.azimuth = azimuthOrigin + (t * 360) / 96;
  out.elevation = 12 + 8.5 * Math.sin((TAU * t) / 41);
  out.distance = 27 + 4.5 * Math.sin((TAU * t) / 57 + 0.9);
  out.fov = 43 + 4 * Math.sin((TAU * t) / 67 + 2.1);
  return out;
}

export function smoothstep01(x) {
  const t = Math.min(1, Math.max(0, x));
  return t * t * (3 - 2 * t);
}

export function easeInOutCubic(x) {
  const t = Math.min(1, Math.max(0, x));
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

// Pose blend: shortest-arc azimuth, logarithmic distance, linear elevation/FOV.
export function blendPose(from, to, weight, out) {
  out.azimuth = from.azimuth + wrapDegrees(to.azimuth - from.azimuth) * weight;
  out.elevation = from.elevation + (to.elevation - from.elevation) * weight;
  out.distance = Math.exp(Math.log(from.distance) + (Math.log(to.distance) - Math.log(from.distance)) * weight);
  out.fov = from.fov + (to.fov - from.fov) * weight;
  return out;
}

export function copyPose(from, out) {
  out.distance = from.distance;
  out.azimuth = from.azimuth;
  out.elevation = from.elevation;
  out.fov = from.fov;
  return out;
}

export function posesEqual(a, b, epsilon = 1e-4) {
  return (
    Math.abs(a.distance - b.distance) < epsilon &&
    Math.abs(wrapDegrees(a.azimuth - b.azimuth)) < epsilon &&
    Math.abs(a.elevation - b.elevation) < epsilon &&
    Math.abs(a.fov - b.fov) < epsilon
  );
}
