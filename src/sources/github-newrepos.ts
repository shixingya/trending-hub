import type { TrendingSource, TrendingItem } from '../types.js';

export const githubNewRepos: TrendingSource = {
  name: 'GitHub 新星',
  key: 'github-newrepos',
  icon: '⭐',
  color: '#24292F',
  async fetch(): Promise<TrendingItem[]> {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const dateStr = weekAgo.toISOString().split('T')[0];

    const res = await fetch(
      `https://api.github.com/search/repositories?sort=stars&order=desc&per_page=30&q=created:>${dateStr}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );
    if (!res.ok) throw new Error(`GitHub New Repos ${res.status}`);
    const json = await res.json();

    return (json.items || []).map((item: any) => ({
      title: item.full_name || '',
      url: item.html_url || '',
      description: item.description || undefined,
      hot: item.stargazers_count || undefined,
      author: item.owner?.login || undefined
    })).filter((item: TrendingItem) => item.title);
  }
};
