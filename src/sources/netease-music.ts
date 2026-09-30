import type { TrendingSource, TrendingItem } from '../types.js';

export const neteaseMusic: TrendingSource = {
  name: '网易云热歌',
  key: 'netease-music',
  icon: '音',
  color: '#C20C0C',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://music.163.com/api/playlist/detail?id=3778678', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://music.163.com/'
      }
    });
    if (!res.ok) throw new Error(`网易云热歌榜 API ${res.status}`);
    const json = await res.json();
    const tracks = (json.result?.tracks || []) as any[];
    return tracks.slice(0, 30).map((track) => ({
      title: `${track.name} - ${track.artists?.map((a: any) => a.name).join('/') || ''}`,
      url: `https://music.163.com/#/song?id=${track.id}`,
      description: track.album?.name || undefined,
      hot: undefined
    })).filter((item: TrendingItem) => item.title);
  }
};
