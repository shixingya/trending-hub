import type { TrendingSource, TrendingItem } from '../types.js';

export const bilibiliPrecious: TrendingSource = {
  name: 'B站入站必刷',
  key: 'bilibili-precious',
  icon: '典',
  color: '#FB7299',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://api.bilibili.com/x/web-interface/popular/precious?page=1&ps=50', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.bilibili.com'
      }
    });
    if (!res.ok) throw new Error(`B站入站必刷 API ${res.status}`);
    const json = await res.json();
    const list = json.data?.list || [];
    return list.map((item: any) => ({
      title: item.title || '',
      url: `https://www.bilibili.com/video/${item.bvid || ''}`,
      hot: item.stat?.view || undefined,
      comments: item.stat?.reply || undefined,
      description: item.desc ? item.desc.slice(0, 100) : undefined
    })).filter((item: TrendingItem) => item.title);
  }
};
