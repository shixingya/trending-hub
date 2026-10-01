import type { TrendingSource, TrendingItem } from '../types.js';

export const dongqiudi: TrendingSource = {
  name: '懂球帝热帖',
  key: 'dongqiudi',
  icon: '球',
  color: '#2B8A3E',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://www.dongqiudi.com/api/app/tabs/football/1.json', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`懂球帝 ${res.status}`);
    const json = await res.json();

    return (json.articles || []).map((article: any) => ({
      title: article.title || '',
      url: article.share || `https://www.dongqiudi.com/article/${article.id}`,
      description: article.description || undefined,
      comments: article.comments_total || undefined
    } as TrendingItem)).filter((item: TrendingItem) => item.title);
  }
};
