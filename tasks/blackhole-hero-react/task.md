# Black Hole Hero · React 组件集成

实现必须写在 `tasks/blackhole-hero-react/solution/`。不要把实现写到其他路径，也不要修改本任务的 `task.md`、`README.md`、`starter/` 或仓库其余共享输入。

将给定的 `BlackHoleHeroSection` React 组件及其响应式 demo 集成到一个可安装、可开发、可生产构建的网页项目中。此任务评估已有组件的集成能力，不是从零实现一个新的黑洞渲染器。

## 共享输入

- [`starter/original-prompt.md`](starter/original-prompt.md)：完整原始英文提示词，包含组件源码、demo 和集成指南。
- [`starter/components/ui/blackhole-hero-section.tsx`](starter/components/ui/blackhole-hero-section.tsx)：从原始提示词提取的完整组件源码，未改动代码。
- [`starter/demo.tsx`](starter/demo.tsx)：从原始提示词提取的完整 demo，未改动代码。

共享输入没有包含一个已配置的应用项目。请在 `solution/` 内创建 React + Vite + TypeScript 项目，启用 Tailwind CSS，并采用 shadcn 兼容的目录、样式与路径别名配置。给定组件、默认参数、页面文案和 demo 布局就是本任务的集成依据，无需等待用户补充业务数据或设计方案。

## 项目结构与集成

1. 分析组件的导入、参数、状态和生命周期，识别真正需要的依赖。组件使用 React hooks 与浏览器 WebGL API，不要求 Three.js、全局状态管理库或 context provider；不要为此引入无关依赖。
2. 在应用源码根目录创建 `components/ui/`，将组件复制到其中，例如 `solution/src/components/ui/blackhole-hero-section.tsx`。配置 `@/` 别名，使 demo 的 `@/components/ui/blackhole-hero-section` 导入在 TypeScript 和 Vite 中都能解析。
3. 提供与实际目录、别名和全局样式位置一致的 `components.json`。在 `solution/README.md` 说明组件及样式的默认路径；如初始化项目的组件路径不是 `components/ui/`，说明为何创建该目录及如何配置别名，保证 shadcn CLI 和组件导入使用同一约定。
4. 集成 `starter/demo.tsx`，打开页面即可看到 Hero。组件及 demo 保留 `"use client"`、公开 props、children 插槽、DOM 属性透传和现有默认值。
5. 全局样式必须实际加载，Tailwind 的布局、尺寸、字体、颜色与响应式 utilities 必须生效。为画布提供有效的容器尺寸，不能出现因父容器没有高度而导致的空白页面。
6. 若初始化项目尚不支持 shadcn、Tailwind CSS 或 TypeScript，在 `solution/README.md` 写清采用的配置及可复现的初始化或安装步骤，包括适用的 shadcn CLI 命令。
7. 保留给定的实时 WebGL 渲染和后处理流程。可以修复为成功集成所必需的类型、shader 兼容、资源或生命周期问题，但须在 `RESULTS.md` 说明修改原因与验证证据；不要改写成另一种渲染方案。

## 页面与响应式行为

- 保留 demo 的标题 `Light does not / leave here`、说明文字，以及 `Get started` 和 `Read the maths` 两个链接的文案与视觉样式。
- 桌面端采用左侧文案、右侧黑洞的布局。以 demo 的 `focus={[0.72, 0.46]}`、左侧 scrim、`distance={24}`、`elevation={-5.5}`、`fov={42}`、`steps={300}`、`resolution={0.7}` 等参数为依据。
- 窄屏断点沿用 `(max-width: 767px)`，采用上方文案、下方黑洞的布局。以 demo 的 `focus={[0.5, 0.76]}`、顶部 scrim、`elevation={-7}`、`fov={58}`、`steps={200}`、`resolution={0.6}` 等参数为依据。
- 实际调整视口后，构图、遮罩和渲染参数必须随断点切换；不能只在首次加载时适配。文字和链接在两种布局下都可读，不被黑洞高亮区域遮挡，也没有横向页面溢出。
- 保留组件的暂停、reduced-motion、尺寸变化、可见性处理及 WebGL 上下文丢失与恢复行为。无 WebGL 时应保留黑色背景和可读文案，而不是白屏或未处理异常；该降级不能替代支持 WebGL 环境下的正常黑洞渲染。
- 本任务没有提供两个链接的业务目的地，不要求新增业务页面、后端、账号、数据持久化或参数控制面板。

## 素材与范围

- 黑洞和吸积盘由给定 shader 实时生成，不需要图片、图标、字体下载或其他外部素材。不得使用静态图片、视频、预渲染帧或 CSS 圆环代替核心画面。
- 原始提示词中的 Unsplash 素材填充和 `lucide-react` 要求仅在组件确实需要对应素材或图标时适用；不要为了满足模板文字添加无关图片或图标。
- 安装时可以获取所需 npm 依赖，但运行时不依赖 CDN、远程素材、API 或需要凭据的服务。依赖锁定精确版本并提交锁文件，不提交 `node_modules/` 或构建产物。

## 交付

- 在 `solution/` 中提交完整源代码、项目配置和锁文件。生产构建使用 Vite，接受 `--base` 和 `--outDir` 参数，在根路径及非根子路径下都能加载全部资源。
- 提供 `npm run typecheck`，执行真实的 TypeScript 检查，不通过关闭类型检查或忽略报错制造成功结果。
- `solution/README.md` 写清安装、初始化配置、开发启动、类型检查、生产构建、本地预览命令，以及组件与样式路径。
- `solution/evidence/01-desktop.png`：实际运行版本在 `1440 × 900` 桌面视口下的首屏截图。
- `solution/evidence/02-mobile.png`：实际运行版本在 `390 × 844` 移动视口下的首屏截图。
- 截图必须来自实际页面，不得用独立静态画面或只在截图时启用的替代渲染来提高画面质量。
- `solution/RESULTS.md` 记录完整模型标识、起始 `main` commit SHA、实际执行的验证命令与结果、浏览器和视觉检查记录、对给定代码的必要修改、已知限制或失败，以及所需人工介入。

## 验收与自检

在 `solution/` 中至少实际执行并记录：

```bash
npm ci
npm run typecheck
npm run build
npm run build -- --base=/blackhole-hero-react/eval/ --outDir=dist-subpath
```

在同一浏览器环境中检查生产输出：

1. 根路径和 `/blackhole-hero-react/eval/` 子路径都能加载页面与本地资源；控制台没有 shader 编译、资源加载或未处理异常。
2. 桌面首屏可辨认黑洞阴影、吸积盘及被弯曲的盘面像；组件不是只有黑色背景，文案与画面布局匹配 demo。
3. 移动首屏仍能看清黑洞主体与文案。将视口从桌面切换到移动再切回，布局和画布尺寸正确更新。
4. 正常状态下气体图案随时间变化；`paused` 冻结模拟画面，reduced-motion 下显示静态画面；无 WebGL 时文案仍可读。
5. 在环境支持时检查 WebGL 上下文丢失与恢复。无法执行的检查须记录环境原因，不能写成通过。
6. 对实际截图进行视觉检查，确认不是空白、异常裁切或内容重叠。记录浏览器、WebGL renderer 和无法验证的项目，区分环境阻塞与代码失败。

交付时停止本次运行启动的开发或预览服务器，并关闭打开的浏览器页面。不要声明未实际执行的命令、测试或视觉结论。
