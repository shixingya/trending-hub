import type { TrendingSource, TrendingItem } from '../types.js';

export const baiduTieba: TrendingSource = {
  name: '百度贴吧',
  key: 'baidu-tieba',
  icon: '吧',
  color: '#4E6EF2',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://tieba.baidu.com/hottopic/browse/topicList', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://tieba.baidu.com/'
      }
    });
    if (!res.ok) throw new Error(`百度贴吧 API ${res.status}`);
    const json = await res.json();
    const topics = (json.data?.bang_topic?.topic_list || []) as any[];
    return topics.map((item) => ({
      title: item.topic_name || '',
      url: item.topic_url?.replace(/&amp;/g, '&') || `https://tieba.baidu.com/f?kw=${encodeURIComponent(item.topic_name || '')}`,
      description: item.topic_desc || undefined,
      hot: item.discuss_num ? parseInt(item.discuss_num) : undefined
    })).filter((item: TrendingItem) => item.title);
  }
};
