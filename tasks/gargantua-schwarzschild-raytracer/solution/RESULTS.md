# RESULTS — GARGANTUA Schwarzschild Black Hole Raytracer

- 候选模型完整标识:`zhipuai-coding-plan/glm-5.3`(Kimi Code CLI 会话)
- 分支:`llm/gargantua-schwarzschild-raytracer/glm-5.3`
- 起始 main commit SHA:`830739e3c4aade4b7ee072c121860b7a9ee87b7e`
  (任务基线提交 `docs: add Gargantua raytracer evaluation task`,分支由此创建;当前 main 已前移,未做 merge/rebase)
- 验证日期:2026-09-22,环境:Windows + Node v24.21.0 / npm 11.19.0

## 1. 构建与静态服务(实际执行)

| 命令 | 结果 |
| --- | --- |
| `npm install` | exit 0;"found 0 vulnerabilities"。npm 提示 esbuild 的 postinstall 未被 allowScripts 覆盖(warn);esbuild 二进制经平台 optional dependency 解析,不影响构建 |
| `npm run build`(`tsc --noEmit && vite build`) | exit 0,多轮执行均成功;最终产物 `dist/assets/index-*.js` ≈ 807 kB(minified),chunk 体积为提示性 warning,非错误 |
| `npx vite preview --port 4173 --strictPort` | 启动成功,`GET /` 返回 200;验收结束后已停止,交付时不留运行中的 server |

运行时无网络请求:Three.js 经 vite alias 全部解析到仓库内 `vendor/three/`(three@0.186.0,由 `scripts/vendor.mjs` 从锁文件版本拷贝,来源与许可见 `vendor/README.md`);无远程贴图/HDRI/字体/音频/API。

## 2. 浏览器验收(实际观察)

浏览器:用户本机 Chromium(经 Kimi WebBridge 驱动真实浏览器)。页面内置错误收集器(`window.__GARGANTUA_DEBUG__.errors` 捕获 error / unhandledrejection / console.error)。**以下全部会话中收集器均为空,控制台无错误。**

### 渲染完整性(桌面,1440×900 与原生窗口两种视口均截图目检)

- 事件视界阴影深黑、居中;光子环细且连续。
- 吸积盘:主像横贯 + 黑洞上方拱形次级像 + 下方细环高阶像,三层结构可辨;右侧 Doppler 增亮(白黄)与左侧红移暗侧对比明确;软高光膝盖避免了整片纯白。
- 程序化星空 + 银河带经透镜映射可见,亮度不喧宾夺主;暗角/颗粒/色散克制。
- 截图由视觉审查子代理逐张复核(结论:达到可交付验收水准;遗留仅为轻微抛光项:右侧高温核心偏亮、个别亮星带轻微色散边)。

### 调试视图 0–9

全部逐个渲染并截图目检:1 步数/终止(含视界红区、逃逸蓝青梯度)、2 视界掩码、
3 盘面交点阶次(蓝=1/绿=2/细环内金/品红=3+/4+)、4 红移 g 因子发散色图、
5 逃逸方向网格+偏折热图、6 仅星空(捕获区保持黑,符合物理)、7 湍流热量场、
8 后处理前线性 HDR(合成 pass 中 bypass bloom/grade)、9 临界 impact parameter 亮环。
HUD 显示当前编号与说明。

### 预设、相机与快捷键

- 4 个预设(赤道全景/极地俯瞰/光子环特写/远眺银心)经 `setPreset` 与 `Shift+1..4` 均正确切换并带 1.4s 缓动;特写预设构图完整入画。
- 快捷键(合成 KeyboardEvent 派发验证):`0–9` 切调试、`Shift+1–4` 切预设、`Space` 电影循环开/关(用户拖拽经 OrbitControls `start` 事件接管后不再自动夺回)、`H` HUD 显隐、`R` 重置、`Q` 质量循环(cinematic→standard 验证)、`M` 音频开关;均实际改变状态。
- OrbitControls 相机位置/朝向/FOV 每帧写入 shader uniform(拖拽/缩放改变透镜视角由代码路径与预设/滑杆联动验证;合成指针事件非 trusted,未做真实拖拽模拟——见"限制")。

### 参数、持久化与重置

- HUD 含 21 项参数滑杆(视场角/相机距离/方位角/俯仰角/时间倍率/盘内外半径/半厚度/温度/发射强度/轨道速度倍率/湍流幅度/速度/恒星密度/银河亮度/Bloom 强度/阈值/曝光/暗角/颗粒/色散),分组折叠、带当前值;DOM 中确认 21 个 `input[type=range]`。
- 修改滑杆(曝光度→2.5、Bloom 强度→1.2)与 API(setDebug/setQuality)后刷新页面,状态从 `localStorage["gargantua.state.v1"]`(含 version:1)完整恢复;`R` 重置后参数回默认且存储被清除。
- capture 会话不覆写持久化存储(专项修复并验证);`pagehide` 时同步 flush,防止改完立即刷新丢失。

### URL 截图契约

- `?capture=1&quality=high&preset=0&debug=0&time=8&hud=1`:首次可截图帧前应用(quality/preset/debug/hud 生效、time 冻结、镜头循环关闭、音频关闭);`document.documentElement.dataset.gargantuaReady === 'true'`;`window.__GARGANTUA__` 就绪。
- `?capture=1&quality=cinematic&preset=2&debug=5&time=20&hud=0`:全部正确应用并截图。
- 非法值回退:`quality=ultra&preset=9&debug=12&time=abc&hud=5` → 安全回退(high/0/0/0s/true),无异常无黑屏。
- API 校验:`setQuality("ultra")`、`setPreset(-1)`、`setPreset(1.5)`、`setDebug(10)`、`setTime(-3)`、`setTime("x")` 全部返回 `{ok:false,error}` 不抛异常;`setTime(12.5)`、`setQuality("cinematic")` 生效并返回更新后状态。

### 质量档

三档预算(见 `state/defaults.ts`):Standard(renderScale 0.7 / 220 步 / stepScale 1.4 / 4 bloom mip / DPR≤1.5)、High(0.85 / 320 / 1.0 / 5 / ≤2)、Cinematic(1.0 / 460 / 0.75 / 6 / ≤2)。切换时重建渲染目标与步进预算(代码路径 + Q 循环验证);移动端默认 Standard。

### 移动端 / Retina

- 390×844 @DPR2 模拟:场景完整渲染(HalfFloat 内部缓冲随 DPR×renderScale 缩放),HUD 为紧凑布局:参数抽屉与操作说明默认收起、底部 0–9 调试条横排全量可见、主体大面积不被遮挡(修复后复检通过)。
- resize 经 ResizeObserver + `renderer.setPixelRatio(min(dpr, cap))` 处理;窗口/视口模拟切换无错误、无黑屏。

### WebGL 上下文恢复

- 经 `WEBGL_lose_context` 扩展(`window.__GARGANTUA_DEBUG__.loseContext()`)诱导丢失:出现"WebGL 上下文已丢失"覆盖层、渲染暂停;`restoreContext()` 后 renderer/管线/材质全部重建,状态保留(质量档等)、覆盖层消失、画面恢复,**无页面刷新、无控制台错误、ready 保持 true**。

### 音频(可选功能)

`M` 开关程序化 WebAudio 氛围 pad;默认关闭,仅用户手势后创建 AudioContext,开关往返无 autoplay 错误(控制台收集器为空)。

## 3. 已知限制与需人工介入事项

1. **OrbitControls 真实拖拽未做合成验证**:合成指针事件非 `isTrusted`,OrbitControls 会忽略;相机联动已通过预设/滑杆/API 路径与代码审查验证。建议人工拖拽/滚轮/触摸各一次复核手感。
2. **氛围音未做人耳听感确认**:仅验证开关状态与无 autoplay 报错;音色主观品质需人工试听。
3. **自动目检方式**:截图由视觉模型子代理复核(黑洞结构/调试视图/移动端布局逐项结论记录于会话);非人眼逐像素验收。
4. 高阶盘面像(3 次以上穿越)只出现在光子环邻近的细环带内,属物理尺度,非缺陷。
5. 验收浏览器标签页处于后台(隐藏)状态:浏览器暂停 rAF,引擎看门狗以低频定时器继续渲染保证截图契约可用;前台使用时为正常 rAF 路径。
6. 交付时无任何 dev/preview server 残留;验收期后台标签组《GARGANTUA 验证》(localhost:4173)保留在用户浏览器中,可手动关闭。
