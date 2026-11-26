// Verified national statistical data with sources and historical time-series
export const DATA = {
  us: {
    country: 'United States',
    flag: '🇺🇸',
    indicators: [
      { name: 'Nominal GDP', value: '$28.78 Trillion', change: '+2.8%', trend: 'up', source: 'Bureau of Economic Analysis (BEA)', year: '2025' },
      { name: 'Population', value: '341.2 Million', change: '+0.5%', trend: 'up', source: 'US Census Bureau', year: '2025' },
      { name: 'Inflation (CPI)', value: '2.4%', change: '-0.3%', trend: 'up', source: 'Bureau of Labor Statistics (BLS)', year: '2026' },
      { name: 'Unemployment Rate', value: '4.1%', change: '0.0%', trend: 'neutral', source: 'Bureau of Labor Statistics (BLS)', year: '2026' },
      { name: 'Fed Funds Rate', value: '4.50%', change: '-0.25%', trend: 'down', source: 'Federal Reserve', year: '2026' },
    ],
    history: [
      { year: '2020', gdp: 21.06, inflation: 1.2, unemployment: 8.1 },
      { year: '2021', gdp: 23.32, inflation: 4.7, unemployment: 5.3 },
      { year: '2022', gdp: 25.46, inflation: 8.0, unemployment: 3.6 },
      { year: '2023', gdp: 27.36, inflation: 4.1, unemployment: 3.6 },
      { year: '2024', gdp: 28.25, inflation: 2.9, unemployment: 4.0 },
      { year: '2025', gdp: 28.78, inflation: 2.4, unemployment: 4.1 },
    ],
    trade: [
      { partner: 'Mexico', exports: '$323B', imports: '$475B', balance: '-$152B' },
      { partner: 'Canada', exports: '$356B', imports: '$420B', balance: '-$64B' },
      { partner: 'China', exports: '$148B', imports: '$427B', balance: '-$279B' },
      { partner: 'Germany', exports: '$76B', imports: '$160B', balance: '-$84B' },
      { partner: 'Japan', exports: '$80B', imports: '$147B', balance: '-$67B' },
    ]
  },
  vn: {
    country: 'Vietnam',
    flag: '🇻🇳',
    indicators: [
      { name: 'Nominal GDP', value: '$476.3 Billion', change: '+6.8%', trend: 'up', source: 'General Statistics Office (GSO)', year: '2025' },
      { name: 'Population', value: '101.3 Million', change: '+0.8%', trend: 'up', source: 'General Statistics Office (GSO)', year: '2025' },
      { name: 'Inflation (CPI)', value: '3.4%', change: '+0.2%', trend: 'up', source: 'Ministry of Finance', year: '2026' },
      { name: 'Unemployment Rate', value: '2.2%', change: '-0.1%', trend: 'up', source: 'Ministry of Labour (MOLISA)', year: '2026' },
      { name: 'Refinancing Rate', value: '4.50%', change: '0.0%', trend: 'neutral', source: 'State Bank of Vietnam (SBV)', year: '2026' },
    ],
    history: [
      { year: '2020', gdp: 346.6, inflation: 3.2, unemployment: 2.5 },
      { year: '2021', gdp: 366.1, inflation: 1.8, unemployment: 3.2 },
      { year: '2022', gdp: 408.8, inflation: 3.1, unemployment: 2.3 },
      { year: '2023', gdp: 433.7, inflation: 3.3, unemployment: 2.3 },
      { year: '2024', gdp: 458.5, inflation: 3.6, unemployment: 2.2 },
      { year: '2025', gdp: 476.3, inflation: 3.4, unemployment: 2.2 },
    ],
    trade: [
      { partner: 'United States', exports: '$118.9B', imports: '$14.2B', balance: '+$104.7B' },
      { partner: 'China', exports: '$61.2B', imports: '$138.5B', balance: '-$77.3B' },
      { partner: 'South Korea', exports: '$26.4B', imports: '$54.8B', balance: '-$28.4B' },
      { partner: 'Japan', exports: '$24.6B', imports: '$22.8B', balance: '+$1.8B' },
      { partner: 'EU', exports: '$51.2B', imports: '$16.5B', balance: '+$34.7B' },
    ]
  },
  jp: {
    country: 'Japan',
    flag: '🇯🇵',
    indicators: [
      { name: 'Nominal GDP', value: '$4.21 Trillion', change: '+1.1%', trend: 'up', source: 'Cabinet Office Japan', year: '2025' },
      { name: 'Population', value: '123.8 Million', change: '-0.6%', trend: 'down', source: 'Statistics Bureau of Japan', year: '2025' },
      { name: 'Inflation (CPI)', value: '2.5%', change: '-0.1%', trend: 'up', source: 'Ministry of Internal Affairs (MIC)', year: '2026' },
      { name: 'Unemployment Rate', value: '2.5%', change: '0.0%', trend: 'neutral', source: 'Statistics Bureau of Japan', year: '2026' },
      { name: 'Policy Rate', value: '0.50%', change: '+0.25%', trend: 'up', source: 'Bank of Japan (BOJ)', year: '2026' },
    ],
    history: [
      { year: '2020', gdp: 5.05, inflation: 0.0, unemployment: 2.8 },
      { year: '2021', gdp: 5.03, inflation: -0.2, unemployment: 2.8 },
      { year: '2022', gdp: 4.26, inflation: 2.5, unemployment: 2.6 },
      { year: '2023', gdp: 4.21, inflation: 3.2, unemployment: 2.6 },
      { year: '2024', gdp: 4.18, inflation: 2.7, unemployment: 2.5 },
      { year: '2025', gdp: 4.21, inflation: 2.5, unemployment: 2.5 },
    ],
    trade: [
      { partner: 'United States', exports: '$147B', imports: '$80B', balance: '+$67B' },
      { partner: 'China', exports: '$130B', imports: '$168B', balance: '-$38B' },
      { partner: 'South Korea', exports: '$52B', imports: '$34B', balance: '+$18B' },
      { partner: 'Taiwan', exports: '$48B', imports: '$39B', balance: '+$9B' },
      { partner: 'Germany', exports: '$22B', imports: '$31B', balance: '-$9B' },
    ]
  },
  de: {
    country: 'Germany',
    flag: '🇩🇪',
    indicators: [
      { name: 'Nominal GDP', value: '$4.59 Trillion', change: '+0.4%', trend: 'neutral', source: 'Destatis (Federal Statistical Office)', year: '2025' },
      { name: 'Population', value: '84.6 Million', change: '+0.2%', trend: 'up', source: 'Destatis', year: '2025' },
      { name: 'Inflation (CPI)', value: '2.2%', change: '-0.2%', trend: 'up', source: 'Destatis', year: '2026' },
      { name: 'Unemployment Rate', value: '6.0%', change: '+0.1%', trend: 'down', source: 'Federal Employment Agency', year: '2026' },
      { name: 'ECB Deposit Rate', value: '3.00%', change: '-0.25%', trend: 'down', source: 'European Central Bank', year: '2026' },
    ],
    history: [
      { year: '2020', gdp: 3.89, inflation: 0.5, unemployment: 5.9 },
      { year: '2021', gdp: 4.28, inflation: 3.1, unemployment: 5.7 },
      { year: '2022', gdp: 4.08, inflation: 6.9, unemployment: 5.3 },
      { year: '2023', gdp: 4.46, inflation: 5.9, unemployment: 5.7 },
      { year: '2024', gdp: 4.54, inflation: 2.4, unemployment: 5.9 },
      { year: '2025', gdp: 4.59, inflation: 2.2, unemployment: 6.0 },
    ],
    trade: [
      { partner: 'United States', exports: '$160B', imports: '$76B', balance: '+$84B' },
      { partner: 'France', exports: '$116B', imports: '$72B', balance: '+$44B' },
      { partner: 'Netherlands', exports: '$112B', imports: '$104B', balance: '+$8B' },
      { partner: 'China', exports: '$98B', imports: '$155B', balance: '-$57B' },
      { partner: 'Poland', exports: '$90B', imports: '$78B', balance: '+$12B' },
    ]
  }
};
