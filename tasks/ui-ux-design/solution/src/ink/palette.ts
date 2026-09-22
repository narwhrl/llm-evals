/** 与 `styles/tokens.css` 必须保持一致：纸上只允许出现这几种材料色。 */
export const PALETTE = {
  paper: "#f2ede3",
  paperShade: "#e7e0d1",
  ink: "#1b2a3a",
  inkSoft: "#46586b",
  ghost: "#8a8578",
  vermilion: "#c2492b",
} as const;

export type InkColor = (typeof PALETTE)["ink"] | (typeof PALETTE)["ghost"] | (typeof PALETTE)["vermilion"];

export function rgba(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
