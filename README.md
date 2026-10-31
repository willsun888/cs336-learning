# 模型之间 · CS336 中文学习手册

面向有编程与机器学习基础、希望系统理解大模型的学习者。以 Stanford CS336 Spring 2026 的 18 部视频为主线，用中文原创讲解连接模型机制、计算预算与工程取舍。

在线访问：[模型之间](https://willsun888.github.io/cs336-learning/)

- 18 个章节、66 个主题，包含算例、误区、带答案练习及课末自测。
- 149 个中英文概念释义，提供具体例子、适用边界和关联课程。
- 6 个交互实验：教学版 BPE、注意力、Softmax 与交叉熵、KV 缓存、训练预算、Roofline。
- 推荐学习路径、原课目录、搜索、笔记、收藏及进度导入导出。
- 静态站点，无账号与服务端；学习记录保存在当前浏览器的 localStorage。

## 资料依据

[课程官网](https://cs336.stanford.edu/) · [官方讲义](https://github.com/stanford-cs336/lectures) · [播放列表](https://www.youtube.com/playlist?list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV)

讲义固定到 `de53a9f979a6ee35f7d13a5e1aadee5ea1afc58e`，核对日期为 2026-10-31。第 1–17 讲按讲义重组主要技术主题并抽查人工字幕；Dan Fu 客座讲座依据完整字幕阅读整理。18 部视频的人工英文字幕可用性均已核对。本站不是逐字转录，未逐段审阅全部课堂推导、演示与问答，不应替代原课的完整实践。

这是独立学习指南，与 Stanford 没有隶属关系。官方视频、讲义与作业保留原作者权利；本仓库不分发完整字幕或官方课件。概念释义、算例与浏览器实验为本站补充。KaTeX 依赖的 MIT 许可保留在 `docs/vendor/katex/LICENSE`。

## 本地使用

需要 Node.js 20+ 和 Python 3（用于便捷预览）。

```sh
npm ci
npm run build
npm test
python3 -m http.server 8926 --directory docs
```

浏览器访问 `http://localhost:8926/`。也可直接用任意静态服务器提供 `docs/`。

## 编辑与发布

| 路径 | 内容 |
|---|---|
| `content/course.json` | 原创中文课程内容、来源、测验与代码 |
| `content/concepts.json` | 概念释义与例子 |
| `docs/app.js` | 导航、阅读、搜索与交互 |
| `docs/labs.js` | 六个数值实验及纯计算函数 |
| `docs/state.js` | 学习记录校验 |
| `docs/style.css` | 响应式界面与打印样式 |
| `tools/build.mjs` | 从内容源生成公开数据和本地 KaTeX 资源 |
| `tools/validate.mjs` | 内容完整性、公式、数值与导入校验 |

修改内容 JSON 后运行构建与检查。GitHub Pages 使用 `main` 分支的 `/docs` 目录，无需构建工作流或密钥。原始研究材料不在公开仓库中。

## 验证与限制

检查覆盖 18 个章节与概念引用的完整性、45 个公式的严格 KaTeX 解析、数值实验的已知结果和不变量，以及学习记录导入校验。浏览器检查包含搜索、测验、笔记与进度持久化和窄屏排版。

纯 Python 示例已运行；第 6 讲 CUDA 基准仅做语法检查，需要 NVIDIA GPU 与 PyTorch。浏览器容量/性能计算器是明确假设下的估算，不等于真实训练或硬件实测。清除浏览器数据会删除学习记录；跨设备使用请先导出再导入。
