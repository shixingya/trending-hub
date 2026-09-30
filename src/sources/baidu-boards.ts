import type { TrendingSource, TrendingItem } from '../types.js';

async function fetchBaiduBoard(tab: string): Promise<any[]> {
  const res = await fetch(`https://top.baidu.com/board?tab=${tab}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  if (!res.ok) throw new Error(`百度${tab}榜 ${res.status}`);
  const html = await res.text();
  const match = html.match(/<!--s-data:(.*?)-->/s);
  if (!match) throw new Error(`百度${tab}榜数据解析失败`);
  const data = JSON.parse(match[1]);
  return data.data?.cards?.[0]?.content || [];
}

export const baiduMovie: TrendingSource = {
  name: '百度影视',
  key: 'baidu-movie',
  icon: '影',
  color: '#FF6600',
  async fetch(): Promise<TrendingItem[]> {
    const items = await fetchBaiduBoard('movie');
    return items.map((item) => ({
      title: item.word || item.title || '',
      url: item.url || item.rawUrl || `https://www.baidu.com/s?wd=${encodeURIComponent(item.query || item.word || '')}`,
      description: item.desc || (item.show ? item.show.join(' ') : undefined),
      hot: item.hotScore ? parseInt(item.hotScore) : undefined
    })).filter((item: TrendingItem) => item.title);
  }
};

export const baiduGame: TrendingSource = {
  name: '百度游戏',
  key: 'baidu-game',
  icon: '游',
  color: '#7B68EE',
  async fetch(): Promise<TrendingItem[]> {
    const items = await fetchBaiduBoard('game');
    return items.map((item) => ({
      title: item.word || item.title || '',
      url: item.url || item.rawUrl || `https://www.baidu.com/s?wd=${encodeURIComponent(item.query || item.word || '')}`,
      description: item.desc || (item.show ? item.show.join(' ') : undefined),
      hot: item.hotScore ? parseInt(item.hotScore) : undefined
    })).filter((item: TrendingItem) => item.title);
  }
};

export const baiduCar: TrendingSource = {
  name: '百度汽车',
  key: 'baidu-car',
  icon: '车',
  color: '#20B2AA',
  async fetch(): Promise<TrendingItem[]> {
    const items = await fetchBaiduBoard('car');
    return items.map((item) => ({
      title: item.query || item.word || item.title || '',
      url: item.url || item.rawUrl || `https://www.baidu.com/s?wd=${encodeURIComponent(item.query || item.word || '')}`,
      description: item.desc || (item.show ? item.show.join(' ') : undefined),
      hot: item.hotScore ? parseInt(item.hotScore) : undefined
    })).filter((item: TrendingItem) => item.title);
  }
};
