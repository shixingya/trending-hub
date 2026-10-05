import type { TrendingSource, TrendingItem } from '../types.js';

export const arstechnica: TrendingSource = {
  name: 'Ars Technica',
  key: 'arstechnica',
  icon: 'AT',
  color: '#FF5700',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://feeds.arstechnica.com/arstechnica/index', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`Ars Technica ${res.status}`);
    const xml = await res.text();

    const items: TrendingItem[] = [];
    const entries = xml.split('<item>');

    for (let i = 1; i < entries.length; i++) {
      const entry = entries[i];
      const titleMatch = entry.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/);
      const linkMatch = entry.match(/<link>([\s\S]*?)<\/link>/);
      const descMatch = entry.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/);
      const authorMatch = entry.match(/<dc:creator>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/dc:creator>/);

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
        hot: Math.max(6000 - (i - 1) * 100, 1000)
      });
    }

    return items;
  }
};
