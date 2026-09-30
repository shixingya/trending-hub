import type { TrendingSource, TrendingItem } from '../types.js';

export const toutiao: TrendingSource = {
  name: '头条热榜',
  key: 'toutiao',
  icon: '头',
  color: '#FF0000',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    const json = await res.json();
    return (json.data || []).map((item: any) => ({
      title: item.Title,
      url: item.Url,
      hot: item.HotValue
    }));
  }
};
