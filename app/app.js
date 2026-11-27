import { INDICATOR_CATALOG, MACRO_SERIES, PROVINCIAL_ATLAS } from './statistics-data.js';
import { filterAndSortProvinces, filterIndicatorCatalog, serializeRowsToCsv } from './calculators.js';
import {
  renderDemographicsPage,
  renderEconomyPage,
  renderOverviewPage,
  renderRegionsPage,
  renderReleasesPage,
} from './views.js';

const state = {
  overviewChartMode: 'growth',
  cpiAmount: 100,
  cpiFromYear: 2015,
  cpiToYear: 2025,
  regionFilter: 'ALL',
  regionSort: 'grdpPerCapitaUsd',
  catalogDomain: 'ALL',
  catalogQuery: '',
};

function currentRoute() {
  const hash = window.location.hash || '#/';
  if (hash.startsWith('#/economy')) return 'economy';
  if (hash.startsWith('#/demographics')) return 'demographics';
  if (hash.startsWith('#/regions')) return 'regions';
  if (hash.startsWith('#/releases')) return 'releases';
  return 'overview';
}

function triggerCsvDownload(filename, csvContent) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function renderApp() {
  const route = currentRoute();
  const root = document.getElementById('app-root');
  if (!root) return;

  for (const tab of document.querySelectorAll('.nav-tab')) {
    tab.classList.toggle('active', tab.getAttribute('data-route') === route);
  }

  if (route === 'economy') {
    root.innerHTML = renderEconomyPage();
  } else if (route === 'demographics') {
    root.innerHTML = renderDemographicsPage();
  } else if (route === 'regions') {
    root.innerHTML = renderRegionsPage(state);
  } else if (route === 'releases') {
    root.innerHTML = renderReleasesPage(state);
  } else {
    root.innerHTML = renderOverviewPage(state);
  }
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const action = target.getAttribute('data-action');

  if (action === 'set-overview-chart') {
    state.overviewChartMode = target.getAttribute('data-mode') || 'growth';
    renderApp();
  } else if (action === 'download-macro-csv') {
    const rows = MACRO_SERIES.years.map((yr, i) => [
      yr,
      MACRO_SERIES.gdpGrowth[i],
      MACRO_SERIES.cpiInflation[i],
      MACRO_SERIES.exportsUsdB[i],
      MACRO_SERIES.importsUsdB[i],
      MACRO_SERIES.gdpPerCapitaUsd[i],
    ]);
    triggerCsvDownload(
      'vietstat-macro-2015-2025.csv',
      serializeRowsToCsv(['Year', 'Real_GDP_Growth_Pct', 'CPI_Inflation_Pct', 'Exports_USD_B', 'Imports_USD_B', 'GDP_Per_Capita_USD'], rows),
    );
  } else if (action === 'download-provinces-csv') {
    const rows = filterAndSortProvinces(PROVINCIAL_ATLAS, state.regionFilter, state.regionSort).map((p) => [
      p.province,
      p.region,
      p.popK,
      p.grdpPerCapitaUsd,
      p.grdpGrowth,
      p.exportsB,
      p.fdiM,
    ]);
    triggerCsvDownload(
      'vietstat-provincial-atlas-2025.csv',
      serializeRowsToCsv(['Province', 'Region', 'Population_Thousands', 'GRDP_Per_Capita_USD', 'GRDP_Growth_Pct', 'Exports_USD_B', 'Realized_FDI_USD_M'], rows),
    );
  } else if (action === 'download-catalog-csv') {
    const rows = filterIndicatorCatalog(INDICATOR_CATALOG, state.catalogDomain, state.catalogQuery).map((r) => [
      r.code,
      r.domain,
      r.name,
      r.unit,
      r.y2023,
      r.y2024,
      r.y2025,
      r.agency,
    ]);
    triggerCsvDownload(
      'vietstat-indicator-catalog.csv',
      serializeRowsToCsv(['Code', 'Domain', 'Indicator', 'Unit', '2023', '2024', '2025', 'Source_Agency'], rows),
    );
  }
});

document.addEventListener('input', (event) => {
  const el = event.target;
  const key = el.getAttribute('data-input');
  if (!key) return;

  if (key === 'cpi-amount') {
    state.cpiAmount = Number(el.value) || 0;
    renderApp();
  } else if (key === 'catalog-query') {
    state.catalogQuery = el.value;
    const pos = el.selectionStart ?? el.value.length;
    renderApp();
    const nextInput = document.querySelector('[data-input="catalog-query"]');
    if (nextInput) {
      nextInput.focus();
      nextInput.setSelectionRange(pos, pos);
    }
  }
});

document.addEventListener('change', (event) => {
  const el = event.target;
  const key = el.getAttribute('data-input');
  if (!key) return;

  if (key === 'cpi-from') state.cpiFromYear = Number(el.value);
  if (key === 'cpi-to') state.cpiToYear = Number(el.value);
  if (key === 'region-filter') state.regionFilter = el.value;
  if (key === 'region-sort') state.regionSort = el.value;
  if (key === 'catalog-domain') state.catalogDomain = el.value;
  renderApp();
});

window.addEventListener('hashchange', renderApp);
renderApp();
