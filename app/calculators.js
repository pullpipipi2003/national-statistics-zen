import { MACRO_SERIES } from './statistics-data.js';

export function calculateCpiAdjustedValue(amountMillionsVnd, fromYear, toYear) {
  const years = MACRO_SERIES.years;
  const cpi = MACRO_SERIES.cpiIndex2015Base;
  const fromIdx = years.indexOf(Number(fromYear));
  const toIdx = years.indexOf(Number(toYear));
  const cleanAmount = Number.isFinite(Number(amountMillionsVnd)) && Number(amountMillionsVnd) >= 0
    ? Number(amountMillionsVnd)
    : 100;

  if (fromIdx === -1 || toIdx === -1) {
    return { adjustedMillions: cleanAmount, multiplier: 1, cumulativeInflationPct: 0 };
  }

  const multiplier = cpi[toIdx] / cpi[fromIdx];
  const adjustedMillions = cleanAmount * multiplier;
  const cumulativeInflationPct = (multiplier - 1) * 100;

  return {
    adjustedMillions,
    multiplier,
    cumulativeInflationPct,
  };
}

export function filterAndSortProvinces(provinces, regionFilter, sortKey) {
  const filtered = regionFilter === 'ALL'
    ? provinces.slice()
    : provinces.filter((item) => item.region === regionFilter);

  filtered.sort((a, b) => Number(b[sortKey]) - Number(a[sortKey]));
  return filtered;
}

export function filterIndicatorCatalog(catalog, domainFilter, searchQuery) {
  const needle = String(searchQuery || '').trim().toLowerCase();
  return catalog.filter((row) => {
    const matchesDomain = domainFilter === 'ALL' || row.domain === domainFilter;
    const matchesText = !needle
      || row.name.toLowerCase().includes(needle)
      || row.code.toLowerCase().includes(needle)
      || row.agency.toLowerCase().includes(needle);
    return matchesDomain && matchesText;
  });
}

export function serializeRowsToCsv(headers, rows) {
  const escapeCell = (cell) => {
    const str = String(cell ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };
  const lines = [headers.map(escapeCell).join(',')];
  for (const row of rows) {
    lines.push(row.map(escapeCell).join(','));
  }
  return lines.join('\r\n');
}
