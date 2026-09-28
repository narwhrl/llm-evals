# 结果报告 — voxel-chinese-architecture / glm-5.3-flash

## 模型与基线

- 完整模型标识：`account:bigmodel-individual-coding-plan/GLM-5.3-Flash`（ZCode CLI 会话，candidate-id `glm-5.3-flash`）
- 起始 `main` commit SHA：`8409ab9ad67e2999707f475ee1e871ebe0f1c7b1`（克隆以 `git clone --no-local` 建立并 detach 到该 SHA，remote 已移除；`.git/logs/HEAD` 首条记录可复核）
- 实现路径：`tasks/voxel-chinese-architecture/solution/`
- 人工介入：无。任务由模型一次会话独立完成；过程中未接受人工提示、纠正或重试指令。

## 实现概要

纯原生 Three.js 0.170.0 + Vite 5.4.11（无 React、无后端、无远程资源）。体素引擎 `VoxelWorld`：稀疏 Map 收集整数体素（对称布局按 x=0 镜像摆放），落盘时仅输出六邻域非空的"暴露"体素到单个 `InstancedMesh`（BoxGeometry + MeshLambertMaterial + instanceColor），灯笼火光类自发光体素单独一个 `MeshBasicMaterial` 实例网格；坐标哈希确定性微抖动提供 Minecraft 式颗粒感。

场景为中轴对称院落（坐北朝南，7 座建筑）：山门（城台式门座、贯通门洞、门楼歇山黄琉璃顶、侧门龛、匾额、石狮一对）→ 石板甬道/前庭大院（灯柱、幡旗）→ 三层汉白玉台基主殿（五踏大阶、红墙红柱外凸檐柱、格扇窗、金框大门与匾额、斗拱带、歇山黄琉璃顶带檐角飞檐与正脊鸱吻，全场体量最大）→ 东西配殿（青瓦庑殿顶，带正脊）对称；钟楼/鼓楼（两层方楼、四向券门、楼内悬金钟/立大鼓、腰檐平座、绿琉璃攒尖顶）；主殿后七层宝塔（逐层收分、叠涩檐、塔刹攒尖金顶）。红墙灰帽围合、四角墩台；铺装动线：山门 → 庭院 → 大阶 → 主殿，支路通配殿/钟鼓楼/东西回廊/后部宝塔；桧柏、花树、铜香炉、石狮点缀。

黄昏氛围：CanvasTexture 渐变暮色天空（黛蓝→暖金）+ 远雾；DirectionalLight 暖金主光（4096 PCFSoft 阴影，normalBias 消除体素阴影痤疮）+ HemisphereLight 天光；ACESFilmic 色调映射。相机 OrbitControls（阻尼、限极角不入地），页面打开即为全景机位，无需任何操作。

## 实际执行的命令与结果

环境：Windows 11 (10.0.26200)，Git Bash，Node v24.21.0（fnm 绝对路径调用），npm 11.19.0，registry https://registry.npmjs.org/

| 命令 | 结果 |
| --- | --- |
| `npm install`（solution/ 内，经全局 npm-cli.js 调用） | 退出码 0；`added 12 packages`；生成 `package-lock.json`；esbuild postinstall 被 npm allowScripts 策略拦截（仅告警），`node_modules/esbuild/bin/esbuild --version` → 0.21.5 验证可用 |
| `npm run build`（= `vite build`，经 `node node_modules/vite/bin/vite.js build`） | 退出码 0；`dist/index.html` 1.13 kB、`dist/assets/index-*.js` 502.56 kB (gzip 127.38 kB)，约 640 ms；迭代中多次增量重建均成功。chunk >500 kB 告警为 three.js 体积提示，不影响构建 |
| `vite preview --port 4173 --strictPort` | 服务启动监听 `[::1]:4173`；`curl --noproxy '*'` 对 `http://[::1]:4173/` 与 `http://localhost:4173/` 均返回 200，HTML 正常 |

## 浏览器验收（实际观察）

使用 kimi-webbridge 驱动用户真实 Chrome（session `voxel-arch-glm53flash`，标签组「体素中国古建筑群验收」），全部结论来自实际截图（Read 自审）与页面内状态读取。`Emulation.setDeviceMetricsOverride` 视口 1440×900 dsf=1；用户 Chrome 自身缩放使实际 DPR≈1.1（见限制）。

### 画面完整性

- 加载即呈现完整建筑群全景，无需任何操作：山门前景（石狮、灯笼）、中央甬道与大院铺装、台基主殿（黄琉璃歇山顶、斗拱、红柱格扇）、东西配殿（灰瓦庑殿）、钟鼓楼（绿琉璃攒尖）、宝塔、红墙墩台全部可读，主次关系与中轴对称成立。
- 多机位环视（CDP `Input.dispatchMouseEvent` 拖拽 OrbitControls，方位角自东南经南、西南到北侧往复，俯仰与滚轮缩放合计约 40 次输入事件）：逐一截图自审——主殿正面柱廊/格扇窗/金框大门/匾额/大阶/铜香炉/檐下吊灯细节可辨；北侧主殿后檐与鸱吻、山门门洞南北贯通可见光；宝塔近景逐层收分与塔刹正确；钟鼓楼两层结构与券门、楼内钟鼓、腰檐、金顶完整。
- 阴影：暖金主光自西入射，建筑群在西/北立面与地面形成连续长影，台基、屋檐下阴影层次清晰，无阴影痤疮。

### 控制台与网络

- 全程（多次加载、全部环视缩放交互、多次重建后 reload）挂接 `console.error/warn`、`window.onerror`、`unhandledrejection` 收集器：最终读取 `window.__errors` 为 **空数组，零错误零警告**。
- `network` 捕获一次完整加载：仅 `http://localhost:4173/`（HTML）与 `http://localhost:4173/assets/index-*.js`（JS）两个页面请求，均 200；另一条为 kimi-webbridge 扩展自身注入脚本（非页面请求）。**无任何 CDN/远程/需凭证请求**。

### 验收中发现并修复的问题（每次修复后重建并复验）

1. 山门屋顶逐层收分 1 使 35 宽的城台形成金字塔状陡顶 → 改为 x/z 向各收 2，檐口比例恢复正常。
2. 配殿屋顶平面近方形且各向收分 1，读作攒尖金字塔 → z 向收分改为 2，形成庑殿正脊。
3. 幡旗旗面朝东西方向，主视角侧棱不可见 → 旗面改为南北朝向。
4. 山门侧面门龛开挖深度差一拍未真正开门洞 → 修正开挖区间。
5. 默认机位构图偏、前景草地过多 → 相机移至 (96,70,204)/目标 (0,4,0)，全景居中。

## 已知限制与说明

1. **DPR**：用户 Chrome 显示缩放使 `devicePixelRatio≈1.1`（非 1.0/2.0 整数档）；验收即在该 DPR 下完成，renderer 以 `Math.min(devicePixelRatio, 2)` 适配，未发现渲染异常。未在恰好 2.0 的 Retina 屏幕实测。
2. **后台标签节流**：页面使用标准 rAF 循环，后台标签中渲染暂停属浏览器行为；验收时通过 `Emulation.setFocusEmulationEnabled` 保持标签活跃。标签重新可见后渲染自动恢复。
3. **触屏**：桌面任务，未做移动端/触摸测试；OrbitControls 触摸路径为库内建行为。
4. **环境事故（非候选缺陷）**：验证中发现上轮 cs-pvp-diorama/glm-5.3-flash 运行遗留的孤儿 `vite preview`（PID 33224，今晨 07:44 启动，绑定 0.0.0.0:4173）在本次 preview 包装进程退出后占用端口，浏览器一次 reload 曾加载到该候选页面并截图记录；已终止孤儿进程并以分离方式重启本任务 preview（PID 15260）后完成全部验收。
5. 本任务无固定可执行测试（任务 README 明确不提供 starter/测试），验证以生产构建 + 实际运行 + 浏览器观察为准。

## 交付状态

- 无残留 dev/preview 服务器：孤儿进程 PID 33224 与本任务 preview PID 15260 均已 `taskkill /F`，端口 4173 复测连接拒绝（仅剩 TIME_WAIT/CLOSE_WAIT 遗留态，无 LISTENING）。
- `solution/` 内不含 `node_modules/`、不含构建产物 `dist/`（`.gitignore` 排除）；运行时依赖仅 three（npm 本地安装），无任何远程资源。
- 未修改 `task.md`、`README.md`、共享任务输入或仓库其他文件。
