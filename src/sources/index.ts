export { baidu } from './baidu.js';
export { baiduMovie, baiduGame, baiduCar, baiduTravel } from './baidu-boards.js';
export { bilibili } from './bilibili.js';
export { bilibiliRank } from './bilibili-rank.js';
export { bilibiliHot } from './bilibili-hot.js';
export { bilibiliPopular } from './bilibili-popular.js';
export { douyin } from './douyin.js';
export { toutiao } from './toutiao.js';
export { zhihu } from './zhihu.js';
export { zhihuDaily } from './zhihu-daily.js';
export { thepaper } from './thepaper.js';
export { ithome } from './ithome.js';
export { sspai } from './sspai.js';
export { weibo } from './weibo.js';
export { doubanMovie } from './douban-movie.js';
export { neteaseMusic } from './netease-music.js';

import { baidu } from './baidu.js';
import { baiduMovie, baiduGame, baiduCar, baiduTravel } from './baidu-boards.js';
import { bilibili } from './bilibili.js';
import { bilibiliRank } from './bilibili-rank.js';
import { bilibiliHot } from './bilibili-hot.js';
import { bilibiliPopular } from './bilibili-popular.js';
import { douyin } from './douyin.js';
import { toutiao } from './toutiao.js';
import { zhihu } from './zhihu.js';
import { zhihuDaily } from './zhihu-daily.js';
import { thepaper } from './thepaper.js';
import { ithome } from './ithome.js';
import { sspai } from './sspai.js';
import { weibo } from './weibo.js';
import { doubanMovie } from './douban-movie.js';
import { neteaseMusic } from './netease-music.js';
import type { TrendingSource } from '../types.js';

export const allSources: TrendingSource[] = [
  zhihu,
  zhihuDaily,
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
  baiduCar,
  baiduTravel,
  doubanMovie,
  neteaseMusic
];
