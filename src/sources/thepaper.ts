import type { TrendingSource, TrendingItem } from '../types.js';

export const thepaper: TrendingSource = {
  name: '澎湃新闻',
  key: 'thepaper',
  icon: '澎',
  color: '#C8102E',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://cache.thepaper.cn/contentapi/wwwIndex/rightSidebar');
    if (!res.ok) throw new Error(`澎湃 API ${res.status}`);
    const json = await res.json();
    const hotNews = json.data?.hotNews || [];
    return hotNews.map((item: any) => ({
      title: item.name || '',
      url: `https://www.thepaper.cn/newsDetail_forward_${item.contId}`,
      description: item.desc || undefined
    })).filter((item: TrendingItem) => item.title);
  }
};
