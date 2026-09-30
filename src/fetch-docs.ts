import { allSources } from './sources/index.js';
import type { TrendingResult } from './types.js';
import fs from 'fs';
import path from 'path';

async function fetchAll(): Promise<TrendingResult[]> {
  const results = await Promise.allSettled(
    allSources.map(async (source) => {
      const items = await source.fetch();
      return {
        source: source.name,
        key: source.key,
        icon: source.icon,
        color: source.color,
        items,
        fetchedAt: new Date().toISOString()
      };
    })
  );

  return results.map((r, i) => {
    if (r.status === 'fulfilled') return r.value;
    return {
      source: allSources[i].name,
      key: allSources[i].key,
      icon: allSources[i].icon,
      color: allSources[i].color,
      items: [],
      fetchedAt: new Date().toISOString(),
      error: (r.reason as Error).message
    };
  });
}

async function main() {
  console.log('正在抓取全网热点...');
  const results = await fetchAll();

  const dataDir = path.join(process.cwd(), 'docs', 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  const outputFile = path.join(dataDir, 'trending.json');
  const prevFile = path.join(dataDir, 'trending-prev.json');

  if (fs.existsSync(outputFile)) {
    fs.copyFileSync(outputFile, prevFile);
  }

  fs.writeFileSync(outputFile, JSON.stringify(results));

  // Generate RSS feed
  const rssItems = results.flatMap(r =>
    r.items.slice(0, 20).map((item, idx) => `    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.url}</link>
      <description><![CDATA[${item.description || ''}]]></description>
      <category>${r.source}</category>
      <pubDate>${new Date(r.fetchedAt).toUTCString()}</pubDate>
    </item>`).join('\n')
  );
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Trending Hub - 全网热点聚合</title>
    <link>https://shixingya.github.io/trending-hub/</link>
    <description>全网热门话题聚合 - 知乎/百度/B站/抖音/头条/澎湃/IT之家</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${rssItems.join('\n')}
  </channel>
</rss>`;
  fs.writeFileSync(path.join(dataDir, 'feed.xml'), rss);

  for (const r of results) {
    if (r.error) {
      console.log(`❌ ${r.source}: ${r.error}`);
    } else {
      console.log(`✅ ${r.source}: ${r.items.length} 条`);
    }
  }
  console.log(`\n数据已保存到 ${outputFile}`);
  console.log(`RSS 已保存到 ${path.join(dataDir, 'feed.xml')}`);
}

main();
