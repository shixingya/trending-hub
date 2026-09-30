export { baidu } from './baidu.js';
export { bilibili } from './bilibili.js';
export { douyin } from './douyin.js';
export { toutiao } from './toutiao.js';

import { baidu } from './baidu.js';
import { bilibili } from './bilibili.js';
import { douyin } from './douyin.js';
import { toutiao } from './toutiao.js';
import type { TrendingSource } from '../types.js';

export const allSources: TrendingSource[] = [
  baidu,
  bilibili,
  douyin,
  toutiao
];
