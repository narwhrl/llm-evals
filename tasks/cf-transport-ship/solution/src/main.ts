// 入口：检查 WebGL，创建应用并分步加载。
import "./style.css";
import { installDebug } from "./game/debug";
import { App } from "./game/app";

function webglAvailable(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function fatal(title: string, detail: string): void {
  const d = document.createElement("div");
  d.className = "fatal";
  d.innerHTML = `<h1></h1><p></p><button class="btn primary">重新加载</button>`;
  d.querySelector("h1")!.textContent = title;
  d.querySelector("p")!.textContent = detail;
  d.querySelector("button")!.addEventListener("click", () => location.reload());
  document.body.appendChild(d);
}

const host = document.getElementById("game")!;
if (!webglAvailable()) {
  fatal("无法启动 3D 渲染", "当前浏览器或设备不支持 WebGL，或已在设置中禁用硬件加速。请启用硬件加速或换用最新版 Chrome / Edge / Firefox。");
} else {
  const params = new URLSearchParams(location.search);
  try {
    const app = new App(host, params);
    if (params.has("debug")) installDebug(app);
    app.boot().catch((e: Error) => { console.error(e); fatal("加载失败", e.message); });
  } catch (e) {
    console.error(e);
    fatal("初始化失败", (e as Error).message);
  }
}
