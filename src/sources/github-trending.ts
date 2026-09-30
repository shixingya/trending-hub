import type { TrendingSource, TrendingItem } from '../types.js';

export const githubTrending: TrendingSource = {
  name: 'GitHub Trending',
  key: 'github-trending',
  icon: 'G',
  color: '#24292F',
  async fetch(): Promise<TrendingItem[]> {
    const res = await fetch('https://github.com/trending?since=daily', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`GitHub Trending ${res.status}`);
    const html = await res.text();

    const items: TrendingItem[] = [];
    const articleRegex = /<article class="Box-row"[^>]*>([\s\S]*?)<\/article>/g;
    let articleMatch;

    while ((articleMatch = articleRegex.exec(html)) !== null) {
      const articleContent = articleMatch[1];

      const repoLinkMatch = articleContent.match(/href="\/([^\/"]+\/[^\/"]+)"/);
      if (!repoLinkMatch) continue;
      const repoPath = repoLinkMatch[1];

      if (repoPath.startsWith('sponsors/') || repoPath.includes('/sponsors')) continue;

      const descMatch = articleContent.match(/<p class="col-9[^"]*"[^>]*>([\s\S]*?)<\/p>/);
      const description = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim() : undefined;

      const starsMatch = articleContent.match(/([\d,]+)\s+stars?\s+today/);
      const hot = starsMatch ? parseInt(starsMatch[1].replace(/,/g, '')) : undefined;

      const langMatch = articleContent.match(/itemprop="programmingLanguage"[^>]*>([^<]+)</);
      const language = langMatch ? langMatch[1].trim() : undefined;

      const title = language ? `${repoPath} [${language}]` : repoPath;

      items.push({
        title,
        url: `https://github.com/${repoPath}`,
        description,
        hot
      });
    }

    return items;
  }
};
