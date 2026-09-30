# Trending Hub

全网热门话题聚合器，一站式发现知乎、百度、B站、抖音、头条、澎湃、IT之家等平台热点。

## 特性

- 聚合 7 大平台热榜：知乎、百度、B站、抖音、头条、澎湃、IT之家
- 暗色/亮色主题切换
- 关键词搜索，快速定位感兴趣的话题
- 智能分类筛选：娱乐/军事/体育/科技/社会/地区/财经/教育
- 跨平台对比，同一话题多平台热度一目了然
- RESTful API，方便二次开发
- 10 分钟缓存，避免频繁请求
- GitHub Actions 自动更新，无需服务器
- 仅抓取标题和链接，不存储原文内容

## 在线体验

https://shixingya.github.io/trending-hub/

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

source 可选值：`zhihu` / `baidu` / `bilibili` / `douyin` / `toutiao` / `thepaper` / `ithome`

### CLI 抓取
```bash
npm run fetch
```

数据保存到 `docs/data/trending.json`

## 项目结构

```
src/
├── index.ts          # 入口 & 抓取逻辑
├── fetch-docs.ts     # GitHub Actions 入口
├── server.ts         # Express Web 服务器
├── types.ts          # 类型定义
└── sources/          # 各平台数据源
    ├── zhihu.ts      # 知乎热榜
    ├── baidu.ts      # 百度热搜
    ├── bilibili.ts   # B站热门
    ├── douyin.ts     # 抖音热点
    ├── toutiao.ts    # 头条热榜
    ├── thepaper.ts   # 澎湃新闻
    └── ithome.ts     # IT之家
docs/
├── index.html        # GitHub Pages 前端
└── data/
    └── trending.json # 自动更新的数据文件
public/
└── index.html        # 本地开发前端
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

然后在 `src/sources/index.ts` 中注册即可。

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
- GitHub Actions（定时数据抓取）
- 纯 HTML/CSS/JS 前端（零依赖）

## 免责声明

本项目仅供学习研究使用，数据版权归原作者原平台所有。
如有版权问题请联系删除。

## License

MIT
