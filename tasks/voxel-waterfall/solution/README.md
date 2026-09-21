# 体素瀑布

React + Vite + Three.js 的体素自然景观。打开页面即可看到山脉、沿坡落下的瀑布、山腰云层和山脚植被。

## 运行

在本目录执行：

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

画廊托管会额外传入路径前缀和输出目录，本项目的 `build` 脚本会把这些参数交给 Vite：

```bash
npm run build -- --base=/voxel-waterfall/grok-4.7/ --outDir=../../../../deploy/public/voxel-waterfall/grok-4.7 --emptyOutDir
```

## 场景选项

页面左上角可以调节种子、分辨率（最低 200）、峰高、瀑布数量、流量、云密度、云层高度、植被、晨昼昏夜、自动环绕和线框。默认分辨率为 256×256。
