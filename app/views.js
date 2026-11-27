import {
  DEMOGRAPHIC_COHORTS_2025,
  EXPORT_COMMODITIES_2025,
  GDP_SECTORS_2025,
  HEADLINE_KPIS,
  INDICATOR_CATALOG,
  LABOUR_EARNINGS_BY_SECTOR,
  MACRO_SERIES,
  PROVINCIAL_ATLAS,
} from './statistics-data.js';
import {
  renderDemographicPyramidSvg,
  renderHorizontalMetricBars,
  renderMacroDualSeriesChart,
  renderSparklineSvg,
} from './svg-charts.js';
import {
  calculateCpiAdjustedValue,
  filterAndSortProvinces,
  filterIndicatorCatalog,
} from './calculators.js';

export function renderOverviewPage(state) {
  const kpiCards = HEADLINE_KPIS.map((k) => {
    const stroke = k.tone === 'teal' ? '#0f766e' : k.tone === 'amber' ? '#b45309' : '#1d4ed8';
    return `<article class="kpi-card ${k.tone}">
      <div class="kpi-top">
        <span class="kpi-label">${k.label}</span>
        <span class="kpi-delta ${k.tone === 'amber' ? 'warn' : ''}">${k.delta}</span>
      </div>
      <div class="kpi-value-row">
        <span class="kpi-value">${k.value}</span>
        ${renderSparklineSvg(k.spark, stroke)}
      </div>
      <div class="kpi-source">Source: ${k.source}</div>
    </article>`;
  }).join('');

  const chartSvg = state.overviewChartMode === 'trade'
    ? renderMacroDualSeriesChart(MACRO_SERIES.years, MACRO_SERIES.exportsUsdB, MACRO_SERIES.importsUsdB, 'trade')
    : renderMacroDualSeriesChart(MACRO_SERIES.years, MACRO_SERIES.gdpGrowth, MACRO_SERIES.cpiInflation, 'growth');

  const cpiCalc = calculateCpiAdjustedValue(state.cpiAmount, state.cpiFromYear, state.cpiToYear);
  const yearOptionsFrom = MACRO_SERIES.years
    .map((y) => `<option value="${y}" ${y === Number(state.cpiFromYear) ? 'selected' : ''}>${y}</option>`)
    .join('');
  const yearOptionsTo = MACRO_SERIES.years
    .map((y) => `<option value="${y}" ${y === Number(state.cpiToYear) ? 'selected' : ''}>${y}</option>`)
    .join('');

  const sectorBars = GDP_SECTORS_2025.map(
    (s) => `<div class="sector-item">
      <div class="sector-item-top">
        <span>${s.sector}</span>
        <span>${s.share}% GDP (+${s.growth}% YoY)</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width:${s.share * 2}%; background:${s.color}"></div>
      </div>
    </div>`,
  ).join('');

  return `
    <section class="page-lead">
      <div>
        <h1>National Statistical Overview — Vietnam 2025</h1>
        <p>Key macroeconomic accounts, price stability, external merchandise balances, and labour indicators compiled with official agency provenance.</p>
      </div>
      <div class="lead-actions">
        <a class="btn" href="#/regions">Explore Provincial Atlas</a>
        <button class="btn btn-primary" data-action="download-macro-csv">Download 2015–2025 Series (CSV)</button>
      </div>
    </section>

    <section class="kpi-grid">${kpiCards}</section>

    <section class="two-col">
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">11-Year Macroeconomic Trajectory (2015–2025)</h2>
            <p class="panel-sub">Annual real output expansion, consumer price inflation, and external trade scale</p>
          </div>
          <div class="pill-group" role="group" aria-label="Chart series selector">
            <button class="pill-btn ${state.overviewChartMode === 'growth' ? 'active' : ''}" data-action="set-overview-chart" data-mode="growth">GDP &amp; CPI (%)</button>
            <button class="pill-btn ${state.overviewChartMode === 'trade' ? 'active' : ''}" data-action="set-overview-chart" data-mode="trade">Exports &amp; Imports ($B)</button>
          </div>
        </div>
        <div class="chart-wrap">${chartSvg}</div>
        <div class="chart-footnote">
          <span>Source: GSO National Accounts &amp; General Department of Vietnam Customs (2015–2025)</span>
          <span>2025 GDP per Capita: <strong>$4,702 USD</strong></span>
        </div>
      </div>

      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">CPI Purchasing Power Deflator</h2>
            <p class="panel-sub">Convert VND purchasing power using official GSO annual CPI chain index</p>
          </div>
        </div>
        <div class="calc-box">
          <div class="calc-grid">
            <div class="calc-field">
              <label for="cpi-amount">Amount (Million VND)</label>
              <input id="cpi-amount" type="number" min="1" step="10" value="${state.cpiAmount}" data-input="cpi-amount">
            </div>
            <div class="calc-field">
              <label for="cpi-from">Base Year</label>
              <select id="cpi-from" data-input="cpi-from">${yearOptionsFrom}</select>
            </div>
            <div class="calc-field">
              <label for="cpi-to">Target Year</label>
              <select id="cpi-to" data-input="cpi-to">${yearOptionsTo}</select>
            </div>
          </div>
          <div class="calc-result">
            Equivalent value in ${state.cpiToYear}: <strong>${cpiCalc.adjustedMillions.toFixed(2)} Million VND</strong>
            <div>Cumulative price change (${state.cpiFromYear}→${state.cpiToYear}): <strong>${cpiCalc.cumulativeInflationPct >= 0 ? '+' : ''}${cpiCalc.cumulativeInflationPct.toFixed(2)}%</strong> (Deflator ×${cpiCalc.multiplier.toFixed(3)})</div>
          </div>
        </div>

        <h3 class="panel-title" style="margin:14px 0 9px 0;">2025 Gross Value Added by Sector</h3>
        <div class="sector-list">${sectorBars}</div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-head">
        <div>
          <h2 class="panel-title">Recent Statistical Bulletins &amp; Quick Navigation</h2>
          <p class="panel-sub">Verified 2024–2025 headline releases with direct links to thematic tables</p>
        </div>
        <a class="btn" href="#/releases">Full 18-Series Catalog →</a>
      </div>
      <div class="table-scroll">
        <table class="stat-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Domain</th>
              <th>Indicator</th>
              <th class="num">2024</th>
              <th class="num">2025</th>
              <th>Source Bulletin</th>
            </tr>
          </thead>
          <tbody>
            ${INDICATOR_CATALOG.slice(0, 6).map((r) => `<tr>
              <td><code>${r.code}</code></td>
              <td><span class="tag">${r.domain}</span></td>
              <td><strong>${r.name}</strong> (${r.unit})</td>
              <td class="num">${r.y2024}</td>
              <td class="num">${r.y2025}</td>
              <td>${r.agency}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

export function renderEconomyPage() {
  const tradeChart = renderMacroDualSeriesChart(
    MACRO_SERIES.years,
    MACRO_SERIES.exportsUsdB,
    MACRO_SERIES.importsUsdB,
    'trade',
  );
  const commodityBars = renderHorizontalMetricBars(
    EXPORT_COMMODITIES_2025,
    'item',
    'valueB',
    'B',
    '#1d4ed8',
  );

  const commodityRows = EXPORT_COMMODITIES_2025.map(
    (c) => `<tr>
      <td><strong>${c.item}</strong></td>
      <td class="num">$${c.valueB.toFixed(1)}B</td>
      <td class="num">${c.share.toFixed(1)}%</td>
      <td class="num"><span class="tag">${c.yoy}</span></td>
      <td>Vietnam Customs Merchandise Bulletin 2025</td>
    </tr>`,
  ).join('');

  return `
    <section class="page-lead">
      <div>
        <h1>Macroeconomy, Industrial Output &amp; External Trade</h1>
        <p>Detailed national output accounts, merchandise export groups, and foreign direct investment disbursements.</p>
      </div>
      <div class="lead-actions">
        <button class="btn btn-primary" data-action="download-macro-csv">Export Macro Ledger (CSV)</button>
      </div>
    </section>

    <section class="kpi-grid">
      <article class="kpi-card">
        <div class="kpi-top"><span class="kpi-label">Industrial Production (IIP)</span><span class="kpi-delta">+8.65% YoY</span></div>
        <div class="kpi-value">+8.65%</div>
        <div class="kpi-source">Manufacturing sub-index +9.5% • GSO Industrial Survey 2025</div>
      </article>
      <article class="kpi-card teal">
        <div class="kpi-top"><span class="kpi-label">Merchandise Exports (FOB)</span><span class="kpi-delta">+14.3% YoY</span></div>
        <div class="kpi-value">$428.2B</div>
        <div class="kpi-source">9th consecutive annual trade surplus • Vietnam Customs 2025</div>
      </article>
      <article class="kpi-card amber">
        <div class="kpi-top"><span class="kpi-label">Public Investment Disbursed</span><span class="kpi-delta">93.4% Plan</span></div>
        <div class="kpi-value">689.4T VND</div>
        <div class="kpi-source">Expressways, ports &amp; grid • Ministry of Finance 2025</div>
      </article>
    </section>

    <section class="equal-col">
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">Merchandise Exports vs Imports (2015–2025)</h2>
            <p class="panel-sub">USD Billions — Customs FOB/CIF valuation</p>
          </div>
        </div>
        <div class="chart-wrap">${tradeChart}</div>
      </div>

      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">Leading Export Commodity Groups ($USD Billions)</h2>
            <p class="panel-sub">High-tech electronics &amp; machinery account for 44.1% of exports</p>
          </div>
        </div>
        <div class="chart-wrap">${commodityBars}</div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-head">
        <div>
          <h2 class="panel-title">Key Export Commodity Breakdown &amp; YoY Momentum</h2>
          <p class="panel-sub">Audited annual merchandise customs classification</p>
        </div>
      </div>
      <div class="table-scroll">
        <table class="stat-table">
          <thead>
            <tr>
              <th>Commodity Group</th>
              <th class="num">Annual Value</th>
              <th class="num">Export Share</th>
              <th class="num">YoY Change</th>
              <th>Primary Source</th>
            </tr>
          </thead>
          <tbody>${commodityRows}</tbody>
        </table>
      </div>
    </section>
  `;
}

export function renderDemographicsPage() {
  const pyramid = renderDemographicPyramidSvg(DEMOGRAPHIC_COHORTS_2025);
  const wageBars = renderHorizontalMetricBars(
    LABOUR_EARNINGS_BY_SECTOR,
    'industry',
    'avgVndM',
    'M VND',
    '#0f766e',
  );

  const wageRows = LABOUR_EARNINGS_BY_SECTOR.map(
    (w) => `<tr>
      <td><strong>${w.industry}</strong></td>
      <td class="num">${w.employedM.toFixed(2)}M</td>
      <td class="num">${w.avgVndM.toFixed(1)}M VND</td>
      <td class="num"><span class="tag">${w.yoyWage}</span></td>
      <td>${w.source}</td>
    </tr>`,
  ).join('');

  return `
    <section class="page-lead">
      <div>
        <h1>Population Structure, Urbanization &amp; Labour Force</h1>
        <p>Mid-year demographic distribution across 101.3 million residents and sectoral earnings for 52.9 million workers.</p>
      </div>
    </section>

    <section class="kpi-grid">
      <article class="kpi-card">
        <div class="kpi-top"><span class="kpi-label">Urbanization Rate</span><span class="kpi-delta">39.4M Urban</span></div>
        <div class="kpi-value">38.9%</div>
        <div class="kpi-source">+0.4 pp YoY • GSO Mid-Year Population Survey 2025</div>
      </article>
      <article class="kpi-card teal">
        <div class="kpi-top"><span class="kpi-label">Trained Labour Share</span><span class="kpi-delta">+1.4 pp YoY</span></div>
        <div class="kpi-value">28.6%</div>
        <div class="kpi-source">Certified &amp; degree-holding workforce • MOLISA 2025</div>
      </article>
      <article class="kpi-card amber">
        <div class="kpi-top"><span class="kpi-label">Life Expectancy at Birth</span><span class="kpi-delta">72.3M / 77.2F</span></div>
        <div class="kpi-value">74.7 yrs</div>
        <div class="kpi-source">Ministry of Health &amp; GSO Vital Statistics 2025</div>
      </article>
    </section>

    <section class="equal-col">
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">Age &amp; Sex Cohort Distribution (2025)</h2>
            <p class="panel-sub">67.5% of total population falls within working ages 15–64</p>
          </div>
        </div>
        <div class="chart-wrap">${pyramid}</div>
      </div>

      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">Average Monthly Earnings by Industry (Million VND)</h2>
            <p class="panel-sub">Contracted &amp; salaried workers, Q4 2025 survey wave</p>
          </div>
        </div>
        <div class="chart-wrap">${wageBars}</div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-head">
        <div>
          <h2 class="panel-title">Employment &amp; Monthly Wage Ledger by Economic Activity</h2>
        </div>
      </div>
      <div class="table-scroll">
        <table class="stat-table">
          <thead>
            <tr>
              <th>Industry Classification</th>
              <th class="num">Employed Persons</th>
              <th class="num">Avg Monthly Earnings</th>
              <th class="num">YoY Wage Growth</th>
              <th>Survey Wave</th>
            </tr>
          </thead>
          <tbody>${wageRows}</tbody>
        </table>
      </div>
    </section>
  `;
}

export function renderRegionsPage(state) {
  const regions = ['ALL', 'Red River Delta', 'Southeast', 'Central Coast', 'Northern Midlands', 'Mekong Delta', 'Central Highlands'];
  const sortLabels = {
    grdpPerCapitaUsd: { label: 'GRDP per Capita ($USD)', suffix: '' },
    exportsB: { label: 'Merchandise Exports ($B)', suffix: 'B' },
    fdiM: { label: 'Realized FDI ($M)', suffix: 'M' },
    grdpGrowth: { label: 'Real GRDP Growth (%)', suffix: '%' },
  };

  const rowsData = filterAndSortProvinces(PROVINCIAL_ATLAS, state.regionFilter, state.regionSort);
  const currentMeta = sortLabels[state.regionSort] || sortLabels.grdpPerCapitaUsd;
  const barChart = renderHorizontalMetricBars(
    rowsData.slice(0, 10),
    'province',
    state.regionSort,
    currentMeta.suffix,
    '#1d4ed8',
  );

  const regionOptions = regions
    .map((r) => `<option value="${r}" ${r === state.regionFilter ? 'selected' : ''}>${r === 'ALL' ? 'All 6 Socio-Economic Regions' : r}</option>`)
    .join('');

  const sortOptions = Object.entries(sortLabels)
    .map(([k, v]) => `<option value="${k}" ${k === state.regionSort ? 'selected' : ''}>Sort by: ${v.label}</option>`)
    .join('');

  const tableRows = rowsData
    .map(
      (p) => `<tr>
        <td><strong>${p.province}</strong></td>
        <td><span class="tag">${p.region}</span></td>
        <td class="num">${(p.popK / 1000).toFixed(2)}M</td>
        <td class="num">$${p.grdpPerCapitaUsd.toLocaleString()}</td>
        <td class="num">+${p.grdpGrowth.toFixed(2)}%</td>
        <td class="num">$${p.exportsB.toFixed(1)}B</td>
        <td class="num">$${p.fdiM.toLocaleString()}M</td>
      </tr>`,
    )
    .join('');

  return `
    <section class="page-lead">
      <div>
        <h1>Provincial Socio-Economic Atlas (2025)</h1>
        <p>Compare regional economic hubs by GRDP per capita, real growth rate, export volume, and disbursed FDI across all 6 regions.</p>
      </div>
      <div class="control-row">
        <select aria-label="Filter socio-economic region" data-input="region-filter">${regionOptions}</select>
        <select aria-label="Sort provincial metric" data-input="region-sort">${sortOptions}</select>
        <button class="btn btn-primary" data-action="download-provinces-csv">Export Provincial CSV</button>
      </div>
    </section>

    <section class="panel">
      <div class="panel-head">
        <div>
          <h2 class="panel-title">Provincial Ranking — ${currentMeta.label}</h2>
          <p class="panel-sub">Showing ${rowsData.length} major municipalities &amp; industrial provinces (Source: Provincial Statistical Offices 2025)</p>
        </div>
      </div>
      <div class="chart-wrap">${barChart}</div>
    </section>

    <section class="panel">
      <div class="panel-head">
        <div>
          <h2 class="panel-title">Detailed Provincial Accounts Table</h2>
        </div>
      </div>
      <div class="table-scroll">
        <table class="stat-table">
          <thead>
            <tr>
              <th>Province / Municipality</th>
              <th>Socio-Economic Region</th>
              <th class="num">Population</th>
              <th class="num">GRDP / Capita</th>
              <th class="num">GRDP Growth</th>
              <th class="num">Exports</th>
              <th class="num">Realized FDI</th>
            </tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>
      </div>
    </section>
  `;
}

export function renderReleasesPage(state) {
  const domains = ['ALL', 'Macroeconomy', 'Prices & Money', 'External Trade', 'Industry & Energy', 'Demographics', 'Labour Market'];
  const filtered = filterIndicatorCatalog(INDICATOR_CATALOG, state.catalogDomain, state.catalogQuery);

  const domainOpts = domains
    .map((d) => `<option value="${d}" ${d === state.catalogDomain ? 'selected' : ''}>${d === 'ALL' ? 'All Statistical Domains' : d}</option>`)
    .join('');

  const rowsHtml = filtered.length
    ? filtered
        .map(
          (r) => `<tr>
            <td><code>${r.code}</code></td>
            <td><span class="tag">${r.domain}</span></td>
            <td><strong>${r.name}</strong></td>
            <td>${r.unit}</td>
            <td class="num">${r.y2023}</td>
            <td class="num">${r.y2024}</td>
            <td class="num">${r.y2025}</td>
            <td>${r.agency}</td>
          </tr>`,
        )
        .join('')
    : `<tr><td colspan="8">No statistical series match "${state.catalogQuery}". Clear the filter to view all 18 series.</td></tr>`;

  return `
    <section class="page-lead">
      <div>
        <h1>Statistical Release Catalog &amp; Open CSV Tables</h1>
        <p>Search verified multi-year series (2023–2025) by indicator code, statistical domain, or reporting agency.</p>
      </div>
      <div class="control-row">
        <input type="search" placeholder="Search GDP, CPI, FDI, wage..." value="${state.catalogQuery}" data-input="catalog-query" aria-label="Search indicators">
        <select data-input="catalog-domain" aria-label="Filter statistical domain">${domainOpts}</select>
        <button class="btn btn-primary" data-action="download-catalog-csv">Download Filtered CSV (${filtered.length})</button>
      </div>
    </section>

    <section class="panel">
      <div class="table-scroll">
        <table class="stat-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Domain</th>
              <th>Indicator Name</th>
              <th>Unit</th>
              <th class="num">2023</th>
              <th class="num">2024</th>
              <th class="num">2025</th>
              <th>Reporting Agency &amp; Year</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
    </section>
  `;
}
