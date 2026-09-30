import type { TrendingSource, TrendingItem } from '../types.js';

export const zhihu: TrendingSource = {
  name: '知乎热榜',
  key: 'zhihu',
  icon: '知',
  color: '#0066FF',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://api.zhihu.com/topstory/hot-lists/total?limit=50', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`知乎 API ${res.status}`);
    const json = await res.json();
    return (json.data || []).map((item: any) => {
      const target = item.target || {};
      let url = target.url || '';
      url = url.replace('api.zhihu.com/questions/', 'www.zhihu.com/question/');
      const detailText = item.detail_text || '';
      const hotMatch = detailText.match(/([\d.]+)\s*万/);
      const hot = hotMatch ? Math.round(parseFloat(hotMatch[1]) * 10000) : undefined;
      return {
        title: target.title || '',
        url,
        hot,
        description: target.excerpt ? target.excerpt.slice(0, 100) : undefined
      };
    }).filter((item: TrendingItem) => item.title);
  }
};
