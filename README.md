# Trending Hub

全网热门话题聚合器，一站式发现百度、B站、抖音、头条等平台热点。

## 特性

- 聚合 4 大平台热榜：百度热搜、B站热门、抖音热点、头条热榜
- 暗色主题 Web 界面，支持分类筛选
- RESTful API，方便二次开发
- 10 分钟缓存，避免频繁请求
- 仅抓取标题和链接，不存储原文内容

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式（Web 服务）
npm run dev

# 构建
npm run build

# 生产启动
npm start

# CLI 抓取（保存到 JSON）
npm run fetch
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

source 可选值：`baidu` / `bilibili` / `douyin` / `toutiao`

### CLI 抓取
```bash
npm run fetch
```

数据保存到 `data/trending.json`

## 项目结构

```
src/
├── index.ts          # 入口 & 抓取逻辑
├── server.ts         # Express Web 服务器
├── types.ts          # 类型定义
└── sources/          # 各平台数据源
    ├── baidu.ts
    ├── bilibili.ts
    ├── douyin.ts
    └── toutiao.ts
public/
└── index.html        # 前端页面
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

## 免责声明

本项目仅供学习研究使用，数据版权归原作者原平台所有。
如有版权问题请联系删除。

## License

MIT
