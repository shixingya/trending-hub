import type { TrendingSource, TrendingItem } from '../types.js';

export const weread: TrendingSource = {
  name: '微信读书',
  key: 'weread',
  icon: '微',
  color: '#1AAD19',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://weread.qq.com/web/bookListInCategory/rising?rank=1', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`WeChat Read ${res.status}`);
    const data = await res.json();

    return (data.books || []).map((book: any) => {
      const info = book.bookInfo;
      const title = `${info.title} - ${info.author}`;
      const hot = info.newRating || info.readingCount || 0;
      const url = info.deepLink || `https://weread.qq.com/web/bookDetail/${info.bookId}`;
      const description = info.intro ? info.intro.substring(0, 100) : undefined;

      return {
        title,
        url,
        hot,
        description
      };
    }).slice(0, 30);
  }
};
