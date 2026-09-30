# Trending Hub

<div align="center">

**全网热门话题聚合器**

[![GitHub stars](https://img.shields.io/github/stars/shixingya/trending-hub?style=social)](https://github.com/shixingya/trending-hub/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/shixingya/trending-hub?style=social)](https://github.com/shixingya/trending-hub/network/members)
[![GitHub issues](https://img.shields.io/github/issues/shixingya/trending-hub)](https://github.com/shixingya/trending-hub/issues)
[![License](https://img.shields.io/github/license/shixingya/trending-hub)](https://github.com/shixingya/trending-hub/blob/main/LICENSE)
[![Update Frequency](https://img.shields.io/badge/updates-every%202%20hours-brightgreen)](https://github.com/shixingya/trending-hub/actions)

一站式发现知乎、百度、微博、B站、抖音、头条、澎湃、IT之家、少数派、豆瓣等16大平台热点

[在线体验](https://shixingya.github.io/trending-hub/) · [报告问题](https://github.com/shixingya/trending-hub/issues) · [建议新数据源](https://github.com/shixingya/trending-hub/issues/new?assignees=&labels=enhancement&template=new_source.md)

</div>

## 特性

- 聚合 16 大平台热榜：知乎、百度、微博、B站热门/排行榜/热搜/综合热门、抖音、头条、澎湃、IT之家、少数派、百度影视/游戏/汽车、豆瓣电影
- 暗色/亮色主题切换，自动跟随系统
- 关键词搜索，快速定位感兴趣的话题
- 智能分类筛选：娱乐/军事/体育/科技/社会/地区/财经/教育
- 全网热搜榜中榜：跨平台热度 TOP 20
- 跨平台对比，同一话题多平台同时上榜一目了然
- RSS 订阅，在阅读器中追踪热点
- PWA 支持，可添加到手机主屏幕
- RESTful API，方便二次开发
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

## API

### 获取全部热榜
```
GET /api/trending
```

### 获取单个平台
```
GET /api/trending/:source
```

source 可选值：`zhihu` / `baidu` / `weibo` / `bilibili` / `bilibili-rank` / `bilibili-hot` / `bilibili-popular` / `douyin` / `toutiao` / `thepaper` / `ithome` / `sspai` / `baidu-movie` / `baidu-game` / `baidu-car` / `douban-movie`

### CLI 抓取
```bash
npm run fetch
```

数据保存到 `docs/data/trending.json`，RSS 保存到 `docs/data/feed.xml`

## 项目结构

```
src/
├── index.ts              # 入口 & 抓取逻辑
├── fetch-docs.ts         # GitHub Actions 入口（含 RSS 生成）
├── server.ts             # Express Web 服务器
├── types.ts              # 类型定义
└── sources/              # 各平台数据源
    ├── zhihu.ts            # 知乎热榜
    ├── baidu.ts            # 百度热搜
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
    └── baidu-boards.ts     # 百度影视/游戏/汽车
docs/
├── index.html          # GitHub Pages 前端
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
