# RESULTS — GARGANTUA 史瓦西黑洞光线追踪器

## 模型与基线

- 完整模型标识：`xiaomi/mimo-v2.6-pro`
- 起始 `main` commit SHA：`ee2c9f2cc8b9b410ebd55d1c195e96a9cdbd4ce3`
- 分支：`llm/gargantua-schwarzschild-raytracer/mimo-v2.6-pro`（自上述 SHA 起，无跨分支引入）
- 环境：Windows 11 x64；Node v24.21.0；npm 11.19.0；headless Chromium（harness 托管浏览器，ANGLE/SwiftShader）；
  验收视口 桌面 1440×900、移动 390×844（`page.setViewport` deviceScaleFactor=2 实测 dpr=2.0）
- 依赖版本：react@18.3.1、react-dom@18.3.1、vite@6.4.3、@vitejs/plugin-react@4.7.0、three@0.180.0（vendor 来源）
- 工作目录（下称 $SOL）：`tasks/gargantua-schwarzschild-raytracer/solution/`

## 命令与结果（均实际执行）

| 命令（cwd=$SOL） | 结果 |
| --- | --- |
| `npm install react@18.3.1 react-dom@18.3.1` | exit 0（+5 packages） |
| `npm install --save-dev vite@6 @vitejs/plugin-react@4 three@0.180.0` | exit 0（+62 packages；esbuild postinstall 未放行属 npm 提示，构建正常） |
| `npm run vendor`（首次） | exit 1：脚本源路径漏 `build/` 前缀，assert 正确拦截（three.module.js 未复制） |
| `npm run vendor`（修复后） | exit 0：复制 `build/three.module.js`、`build/three.core.js`、`LICENSE` 及 9 个 addon；assert 通过（无 bare `from 'three'` 残留）；生成 `vendor/README.md` |
| `npm run build`（多轮，含里程碑迭代后） | exit 0；`dist/index.html` 生成（51 modules，约 695 kB JS gzip 189 kB） |
| `npm run build -- --base=/gargantua-schwarzschild-raytracer/mimo-v2.6-pro/ --outDir=dist-base-test --emptyOutDir` | exit 0（gallery 契约）；`dist-base-test/index.html` 存在（BASE_BUILD_OK），验证后已删除 |
| `node node_modules/vite/bin/vite.js`（dev 5177）与 `… vite.js preview`（4177） | ready；验收完成后已全部停止（见文末） |

`package-lock.json` 已生成并提交（版本锁定）。

## 浏览器验收结果（1440×900 桌面）

- 基线画面（`evidence/desktop-base.png`，capture 前的默认加载 + ready 等待）：同时可见
  (a) 深黑事件视界剪影、边界清晰、非死屏；(b) 紧贴影边界的明亮细光子环（含内层细环）；
  (c) 吸积盘主像（前后盘面、内亮蓝白→外橙温度渐变）与影上/下方被引力透镜弯曲的次级像弧；
  (d) 盘面按转向单侧的 Doppler 亮度/色温不对称（左亮右暗）；(e) 星场在影边缘拉伸/环绕扭曲。
- 视角预设 `Shift+1..4` → `evidence/preset-0..3.png`：四张构图明显不同（视界边缘 / 极区俯瞰 / 光子环特写 8.5rs·FOV28 / 广角透镜场）。
- 调试视图 1–9 → `evidence/debug-1..9.png`：步数热图（临界环更热）/ 终止原因红蓝黄分区 / 白色视界掩码 /
  盘穿越阶次色块（含 k=2 品红次级像区）/ g 因子蓝红不对称 / 透镜方向假彩色 / 星空银河层 / 处理前 HDR 热图 /
  b–b_crit 临界梯度环；互不雷同、各有诊断意义；`0` 为完整后处理合成。
- 交互：拖拽 orbit + 滚轮缩放真实改变视角（`evidence/interaction-orbit.png`）；`Space` 播放/暂停
  （播放期间方位角推进实测 +6°/s，手动拖拽/相机滑杆接管后保持控制权）；`H` 显隐（桌面右缘悬浮列 +
  回开按钮，不遮挡中央临界结构）；`Q` 质量三档循环（画布分辨率 1800×1125 ⇄ 1350×843 真实变化，
  `evidence/quality-standard.png`、`quality-cinematic.png`）；`R` 全局复位（`evidence/reset-defaults.png`）。
- 21 项参数逐项验证（capture 冻结态像素哈希对照）：21/21 设置生效且改变画面、21/21 `↺` 复位后画面
  逐字节回到基线（含相机四项）。边界断言：`orbitSpeed=0` → Doppler 不对称消失（`evidence/edge-nodoppler.png`）、
  `turbSpeed=0`（关颗粒）→ 时间推进下两帧哈希一致（`evidence/edge-turb-a/b.png`，湍流真静止）、
  `starDensity=0` → 星空消失（`edge-nostars.png`）、`chroma=0` → 色散消失（`edge-nochroma.png`）。
  `timeScale` 专项：2 秒窗口模拟时间增量 1× 档 ≈ 2.00 s、5× 档 ≈ 10.01 s（真实倍率生效）。
- 持久化：改动参数/质量档/预设/调试视图/HUD 状态 → 刷新（无查询串）→ 全部还原（localStorage
  `gargantua.state.v1` 逐字段校验）；全局复位 → 默认值（version 1 schema）。
- `window.__GARGANTUA__` 契约（主世界实测）：`ready` 只读（赋值不生效、不抛异常）；`getState()` 返回
  `{quality, preset, debug, time, hud, capture, params×21}` 快照；非法输入全部拒绝返回 `false`
  （`setQuality('bogus')`、`setPreset(9)`、`setPreset(1.5)`、`setDebug(10)`、`setTime(-1)`、`setTime('5')`）；
  合法输入返回更新后状态（`setDebug(3)`、`setPreset(1)`、`setTime(5)`→`time:5`）。

## capture=1 URL 契约

- 矩阵 40/40：`?capture=1&quality=high&preset={0..3}&debug={0..9}&time=12.5&hud=0` 全部
  `gargantuaReady="true"` 后截图 → `evidence/capture-p{0..3}-d{0..9}.png`；抽样视觉审读（preset 0 全部
  10 张 debug + 4 预设的 debug 0）与上表语义一致。
- 确定性：同一 URL 两次加载截图 MD5 完全一致（`f2b0a296f96dac8f707b7ce6e198b8f8`）；
  3 次独立加载哈希亦一致（时间/颗粒/湍流均按 `time` 冻结）。
- 非法参数 `?quality=zzz&preset=99&debug=12&time=-3&hud=x` → 渲染正常、全部回退默认
  （quality=high、preset=0、debug=0、time=0、hud=1、capture=false）、无异常（`evidence/invalid-query.png`）。

## 移动端 / Retina（390×844、deviceScaleFactor=2）

- dpr=2.0 时画布 585×1266 = `min(2.0, 档位 dprCap 1.5) × renderScale` 精确生效（Retina 处理正确）；
  dpr=1.25 时 487×1055；390⇄1440 resize 往返无拉伸/黑屏。
- HUD 为底部抽屉（收起留把手，展开全参数可滚动），主体可读（`evidence/mobile-base.png`、
  `mobile-drawer.png`、`mobile-look.png`）；抽屉内滑杆触摸可操作（盘温度 0.5→2.0 实测生效）；
  触摸 OrbitControls 真实改变视角（方位 0°→40°、250°→310°，`evidence/mobile-touch-orbit.png`）。

## WebGL 上下文恢复

`WEBGL_lose_context` 扩展在托管浏览器可用（实测）。`loseContext()` → 渲染暂停、HUD 显示
「上下文丢失 - 恢复中…」（`evidence/context-lost.png`，页面非死屏、canvas 保持挂载）；
`restoreContext()` → 重建 render target/material/后处理链、HUD 显示「上下文已恢复」、画面恢复
（`evidence/context-restored.png`）；同一 JS 上下文（无页面刷新），参数/持久化状态保留
（quality=high、debug=0、preset=0、camDist=16 实测）。

## 控制台与网络

- 验收全路径（preview 构建）控制台零 error；开发期仅一条已停 dev server 的 HMR 重载网络错误
  （`127.0.0.1:5177`，与验收路径无关，清空后重验零错误）。
- 网络请求审计：全部请求 host 仅 `127.0.0.1:5177`（开发期）与 `127.0.0.1:4177`（静态预览）；
  无任何 CDN/远程贴图/HDRI/音频/字体/API 请求。

## 视觉调校记录（视觉调试驱动的常数定稿）

发射视觉校准 `DISK_CALIBRATION=0.1`、发射幂律 `Tobs³`（保渐变/防冲灰）、温标 `mix(3000K, 14000K, (rin/r)²)`、
薄层掠射增益限幅 `clamp(|n̂_y|, 0.35, 1)`、穿越三点样点锚定二分穿越参数 τ、盘边缘 smoothstep 0.5rs、
色散默认 0.25、银河默认 0.6、debug 1 热图幂律拉伸。均在 `src/shaders/raytracer.frag.glsl` 与
`src/state/defaults.js` 内注释标注来源与调整原因。

## 已知限制 / 失败 / 所需人工介入

- 氛围音乐为任务可选项，经决定不实现（无 `M` 键；HUD 快捷键区注明）。
- headless Chromium（ANGLE/SwiftShader）与真机 GPU 在细粒度噪点/边缘抗锯齿上可能略有差异；
  结构（视界、光子环、多次盘面像、透镜背景）在两种环境下一致。
- 近轴（b≈0）射线采用解析退化处理（向内即捕获、向外无偏折），不进入积分——依据 b<b_crit 必入视界，
  对可见结构无影响（debug 2 以灰色标识该区域）。
- 所需人工介入：无。
