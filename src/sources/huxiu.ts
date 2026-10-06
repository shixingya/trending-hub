import type { TrendingSource, TrendingItem } from '../types.js';

export const huxiu: TrendingSource = {
  name: '虎嗅',
  key: 'huxiu',
  icon: '虎',
  color: '#E04040',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://api-article.huxiu.com/web/article/articleList', {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'platform=www'
    });
    if (!res.ok) throw new Error(`虎嗅 ${res.status}`);
    const data = await res.json();
    if (!data.success || !data.data?.dataList) throw new Error('虎嗅 API 返回异常');

    const items: TrendingItem[] = data.data.dataList.map((article: any) => ({
      title: article.title,
      url: `https://www.huxiu.com/article/${article.aid}.html`,
      description: article.summary || undefined,
      hot: article.count_info?.viewnum || 0,
      author: article.user_info?.username || undefined,
      comments: article.count_info?.total_comment_num || 0
    }));

    return items.slice(0, 30);
  }
};
