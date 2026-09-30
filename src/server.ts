import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchAll } from './index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

let cachedData: any = null;
let lastFetch = 0;
const CACHE_TTL = 10 * 60 * 1000;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/trending', async (_req, res) => {
  try {
    if (cachedData && Date.now() - lastFetch < CACHE_TTL) {
      res.json({ success: true, data: cachedData });
      return;
    }
    const data = await fetchAll();
    cachedData = data;
    lastFetch = Date.now();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

app.get('/api/trending/:source', async (req, res) => {
  try {
    const data = await fetchAll();
    const source = data.find(d => d.key === req.params.source);
    if (!source) {
      res.status(404).json({ success: false, error: 'Source not found' });
      return;
    }
    res.json({ success: true, data: source });
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

app.listen(PORT, () => {
  console.log(`🔥 Trending Hub 已启动: http://localhost:${PORT}`);
});
