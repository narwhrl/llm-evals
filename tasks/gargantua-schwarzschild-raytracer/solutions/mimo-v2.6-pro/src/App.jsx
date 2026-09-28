import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import RendererManager from './render/RendererManager.js';
import { appStore } from './state/store.js';
import { loadPersistedState, savePersistedState, resetPersistedState } from './state/persistence.js';
import { parseUrlState } from './state/urlState.js';
import { installBridge } from './state/bridge.js';
import { installShortcuts } from './ui/shortcuts.js';
import { DEFAULT_PARAMS, QUALITY_LEVELS } from './state/defaults.js';
import Hud from './ui/Hud.jsx';

function angleDiff(a, b) {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

export default function App() {
  const stageRef = useRef(null);
  const state = useSyncExternalStore(appStore.subscribe, appStore.get);
  const [simTimeDisplay, setSimTimeDisplay] = useState(0);
  const timeRef = useRef({ simTime: 0, frozen: 0 });

  useEffect(() => {
    const url = parseUrlState();
    const persisted = loadPersistedState();
    if (!persisted) savePersistedState(appStore.get()); // 版本化写回默认

    // 初始状态：持久化 → URL 覆盖（仅覆盖查询串中出现的键；非法值已在 parseUrlState 回退默认）
    const params = { ...DEFAULT_PARAMS, ...(persisted ? persisted.params : {}) };
    const next = {
      params,
      quality: url.present.quality ? url.quality : persisted?.quality ?? 'high',
      debug: url.present.debug ? url.debug : persisted?.debug ?? 0,
      hudOpen: url.present.hud ? url.hud === 1 : persisted?.hudOpen ?? true,
      preset: persisted?.preset ?? 0,
      capture: url.captureMode,
    };
    appStore.set(next);
    if (url.present.preset) appStore.applyPreset(url.preset);
    if (url.captureMode) timeRef.current = { simTime: url.time, frozen: url.time };

    const mgr = new RendererManager(stageRef.current).init();
    mgr.onStatusChange = (s) => appStore.setCtxStatus(s);
    const apply = appStore.get();
    mgr.setQuality(QUALITY_LEVELS[apply.quality] ? apply.quality : 'high');
    mgr.setDebugView(apply.debug);
    mgr.applyParams(apply.params);
    mgr.setCameraSpherical(apply.params);

    // OrbitControls → store：手动接管（'start' 停止电影循环），位置/朝向写回参数表
    mgr.controls.addEventListener('start', () => appStore.setPlaying(false));
    mgr.controls.addEventListener('change', () => {
      const sph = mgr.getCameraSpherical();
      appStore.setParams({
        camDist: sph.camDist,
        camAzimuth: sph.camAzimuth,
        camElevation: sph.camElevation,
        fov: sph.fov,
      });
    });

    // store → 渲染器：参数 uniform、相机球坐标（差值超阈值才写，防双向同步回环）、调试视图、质量档
    const sync = (s) => {
      mgr.applyParams(s.params);
      const cur = mgr.getCameraSpherical();
      const q = s.params;
      if (
        Math.abs(cur.camDist - q.camDist) > 0.01 ||
        angleDiff(cur.camAzimuth, q.camAzimuth) > 0.05 ||
        Math.abs(cur.camElevation - q.camElevation) > 0.05 ||
        Math.abs(cur.fov - q.fov) > 0.01
      ) {
        mgr.setCameraSpherical(q);
      }
      mgr.setDebugView(s.debug);
      if (mgr.quality !== s.quality) mgr.setQuality(s.quality);
    };
    const unsub = appStore.subscribe((s) => {
      sync(s);
      savePersistedState(s);
    });

    // 帧循环：模拟时间（capture 冻结）、电影镜头（手动接管即停）、渲染、就绪信号
    let raf = 0;
    let last = performance.now();
    let camTime = 0;
    let elBase = appStore.get().params.camElevation;
    let prevPlaying = false;
    let lastTick = 0;
    let readyDone = false;

    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const s = appStore.get();

      if (url.captureMode) {
        timeRef.current.simTime = timeRef.current.frozen;
      } else {
        timeRef.current.simTime += dt * s.params.timeScale;
      }

      if (s.playing && !s.capture) {
        if (!prevPlaying) elBase = s.params.camElevation;
        camTime += dt;
        appStore.setParams({
          camAzimuth: (s.params.camAzimuth + 6 * dt) % 360,
          camElevation: elBase + 3 * Math.sin(0.1 * camTime),
        });
      }
      prevPlaying = s.playing;

      mgr.renderFrame(timeRef.current.simTime);

      if (now - lastTick > 250) {
        lastTick = now;
        setSimTimeDisplay(timeRef.current.simTime);
      }
      if (!readyDone) {
        readyDone = true;
        // 先暴露状态桥再置 ready —— gargantuaReady = "true" 蕴含 __GARGANTUA__ 已可用
        installBridge(appStore, {
          getTime: () => timeRef.current.simTime,
          setTime: (t) => {
            timeRef.current.frozen = t;
            timeRef.current.simTime = t;
            return true;
          },
        });
        document.documentElement.dataset.gargantuaReady = 'true';
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const unkeys = installShortcuts({
      onDebug: (i) => appStore.setDebug(i),
      onPreset: (i) => appStore.applyPreset(i),
      onTogglePlayback: () => appStore.togglePlayback(),
      onToggleHud: () => appStore.toggleHud(),
      onCycleQuality: () => appStore.cycleQuality(),
      onReset: () => {
        resetPersistedState();
        appStore.resetAll();
        savePersistedState(appStore.get());
      },
    });

    return () => {
      cancelAnimationFrame(raf);
      unsub();
      unkeys();
      mgr.dispose();
    };
  }, []);

  const onResetAll = () => {
    resetPersistedState();
    appStore.resetAll();
    savePersistedState(appStore.get());
  };

  return (
    <div className="app-root">
      <div className="stage" ref={stageRef} />
      <Hud
        state={state}
        simTime={simTimeDisplay}
        capture={state.capture}
        onResetAll={onResetAll}
        actions={{
          setParam: (key, value) => appStore.setParam(key, value),
          applyPreset: (i) => appStore.applyPreset(i),
          cycleQuality: () => appStore.cycleQuality(),
          toggleHud: () => appStore.toggleHud(),
        }}
      />
    </div>
  );
}
