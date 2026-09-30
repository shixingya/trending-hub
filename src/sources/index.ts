export { baidu } from './baidu.js';
export { bilibili } from './bilibili.js';
export { douyin } from './douyin.js';
export { toutiao } from './toutiao.js';
export { zhihu } from './zhihu.js';
export { thepaper } from './thepaper.js';
export { ithome } from './ithome.js';

import { baidu } from './baidu.js';
import { bilibili } from './bilibili.js';
import { douyin } from './douyin.js';
import { toutiao } from './toutiao.js';
import { zhihu } from './zhihu.js';
import { thepaper } from './thepaper.js';
import { ithome } from './ithome.js';
import type { TrendingSource } from '../types.js';

export const allSources: TrendingSource[] = [
  zhihu,
  baidu,
  bilibili,
  douyin,
  toutiao,
  thepaper,
  ithome
];
