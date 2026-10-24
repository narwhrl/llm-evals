export function cameraFov(aspect) {
  const baseFov = 35 * Math.PI / 180;
  return 2 * Math.atan(Math.tan(baseFov / 2) * Math.max(1, 1.45 / aspect)) * 180 / Math.PI;
}
