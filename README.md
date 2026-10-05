# Slint 中文文档

[![CI](https://github.com/Neutriny/Slint-Docs-CN/actions/workflows/ci.yml/badge.svg)](https://github.com/Neutriny/Slint-Docs-CN/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

[Slint](https://slint.dev) 官方文档的中文翻译与整理，使用 [Astro](https://astro.build) +
[Starlight](https://starlight.astro.build) 构建。

在线预览：<https://neutriny.github.io/Slint-Docs-CN/>

> 本项目是非官方社区翻译，与 SixtyFPS GmbH 无隶属或背书关系。
> 文档内容会滞后于上游，最新、最权威的内容请以 [官方文档](https://docs.slint.dev) 为准。

## Slint 是什么

**Slint** 是一个开源的声明式 GUI 工具包，用于为**嵌入式系统、桌面和移动平台**构建原生用户界面。

你只需用 `.slint` 这一简洁的标记语言编写一次 UI，再把它与 Rust、C++、JavaScript 或 Python
编写的业务逻辑连接起来即可。

## 为什么选择 Slint

名称 _Slint_ 源自其设计目标：

- **可扩展（Scalable）**：支持响应式 UI 设计，跨操作系统与处理器架构，并支持多种编程语言。
- **轻量（Lightweight）**：对内存和算力要求极低，同时在任何设备上都能提供流畅、类手机的用户体验。
- **直观（Intuitive）**：设计师和开发者都能高效、愉悦地进行 UI 设计与开发；无论选用哪种语言，API 都保持一致且易用。
- **原生（Native）**：在任何平台（桌面、移动、Web 或嵌入式）上，UI 都符合用户对原生应用的预期。UI 设计会编译为机器码，并提供只有原生应用才能做到的灵活性：访问完整的操作系统 API、利用所有 CPU/GPU 核心、连接任意外设。

除了设计目标，Slint 还有这些亮点：

- **UI 与逻辑分离**：用声明式语言将 UI 与业务逻辑解耦，设计师可与开发者并行工作。
- **完善的工具链**：借助 Live Preview 与编辑器集成快速迭代，并可通过 [Figma to Slint 插件](https://www.figma.com/community/plugin/1474418299182276871/figma-to-slint)从 Figma 集成。
- **稳定的 API**：遵循稳定的 1.x API，演进谨慎、不破坏你的代码。

看看大家用它做了什么：[#MadeWithSlint](https://madewithslint.com)

## 快速开始

UI 使用一种声明式、易用、直观的 DSL 描述，能优雅地表达图形元素、位置、层级、属性绑定以及状态间的数据流。

经典的 "Hello World"：

```slint
export component HelloWorld inherits Window {
    width: 400px;
    height: 400px;

    Text {
       y: parent.width / 2;
       x: parent.x + 200px;
       text: "Hello, world";
       color: blue;
    }
}
```

更多内容请阅读本站的[指南](./src/content/docs/guide/getting-started.mdx)与[教程](./src/content/docs/tutorial/quickstart.mdx)，
或上游的 [Slint Documentation](https://docs.slint.dev)。

## 语言集成

Slint 可与下列语言集成，各语言目录与文档见下：

- **C++**：[文档](https://docs.slint.dev/latest/docs/cpp/) | [起步模板](https://github.com/slint-ui/slint-cpp-template)
- **Rust**：[crates.io](https://crates.io/crates/slint) | [文档](https://docs.slint.dev/latest/docs/rust/slint/) | [教程视频](https://youtu.be/WBcv4V-whHk) | [起步模板](https://github.com/slint-ui/slint-rust-template)
- **JavaScript / NodeJS（Beta）**：[npm](https://www.npmjs.com/package/slint-ui) | [文档](https://docs.slint.dev/latest/docs/node/) | [起步模板](https://github.com/slint-ui/slint-nodejs-template)
- **Python（Beta）**：[PyPI](https://pypi.org/project/slint/) | [文档](https://docs.slint.dev/latest/docs/python/slint/) | [起步模板](https://github.com/slint-ui/slint-python-template)

## 架构

一个应用由 **Rust / C++ / Python / JavaScript 编写的业务逻辑** 与 **`.slint` UI 设计标记** 组成，
后者会被编译为原生代码。

- **编译器**：`.slint` 文件会被提前编译。其中的表达式是纯函数，编译器可进行优化（例如内联并消除常量属性）。
  编译流程为词法分析、语法分析、优化、代码生成，并针对目标语言提供不同后端（C++ 生成头文件、Rust 生成 Rust 代码等），
  此外还包含面向动态语言的解释器。
- **运行时**：引擎支持 `.slint` 中声明的属性；组件及其元素、项和属性被排布在同一块内存区域中，以减少内存分配。
  渲染后端与样式可在编译期配置：
  - `femtovg`：使用 OpenGL ES 2.0 渲染。
  - `skia`：使用 [Skia](https://skia.org) 渲染。
  - `software`：纯 CPU 渲染，无额外依赖。
  - 当系统装有 Qt 时，可使用 `qt` 样式，借助 Qt 的 QStyle 获得原生外观的控件。

## 工具

- **LSP Server**：为众多编辑器提供自动补全与 `.slint` 文件的实时预览，已随 **Visual Studio Code 扩展**一起发布。
- **slint-viewer**：显示 `.slint` 文件的工具，`--auto-reload` 参数方便你在编辑时实时预览。
- **[SlintPad](https://slintpad.com/)**：在线编辑器，无需安装即可试用 `.slint` 语法。
- **[Figma to Slint](https://www.figma.com/community/plugin/1474418299182276871/figma-to-slint)** 插件。

## 本地开发

包管理器使用 **pnpm**（请勿使用 npm/yarn）。需要 Node.js >= 22.12。

```sh
pnpm install

# 启动开发服务器（后台模式）
pnpm astro dev --background
pnpm astro dev status
pnpm astro dev logs
pnpm astro dev stop

# 生产构建
pnpm build

# 预览构建产物
pnpm preview

# 代码检查与格式化
pnpm lint
pnpm format
```

构建产物输出到 `dist/`。

## 目录结构

```
src/
  content/docs/        文档内容（guide/、reference/、tutorial/、language-integrations/ …）
  components/          Astro 组件（页眉、页脚、Banner、代码片段等）
  utils/               文档工具（Expressive Code 配置、Slint 语法高亮等）
  styles/              主题与样式
packages/common-files/ 上游 @slint/common-files 的本地副本（文档组件与工具）
scripts/               文档中引用的示例脚本
astro.config.mjs       Astro / Starlight 配置
ec.config.mjs          Expressive Code 配置
```

## 许可与致谢

本仓库以 **MIT** 许可发布，详见 [LICENSE](./LICENSE)。

文档、示例及 `@slint/common-files` 文档工具来自
[slint-ui/slint](https://github.com/slint-ui/slint)，版权所有 © SixtyFPS GmbH，采用 MIT 许可。
Slint **框架**本体（运行时与语言工具）采用三重许可（Royalty-free / GPLv3 / Commercial），
本仓库未包含框架本体。完整说明与商标声明见 [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md)。

"Slint" 与 Slint logo 是 SixtyFPS GmbH 的商标。

## 相关链接

- 官网：<https://slint.dev>
- 官方文档：<https://docs.slint.dev>
- 上游仓库：<https://github.com/slint-ui/slint>
- 讨论区：<https://github.com/slint-ui/slint/discussions>
- 问题反馈（本项目）：<https://github.com/Neutriny/Slint-Docs-CN/issues>
