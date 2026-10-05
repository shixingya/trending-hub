# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Additional data sources (subject to API availability)
- Enhanced data visualization features
- Community-contributed themes

## [2.0.0] - 2026-10-05

### Added
- **34 data sources**: 知乎热榜/日报, 百度热搜/贴吧, 微博, B站热门/排行榜/热搜/综合热门, 抖音, 头条, 澎湃, IT之家, 少数派, 百度影视/游戏/汽车/旅游, 豆瓣电影/读书, 网易云热歌, GitHub Trending/新星, 虎扑, 新浪新闻, 微信读书, 掘金, 懂球帝, 快手, Dev.to, 开源中国, Lobsters, Hacker News, StackOverflow
- **智能分类系统**: 自动为话题生成标签（科技/娱乐/体育/财经/社会/国际/健康/教育/汽车/游戏），支持按分类筛选
- **跨平台话题检测**: 支持模糊匹配和同义词识别，自动识别同一话题在多个平台同时上榜
- **话题详情弹窗**: 点击查看同一话题在哪些平台同时上榜，展示跨平台传播时间线
- **热度趋势图**: Canvas 绘制的折线图，展示话题在不同平台的热度变化趋势
- **热点时间线**: 追踪话题在多次更新中的生命周期，标记上升/下降/新上榜状态
- **话题关系图谱**: Canvas 力导向图，可视化展示话题之间的关联关系
- **词云可视化**: 直观展示热点关键词，支持按分类过滤
- **平台对比模式**: 多平台话题重叠分析，Venn 图展示
- **活动热力图**: GitHub 风格贡献图，展示各平台历史活跃度
- **每日精选 TOP 10**: 跨平台热度综合排名
- **全网热搜榜中榜**: 跨平台热度 TOP 20
- **本周最热**: 连续多天上榜的持久热点
- **飙升榜**: 新晋上榜或热度飙升的话题
- **话题速度指示器**: 🚀🔥⚡ 标识快速上升的话题
- **专注模式**: 隐藏干扰元素，沉浸式阅读
- **紧凑模式**: 减小间距，一屏显示更多内容
- **话题收藏**: 收藏感兴趣的话题，支持 localStorage 持久化
- **话题收藏集**: 创建自定义收藏集，分类整理感兴趣的话题
- **智能推荐**: 根据收藏偏好，自动推荐相似热点话题
- **话题提醒**: 设置关键词提醒，相关话题上榜时高亮显示并计数
- **数据导出**: 支持 Markdown、CSV、JSON 和 PDF 格式
- **PDF 日报生成**: 自动生成精美的每日热点日报
- **丰富分享**: 一键生成热点摘要（包含各平台 TOP3）分享到社交平台
- **话题卡片**: 为单个话题生成精美的分享卡片图片（Canvas 转 PNG）
- **社交分享**: 支持分享到微博、QQ 等社交平台
- **每日早报**: 快速了解全网热点概览，支持语音播报
- **嵌入小组件**: 一键生成 iframe 代码，将热点嵌入你的网站
- **平台活跃热力图**: GitHub 风格贡献图，直观展示各平台历史活跃度
- **移动端底部导航栏**: 快速访问核心功能（首页/搜索/收藏/统计/更多）
- **下拉刷新**: 移动端原生体验，下拉即可刷新数据
- **浮动操作按钮 (FAB)**: 快速访问随机热点、生成图片、每日早报等常用功能
- **语音搜索**: 支持语音输入搜索关键词 (Chrome/Edge)
- **键盘快捷键**: 
  - `/` 搜索
  - `T` 切换主题
  - `A` 自动主题
  - `W` 词云
  - `C` 对比模式
  - `P` 热点PK
  - `Q` 热点猜谜
  - `V` 平台图表
  - `G` 关系图谱
  - `H` 活动热力图
  - `O` 收藏集
  - `L` 时间线
  - `X` 变更视图
  - `B` 我的收藏
  - `M` 紧凑模式
  - `N` 语言过滤
  - `S` 全局排序
  - `I` 热度指标
  - `D` 开发者模式
  - `E` 嵌入小组件
  - `0` 查看全部
  - `?` 帮助
  - `ESC` 关闭
- **中英文双语支持**: 一键切换中英文界面
- **RSS 订阅**: 在阅读器中追踪热点
- **PWA 支持**: 可添加到手机主屏幕，离线访问
- **RESTful API**: 方便二次开发 ([API 文档](docs/API.md))
- **数据源状态监控**: 实时查看各平台数据源是否正常
- **自动更新**: GitHub Actions 每 2 小时自动更新
- **暗色/亮色主题**: 自动跟随系统，支持日落自动切换（基于地理位置）
- **OG/Twitter Cards**: 优化社交分享预览
- **SEO 优化**: 完整的 meta 标签和结构化数据
- **骨架屏加载**: 优雅的加载体验
- **相对时间显示**: "3小时前"、"昨天" 等友好时间格式

### Technical
- 纯静态部署，零成本托管在 GitHub Pages
- 仅抓取标题和链接，不存储原文内容
- 响应式设计，完美适配桌面和移动端
- 支持 Service Worker 离线缓存
- 使用 IntersectionObserver 实现虚拟滚动
- Canvas 绘制图表和分享卡片
- localStorage 持久化用户偏好

## [1.0.0] - 2026-09-30

### Initial Release
- 基础热点聚合功能
- 20 个数据源
- 暗色/亮色主题切换
- 关键词搜索
- 数据导出（Markdown/CSV）
- PWA 支持
- GitHub Actions 自动更新

---

## 版本说明

- **Major (x.0.0)**: 重大功能更新，可能包含不兼容的 API 变更
- **Minor (0.x.0)**: 新增功能，保持向后兼容
- **Patch (0.0.x)**: 修复问题，小幅改进

## 更新频率

- 数据每 2 小时自动更新（GitHub Actions）
- 功能更新不定期发布
- 问题修复随时发布

## 贡献

欢迎提交 Issue 和 Pull Request！

- 报告问题：[GitHub Issues](https://github.com/shixingya/trending-hub/issues)
- 建议新数据源：[New Source Template](https://github.com/shixingya/trending-hub/issues/new?assignees=&labels=enhancement&template=new_source.md)
