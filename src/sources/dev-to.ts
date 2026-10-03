import type { TrendingSource, TrendingItem } from '../types.js';

export const devto: TrendingSource = {
  name: 'Dev.to',
  key: 'devto',
  icon: 'DV',
  color: '#0A0A0A',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://dev.to/api/articles?top=1&per_page=30', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`Dev.to ${res.status}`);
    const json = await res.json();

    return (json || []).map((item: any) => ({
      title: item.title || '',
      url: item.url || '',
      description: item.description || undefined,
      hot: item.positive_reactions_count || undefined,
      comments: item.comments_count || undefined,
      author: item.user?.name || item.user?.username || undefined
    })).filter((item: TrendingItem) => item.title);
  }
};
