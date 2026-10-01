import type { TrendingSource, TrendingItem } from '../types.js';

export const juejin: TrendingSource = {
  name: '掘金热门',
  key: 'juejin',
  icon: '掘',
  color: '#1E80FF',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`掘金 ${res.status}`);
    const json = await res.json();
    if (json.err_no !== 0) throw new Error(`掘金 API: ${json.err_msg}`);

    return (json.data || []).map((item: any) => {
      const content = item.content || {};
      const counter = item.content_counter || {};
      const author = item.author || {};
      const contentId = content.content_id || '';

      return {
        title: content.title || '',
        url: `https://juejin.cn/post/${contentId}`,
        description: author.name ? `作者: ${author.name}` : undefined,
        hot: counter.hot_rank || counter.view || undefined,
        comments: counter.comment_count || undefined
      } as TrendingItem;
    }).filter((item: TrendingItem) => item.title);
  }
};
