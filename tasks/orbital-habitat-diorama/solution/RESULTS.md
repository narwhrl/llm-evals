# 结果报告 · orbital-habitat-diorama

## 候选标识

- 完整模型标识：`magpie/devin/deepseek-v4.1-flash`
- 候选 ID：`deepseek-v4.1-flash`
- 起始 `main` commit SHA：`091c801b98342f2e778bd356e0c55b7372398541`
- 运行方式：在仓库根目录以该 SHA 创建独立本地工作树（`.worktrees/orbital-deepseek-v4.1-flash`，detached HEAD），全部实现只写入该工作树的 `tasks/orbital-habitat-diorama/solution/`。
- 独立完成：未使用子代理、未调用其他模型生成代码、未参考其他候选的源码。唯一的代理调用是交付前的视觉评审，只读取本候选自己产出的 `evidence/*.png` 并给出意见，不产生代码。

## 交付内容

- `solution/`：Vite + three.js 单页场景，无 UI，正交等距相机。
- `solution/evidence/`：`1440 × 900` 视口下的五张实机截图。
- `solution/README.md`：安装、开发、构建、预览命令与结构说明。
- 依赖锁定：`three@0.186.1`、`vite@8.3.5`，含 `package-lock.json`。

## 实际执行的验证命令与结果

### 1. 开发环境与实机截图

开发服务器：

```bash
npm run dev -- --port 5191 --strictPort
```

浏览器（Chrome，Puppeteer 驱动，`1440 × 900`，deviceScaleFactor 1）加载 `http://localhost:5191/`，通过场景暴露的控制面设置相机与轨道时间后截图，结果写入 `solution/evidence/`：

```bash
node evidence.mjs
# evidence written to .../solution/evidence
# console errors: none
```

五张截图均来自同一运行版本，未做图像合成、未替换模型、未在截图时启用额外效果。

### 2. 交互验证

用真实指针事件逐项操作并读取场景状态，全部通过：

```bash
node interact.mjs
```

| 交互 | 结果 |
| --- | --- |
| 拖拽旋转 | 相机位置改变 |
| 滚轮缩放 | 正交视锥改变（`top` 2.905） |
| 单击大舷窗 | `fastForward` 变为 `true`，且未触发聚焦 |
| 再次单击 | 恢复 `false` |
| 在舷窗内拖动 | 轨道时间 0.179 → 0.548，`fastForward` 保持 `false`（单击与拖动已区分） |
| 点击工作台 | 聚焦 `workstation` |
| 点击植物生长灯 | 生长灯 `true` → `false` |
| 点击地板灯带 | 夜航 `false` → `true` |
| 点击漂浮笔 | `penSpin` 0 → 0.923 |
| 鼠标靠近漂浮笔 | 笔位移 0.1611 m |

该次运行的控制台与网络错误：仅 `favicon.ico` 404，已补内联 SVG 图标，之后复测为 `none`。

### 3. 生产构建（`--base` + `--outDir`）

```bash
MSYS_NO_PATHCONV=1 npm run build -- "--base=/orbital-habitat-diorama/deepseek-v4.1-flash/" "--outDir=dist-test" --emptyOutDir
```

结果：构建成功，产出 `index.html` 与 `assets/`（three.js 包 806 kB / gzip 211 kB，三张地球贴图分别 512 kB、735 kB、260 kB）。生成的 `index.html` 中脚本引用为 `/orbital-habitat-diorama/deepseek-v4.1-flash/assets/index-*.js`，说明 `--base` 生效。

> 注：在 Git Bash 下直接写 `--base=/...` 会被 MSYS 转成 Windows 路径（曾产出 `/Program Files/Git/...` 前缀）。这是 shell 行为，不是构建配置问题；加 `MSYS_NO_PATHCONV=1` 后正确。

### 4. 生产产物在非根子路径下的运行验证

把 `dist-test/` 挂到 `orbital-habitat-diorama/deepseek-v4.1-flash/` 子路径下用静态服务器托管，再以浏览器加载：

```bash
node prod.mjs
```

结果：

```text
ready: true, drawCalls: 1423, triangles: 230676
assets: index-*.js, earth_day-*.jpg, earth_night-*.png, earth_clouds-*.png
remote: []
console/network errors: none
```

即：全部资源从子路径本地加载，没有远程请求，没有控制台或网络错误，场景正常渲染。

### 5. 视觉自检

- 自己读图：对五张 evidence 逐张查看，并针对舷窗区域做像素采样（例如夜间窗口中心从 `120,106,94` 的灰盘修正到 `23,40,64` 的深蓝，再按城市灯光贴图的 UV 采样确认亮区朝向）。
- 独立视觉评审：交付前调用了两次只读的视觉评审（读取本候选自己的 evidence），据其意见修复了以下实质问题：
  1. 地球曾只占窗口一小块且无弧面 → 放大球体并让球体边缘落在窗口内，露出地平弧线与大气辉光。
  2. 夜景舷窗曾是一块灰白盘 → 夜间只让真正的高亮像素发光，基底压到近黑。
  3. 城市灯光过于稀疏 → 加载时对夜间贴图做一次盒式模糊 + 提亮，并按 UV 扫描选定城市灯光最密集的经度朝向。
  4. 舱壁挂件在聚焦视角下穿窗 → 把遮挡判定改为对首屏与全部聚焦取景逐一测试。
  5. 漂浮碎片、悬空把手 → 改为贴墙安装的把手与卷好的系绳。
  6. `05-fast-forward` 与 `01-day` 几乎相同 → 改用明显不同的轨道相位截取，两者现在光照角度与地球朝向均不同。

评审仍指出的未达标项（如实记录）：地球在窗口内虽然露出弧线，但仍偏「铺满」，比任务描述的「巨大地球」观感弱；部分区域（远端地板、夜航模式下左侧地面）压得较暗；细节密度在远景下可读、但三级细节（织物经纬、纸面文字、叶片水珠）只有贴近看才成立。

## 素材来源与许可

| 素材 | 来源 | 许可 |
| --- | --- | --- |
| `earth_day.jpg` | three.js 官方示例 `earth_atmos_2048.jpg`（NASA Visible Earth 数据） | 公有领域 |
| `earth_night.png` | three.js 官方示例 `earth_lights_2048.png`（NASA Earth Observatory 城市灯光数据） | 公有领域 |
| `earth_clouds.png` | three.js 官方示例 `earth_clouds_1024.png` | 公有领域 |

其余贴图全部由 `src/textures.js` 在浏览器内用 Canvas 2D 程序化生成，随源码一起分发，运行时不依赖任何远程资源（生产验证中 `remote: []` 已证实）。

## 已知限制与失败

- 白天地球的亮度经过手工调校以同时满足「地球是视觉重心」与「舱内通亮」，不是物理正确的辐照度。
- 正交相机下「聚焦」通过缩放视锥实现，因此聚焦时不会产生透视景深变化。
- 夜间窗口外的星空是场景背景，不是独立粒子系统。
- 在非常窄的窗口下构图会变松（正交视锥按宽高比调整，未针对竖屏单独设计）。
- 未做移动端触摸手势的专门适配（指针事件可用，但双指缩放未实现）。

## 需要人工介入的事项

无。候选可独立构建、运行与验收。
