import { spawnSync } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const directory = dirname(fileURLToPath(import.meta.url));
const session = "blackhole-hero-gpt61";
const address = process.env.WEBBRIDGE_URL || "http://127.0.0.1:10086";
const report = [];

function command(action, args = {}) {
  const path = join(tmpdir(), `webbridge-req-${randomUUID()}.json`);
  writeFileSync(path, JSON.stringify({ action, args, session }), "utf8");
  try {
    const result = spawnSync("curl.exe", ["-sS", "-X", "POST", `${address}/command`, "-H", "Content-Type: application/json", "--data-binary", `@${path}`], { encoding: "utf8", maxBuffer: 16 * 1024 * 1024, timeout: 60000 });
    if (result.status !== 0) throw new Error(result.stderr || `curl exited ${result.status}`);
    const response = JSON.parse(result.stdout);
    if (!response.ok) throw new Error(JSON.stringify(response.error));
    return response.data;
  } finally {
    unlinkSync(path);
  }
}

const cdp = (method, params = {}) => command("cdp", { method, params });
function evaluate(code) {
  const result = command("evaluate", { code });
  return result.type === "string" ? JSON.parse(result.value) : result.value;
}
const wait = (ms = 1800) => evaluate(`(async () => { await new Promise(r=>setTimeout(r,${ms})); return JSON.stringify(window.__blackholeProbe.summary()); })()`);
const viewport = (width, height) => cdp("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
const motion = (value) => cdp("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value }] });
const navigate = (url) => command("navigate", { url });
function record(name, data, pass = true) {
  report.push({ name, pass, data });
  writeFileSync(join(directory, "browser-results.json"), JSON.stringify(report, null, 2) + "\n");
  console.log(`${pass ? "PASS" : "FAIL"} ${name}: ${JSON.stringify(data)}`);
}
function capture(filename) {
  evaluate(`(() => { const overlay=document.getElementById('kimi-webbridge-agent-visuals'); if(overlay) overlay.style.setProperty('visibility','hidden','important'); return JSON.stringify({overlayHidden:!overlay||getComputedStyle(overlay).visibility==='hidden'}); })()`);
  const data = cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: false }).data;
  const bytes = Buffer.from(data, "base64");
  if (filename) writeFileSync(join(directory, filename), bytes);
  return createHash("sha256").update(bytes).digest("hex");
}

try {
  if (process.env.PROBE_IDENTIFIER) cdp("Page.removeScriptToEvaluateOnNewDocument", { identifier: process.env.PROBE_IDENTIFIER });
  const probeIdentifier = cdp("Page.addScriptToEvaluateOnNewDocument", { source: readFileSync(join(directory, "browser-probe.js"), "utf8") }).identifier;
  console.log(`Probe identifier: ${probeIdentifier}`);
  cdp("Emulation.setFocusEmulationEnabled", { enabled: true });
  motion("no-preference");
  viewport(1440, 900);
  navigate("http://127.0.0.1:4178/evidence/fixture.html");
  record("fixture initial production render", wait(2500));
  const animation = evaluate(`(async () => { const p=window.__blackholeProbe; p.capture=true; await new Promise(r=>setTimeout(r,1600)); const first={...p.pixelSample}; p.capture=true; await new Promise(r=>setTimeout(r,2600)); return JSON.stringify({first,second:p.pixelSample,errors:p.errors,consoleErrors:p.consoleErrors}); })()`);
  record("gas animation", animation, animation.first.hash !== animation.second.hash && animation.second.time > animation.first.time);
  evaluate(`(() => { window.renderHero({paused:true}); return JSON.stringify(true); })()`);
  const pausedA = wait(1800);
  const hashA = capture();
  const pausedB = wait(2400);
  const hashB = capture();
  record("paused frame is frozen", { first: { frames: pausedA.frames, time: pausedA.uniforms.uTime, hash: hashA }, second: { frames: pausedB.frames, time: pausedB.uniforms.uTime, hash: hashB } }, pausedA.frames === pausedB.frames && pausedA.uniforms.uTime === pausedB.uniforms.uTime && hashA === hashB);
  evaluate(`(() => { window.renderHero({focus:[0.5,0.76],scrim:'top',resolution:0.6,fov:58,steps:200}); return JSON.stringify(true); })()`);
  const pausedUpdated = wait();
  record("paused prop update", pausedUpdated, pausedUpdated.uniforms.uFocus[0] === 0.5 && pausedUpdated.uniforms.uScrimDir === 3 && pausedUpdated.uniforms.uSteps === 200 && pausedUpdated.uniforms.uRes[0] === 864);
  const passthrough = evaluate(`(() => { const host=document.getElementById('verification-hero'); host.click(); return JSON.stringify({id:host.id,label:host.getAttribute('aria-label'),data:host.dataset.fixture,children:host.innerText,clicks:window.getHeroClicks(),height:host.style.height}); })()`);
  record("public DOM attributes and children", passthrough, passthrough.clicks === 1 && passthrough.data === "true" && passthrough.height === "720px");
  evaluate(`(() => { window.renderHero({paused:false}); return JSON.stringify(true); })()`);
  const resumed = wait(1800);
  record("pause resumes", resumed, resumed.uniforms.uTime > pausedUpdated.uniforms.uTime);
  evaluate(`(() => { document.body.style.minHeight='2400px'; window.scrollTo(0,900); return JSON.stringify(true); })()`);
  const outsideA = wait(1200);
  evaluate(`(() => { document.dispatchEvent(new Event('visibilitychange')); return JSON.stringify(true); })()`);
  const outsideB = wait(1200);
  record("offscreen remains suspended after visibility event", { first: outsideA.frames, second: outsideB.frames, firstTime: outsideA.uniforms.uTime, secondTime: outsideB.uniforms.uTime }, outsideA.frames === outsideB.frames);
  evaluate(`(() => { window.scrollTo(0,0); return JSON.stringify(true); })()`);
  record("visible rendering resumes", wait(1800));
  const lost = evaluate(`(async () => { const p=window.__blackholeProbe; window.__lose=p.contexts.find(g=>g.canvas===document.querySelector('canvas')).getExtension('WEBGL_lose_context'); if(!window.__lose) return JSON.stringify({supported:false}); window.__lose.loseContext(); await new Promise(r=>setTimeout(r,900)); return JSON.stringify({supported:true,lost:p.contexts[0].isContextLost(),display:document.querySelector('canvas').style.display,copy:document.body.innerText,frames:p.frames}); })()`);
  record("WebGL context loss", lost, lost.supported && lost.lost && lost.display === "none");
  evaluate(`(() => { window.__lose.restoreContext(); return JSON.stringify(true); })()`);
  const restored = wait(2500);
  record("WebGL context restoration", restored, !restored.contextLost && restored.canvas.display === "block" && restored.frames > lost.frames && restored.glError === 0 && restored.consoleErrors.length === 0);
  motion("reduce");
  const reducedA = wait();
  const reducedHashA = capture();
  const reducedB = wait(2400);
  const reducedHashB = capture();
  record("live reduced-motion change freezes frame", { first: reducedA.frames, second: reducedB.frames, firstTime: reducedA.uniforms.uTime, secondTime: reducedB.uniforms.uTime, firstHash: reducedHashA, secondHash: reducedHashB }, reducedA.frames === reducedB.frames && reducedHashA === reducedHashB);
  motion("no-preference");
  const unreduced = wait();
  record("live reduced-motion change resumes", unreduced, unreduced.uniforms.uTime > reducedB.uniforms.uTime);
  evaluate(`(() => { window.unmountHero(); return JSON.stringify(true); })()`);
  const unmountedA = wait(600);
  const unmountedB = wait(1800);
  record("StrictMode and unmount cleanup", { first: unmountedA.frames, second: unmountedB.frames, canvas: unmountedB.canvas, errors: unmountedB.errors, consoleErrors: unmountedB.consoleErrors }, unmountedA.frames === unmountedB.frames && unmountedB.canvas === null && unmountedB.consoleErrors.length === 0);

  motion("reduce");
  viewport(390, 844);
  navigate("http://127.0.0.1:4176/");
  const mobileReduced = wait(2500);
  record("mobile reduced-motion initial composition", mobileReduced, mobileReduced.uniforms.uFocus[0] === 0.5 && mobileReduced.uniforms.uScrimDir === 3 && mobileReduced.uniforms.uSteps === 200 && mobileReduced.uniforms.uRes[0] === 234);
  viewport(1440, 900);
  const desktopReduced = wait(2000);
  record("reduced-motion desktop resize", desktopReduced, desktopReduced.uniforms.uFocus[0] === 0.72 && desktopReduced.uniforms.uScrimDir === 1 && desktopReduced.uniforms.uSteps === 300 && desktopReduced.canvas.backing[0] === 1440);
  viewport(390, 844);
  const mobileReducedAgain = wait(2000);
  record("reduced-motion mobile resize", mobileReducedAgain, mobileReducedAgain.uniforms.uFocus[0] === 0.5 && mobileReducedAgain.uniforms.uScrimDir === 3 && !mobileReducedAgain.overflow);

  const noGLScript = cdp("Page.addScriptToEvaluateOnNewDocument", { source: `(() => { const original=HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext=function(type,...args){return /^webgl/.test(type)?null:original.call(this,type,...args)}; })();` }).identifier;
  cdp("Page.reload");
  const unavailable = wait(2000);
  record("WebGL unavailable fallback", unavailable, unavailable.hostState === "unsupported" && unavailable.canvas.display === "none" && unavailable.heading.text === "Light does not\nleave here" && unavailable.consoleErrors.length === 0);
  cdp("Page.removeScriptToEvaluateOnNewDocument", { identifier: noGLScript });
  const gl1Script = cdp("Page.addScriptToEvaluateOnNewDocument", { source: `(() => { const original=HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext=function(type,...args){return type==='webgl2'?null:original.call(this,type,...args)}; })();` }).identifier;
  cdp("Page.reload");
  const gl1 = wait(2200);
  record("WebGL 1 shader pipeline", gl1, gl1.webglVersion.startsWith("WebGL 1.0") && gl1.hostState === "" && gl1.glError === 0 && gl1.consoleErrors.length === 0);
  cdp("Page.removeScriptToEvaluateOnNewDocument", { identifier: gl1Script });
  const noHDRScript = cdp("Page.addScriptToEvaluateOnNewDocument", { source: `(() => { for(const Type of [WebGLRenderingContext,WebGL2RenderingContext]){const original=Type.prototype.getExtension; Type.prototype.getExtension=function(name){return /^EXT_color_buffer_(half_)?float$/.test(name)?null:original.call(this,name)}} })();` }).identifier;
  cdp("Page.reload");
  const noHDR = wait(2200);
  record("8-bit encoded render target fallback", noHDR, noHDR.uniforms.uEncode === 1 && noHDR.uniforms.uDecode === 1 && noHDR.uniforms.uPack === 0.12 && noHDR.glError === 0 && noHDR.consoleErrors.length === 0 && noHDR.frames > 0);
  cdp("Page.removeScriptToEvaluateOnNewDocument", { identifier: noHDRScript });
  motion("no-preference");
  viewport(1440, 900);
  cdp("Page.reload");
  const rootDesktop = wait(2400);
  record("root desktop production", rootDesktop, rootDesktop.uniforms.uFocus[0] === 0.72 && rootDesktop.uniforms.uScrimDir === 1 && rootDesktop.canvas.backing[0] === 1440 && rootDesktop.consoleErrors.length === 0 && rootDesktop.resources.every(r=>r.status===200));
  capture("01-desktop.png");
  viewport(390, 844);
  const rootMobile = wait(2200);
  record("root mobile resize", rootMobile, rootMobile.uniforms.uFocus[0] === 0.5 && rootMobile.uniforms.uScrimDir === 3 && rootMobile.canvas.backing[0] === 390 && !rootMobile.overflow);
  capture("02-mobile.png");
  viewport(1440, 900);
  const rootDesktopAgain = wait(2200);
  record("root desktop resize back", rootDesktopAgain, rootDesktopAgain.uniforms.uFocus[0] === 0.72 && rootDesktopAgain.uniforms.uSteps === 300 && !rootDesktopAgain.overflow);
  viewport(767, 900);
  const boundaryMobile = wait(1600);
  record("767px requested viewport matches actual media query", boundaryMobile, boundaryMobile.uniforms.uFocus[0] === (boundaryMobile.narrow ? 0.5 : 0.72) && boundaryMobile.uniforms.uScrimDir === (boundaryMobile.narrow ? 3 : 1) && !boundaryMobile.overflow);
  viewport(766, 900);
  const belowBoundary = wait(1600);
  record("766px mobile breakpoint", belowBoundary, belowBoundary.narrow && belowBoundary.uniforms.uFocus[0] === 0.5 && belowBoundary.uniforms.uScrimDir === 3 && !belowBoundary.overflow);
  viewport(768, 900);
  const boundaryDesktop = wait(1600);
  record("768px breakpoint", boundaryDesktop, boundaryDesktop.uniforms.uFocus[0] === 0.72 && boundaryDesktop.uniforms.uScrimDir === 1 && !boundaryDesktop.overflow);
  viewport(1440, 900);
  navigate("http://127.0.0.1:4177/blackhole-hero-react/eval/");
  const subpath = wait(2400);
  record("subpath desktop production", subpath, subpath.resources.every(r=>r.status===200&&r.url.startsWith("http://127.0.0.1:4177/blackhole-hero-react/eval/")) && subpath.consoleErrors.length === 0 && subpath.glError === 0);
  capture("03-subpath-desktop.png");
  viewport(390, 844);
  const subpathMobile = wait(2200);
  record("subpath mobile production", subpathMobile, subpathMobile.uniforms.uFocus[0] === 0.5 && subpathMobile.uniforms.uScrimDir === 3 && !subpathMobile.overflow);
  capture("04-subpath-mobile.png");
  record("accessibility snapshot", command("snapshot"));
  const failures = report.filter(entry=>!entry.pass);
  console.log(`Browser checks: ${report.length - failures.length}/${report.length} passed`);
  if (failures.length) process.exitCode = 1;
} catch (error) {
  record("verification interrupted", { message: error.message }, false);
  process.exitCode = 1;
}
