export { baidu } from './baidu.js';
export { baiduMovie, baiduGame, baiduCar } from './baidu-boards.js';
export { bilibili } from './bilibili.js';
export { bilibiliRank } from './bilibili-rank.js';
export { bilibiliHot } from './bilibili-hot.js';
export { bilibiliPopular } from './bilibili-popular.js';
export { douyin } from './douyin.js';
export { toutiao } from './toutiao.js';
export { zhihu } from './zhihu.js';
export { thepaper } from './thepaper.js';
export { ithome } from './ithome.js';
export { sspai } from './sspai.js';
export { weibo } from './weibo.js';

import { baidu } from './baidu.js';
import { baiduMovie, baiduGame, baiduCar } from './baidu-boards.js';
import { bilibili } from './bilibili.js';
import { bilibiliRank } from './bilibili-rank.js';
import { bilibiliHot } from './bilibili-hot.js';
import { bilibiliPopular } from './bilibili-popular.js';
import { douyin } from './douyin.js';
import { toutiao } from './toutiao.js';
import { zhihu } from './zhihu.js';
import { thepaper } from './thepaper.js';
import { ithome } from './ithome.js';
import { sspai } from './sspai.js';
import { weibo } from './weibo.js';
import type { TrendingSource } from '../types.js';

export const allSources: TrendingSource[] = [
  zhihu,
  baidu,
  weibo,
  bilibili,
  bilibiliRank,
  bilibiliHot,
  bilibiliPopular,
  douyin,
  toutiao,
  thepaper,
  ithome,
  sspai,
  baiduMovie,
  baiduGame,
  baiduCar
];
