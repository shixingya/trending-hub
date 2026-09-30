import type { TrendingSource, TrendingItem } from '../types.js';

export const doubanBook: TrendingSource = {
  name: '豆瓣读书',
  key: 'douban-book',
  icon: '书',
  color: '#00B51D',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://book.douban.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`豆瓣读书 ${res.status}`);
    const html = await res.text();
    
    const items: TrendingItem[] = [];
    const regex = /<a[^>]*href="(https:\/\/book\.douban\.com\/subject\/[^"]*)"[^>]*title="([^"]*)"[^>]*>/g;
    let match;
    
    while ((match = regex.exec(html)) !== null && items.length < 30) {
      const url = match[1];
      const title = match[2];
      if (title && url) {
        items.push({
          title,
          url,
          description: '豆瓣读书'
        });
      }
    }
    
    return items;
  }
};
