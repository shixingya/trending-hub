# Trending Hub

<div align="center">

**全网热门话题聚合器**

[![GitHub stars](https://img.shields.io/github/stars/shixingya/trending-hub?style=social)](https://github.com/shixingya/trending-hub/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/shixingya/trending-hub?style=social)](https://github.com/shixingya/trending-hub/network/members)
[![GitHub issues](https://img.shields.io/github/issues/shixingya/trending-hub)](https://github.com/shixingya/trending-hub/issues)
[![License](https://img.shields.io/github/license/shixingya/trending-hub)](https://github.com/shixingya/trending-hub/blob/main/LICENSE)
[![Update Frequency](https://img.shields.io/badge/updates-every%202%20hours-brightgreen)](https://github.com/shixingya/trending-hub/actions)

一站式发现知乎、百度、微博、B站、抖音、头条、澎湃、IT之家、少数派、豆瓣、网易云、贴吧、GitHub、虎扑、新浪、微信读书、掘金、懂球帝、快手、Dev.to、开源中国、Lobsters等34大平台热点

[在线体验](https://shixingya.github.io/trending-hub/) · [报告问题](https://github.com/shixingya/trending-hub/issues) · [建议新数据源](https://github.com/shixingya/trending-hub/issues/new?assignees=&labels=enhancement&template=new_source.md)

</div>

## 特性

- 聚合 34 大平台热榜：知乎热榜/日报、百度热搜/贴吧、微博、B站热门/排行榜/热搜/综合热门、抖音、头条、澎湃、IT之家、少数派、百度影视/游戏/汽车/旅游、豆瓣电影/读书、网易云热歌、GitHub Trending/新星、虎扑热帖、新浪新闻、微信读书、掘金热门、懂球帝热帖、快手热榜、Dev.to、开源中国、Lobsters、Hacker News、StackOverflow
- 暗色/亮色主题切换，自动跟随系统，支持日落自动切换（基于地理位置）
- 关键词搜索，快速定位感兴趣的话题
- 智能分类筛选：娱乐/军事/体育/科技/社会/地区/财经/教育
- 每日精选 TOP 10：跨平台热度综合排名
- 全网热搜榜中榜：跨平台热度 TOP 20
- 本周最热：连续多天上榜的持久热点
- 飙升榜：新晋上榜或热度飙升的话题
- 跨平台对比，同一话题多平台同时上榜一目了然（支持模糊匹配和同义词识别）
- 话题详情弹窗：点击查看同一话题在哪些平台同时上榜
- 热度趋势图：查看话题在不同平台的热度变化趋势
- 跨平台传播时间线：可视化展示话题在各平台的出现和传播过程
- 热点时间线：追踪话题在多次更新中的生命周期和热度变化
- 话题速度指示器：🚀🔥⚡ 标识快速上升的话题，结合位置变化和热度增长识别新兴趋势
- 智能标签系统：自动为话题生成标签，支持按标签筛选
- 专注模式：隐藏干扰元素，沉浸式阅读
- 话题收藏：收藏感兴趣的话题，随时查看
- 话题收藏集：创建自定义收藏集，分类整理感兴趣的话题
- 智能推荐：根据收藏偏好，自动推荐相似热点话题
- 话题提醒：设置关键词提醒，相关话题上榜时高亮显示并计数
- 数据导出：支持 Markdown、CSV、JSON 和 PDF 格式，PDF 自动生成精美日报
- 丰富分享：一键生成热点摘要分享到社交平台
- 社交分享：支持分享到微博、QQ 等社交平台，快速传播热点
- 话题卡片：为单个话题生成精美的分享卡片图片
- 每日早报：快速了解全网热点概览
- 词云可视化：直观展示热点关键词
- 平台对比模式：多平台话题重叠分析
- 嵌入小组件：一键生成 iframe 代码，将热点嵌入你的网站
- 数据源状态监控：实时查看各平台数据源是否正常
- 平台活跃热力图：GitHub 风格贡献图，直观展示各平台历史活跃度
- 移动端底部导航栏：快速访问核心功能
- 下拉刷新：移动端原生体验，下拉即可刷新数据
- 浮动操作按钮 (FAB)：快速访问随机热点、生成图片、每日早报等常用功能
- 语音搜索：支持语音输入搜索关键词 (Chrome/Edge)
- 键盘快捷键：/ 搜索、T 切换主题、A 自动主题、L 时间线、0 查看全部
- 中英文双语支持
- RSS 订阅，在阅读器中追踪热点
- PWA 支持，可添加到手机主屏幕
- RESTful API，方便二次开发 ([API 文档](docs/API.md))
- GitHub Actions 每 2 小时自动更新，纯静态部署零成本
- 仅抓取标题和链接，不存储原文内容

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 生产启动
npm start
```

启动后访问 http://localhost:3000

### Docker 部署

```bash
# 使用 Docker
docker build -t trending-hub .
docker run -d -p 3000:3000 trending-hub

# 使用 Docker Compose
docker-compose up -d
```

容器内置 cron 定时任务，每 2 小时自动抓取最新数据。

### 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shixingya/trending-hub)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/shixingya/trending-hub)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/shixingya/trending-hub)

## API

### 📖 API 文档

完整的交互式 API 文档请访问：[**API 文档页面**](https://shixingya.github.io/trending-hub/api.html)

包含在线示例、代码样本（JavaScript/Python/cURL）和实时测试功能。

### 获取全部热榜
```
GET /api/trending
```

### 获取单个平台
```
GET /api/trending/:source
```

source 可选值：`zhihu` / `zhihu-daily` / `baidu` / `baidu-tieba` / `weibo` / `bilibili` / `bilibili-rank` / `bilibili-hot` / `bilibili-popular` / `douyin` / `toutiao` / `thepaper` / `ithome` / `sspai` / `baidu-movie` / `baidu-game` / `baidu-car` / `baidu-travel` / `douban-movie` / `douban-book` / `netease-music` / `github-trending` / `hupu` / `sina-news` / `weread` / `juejin` / `dongqiudi` / `kuaishou`

### CLI 抓取
```bash
npm run fetch
```

数据保存到 `docs/data/trending.json`，RSS 保存到 `docs/data/feed.xml`

### 嵌入小组件

在你的网站中添加以下代码即可嵌入热点小组件：

```html
<!-- 基础用法：展示全部平台 TOP 10 -->
<div id="trending-hub-widget" data-source="all" data-count="10"></div>
<script src="https://shixingya.github.io/trending-hub/widget.js"></script>

<!-- 指定平台 + 暗色主题 -->
<div id="trending-hub-widget" data-source="github-trending" data-count="5" data-theme="dark"></div>
<script src="https://shixingya.github.io/trending-hub/widget.js"></script>
```

参数说明：
- `data-source`: 平台 key（如 `zhihu`、`weibo`、`github-trending`），`all` 为全部平台
- `data-count`: 每个平台显示的条目数（默认 10）
- `data-theme`: 主题风格（`auto`/`dark`/`light`，默认 `auto` 跟随系统）

## 项目结构

```
src/
├── index.ts              # 入口 & 抓取逻辑
├── fetch-docs.ts         # GitHub Actions 入口（含 RSS 生成）
├── server.ts             # Express Web 服务器
├── types.ts              # 类型定义
└── sources/              # 各平台数据源
    ├── zhihu.ts            # 知乎热榜
    ├── zhihu-daily.ts      # 知乎日报
    ├── baidu.ts            # 百度热搜
    ├── baidu-tieba.ts      # 百度贴吧
    ├── baidu-boards.ts     # 百度影视/游戏/汽车/旅游
    ├── weibo.ts            # 微博热搜
    ├── bilibili.ts         # B站热门
    ├── bilibili-rank.ts    # B站排行榜
    ├── bilibili-hot.ts     # B站热搜
    ├── bilibili-popular.ts # B站综合热门
    ├── douyin.ts           # 抖音热点
    ├── toutiao.ts          # 头条热榜
    ├── thepaper.ts         # 澎湃新闻
    ├── ithome.ts           # IT之家
    ├── sspai.ts            # 少数派
    ├── douban-movie.ts     # 豆瓣电影
    ├── douban-book.ts      # 豆瓣读书
    ├── netease-music.ts    # 网易云热歌榜
    ├── github-trending.ts  # GitHub Trending
    ├── hupu.ts             # 虎扑热帖
    ├── sina-news.ts        # 新浪新闻
    ├── weread.ts           # 微信读书
    ├── juejin.ts           # 掘金热门
    ├── dongqiudi.ts        # 懂球帝热帖
    └── kuaishou.ts         # 快手热榜
docs/
├── index.html          # GitHub Pages 前端
├── widget.js           # 可嵌入小组件脚本
├── manifest.json       # PWA 配置
├── sitemap.xml         # SEO 站点地图
└── data/
    ├── trending.json   # 自动更新的数据文件
    └── feed.xml        # RSS 订阅
```

## 添加新数据源

在 `src/sources/` 下新建文件，实现 `TrendingSource` 接口：

```typescript
import type { TrendingSource, TrendingItem } from '../types.js';

export const mySource: TrendingSource = {
  name: '平台名称',
  key: 'my_source',
  icon: '平',
  color: '#FF0000',
  async fetch(): Promise<TrendingItem[]> {
    // 抓取逻辑
    return [];
  }
};
```

然后在 `src/sources/index.ts` 中注册即可。详见 [CONTRIBUTING.md](CONTRIBUTING.md)

## 部署

### GitHub Pages（推荐）

1. Fork 本项目
2. 启用 GitHub Pages：Settings → Pages → Source: main branch → /docs folder
3. GitHub Actions 每 2 小时自动更新数据
4. 访问 `https://<username>.github.io/trending-hub/`

### 本地部署

```bash
npm install
npm run dev
```

## 技术栈

- TypeScript + Node.js
- Express（本地开发服务器）
- GitHub Actions（定时数据抓取 + RSS 生成）
- 纯 HTML/CSS/JS 前端（零依赖，零构建）
- PWA + Service Worker

## 免责声明

本项目仅供学习研究使用，数据版权归原作者原平台所有。
如有版权问题请联系删除。

## License

MIT
