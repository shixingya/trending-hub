import type { TrendingSource, TrendingItem } from '../types.js';

export const bilibiliPopular: TrendingSource = {
  name: 'B站综合热门',
  key: 'bilibili-popular',
  icon: '热',
  color: '#FE6A93',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://api.bilibili.com/x/web-interface/popular?ps=50&pn=1', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.bilibili.com'
      }
    });
    if (!res.ok) throw new Error(`B站综合热门 API ${res.status}`);
    const json = await res.json();
    const list = json.data?.list || [];
    return list.map((item: any) => ({
      title: item.title || '',
      url: `https://www.bilibili.com/video/${item.bvid}`,
      description: item.desc ? item.desc.slice(0, 100) : undefined,
      author: item.owner?.name,
      hot: item.stat?.view || undefined,
      comments: item.stat?.reply || undefined
    })).filter((item: TrendingItem) => item.title);
  }
};
