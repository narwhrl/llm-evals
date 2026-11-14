# 原神·天空岛（Celestia）— Three.js 3D 场景

基于 Three.js + TypeScript + WebGL 构建的《原神》天空岛（Celestia）完整程序化 3D 场景，默认以电影级三分之四远景直入画面（无 UI、无角色或额外控件），支持鼠标自由环绕观察。

## 环境要求

- Node.js >= 20
- npm >= 10

## 安装依赖

```bash
cd tasks/genshin-celestia/solution
npm install
```

## 启动开发服务器

```bash
npm run dev
```

## 类型检查与生产构建

```bash
npm run typecheck
npm run build
```

## 子路径生产构建（画廊部署兼容）

支持透传 Vite 的 `--base` 与 `--outDir` 参数：

```bash
npm run build -- --base=/genshin-celestia/gemini-4-carbon/ --outDir=dist-subpath --emptyOutDir
```

> 若在 Windows Git Bash（MSYS2）下执行以 `/` 开头的路径参数，请加上 `MSYS_NO_PATHCONV=1` 防止自动路径转换：
> ```bash
> MSYS_NO_PATHCONV=1 npm run build -- --base=/genshin-celestia/gemini-4-carbon/ --outDir=dist-subpath --emptyOutDir
> ```

## 本地预览构建产物

```bash
npm run preview
```

## 视角交互

- **默认视角**：打开页面即展示完整的天空岛三分之四电影级远景剪影。
- **左键拖拽**：围绕天空岛旋转观察（可俯视外环八座浮岛与拱桥，或仰视中央巨岩倒悬崖壁与提瓦特远景）。
- **右键拖拽**：平移视角。
- **滚轮缩放**：拉近观察中央白色多层圣殿尖塔、哥特式神圣尖拱柱廊与塔顶交错旋转的六环金色天体仪。
