import type { TrendingSource, TrendingItem } from '../types.js';

export const sinaNews: TrendingSource = {
  name: '新浪新闻',
  key: 'sina-news',
  icon: '浪',
  color: '#E6162D',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://feed.mix.sina.com.cn/api/roll/get?pageid=153&lid=2509&k=&num=50&page=1&r=0.1', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`新浪新闻 ${res.status}`);
    const json = await res.json();
    const items = (json.result?.data || []) as any[];

    return items.slice(0, 30).map((item) => ({
      title: item.title || '',
      url: item.url || '',
      description: item.intro ? item.intro.slice(0, 100) : undefined,
      author: item.media_name || undefined,
      hot: undefined
    })).filter((item: TrendingItem) => item.title && item.url);
  }
};
