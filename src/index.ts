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
  console.log('正在抓取全网热点...\n');
  const results = await fetchAll();

  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

  const outputFile = path.join(dataDir, 'trending.json');
  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
  console.log(`数据已保存到 ${outputFile}\n`);

  for (const r of results) {
    if (r.error) {
      console.log(`❌ ${r.source}: ${r.error}`);
    } else {
      console.log(`✅ ${r.source}: ${r.items.length} 条`);
    }
  }
}

export { fetchAll };
main();
