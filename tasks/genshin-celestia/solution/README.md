# Celestia · 天空岛

使用 Three.js、TypeScript 和 WebGL 构建的程序化三维场景。无需外部模型、贴图、后端服务或凭据。

## 安装

```sh
npm install
```

## 本地开发

```sh
npm run dev
```

打开终端输出的本地地址。默认画面为天空岛三分之四远景，不包含 UI；可拖动旋转视角、滚轮缩放。

## 生产构建

```sh
npm run build
```

支持 Vite 的部署参数，例如：

```sh
npm run build -- --base=/genshin-celestia/example/ --outDir=dist
```

本地预览生产构建：

```sh
npm run preview
```
