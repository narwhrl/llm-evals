# GARGANTUA — Schwarzschild Black Hole Raytracer

React + Vite + TypeScript 全屏交互式黑洞渲染网站。主画面由本地 Three.js 驱动的
全屏 Fragment Shader 逐像素数值积分 Schwarzschild 零测地线产生:事件视界、光子环、
多次穿越的吸积盘(主像/次级像/高阶环)、Doppler 增亮与引力红移、程序化星空与
银河带、HDR Bloom + ACES 后处理。

运行时不依赖任何网络资源;Three.js 以版本锁定的本地 `vendor/` ESM 构建提供
(见 `vendor/README.md`),`node_modules/` 仅作构建期输入。

## 命令

```bash
npm install     # 安装依赖并通过 postinstall 生成/校验 vendor/(见 scripts/vendor.mjs)
npm run dev     # 开发服务器
npm run build   # 类型检查(tsc --noEmit)+ 生产构建 → dist/
npm run preview # 静态服务器预览生产构建(端口 4173)
```

无后端、无密钥、无运行时网络服务。`npm install` 需要访问 npm registry;
`build`/`preview` 之后的运行完全离线。

## 操作

- 拖拽旋转 / 滚轮、双指缩放(OrbitControls,真实传入 shader 相机)
- `0`–`9` 调试视图(步数/终止、视界掩码、盘面交点阶次、红移、透镜坐标、
  星空、湍流场、原始 HDR、临界光参)
- `Shift+1`–`Shift+4` 视角预设;`Space` 电影镜头播放/暂停;`H` HUD 显隐;
  `R` 重置;`Q` 质量档(Standard/High/Cinematic);`M` 氛围音(程序化,默认关)
- 右侧参数面板含 21 项控件;全部状态版本化持久化到 localStorage,可一键重置

## 截图自动化契约

```
http://localhost:4173/?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

就绪后 `document.documentElement.dataset.gargantuaReady === "true"`,并暴露
`window.__GARGANTUA__`(`ready` / `getState()` / `setQuality` / `setPreset` /
`setDebug` / `setTime`,非法输入返回 `{ ok: false, error }` 而非抛异常)。
另有仅用于验收测试的 `window.__GARGANTUA_DEBUG__`(含 `loseContext` /
`restoreContext` 与 `errors` 收集器)。

## 结构

```
src/
  engine/Engine.ts              渲染循环、质量档、上下文恢复、ready 契约
  engine/shaders/raytrace.glsl.ts  零测地线积分器/吸积盘/背景/调试视图(含推导注释)
  engine/shaders/post.glsl.ts      bloom 阈值/降采样/上采样 + ACES 合成
  engine/audio.ts                程序化氛围音
  state/defaults.ts              21 项参数定义、质量档预算、预设
  state/store.ts                 版本化持久化 store、URL capture 解析
  state/shortcuts.ts             全局快捷键
  ui/                            HUD(状态/预设/调试条/参数面板/覆盖层)
vendor/                          本地 Three.js ESM(见 vendor/README.md)
```
