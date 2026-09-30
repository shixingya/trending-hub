export interface TrendingItem {
  title: string;
  url: string;
  hot?: number;
  description?: string;
  author?: string;
}

export interface TrendingSource {
  name: string;
  key: string;
  icon: string;
  color: string;
  fetch(): Promise<TrendingItem[]>;
}

export interface TrendingResult {
  source: string;
  key: string;
  icon: string;
  color: string;
  items: TrendingItem[];
  fetchedAt: string;
  error?: string;
}
