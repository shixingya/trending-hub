import type { TrendingSource, TrendingItem } from '../types.js';

export const hackernews: TrendingSource = {
  name: 'Hacker News',
  key: 'hackernews',
  icon: 'Y',
  color: '#ff6600',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=30', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`Hacker News ${res.status}`);
    const json = await res.json();

    return (json.hits || []).map((item: any) => ({
      title: item.title || '',
      url: item.url || `https://news.ycombinator.com/item?id=${item.objectID}`,
      hot: item.points || undefined,
      comments: item.num_comments || undefined,
      author: item.author || undefined
    })).filter((item: TrendingItem) => item.title);
  }
};
