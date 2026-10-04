# Trending Hub API Documentation

Trending Hub provides a free, open API for accessing trending topics from 34+ platforms.

## Base URL

```
https://shixingya.github.io/trending-hub/data/
```

## Endpoints

### Get All Trending Topics

```http
GET /trending.json
```

Returns all trending topics from all platforms.

**Response:**
```json
[
  {
    "source": "知乎热榜",
    "key": "zhihu",
    "icon": "知",
    "color": "#0066ff",
    "items": [
      {
        "title": "话题标题",
        "url": "https://...",
        "hot": 1234567,
        "description": "话题描述",
        "comments": 123
      }
    ],
    "fetchedAt": "2026-10-05T12:00:00.000Z"
  }
]
```

### Get Historical Data

```http
GET /trending-history.json
```

Returns historical snapshots of trending topics (last 30 days).

**Response:**
```json
{
  "snapshots": [
    {
      "date": "2026-10-05",
      "timestamp": "2026-10-05T12:00:00.000Z",
      "topics": [
        {
          "title": "话题标题",
          "hot": 1234567,
          "source": "zhihu"
        }
      ]
    }
  ]
}
```

### Get RSS Feed

```http
GET /feed.xml
```

Returns RSS feed for use in feed readers.

## Data Fields

### Source Object

| Field | Type | Description |
|-------|------|-------------|
| `source` | string | Platform display name (e.g., "知乎热榜") |
| `key` | string | Platform identifier (e.g., "zhihu") |
| `icon` | string | Platform icon character |
| `color` | string | Platform brand color (hex) |
| `items` | array | List of trending items |
| `fetchedAt` | string | ISO 8601 timestamp of last fetch |
| `error` | string | Error message if fetch failed |

### Item Object

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Topic title |
| `url` | string | Link to original topic |
| `hot` | number | Hot score / view count (optional) |
| `description` | string | Topic description (optional) |
| `comments` | number | Comment count (optional) |

## Available Platforms

- **综合**: 知乎热榜, 知乎日报, 百度热搜, 百度贴吧, 微博热搜
- **视频**: B站热门, B站排行榜, B站热搜, B站综合热门, 抖音热点, 快手热榜
- **资讯**: 头条热榜, 澎湃新闻, 新浪新闻
- **科技**: IT之家, 少数派, 掘金热门, Dev.to, 开源中国, Lobsters, Hacker News, StackOverflow
- **GitHub**: GitHub Trending, GitHub 新星
- **社区**: 虎扑热帖, 懂球帝热帖
- **阅读**: 微信读书, 豆瓣读书
- **影视**: 豆瓣电影, 百度影视
- **游戏**: 百度游戏
- **汽车**: 百度汽车
- **旅游**: 百度旅游
- **音乐**: 网易云热歌

## Rate Limiting

There is no strict rate limiting, but please be considerate:
- Cache responses for at least 30 minutes
- Data updates every 2 hours via GitHub Actions
- Avoid making requests more than once per minute

## Examples

### JavaScript

```javascript
// Fetch all trending topics
const response = await fetch('https://shixingya.github.io/trending-hub/data/trending.json');
const data = await response.json();

// Get topics from a specific platform
const zhihuTopics = data.find(s => s.key === 'zhihu')?.items || [];

// Get top 10 topics across all platforms
const allTopics = data.flatMap(s => 
  s.items.map(item => ({ ...item, source: s.source }))
);
const top10 = allTopics
  .sort((a, b) => (b.hot || 0) - (a.hot || 0))
  .slice(0, 10);
```

### Python

```python
import requests

# Fetch all trending topics
response = requests.get('https://shixingya.github.io/trending-hub/data/trending.json')
data = response.json()

# Get Weibo hot search
weibo = next((s for s in data if s['key'] == 'weibo'), None)
if weibo:
    for item in weibo['items'][:10]:
        print(f"{item['title']} - {item.get('hot', 'N/A')}")
```

### cURL

```bash
# Get all trending topics
curl https://shixingya.github.io/trending-hub/data/trending.json | jq .

# Get specific platform
curl https://shixingya.github.io/trending-hub/data/trending.json | \
  jq '.[] | select(.key == "zhihu") | .items[:5]'
```

## Use Cases

- Build your own trending dashboard
- Integrate trending topics into your app
- Create custom notifications for specific topics
- Analyze trending patterns across platforms
- Build chatbots that respond to trending topics

## CORS

The API supports CORS, so you can make requests directly from browser-based applications.

## Support

- GitHub Issues: https://github.com/shixingya/trending-hub/issues
- Documentation: https://github.com/shixingya/trending-hub#readme

## License

The API is free to use under the MIT License. Please attribute Trending Hub if you use the data in your project.
