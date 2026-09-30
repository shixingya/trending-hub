import type { TrendingSource, TrendingItem } from '../types.js';

export const sspai: TrendingSource = {
  name: '少数派',
  key: 'sspai',
  icon: '少',
  color: '#DA2C2C',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://sspai.com/api/v1/article/index/page/get', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`少数派 API ${res.status}`);
    const json = await res.json();
    const articles = json.data || [];
    return articles.map((item: any) => ({
      title: item.title || '',
      url: `https://sspai.com/post/${item.id}`,
      description: item.summary ? item.summary.slice(0, 100) : undefined,
      author: item.author?.nickname,
      hot: item.like_count || undefined
    })).filter((item: TrendingItem) => item.title);
  }
};
