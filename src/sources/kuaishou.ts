import type { TrendingSource } from '../types.js';

export const kuaishou: TrendingSource = {
  name: '快手热榜',
  key: 'kuaishou',
  icon: '快',
  color: '#FF4906',
  url: 'https://www.kuaishou.com/',
  async fetch() {
    const query = `query visionHotRank {
      visionHotRank {
        items {
          name
          photoIds
        }
      }
    }`;

    const res = await fetch('https://www.kuaishou.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.kuaishou.com/',
        'Origin': 'https://www.kuaishou.com'
      },
      body: JSON.stringify({
        operationName: 'visionHotRank',
        variables: {},
        query
      })
    });

    if (!res.ok) {
      throw new Error(`Kuaishou API error: ${res.status}`);
    }

    const data = await res.json() as any;

    if (!data.data?.visionHotRank?.items) {
      throw new Error('Invalid Kuaishou response structure');
    }

    return data.data.visionHotRank.items
      .filter((item: any) => item.name && item.photoIds?.length > 0)
      .map((item: any, index: number) => ({
        title: item.name,
        url: `https://www.kuaishou.com/short-video/${item.photoIds[0]}`,
        hot: Math.max(1000000 - index * 10000, 100000)
      }));
  }
};
