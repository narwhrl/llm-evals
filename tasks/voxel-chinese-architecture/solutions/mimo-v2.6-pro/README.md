# 体素中国古典建筑群

用 Three.js 实现的 Minecraft 风格体素中国古典建筑群场景：中轴对称院落布局，包含山门、钟楼、鼓楼、主殿与两座配殿。

## 环境要求

- Node.js 18+（开发时使用 Node 24）
- npm

## 安装与启动

```bash
cd tasks/voxel-chinese-architecture/solution
npm install
npm run dev
```

浏览器打开 <http://127.0.0.1:5173/> 即可进入场景。页面加载完成后无需任何操作即可看到建筑群全貌；也可拖拽旋转、滚轮缩放以检视细节。

## 生产构建

```bash
npm run build
npm run preview
```

`npm run build` 产出 `dist/` 静态文件；`npm run preview` 在 <http://127.0.0.1:4173/> 本地预览产物。构建不依赖任何后端或需要凭据的服务。

构建命令兼容路径前缀托管，例如：

```bash
npm run build -- --base=/voxel-chinese-architecture/mimo-v2.6-pro/ --outDir=../out --emptyOutDir
```

## 场景内容

| 建筑 | 形制 | 说明 |
| --- | --- | --- |
| 山门 | 歇山顶 | 场地前端入口，三门洞，前立石狮 |
| 钟楼 / 鼓楼 | 多层攒尖顶 | 中轴两侧对称 |
| 主殿 | 庑殿顶 | 体量最大，金黄琉璃瓦，月台踏跺 |
| 配殿 ×2 | 歇山顶 | 主殿左右对称 |

屋顶含飞檐翘角，结构含斗拱、立柱、额枋、台基；配色为红墙、琉璃瓦/青瓦、木色构件。地面含中轴铺装、庭院方砖与草地，方向光带阴影，天空为暮色渐变。

## 技术说明

- 纯 Three.js（无 React），Vite 构建
- 体素按颜色合并为 `InstancedMesh` 批量渲染
- 无外部纹理/模型资源，无网络请求

验证命令与结果见 [RESULTS.md](RESULTS.md)。
