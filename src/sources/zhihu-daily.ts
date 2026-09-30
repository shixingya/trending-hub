import type { TrendingSource, TrendingItem } from '../types.js';

export const zhihuDaily: TrendingSource = {
  name: '知乎日报',
  key: 'zhihu-daily',
  icon: '日',
  color: '#0566FF',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://news-at.zhihu.com/api/4/news/latest', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`知乎日报 API ${res.status}`);
    const json = await res.json();
    const list = (json.stories || []) as any[];
    return list.map((item) => ({
      title: item.title || '',
      url: item.url ? `https://daily.zhihu.com/story/${item.url.match(/\/story\/(\d+)/)?.[1] || ''}` : '',
      description: item.hint || undefined,
      hot: undefined
    })).filter((item: TrendingItem) => item.title);
  }
};
