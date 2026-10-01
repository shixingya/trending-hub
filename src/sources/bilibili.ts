import type { TrendingSource, TrendingItem } from '../types.js';

export const bilibili: TrendingSource = {
  name: 'B站热门',
  key: 'bilibili',
  icon: 'B',
  color: '#FB7299',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://api.bilibili.com/x/web-interface/popular?ps=50&pn=1', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.bilibili.com/'
      }
    });
    const json = await res.json();
    return json.data.list.map((item: any) => ({
      title: item.title,
      url: item.short_link_v2 || item.short_link || `https://www.bilibili.com/video/${item.bvid}`,
      hot: item.stat.view,
      description: item.desc,
      author: item.owner?.name,
      comments: item.stat.reply
    }));
  }
};
