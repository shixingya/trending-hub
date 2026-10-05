import type { TrendingSource, TrendingItem } from '../types.js';

export const theverge: TrendingSource = {
  name: 'The Verge',
  key: 'theverge',
  icon: 'VG',
  color: '#E3243B',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://www.theverge.com/rss/index.xml', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`The Verge ${res.status}`);
    const xml = await res.text();

    const items: TrendingItem[] = [];
    const entries = xml.split('<entry>');

    for (let i = 1; i < entries.length; i++) {
      const entry = entries[i];
      const titleMatch = entry.match(/<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/);
      const linkMatch = entry.match(/<link[^>]*href="([^"]+)"/);
      const descMatch = entry.match(/<content[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/content>/);
      const authorMatch = entry.match(/<name>([\s\S]*?)<\/name>/);

      const title = titleMatch ? titleMatch[1].trim() : '';
      if (!title) continue;

      const description = descMatch
        ? descMatch[1].replace(/<[^>]+>/g, '').trim().slice(0, 150)
        : undefined;

      items.push({
        title,
        url: linkMatch ? linkMatch[1].trim() : '',
        description: description || undefined,
        author: authorMatch ? authorMatch[1].trim() : undefined,
        hot: Math.max(7000 - (i - 1) * 120, 1000)
      });
    }

    return items;
  }
};
