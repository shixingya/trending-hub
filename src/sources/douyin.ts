import type { TrendingSource, TrendingItem } from '../types.js';

export const douyin: TrendingSource = {
  name: '抖音热点',
  key: 'douyin',
  icon: '抖',
  color: '#161823',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://www.douyin.com/aweme/v1/web/hot/search/list/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.douyin.com/'
      }
    });
    const json = await res.json();
    return (json.data?.word_list || []).map((item: any) => ({
      title: item.word,
      url: `https://www.douyin.com/search/${encodeURIComponent(item.word)}`,
      hot: item.hot_value
    }));
  }
};
