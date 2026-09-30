import type { TrendingSource, TrendingItem } from '../types.js';

export const doubanMovie: TrendingSource = {
  name: '豆瓣电影',
  key: 'douban-movie',
  icon: '豆',
  color: '#00B51D',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://movie.douban.com/j/search_subjects?type=movie&tag=热门&page_limit=30&page_start=0', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`豆瓣电影 API ${res.status}`);
    const json = await res.json();
    const list = (json.subjects || []) as any[];
    return list.map((item) => ({
      title: item.title || '',
      url: item.url || '',
      description: `评分: ${item.rate || 'N/A'}`,
      hot: item.rate ? parseFloat(item.rate) * 10000 : undefined
    })).filter((item: TrendingItem) => item.title);
  }
};
