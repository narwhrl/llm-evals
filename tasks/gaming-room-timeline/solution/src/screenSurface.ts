// ScreenSurface: projects a live DOM desktop into the 3D monitor via an
// absolutely-positioned overlay anchored to the monitor's projected rect.
// The overlay only shows while the monitor faces the camera.

import * as THREE from "three";
import { screenForYear, ScreenSpec } from "./screens";

export class ScreenSurface {
  overlay: HTMLElement;
  spec?: ScreenSpec;

  constructor() {
    this.overlay = document.getElementById("screenOverlay") as HTMLElement;
  }

  setYear(year: number) {
    const spec = screenForYear(year);
    if (this.spec?.idPrefix === spec.idPrefix) return;
    this.spec = spec;
    this.overlay.innerHTML = spec.svg;
    this.bindInteractions();
  }

  private bindInteractions() {
    if (!this.spec) return;
    const d = this.overlay;
    switch (this.spec.idPrefix) {
      case "w7": {
        const hp = d.querySelector("#bossHp") as SVGRectElement | null;
        const btn = d.querySelector("#dpsBtn");
        if (hp && btn) {
          let pct = 100;
          btn.addEventListener("click", () => {
            pct = Math.max(0, pct - 7);
            hp.setAttribute("width", String(150 * pct / 100));
            const lbl = d.querySelector("text[text-anchor='middle']:nth-of-type(1)");
            btn.setAttribute("fill", pct <= 0 ? "#3a5a3a" : "#6b4fa0");
            if (lbl) lbl.textContent = pct <= 0 ? "已击破!" : `巫妖王 ${pct}%`;
          });
        }
        break;
      }
      case "w10": {
        const btn = d.querySelector("#queueBtn");
        const t = d.querySelector("#queueTxt");
        if (btn && t) {
          let on = false;
          btn.addEventListener("click", () => {
            on = !on;
            btn.setAttribute("fill", on ? "#8a4a2a" : "#5a7a2a");
            t.textContent = on ? "匹配中 00:0" + Math.floor(Math.random() * 9) : "DOTA2 · 天梯";
          });
        }
        break;
      }
      case "w11": {
        const btn = d.querySelector("#clipBtn");
        const t = d.querySelector("#clipTxt");
        if (btn && t) {
          let n = 0;
          btn.addEventListener("click", () => {
            n += 1;
            t.textContent = `已保存 clip_${String(n).padStart(2, "0")}.mp4`;
            btn.setAttribute("fill", "#3a5a8a");
            setTimeout(() => btn.setAttribute("fill", "#5a3aa0"), 600);
          });
        }
        break;
      }
    }
  }

  // Project world-space screen rect to CSS pixels; hide if facing away.
  update(camera: THREE.Camera, anchor: THREE.Vector3,
    size: { w: number; h: number }, canvas: HTMLCanvasElement) {
    if (!this.spec) { this.overlay.style.display = "none"; return; }
    const camPos = new THREE.Vector3();
    camera.getWorldPosition(camPos);
    const toCam = camPos.clone().sub(anchor).normalize();
    // monitor front is +z in slot local space (rotation.y = 0 → world +z)
    const normal = new THREE.Vector3(0, 0, 1);
    if (normal.dot(toCam) < 0.25) { this.overlay.style.display = "none"; return; }

    // project all four corners; screen is axis-aligned in this layout
    const hw = size.w / 2, hh = size.h / 2;
    const corners = [
      new THREE.Vector3(anchor.x - hw, anchor.y + hh, anchor.z),
      new THREE.Vector3(anchor.x + hw, anchor.y + hh, anchor.z),
      new THREE.Vector3(anchor.x - hw, anchor.y - hh, anchor.z),
      new THREE.Vector3(anchor.x + hw, anchor.y - hh, anchor.z),
    ];
    const pts = corners.map(c => c.clone().project(camera));
    if (pts.some(p => p.z > 1)) { this.overlay.style.display = "none"; return; }
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    const xs = pts.map(p => (p.x * 0.5 + 0.5) * cw);
    const ys = pts.map(p => (-p.y * 0.5 + 0.5) * ch);
    const x1 = Math.min(...xs), x2 = Math.max(...xs);
    const y1 = Math.min(...ys), y2 = Math.max(...ys);
    const w = x2 - x1, h = y2 - y1;
    if (w < 30 || h < 20) { this.overlay.style.display = "none"; return; }
    const r = canvas.getBoundingClientRect();
    this.overlay.style.display = "block";
    this.overlay.style.left = `${r.left + x1}px`;
    this.overlay.style.top = `${r.top + y1}px`;
    this.overlay.style.width = `${w}px`;
    this.overlay.style.height = `${h}px`;
  }
}
