/** 把 index.html 里既有的锚点接起来：加载遮罩、统计、机位与时间档按钮。 */
export class Hud {
  constructor({ onView, onTimeOfDay }) {
    this.overlay = document.getElementById("overlay");
    this.stepLabel = document.getElementById("overlay-step");
    this.bar = document.getElementById("overlay-bar-fill");
    this.statsBox = document.getElementById("stats");
    this.viewBox = document.getElementById("views");
    this.todBox = document.getElementById("tod");
    this.onView = onView;
    this.onTimeOfDay = onTimeOfDay;
    this.viewButtons = new Map();
    this.todButtons = new Map();
  }

  buildViewButtons(views, activeKey) {
    if (!this.viewBox) return;
    this.viewBox.replaceChildren();
    for (const view of views) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = view.label;
      button.dataset.view = view.key;
      button.setAttribute("aria-pressed", String(view.key === activeKey));
      button.addEventListener("click", () => this.onView(view.key));
      this.viewBox.append(button);
      this.viewButtons.set(view.key, button);
    }
  }

  buildTimeButtons(presets, activeKey) {
    if (!this.todBox) return;
    this.todBox.replaceChildren();
    for (const [key, preset] of Object.entries(presets)) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = preset.label;
      button.dataset.tod = key;
      button.setAttribute("aria-pressed", String(key === activeKey));
      button.addEventListener("click", () => this.onTimeOfDay(key));
      this.todBox.append(button);
      this.todButtons.set(key, button);
    }
  }

  setActiveView(key) {
    for (const [viewKey, button] of this.viewButtons) {
      button.setAttribute("aria-pressed", String(viewKey === key));
    }
  }

  setActiveTime(key) {
    for (const [todKey, button] of this.todButtons) {
      button.setAttribute("aria-pressed", String(todKey === key));
    }
  }

  progress(label, ratio) {
    if (this.stepLabel) this.stepLabel.textContent = label;
    if (this.bar) this.bar.style.width = `${Math.round(Math.min(1, Math.max(0, ratio)) * 100)}%`;
  }

  ready() {
    if (this.overlay) this.overlay.classList.add("is-hidden");
    this.progress("", 1);
  }

  error(message) {
    if (!this.overlay) return;
    this.overlay.classList.remove("is-hidden");
    this.overlay.classList.add("is-error");
    const title = this.overlay.querySelector(".overlay-title");
    if (title) title.textContent = "场景未能完成初始化";
    if (this.stepLabel) this.stepLabel.textContent = message;
  }

  setStats(lines) {
    if (!this.statsBox) return;
    this.statsBox.replaceChildren();
    for (const line of lines) {
      const row = document.createElement("div");
      row.innerHTML = line;
      this.statsBox.append(row);
    }
  }
}
