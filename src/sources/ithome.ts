import type { TrendingSource, TrendingItem } from '../types.js';

export const ithome: TrendingSource = {
  name: 'IT之家',
  key: 'ithome',
  icon: 'IT',
  color: '#D32F2F',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://m.ithome.com/api/news/newslistpageget?catid=0&page=0&pagesize=30', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (!res.ok) throw new Error(`IT之家 API ${res.status}`);
    const json = await res.json();
    const items = json.Result || [];
    return items.map((item: any) => {
      let url = item.url || '';
      if (url.startsWith('/')) url = `https://www.ithome.com${url}`;
      else if (!url.startsWith('http')) url = `https://www.ithome.com/${url}`;
      return {
        title: item.title || '',
        url,
        description: item.description || undefined
      };
    }).filter((item: TrendingItem) => item.title);
  }
};
