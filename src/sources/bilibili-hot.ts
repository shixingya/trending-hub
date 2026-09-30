import type { TrendingSource, TrendingItem } from '../types.js';

export const bilibiliHot: TrendingSource = {
  name: 'B站热搜',
  key: 'bilibili-hot',
  icon: '搜',
  color: '#00AEEC',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://api.bilibili.com/x/web-interface/search/square?limit=30', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.bilibili.com'
      }
    });
    if (!res.ok) throw new Error(`B站热搜 API ${res.status}`);
    const json = await res.json();
    const list = json.data?.trending?.list || [];
    return list.map((item: any) => ({
      title: item.show_name || item.keyword || '',
      url: `https://search.bilibili.com/all?keyword=${encodeURIComponent(item.keyword || '')}`,
      hot: item.heat_score || undefined
    })).filter((item: TrendingItem) => item.title);
  }
};
