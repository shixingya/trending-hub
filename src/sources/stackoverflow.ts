import type { TrendingSource, TrendingItem } from '../types.js';

export const stackoverflow: TrendingSource = {
  name: 'StackOverflow',
  key: 'stackoverflow',
  icon: 'SO',
  color: '#F48024',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://api.stackexchange.com/2.3/questions?order=desc&sort=hot&site=stackoverflow&pagesize=30', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`StackOverflow ${res.status}`);
    const json = await res.json();

    return (json.items || []).map((item: any) => ({
      title: item.title || '',
      url: item.link || '',
      description: undefined,
      hot: item.score || undefined,
      comments: item.answer_count || undefined,
      author: item.owner?.display_name || undefined
    })).filter((item: TrendingItem) => item.title);
  }
};
