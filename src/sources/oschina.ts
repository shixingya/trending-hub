import type { TrendingSource, TrendingItem } from '../types.js';

export const oschina: TrendingSource = {
  name: '开源中国',
  key: 'oschina',
  icon: '源',
  color: '#1F8E3E',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://www.oschina.net/action/ajax/get_more_recommend_blog', {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'p=1&type=hot'
    });
    if (!res.ok) throw new Error(`开源中国 ${res.status}`);
    const html = await res.text();

    const items: TrendingItem[] = [];
    const blocks = html.split('<div class="box item">');

    for (let i = 1; i < blocks.length; i++) {
      const block = blocks[i];

      const titleMatch = block.match(/blog-title-link[^>]*title="([^"]+)"/);
      const linkMatch = block.match(/blog-title-link"[^>]*href="([^"]+)"/);
      const descMatch = block.match(/class="blog-brief[^"]*">([\s\S]*?)<\/section>/);
      const readMatch = block.match(/阅读\s*([\d,]+)/);

      const title = titleMatch ? titleMatch[1].trim() : '';
      if (!title) continue;

      items.push({
        title,
        url: linkMatch ? linkMatch[1] : '',
        description: descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim().slice(0, 120) : undefined,
        hot: readMatch ? parseInt(readMatch[1].replace(/,/g, '')) : undefined
      });
    }

    return items;
  }
};
