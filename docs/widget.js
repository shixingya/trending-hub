(function() {
  const container = document.getElementById('trending-hub-widget');
  if (!container) return;

  const source = container.dataset.source || 'all';
  const count = parseInt(container.dataset.count) || 10;
  const theme = container.dataset.theme || 'auto';
  const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const baseUrl = document.currentScript.src.replace(/widget\.js.*$/, '');
  const dataUrl = baseUrl + 'data/trending.json';

  const styles = {
    bg: isDark ? '#0f0f0f' : '#f5f5f5',
    cardBg: isDark ? '#1a1a1a' : '#fff',
    border: isDark ? '#2a2a2a' : '#e0e0e0',
    text: isDark ? '#e0e0e0' : '#333',
    textSec: isDark ? '#888' : '#666',
    textMuted: isDark ? '#666' : '#999',
    accent: isDark ? '#48dbfb' : '#0066ff',
    accentRed: '#ff6b6b',
    rankBg: isDark ? '#333' : '#f0f0f0',
    rankColor: isDark ? '#888' : '#999',
    hoverBg: isDark ? '#222' : '#f8f8f8'
  };

  container.style.cssText = `font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:${styles.bg};color:${styles.text};padding:12px;border-radius:12px;max-width:100%;`;

  function formatHot(n) {
    if (n >= 100000000) return (n / 100000000).toFixed(1) + '亿';
    if (n >= 10000) return (n / 10000).toFixed(1) + '万';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return String(n);
  }

  function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s || '';
    return d.innerHTML;
  }

  fetch(dataUrl)
    .then(r => r.json())
    .then(data => {
      const sources = source === 'all' ? data : data.filter(s => s.key === source);
      let html = `<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid ${styles.border}">`;
      html += `<span style="font-size:16px;font-weight:700;background:linear-gradient(90deg,#ff6b6b,#feca57,#48dbfb);-webkit-background-clip:text;-webkit-text-fill-color:transparent">Trending Hub</span>`;
      html += `</div>`;

      let totalRendered = 0;
      for (const src of sources) {
        if (!src.items || src.items.length === 0) continue;
        const items = src.items.slice(0, count);
        html += `<div style="font-size:11px;color:${styles.textMuted};padding:4px 0;border-bottom:1px solid ${styles.border};margin-top:4px;font-weight:500">${src.icon} ${src.source}</div>`;
        items.forEach((item, i) => {
          const rankBg = i < 3 ? styles.accentRed : styles.rankBg;
          const rankColor = i < 3 ? '#fff' : styles.rankColor;
          html += `<div style="display:flex;align-items:center;gap:6px;padding:5px 0;border-bottom:1px solid ${isDark ? '#1a1a1a' : '#f0f0f0'};font-size:13px;transition:background 0.15s" onmouseover="this.style.background='${styles.hoverBg}'" onmouseout="this.style.background='transparent'">`;
          html += `<span style="min-width:20px;height:20px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;background:${rankBg};color:${rankColor}">${i + 1}</span>`;
          html += `<a href="${item.url}" target="_blank" rel="noopener noreferrer" style="color:${styles.accent};text-decoration:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;font-size:13px">${escapeHtml(item.title)}</a>`;
          if (item.hot) {
            html += `<span style="font-size:10px;color:${styles.accentRed};white-space:nowrap">${formatHot(item.hot)}</span>`;
          }
          html += `</div>`;
          totalRendered++;
        });
      }

      html += `<div style="text-align:center;padding:10px 0 4px;font-size:11px;color:${styles.textMuted}">`;
      html += `<a href="https://shixingya.github.io/trending-hub/" target="_blank" rel="noopener" style="color:${styles.accent};text-decoration:none">Powered by Trending Hub</a>`;
      html += `</div>`;

      container.innerHTML = html;
    })
    .catch(err => {
      container.innerHTML = `<div style="text-align:center;padding:20px;color:${styles.textMuted};font-size:13px">Failed to load trending data</div>`;
    });

  if (theme === 'auto') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      location.reload();
    });
  }
})();
