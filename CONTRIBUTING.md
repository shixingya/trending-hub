# Contributing to Trending Hub

欢迎贡献！以下是一些参与方式：

## 添加新数据源

1. 在 `src/sources/` 下创建新文件，如 `mysource.ts`
2. 实现 `TrendingSource` 接口
3. 在 `src/sources/index.ts` 中注册
4. 运行 `npm run fetch` 测试
5. 提交 PR

```typescript
import type { TrendingSource, TrendingItem } from '../types.js';

export const mysource: TrendingSource = {
  name: '平台名称',
  key: 'mysource',
  icon: '平',
  color: '#FF0000',
  async fetch(): Promise<TrendingItem[]> {
    // 实现抓取逻辑
    return [];
  }
};
```

## 改进前端

- 纯 HTML/CSS/JS，无需构建工具
- 修改 `docs/index.html` 即可
- 注意保持暗色/亮色主题兼容

## 提交 PR

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feat/your-feature`)
3. 提交改动 (`git commit -m 'feat: 添加xxx'`)
4. 推送到分支 (`git push origin feat/your-feature`)
5. 创建 Pull Request

## 报告问题

- 使用 [Issues](https://github.com/shixingya/trending-hub/issues) 报告 bug
- 描述清楚复现步骤
- 附上截图更佳

## 代码规范

- 使用 TypeScript
- 保持代码简洁
- 中文注释
- 小步提交

感谢你的贡献！
