import type { TrendingSource, TrendingItem } from '../types.js';

export const zhihuHot: TrendingSource = {
  name: '知乎热评',
  key: 'zhihu-hot',
  icon: '评',
  color: '#0066FF',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://api.zhihu.com/creators/rank/hot?domain=0&period=hour&limit=30', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`知乎热评 API ${res.status}`);
    const json = await res.json();
    const list = json.data || [];
    return list.map((item: any) => {
      const q = item.question || {};
      const reaction = item.reaction || {};
      return {
        title: q.title || '',
        url: q.url || '',
        hot: reaction.new_pv || reaction.pv || undefined,
        description: reaction.new_answer_num ? `${reaction.new_answer_num} 个回答 · ${reaction.new_pv || 0} 次浏览` : undefined
      };
    }).filter((item: TrendingItem) => item.title);
  }
};
