import type { TrendingSource, TrendingItem } from '../types.js';

export const hupu: TrendingSource = {
  name: '虎扑热帖',
  key: 'hupu',
  icon: '虎',
  color: '#D81824',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://bbs.hupu.com/all-gambia', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`虎扑 ${res.status}`);
    const html = await res.text();

    const items: TrendingItem[] = [];
    const pattern = /<a[^>]+href="\/(\d+)\.html"[^>]*class="\s*(?:hot|false|true)\s*"[^>]*>[\s\S]*?<span class="t-title">([^<]+)<\/span>/g;
    let match;

    while ((match = pattern.exec(html)) !== null) {
      const threadId = match[1];
      const title = match[2].trim();

      if (!title) continue;

      items.push({
        title,
        url: `https://bbs.hupu.com/${threadId}.html`,
        description: undefined,
        hot: undefined
      });
    }

    return items.slice(0, 30);
  }
};
