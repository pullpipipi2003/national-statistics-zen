export function renderSparklineSvg(values, stroke = '#1d4ed8') {
  const w = 88;
  const h = 28;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * (w - 6) + 3;
      const y = h - 4 - ((v - min) / span) * (h - 8);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  const last = pts.split(' ').pop().split(',');
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true">
    <polyline fill="none" stroke="${stroke}" stroke-width="2" points="${pts}"/>
    <circle cx="${last[0]}" cy="${last[1]}" r="2.8" fill="${stroke}"/>
  </svg>`;
}

export function renderMacroDualSeriesChart(years, primary, secondary, mode = 'growth') {
  const width = 660;
  const height = 250;
  const padL = 44;
  const padR = 20;
  const padT = 24;
  const padB = 34;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  const allVals = mode === 'trade' ? [...primary, ...secondary, 100] : [0, ...primary, ...secondary];
  const minVal = mode === 'trade' ? 120 : 0;
  const maxVal = Math.ceil(Math.max(...allVals) * 1.12);
  const span = maxVal - minVal || 1;

  const xAt = (idx) => padL + (idx / (years.length - 1)) * plotW;
  const yAt = (val) => padT + plotH - ((val - minVal) / span) * plotH;

  const ticks = 4;
  let gridHtml = '';
  for (let i = 0; i <= ticks; i++) {
    const val = minVal + (span * i) / ticks;
    const y = yAt(val).toFixed(1);
    const label = mode === 'trade' ? `$${Math.round(val)}B` : `${val.toFixed(1)}%`;
    gridHtml += `<line x1="${padL}" y1="${y}" x2="${width - padR}" y2="${y}" stroke="#e2e8f0" stroke-dasharray="3,3"/>
      <text x="${padL - 7}" y="${Number(y) + 4}" text-anchor="end" font-size="10.5" fill="#4a5d75">${label}</text>`;
  }

  const lineA = primary.map((v, i) => `${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`).join(' ');
  const lineB = secondary.map((v, i) => `${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`).join(' ');
  const areaA = `${padL},${padT + plotH} ${lineA} ${xAt(years.length - 1).toFixed(1)},${padT + plotH}`;

  const dotsHtml = years
    .map((yr, i) => {
      const x = xAt(i).toFixed(1);
      const ya = yAt(primary[i]).toFixed(1);
      const yb = yAt(secondary[i]).toFixed(1);
      const valTag = i === years.length - 1 || i === 7 || i === 5
        ? `<text x="${x}" y="${Number(ya) - 7}" text-anchor="middle" font-size="10" font-weight="700" fill="#1d4ed8">${primary[i]}</text>`
        : '';
      return `<circle cx="${x}" cy="${ya}" r="3.4" fill="#1d4ed8"/>
        <circle cx="${x}" cy="${yb}" r="3.1" fill="#b45309"/>
        ${valTag}
        <text x="${x}" y="${height - 10}" text-anchor="middle" font-size="10.5" fill="#4a5d75">${yr}</text>`;
    })
    .join('');

  const labelA = mode === 'trade' ? 'Exports ($B FOB)' : 'Real GDP Growth (%)';
  const labelB = mode === 'trade' ? 'Imports ($B CIF)' : 'Headline CPI (%)';

  return `<svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${labelA} and ${labelB}">
    <rect x="0" y="0" width="${width}" height="${height}" fill="#ffffff"/>
    ${gridHtml}
    <polygon points="${areaA}" fill="rgba(29, 78, 216, 0.08)"/>
    <polyline fill="none" stroke="#1d4ed8" stroke-width="2.6" points="${lineA}"/>
    <polyline fill="none" stroke="#b45309" stroke-width="2.2" stroke-dasharray="5,3" points="${lineB}"/>
    ${dotsHtml}
    <g transform="translate(${padL}, 13)">
      <rect x="0" y="-8" width="10" height="3" fill="#1d4ed8"/>
      <text x="14" y="-3" font-size="11" font-weight="600" fill="#0f233c">${labelA}</text>
      <rect x="165" y="-8" width="10" height="3" fill="#b45309"/>
      <text x="179" y="-3" font-size="11" font-weight="600" fill="#0f233c">${labelB}</text>
    </g>
  </svg>`;
}

export function renderHorizontalMetricBars(items, labelKey, valueKey, unitSuffix = '', barColor = '#0f766e') {
  const width = 620;
  const rowH = 29;
  const padT = 10;
  const padL = 195;
  const padR = 76;
  const height = padT + items.length * rowH + 8;
  const maxVal = Math.max(...items.map((d) => d[valueKey]), 1);
  const maxBarW = width - padL - padR;

  const rows = items
    .map((item, idx) => {
      const y = padT + idx * rowH;
      const w = Math.max(4, (item[valueKey] / maxVal) * maxBarW);
      return `<g transform="translate(0, ${y})">
        <text x="${padL - 10}" y="15" text-anchor="end" font-size="11.5" font-weight="600" fill="#0f233c">${item[labelKey]}</text>
        <rect x="${padL}" y="3" width="${maxBarW}" height="17" rx="4" fill="#edf2f7"/>
        <rect x="${padL}" y="3" width="${w.toFixed(1)}" height="17" rx="4" fill="${barColor}"/>
        <text x="${(padL + w + 7).toFixed(1)}" y="15.5" font-size="11.2" font-weight="700" fill="#0f233c">${item[valueKey].toLocaleString()}${unitSuffix}</text>
      </g>`;
    })
    .join('');

  return `<svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Comparative bar chart">
    ${rows}
  </svg>`;
}

export function renderDemographicPyramidSvg(cohorts) {
  const width = 560;
  const rowH = 36;
  const height = 28 + cohorts.length * rowH;
  const center = 290;
  const maxSide = 17.5;
  const scale = 140 / maxSide;

  const rows = cohorts
    .slice()
    .reverse()
    .map((c, idx) => {
      const y = 24 + idx * rowH;
      const maleW = c.maleM * scale;
      const femW = c.femaleM * scale;
      return `<g transform="translate(0, ${y})">
        <text x="8" y="17" font-size="11" font-weight="600" fill="#0f233c">${c.group.replace(/ \(.*\)/, '')}</text>
        <rect x="${(center - maleW).toFixed(1)}" y="4" width="${maleW.toFixed(1)}" height="20" rx="3" fill="#1d4ed8"/>
        <rect x="${center + 2}" y="4" width="${femW.toFixed(1)}" height="20" rx="3" fill="#0f766e"/>
        <text x="${(center - maleW - 5).toFixed(1)}" y="18" text-anchor="end" font-size="10.5" fill="#1e3a8a">${c.maleM}M</text>
        <text x="${(center + 7 + femW).toFixed(1)}" y="18" font-size="10.5" fill="#0f766e">${c.femaleM}M</text>
      </g>`;
    })
    .join('');

  return `<svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Population structure by sex and age">
    <text x="${center - 8}" y="14" text-anchor="end" font-size="11" font-weight="700" fill="#1d4ed8">Male (Millions)</text>
    <text x="${center + 10}" y="14" font-size="11" font-weight="700" fill="#0f766e">Female (Millions)</text>
    ${rows}
  </svg>`;
}
