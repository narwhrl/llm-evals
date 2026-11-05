# RESULTS

- 模型标识：`claude-opus-5-5:max`
- 起始 commit：`f95b2e8c1380b78d2bce7ce335e0ad2e974a5183`（`git rev-parse HEAD`）
- 依赖：`three@0.187.0`；开发依赖 `typescript@7.0.2`、`vite@8.3.6`、`@types/three@0.187.0`
- 运行环境：Windows 11，Node v24.21.0，npm 11.19.0

## 实际运行的命令与结果

均在本运行目录内执行。截图与运行检查使用 `playwright-core@1.64.1` 驱动本机 Chrome（headless，ANGLE D3D11，GPU：Intel Arc 140T），视口 1440×900。该工具装在被 git 忽略的 `.runs/verify/`，不是项目依赖。

| 命令 | 结果 |
| --- | --- |
| `npm install three@0.187.0`、`npm install -D typescript@7.0.2 vite@8.3.6 @types/three@0.187.0` | 成功，0 vulnerabilities |
| `npx tsc --noEmit` | 首次 1 个错误（`MeshToonMaterial` 类型里没有 `flatShading`），修复后通过；之后每轮修改都重新运行并通过 |
| `npx vite build` | 成功；Vite 提示单个 JS chunk 超过 500 kB（约 669 kB，主要是 three.js），仅警告 |
| `npx vite --port 5179 --strictPort` + headless 截图（约 12 轮） | 用于迭代画面：默认镜头、拉近、仰视、俯视、侧面、背面。最初的 `THREE.Clock` 弃用警告和 `PCFSoftShadowMap` 已移除警告都已改掉 |
| `npm run build -- --base=/genshin-celestia/claude-opus-5.5/ --outDir=../../../.runs/verify/dist-sub --emptyOutDir` | 成功；`index.html` 中脚本路径为 `/genshin-celestia/claude-opus-5.5/assets/...` |
| `npx vite preview --port 5180 --strictPort --base=/genshin-celestia/claude-opus-5.5/ --outDir=...` + 70 秒运行检查 | canvas 约 1.6 秒出现；无控制台消息、页面错误或失败请求；8 秒时 66.2 fps，67 秒时 65.9 fps |
| 干净副本（复制 `package.json`、`package-lock.json`、`tsconfig.json`、`index.html`、`src/`）中 `npm ci` | 成功，0 vulnerabilities |
| 同一副本中 `npm run build -- --base=/genshin-celestia/claude-opus-5.5/ --outDir=dist-sub --emptyOutDir` | 类型检查与构建成功（同样的 chunk 大小警告） |
| 同一副本 `npx vite preview --port 5181 ...` + 70 秒运行检查 + 改视口为 1000×700 | 无控制台消息、页面错误或失败请求；63.7 / 65.6 fps；缩放后画面正常重排 |

调试用的 dev server 和 preview 服务均已停止，headless 浏览器每次脚本结束时关闭。

## 观察到的画面

默认首帧（无输入）：三分之四远景，中央巨型岩岛与白色多层尖塔居中，塔顶是多环交错的金色天体仪（背景为蓝天）；外围八座大小不一的浮岛由白色开腹拱桥（部分带柱廊）连成环，另有四条辐射桥连接主岛；岛下是倒悬岩锥和瀑布；下方是云海，左右两处云洞中能隐约看到河流、平原和海岸；左上方有太阳光束，右下方有穿过环隙落向云海的光柱。

细节：主岛台面有广场、大道、方尖碑列、圆顶神殿、副尖塔、沿崖柱廊和树林；倒悬岩壁上有半埋的拱廊遗迹、倒挂尖塔和一圈残断的石环；浮岛上有门楼、瞭望塔、穹顶神殿、残缺尖塔、倒塌柱列；环上一段桥和一条辐桥已断裂，碎块在下坠；岛间漂浮碎石。

## 已知限制

- 天空岛的外观依据模型自身对游戏远景的记忆完成，运行时离线，没有参考图；是否“一眼认出 Celestia”需要人工评审判断。
- 全部程序化生成，无贴图和外部模型。岩石为平面着色的多面体，近看有明显的低多边形感；卡通渲染基于 `MeshToonMaterial` 加自定义明暗渐变与边缘光，不是专门复刻的原神着色器，也没有描边。
- 云海是位移高度场加公告板积云，不是体积云；为避免从下方看穿单面云层，相机俯仰角限制在 100° 以内。近处积云是平面精灵，贴近时能看出。
- 光束由两部分组成：沿太阳方向的叠加光柱几何体，以及屏幕空间径向光束。后者只在相机大致朝向太阳一侧时出现，背对太阳时淡出。
- 能看到大陆的两个大云洞是按默认镜头摆放的固定位置；换角度后主要依靠随机云隙。
- 岛屿投在云海上的阴影是解析近似（圆盘加环带），不是阴影贴图。
- 性能只在一台机器上测过（Intel Arc 140T 核显，headless Chrome），1440×900 约 64–66 fps；未测试其他浏览器、独显或移动设备。像素比上限 1.5。
- 画面验证只来自 headless 截图，没有在有界面的浏览器中人工观看。

## 人工介入

无。
