---
title: Winit 后端
description: Winit 后端
next: false
---

<!-- cSpell: ignore libx libxcursor libxkbcommon -->

Winit 后端使用 [winit](https://docs.rs/winit/latest/winit/) 库与
窗口系统交互。

Winit 后端几乎支持所有相关的操作系统和窗口系统，包括
macOS、Windows、带 Wayland 和 X11 的 Linux。

Winit 后端支持不同的渲染器。可以通过
`SLINT_BACKEND` 环境变量显式选择使用它们。

| 渲染器名称     | 支持/所需的图形 API                            | 用于选择渲染器的 `SLINT_BACKEND` 值 |
| -------------- | ---------------------------------------------- | ----------------------------------- |
| FemtoVG        | OpenGL                                         | `winit-femtovg`                     |
| FemtoVG (WGPU) | Metal、Direct3D、Vulkan，配合 (http://wgpu.rs) | `winit-femtovg-wgpu`                |
| Skia           | OpenGL、Metal、Direct3D、软件渲染              | `winit-skia`                        |
| Skia 软件      | 使用 Skia 的纯软件渲染                         | `winit-skia-software`               |
| Skia OpenGL    | 使用 Skia 的 OpenGL 渲染（iOS 上不支持）       | `winit-skia-opengl`                 |
| software       | 软件渲染，不需要 GPU                           | `winit-software`                    |

如果没有显式设置渲染器，后端会首先尝试使用 Skia 渲染器（如果它在编译时已启用）。
如果失败，它会回退到 FemtoVG 渲染器；如果也失败，则使用软件渲染器。

## 配置选项

Winit 后端会读取并解释以下环境变量：

| 名称               | 接受的值 | 描述                                         |
| ------------------ | -------- | -------------------------------------------- |
| `SLINT_FULLSCREEN` | 任意值   | 如果设置了此变量，每个窗口都以全屏模式显示。 |

## Linux 依赖项

在 Linux 上，Winit 后端要求 X11 或 Wayland 之一可用。
可以通过在编译时设置
`backend-winit-x11` 或 `backend-winit-wayland` feature（而不是 `backend-winit`）来启用或禁用对其中任一的支持。

对于 X11，需要以下运行时依赖项：libx11-xcb、xinput、libxcursor、libxkbcommon-x11、libx11。
在基于 Debian 的系统上，可以使用以下命令安装它们：

```sh
sudo apt install libx11-xcb-dev xinput libxcursor-dev libxkbcommon-x11-dev libx11-dev
```
