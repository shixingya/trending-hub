export { baidu } from './baidu.js';
export { baiduMovie, baiduGame, baiduCar, baiduTravel } from './baidu-boards.js';
export { baiduTieba } from './baidu-tieba.js';
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
export { doubanBook } from './douban-book.js';
export { githubTrending } from './github-trending.js';
export { hupu } from './hupu.js';
export { sinaNews } from './sina-news.js';
export { neteaseMusic } from './netease-music.js';
export { weread } from './weread.js';
export { juejin } from './juejin.js';
export { dongqiudi } from './dongqiudi.js';
export { kuaishou } from './kuaishou.js';

import { baidu } from './baidu.js';
import { baiduMovie, baiduGame, baiduCar, baiduTravel } from './baidu-boards.js';
import { baiduTieba } from './baidu-tieba.js';
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
import { doubanBook } from './douban-book.js';
import { githubTrending } from './github-trending.js';
import { hupu } from './hupu.js';
import { sinaNews } from './sina-news.js';
import { neteaseMusic } from './netease-music.js';
import { weread } from './weread.js';
import { juejin } from './juejin.js';
import { dongqiudi } from './dongqiudi.js';
import { kuaishou } from './kuaishou.js';
import type { TrendingSource } from '../types.js';

export const allSources: TrendingSource[] = [
  zhihu,
  zhihuDaily,
  baidu,
  baiduTieba,
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
  doubanBook,
  neteaseMusic,
  githubTrending,
  hupu,
  sinaNews,
  weread,
  juejin,
  dongqiudi,
  kuaishou
];
