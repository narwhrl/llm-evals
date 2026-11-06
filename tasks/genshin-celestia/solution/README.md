# 天空岛 · Celestia

Three.js + TypeScript + WebGL 2 实时场景。默认展示完整天空岛的三分之四远景，无界面、角色或游戏逻辑。

## 运行

需要 Node.js 20.19+ 或 22.12+，以及支持 WebGL 2 的浏览器。

```sh
npm install
npm run dev
```

打开终端输出的本地地址。初始化在页面内自动完成，不需要点击进入。

拖动旋转视角，滚轮或双指缩放，双击恢复默认远景。系统开启减少动态效果时，环境动画保持静止。

## 构建

```sh
npm run build
npm run preview
```

部署到评测子路径：

```sh
npm run build -- --base=/genshin-celestia/gpt-6-astra-ultra/ --outDir=dist-subpath
npm run preview -- --base=/genshin-celestia/gpt-6-astra-ultra/ --outDir=dist-subpath
```

将 `dist-subpath/` 的内容放到 `/genshin-celestia/gpt-6-astra-ultra/` 对应的静态目录。

## 场景

中央倒悬岩岛与八座大小不一的浮岛，通过镂空尖拱、环形道路与断裂桥段连接。中央圣殿采用象牙白石材、层叠拱廊、细长尖塔与金色天体仪；岩壁嵌有遗迹，岛面有草地、树林与流动瀑布。分层云海、远方大陆、阳光与光束营造高空纵深。

几何、云纹理和水流着色器全部由代码生成，无外部素材、CDN、凭证或后端。静态建筑按材质合并，树林和碎石使用实例化，静态阴影只计算一次；分辨率倍率上限为 1.5。构图依据对游戏远景的记忆制作，没有使用官方模型或参考图片。
