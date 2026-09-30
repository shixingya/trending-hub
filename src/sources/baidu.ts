import type { TrendingSource, TrendingItem } from '../types.js';

export const baidu: TrendingSource = {
  name: '百度热搜',
  key: 'baidu',
  icon: '百',
  color: '#2932E1',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://top.baidu.com/api/board?platform=wise&tab=realtime', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    const json = await res.json();
    return json.data.cards[0].content[0].content.map((item: any) => ({
      title: item.word,
      url: item.url || `https://www.baidu.com/s?wd=${encodeURIComponent(item.word)}`,
      hot: item.hotScore,
      description: item.desc
    }));
  }
};
