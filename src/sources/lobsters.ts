import type { TrendingSource, TrendingItem } from '../types.js';

export const lobsters: TrendingSource = {
  name: 'Lobsters',
  key: 'lobsters',
  icon: 'Lb',
  color: '#AC130D',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://lobste.rs/hottest.json', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`Lobsters ${res.status}`);
    const json = await res.json();

    return (json || []).map((item: any) => ({
      title: item.title || '',
      url: item.url || item.short_id_url || '',
      description: item.tags?.length ? item.tags.join(' · ') : undefined,
      hot: item.score || undefined,
      comments: item.comment_count || undefined,
      author: item.submitter_user || undefined
    })).filter((item: TrendingItem) => item.title);
  }
};
