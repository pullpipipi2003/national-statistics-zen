// Zero-dependency SVG Chart generator for trends and historical comparisons
export function renderLineChart(data, metric, title, unit) {
  const width = 800;
  const height = 240;
  const padLeft = 60;
  const padRight = 30;
  const padTop = 30;
  const padBottom = 40;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const values = data.map(d => d[metric]);
  const minVal = Math.min(...values) * 0.9;
  const maxVal = Math.max(...values) * 1.1;

  const points = data.map((d, i) => {
    const x = padLeft + (i / (data.length - 1)) * chartW;
    const y = padTop + chartH - ((d[metric] - minVal) / (maxVal - minVal)) * chartH;
    return { x, y, val: d[metric], year: d.year };
  });

  const pathD = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`, '');
  const areaD = `${pathD} L ${points[points.length - 1].x.toFixed(1)} ${padTop + chartH} L ${points[0].x.toFixed(1)} ${padTop + chartH} Z`;

  const gridLines = [];
  const yLabels = [];
  for (let s = 0; s <= 4; s++) {
    const yVal = minVal + (s / 4) * (maxVal - minVal);
    const yPos = padTop + chartH - (s / 4) * chartH;
    gridLines.push(`<line x1="${padLeft}" y1="${yPos}" x2="${width - padRight}" y2="${yPos}" stroke="#2b3658" stroke-dasharray="3 3"/>`);
    yLabels.push(`<text x="${padLeft - 10}" y="${yPos + 4}" fill="#8b99b5" font-size="11" text-anchor="end">${yVal.toFixed(1)}${unit}</text>`);
  }

  const xLabels = points.map(p => `
    <text x="${p.x}" y="${padTop + chartH + 20}" fill="#8b99b5" font-size="11" text-anchor="middle">${p.year}</text>
  `).join('');

  const circles = points.map(p => `
    <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="#3b82f6" stroke="#0a0e17" stroke-width="2"/>
    <text x="${p.x.toFixed(1)}" y="${(p.y - 10).toFixed(1)}" fill="#f0f4fc" font-size="11" font-weight="600" text-anchor="middle">${p.val}${unit}</text>
  `).join('');

  return `
    <div class="panel-header">
      <h3 class="panel-title">${title}</h3>
      <p class="panel-subtitle">Multi-year historical trend (2020 - 2025)</p>
    </div>
    <svg viewBox="0 0 ${width} ${height}" class="chart-svg">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      ${gridLines.join('')}
      ${yLabels.join('')}
      ${xLabels}
      <path d="${areaD}" fill="url(#areaGrad)"/>
      <path d="${pathD}" fill="none" stroke="#3b82f6" stroke-width="3"/>
      ${circles}
    </svg>
  `;
}
