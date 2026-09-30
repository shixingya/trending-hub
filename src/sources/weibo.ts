import type { TrendingSource, TrendingItem } from '../types.js';

export const weibo: TrendingSource = {
  name: '微博热搜',
  key: 'weibo',
  icon: '微',
  color: '#E6162D',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://weibo.com/ajax/side/hotSearch', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Referer': 'https://weibo.com'
      }
    });
    if (!res.ok) throw new Error(`微博热搜 API ${res.status}`);
    const json = await res.json();
    const list = (json.data?.realtime || []) as any[];
    return list.map((item) => ({
      title: item.word || '',
      url: `https://s.weibo.com/weibo?q=%23${encodeURIComponent(item.word || '')}%23`,
      description: item.label_name ? `[${item.label_name}]` : undefined,
      hot: item.num || undefined
    })).filter((item: TrendingItem) => item.title);
  }
};
