// Main application controller, view switching, and data rendering
import { DATA } from './data.js';
import { renderLineChart } from './charts.js';

let currentCountry = 'us';
let currentView = 'overview';

const countrySelect = document.getElementById('countrySelect');
const navButtons = document.querySelectorAll('.nav-btn');
const indicatorsGrid = document.getElementById('keyIndicators');
const chartSection = document.getElementById('chartSection');
const tableSection = document.getElementById('tableSection');

function render() {
  const d = DATA[currentCountry];
  if (!d) return;

  // 1. Render Top Indicators Grid
  indicatorsGrid.innerHTML = d.indicators.map(ind => `
    <div class="indicator-card">
      <div class="indicator-title">${ind.name}</div>
      <div class="indicator-val">${ind.value}</div>
      <div class="indicator-meta">
        <span class="${ind.trend === 'up' ? 'trend-up' : ind.trend === 'down' ? 'trend-down' : ''}">${ind.change}</span>
        <span>${ind.year} &bull; ${ind.source.split('(')[0].trim()}</span>
      </div>
    </div>
  `).join('');

  // 2. Render Charts & Tables according to currentView
  if (currentView === 'overview' || currentView === 'economy') {
    chartSection.innerHTML = renderLineChart(d.history, 'gdp', `${d.country} Nominal GDP (Trillion USD)`, 'T');
    tableSection.innerHTML = `
      <div class="panel-header">
        <h3 class="panel-title">Macroeconomic Historical Summary</h3>
        <p class="panel-subtitle">Official statistics archive</p>
      </div>
      <table class="data-table">
        <thead>
          <tr><th>Year</th><th>GDP</th><th>Inflation (CPI)</th><th>Unemployment</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${d.history.map(h => `
            <tr>
              <td><strong>${h.year}</strong></td>
              <td>$${h.gdp}T</td>
              <td>${h.inflation}%</td>
              <td>${h.unemployment}%</td>
              <td><span class="badge" style="background:rgba(16,185,129,0.15);color:#10b981;">Published</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } else if (currentView === 'demographics') {
    chartSection.innerHTML = renderLineChart(d.history, 'unemployment', `${d.country} Unemployment Rate Trajectory`, '%');
    tableSection.innerHTML = `
      <div class="panel-header">
        <h3 class="panel-title">Labor &amp; Demographics Indicators</h3>
        <p class="panel-subtitle">Census and labor force survey figures</p>
      </div>
      <table class="data-table">
        <thead><tr><th>Category</th><th>Figure</th><th>Reporting Authority</th><th>Year</th></tr></thead>
        <tbody>
          <tr><td>Total Resident Population</td><td>${d.indicators[1].value}</td><td>National Census Office</td><td>2025</td></tr>
          <tr><td>Headline Unemployment</td><td>${d.indicators[3].value}</td><td>Labor Bureau</td><td>2026</td></tr>
          <tr><td>Labor Force Participation</td><td>62.7%</td><td>National Statistical Service</td><td>2025</td></tr>
          <tr><td>Median Age</td><td>38.9 Years</td><td>Demographic Division</td><td>2025</td></tr>
        </tbody>
      </table>
    `;
  } else if (currentView === 'trade') {
    chartSection.innerHTML = renderLineChart(d.history, 'inflation', `${d.country} Consumer Price Inflation Rate (CPI)`, '%');
    tableSection.innerHTML = `
      <div class="panel-header">
        <h3 class="panel-title">Principal International Trade Partners</h3>
        <p class="panel-subtitle">Goods and commercial services balance</p>
      </div>
      <table class="data-table">
        <thead><tr><th>Trading Partner</th><th>Export Volume</th><th>Import Volume</th><th>Net Balance</th></tr></thead>
        <tbody>
          ${d.trade.map(t => `
            <tr>
              <td><strong>${t.partner}</strong></td>
              <td>${t.exports}</td>
              <td>${t.imports}</td>
              <td class="${t.balance.startsWith('+') ? 'trend-up' : 'trend-down'}">${t.balance}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
}

// Event Listeners
countrySelect.addEventListener('change', (e) => {
  currentCountry = e.target.value;
  render();
});

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentView = btn.dataset.view;
    render();
  });
});

// URL parameters support for screenshot taking
const params = new URLSearchParams(window.location.search);
if (params.get('country')) currentCountry = params.get('country');
if (params.get('view')) {
  currentView = params.get('view');
  navButtons.forEach(b => {
    if (b.dataset.view === currentView) b.classList.add('active');
    else b.classList.remove('active');
  });
}

render();
window.__shotReady = true;
