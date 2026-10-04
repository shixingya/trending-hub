import type { TrendingSource, TrendingItem } from '../types.js';

export const githubTrending: TrendingSource = {
  name: 'GitHub Trending',
  key: 'github-trending',
  icon: 'G',
  color: '#24292F',
  async fetch(): Promise<TrendingItem[]> {
    // Use GitHub API to search for recently created repos with many stars
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const dateStr = weekAgo.toISOString().split('T')[0];
    
    const res = await fetch(`https://api.github.com/search/repositories?q=created:>${dateStr}&sort=stars&order=desc&per_page=30`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'TrendingHub/1.0'
      }
    });
    
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const data = await res.json();
    
    const items: TrendingItem[] = (data.items || []).map((repo: any) => ({
      title: `${repo.full_name} [${repo.language || 'Unknown'}]`,
      url: repo.html_url,
      description: repo.description || undefined,
      hot: repo.stargazers_count
    }));

    return items;
  }
};
