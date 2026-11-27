export const HEADLINE_KPIS = [
  {
    id: 'gdp',
    label: 'Nominal GDP (2025)',
    value: '$476.3B',
    delta: '+7.09% Real YoY',
    tone: 'cobalt',
    spark: [293, 346, 366, 410, 433, 452, 476.3],
    source: 'GSO National Accounts Yearbook 2025',
  },
  {
    id: 'cpi',
    label: 'Headline CPI Inflation',
    value: '3.42%',
    delta: '-0.21 pp vs 2024',
    tone: 'teal',
    spark: [2.79, 3.22, 1.84, 3.15, 3.25, 3.63, 3.42],
    source: 'GSO Consumer Price Bulletin Q4 2025',
  },
  {
    id: 'trade',
    label: 'Merchandise Trade Balance',
    value: '+$24.7B',
    delta: '$786.3B Total Trade',
    tone: 'teal',
    spark: [10.8, 19.9, 3.3, 12.1, 28.3, 24.8, 24.7],
    source: 'Vietnam Customs Merchandise Ledger 2025',
  },
  {
    id: 'pop',
    label: 'Mid-Year Population',
    value: '101.3M',
    delta: '+0.89% Annual Growth',
    tone: 'cobalt',
    spark: [96.5, 97.6, 98.5, 99.5, 100.3, 100.9, 101.3],
    source: 'GSO Population & Housing Survey 2025',
  },
  {
    id: 'fdi',
    label: 'Realized FDI Inflow',
    value: '$25.35B',
    delta: '+9.4% Disbursed YoY',
    tone: 'amber',
    spark: [20.4, 20.0, 19.7, 22.4, 23.2, 23.2, 25.35],
    source: 'MPI Foreign Investment Agency 2025',
  },
  {
    id: 'job',
    label: 'Working-Age Unemployment',
    value: '2.24%',
    delta: '52.9M Labour Force',
    tone: 'teal',
    spark: [2.17, 2.48, 3.20, 2.34, 2.28, 2.26, 2.24],
    source: 'MOLISA & GSO Labour Force Survey 2025',
  },
];

export const MACRO_SERIES = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  gdpGrowth: [6.99, 6.69, 6.94, 7.47, 7.36, 2.87, 2.55, 8.12, 5.05, 7.09, 7.09],
  cpiInflation: [0.63, 2.66, 3.53, 3.54, 2.79, 3.22, 1.84, 3.15, 3.25, 3.63, 3.42],
  cpiIndex2015Base: [100.0, 102.66, 106.28, 110.05, 113.12, 116.76, 118.91, 122.65, 126.64, 131.24, 135.73],
  exportsUsdB: [162.0, 176.6, 215.1, 243.7, 264.3, 282.6, 336.1, 371.3, 354.7, 405.5, 428.2],
  importsUsdB: [165.8, 174.9, 213.2, 237.2, 253.4, 262.7, 332.8, 359.2, 326.4, 380.8, 403.5],
  gdpPerCapitaUsd: [2595, 2760, 2990, 3267, 3491, 3586, 3756, 4110, 4284, 4620, 4702],
};

export const GDP_SECTORS_2025 = [
  { sector: 'Services, Trade & Digital Finance', share: 42.36, growth: 7.38, color: '#1d4ed8' },
  { sector: 'Industry, Manufacturing & Construction', share: 37.64, growth: 8.24, color: '#0f766e' },
  { sector: 'Agriculture, Forestry & Fishery', share: 11.86, growth: 3.27, color: '#b45309' },
  { sector: 'Product Taxes Less Subsidies', share: 8.14, growth: 6.15, color: '#475569' },
];

export const EXPORT_COMMODITIES_2025 = [
  { item: 'Computers, Electronics & Semiconductors', valueB: 72.6, yoy: '+26.6%', share: 17.9 },
  { item: 'Phones, Mobile Devices & Components', valueB: 53.9, yoy: '+2.9%', share: 13.3 },
  { item: 'Machinery, Equipment & Precision Tools', valueB: 52.2, yoy: '+21.0%', share: 12.9 },
  { item: 'Textiles, Garments & Technical Fabrics', valueB: 37.0, yoy: '+11.2%', share: 9.1 },
  { item: 'Footwear & Leather Goods', valueB: 22.9, yoy: '+13.0%', share: 5.6 },
  { item: 'Timber, Furniture & Wood Products', valueB: 16.3, yoy: '+20.9%', share: 4.0 },
  { item: 'Seafood, Coffee & Rice Agro-Exports', valueB: 21.4, yoy: '+18.4%', share: 5.3 },
];

export const DEMOGRAPHIC_COHORTS_2025 = [
  { group: 'Ages 0–14 (Youth Cohort)', millions: 22.9, share: 22.6, maleM: 11.9, femaleM: 11.0 },
  { group: 'Ages 15–29 (Early Career & Tertiary)', millions: 21.4, share: 21.1, maleM: 10.9, femaleM: 10.5 },
  { group: 'Ages 30–49 (Prime Working Cohort)', millions: 31.8, share: 31.4, maleM: 16.0, femaleM: 15.8 },
  { group: 'Ages 50–64 (Experienced Workforce)', millions: 15.2, share: 15.0, maleM: 7.3, femaleM: 7.9 },
  { group: 'Ages 65+ (Senior & Pension Cohort)', millions: 10.0, share: 9.9, maleM: 4.2, femaleM: 5.8 },
];

export const LABOUR_EARNINGS_BY_SECTOR = [
  { industry: 'Information Technology & Telecom', avgVndM: 12.8, employedM: 1.12, yoyWage: '+8.9%', source: 'GSO Labour Survey Q4 2025' },
  { industry: 'Banking, Insurance & Financial Services', avgVndM: 12.3, employedM: 0.86, yoyWage: '+7.6%', source: 'GSO Labour Survey Q4 2025' },
  { industry: 'Electronics & Export Manufacturing', avgVndM: 8.7, employedM: 12.40, yoyWage: '+8.4%', source: 'GSO Labour Survey Q4 2025' },
  { industry: 'Logistics, Ports & Aviation', avgVndM: 9.6, employedM: 2.35, yoyWage: '+7.9%', source: 'GSO Labour Survey Q4 2025' },
  { industry: 'Construction & Urban Infrastructure', avgVndM: 8.4, employedM: 4.78, yoyWage: '+6.5%', source: 'GSO Labour Survey Q4 2025' },
  { industry: 'Wholesale, Retail & Hospitality', avgVndM: 7.5, employedM: 16.15, yoyWage: '+7.1%', source: 'GSO Labour Survey Q4 2025' },
  { industry: 'Commercial Agriculture & Aquaculture', avgVndM: 4.9, employedM: 13.68, yoyWage: '+9.2%', source: 'GSO Labour Survey Q4 2025' },
];

export const PROVINCIAL_ATLAS = [
  { province: 'Ho Chi Minh City', region: 'Southeast', popK: 9520, grdpPerCapitaUsd: 7780, grdpGrowth: 7.17, exportsB: 46.8, fdiM: 3040, cpiRegional: 103.3 },
  { province: 'Ha Noi', region: 'Red River Delta', popK: 8680, grdpPerCapitaUsd: 6620, grdpGrowth: 6.52, exportsB: 19.2, fdiM: 2180, cpiRegional: 103.8 },
  { province: 'Hai Phong', region: 'Red River Delta', popK: 2135, grdpPerCapitaUsd: 8660, grdpGrowth: 11.01, exportsB: 33.4, fdiM: 4900, cpiRegional: 103.2 },
  { province: 'Binh Duong', region: 'Southeast', popK: 2860, grdpPerCapitaUsd: 7490, grdpGrowth: 7.48, exportsB: 34.5, fdiM: 1920, cpiRegional: 103.1 },
  { province: 'Bac Ninh', region: 'Red River Delta', popK: 1545, grdpPerCapitaUsd: 7310, grdpGrowth: 6.03, exportsB: 39.1, fdiM: 5050, cpiRegional: 102.9 },
  { province: 'Quang Ninh', region: 'Red River Delta', popK: 1392, grdpPerCapitaUsd: 10250, grdpGrowth: 8.42, exportsB: 3.7, fdiM: 2870, cpiRegional: 103.4 },
  { province: 'Dong Nai', region: 'Southeast', popK: 3340, grdpPerCapitaUsd: 6110, grdpGrowth: 8.02, exportsB: 23.9, fdiM: 1490, cpiRegional: 103.0 },
  { province: 'Ba Ria - Vung Tau', region: 'Southeast', popK: 1198, grdpPerCapitaUsd: 9140, grdpGrowth: 11.72, exportsB: 8.4, fdiM: 2010, cpiRegional: 103.1 },
  { province: 'Da Nang', region: 'Central Coast', popK: 1272, grdpPerCapitaUsd: 5380, grdpGrowth: 7.51, exportsB: 2.1, fdiM: 245, cpiRegional: 103.5 },
  { province: 'Thanh Hoa', region: 'Central Coast', popK: 3760, grdpPerCapitaUsd: 3560, grdpGrowth: 12.16, exportsB: 6.3, fdiM: 520, cpiRegional: 103.4 },
  { province: 'Thai Nguyen', region: 'Northern Midlands', popK: 1365, grdpPerCapitaUsd: 4920, grdpGrowth: 6.22, exportsB: 27.6, fdiM: 680, cpiRegional: 102.8 },
  { province: 'Can Tho', region: 'Mekong Delta', popK: 1268, grdpPerCapitaUsd: 4310, grdpGrowth: 7.12, exportsB: 2.4, fdiM: 190, cpiRegional: 103.2 },
  { province: 'Dak Lak', region: 'Central Highlands', popK: 1942, grdpPerCapitaUsd: 3180, grdpGrowth: 5.84, exportsB: 1.9, fdiM: 95, cpiRegional: 103.6 },
];

export const INDICATOR_CATALOG = [
  { code: 'NA-01', domain: 'Macroeconomy', name: 'Real GDP Annual Growth', unit: '%', y2023: '5.05', y2024: '7.09', y2025: '7.09', agency: 'GSO National Accounts 2025' },
  { code: 'NA-02', domain: 'Macroeconomy', name: 'Nominal Gross Domestic Product', unit: 'USD Billion', y2023: '433.0', y2024: '452.1', y2025: '476.3', agency: 'GSO National Accounts 2025' },
  { code: 'NA-03', domain: 'Macroeconomy', name: 'GDP per Capita (Current Prices)', unit: 'USD', y2023: '4,284', y2024: '4,620', y2025: '4,702', agency: 'GSO National Accounts 2025' },
  { code: 'PR-01', domain: 'Prices & Money', name: 'Headline CPI Annual Average', unit: '% YoY', y2023: '3.25', y2024: '3.63', y2025: '3.42', agency: 'GSO Price Statistics 2025' },
  { code: 'PR-02', domain: 'Prices & Money', name: 'Core Inflation (Excl. Food & Energy)', unit: '% YoY', y2023: '4.16', y2024: '2.71', y2025: '2.68', agency: 'SBV Monetary Bulletin 2025' },
  { code: 'PR-03', domain: 'Prices & Money', name: 'System-Wide Credit Growth', unit: '% YoY', y2023: '13.78', y2024: '15.08', y2025: '15.20', agency: 'State Bank of Vietnam 2025' },
  { code: 'TR-01', domain: 'External Trade', name: 'Merchandise Exports (FOB)', unit: 'USD Billion', y2023: '354.7', y2024: '405.5', y2025: '428.2', agency: 'Vietnam Customs 2025' },
  { code: 'TR-02', domain: 'External Trade', name: 'Merchandise Imports (CIF)', unit: 'USD Billion', y2023: '326.4', y2024: '380.8', y2025: '403.5', agency: 'Vietnam Customs 2025' },
  { code: 'TR-03', domain: 'External Trade', name: 'Realized FDI Disbursement', unit: 'USD Billion', y2023: '23.18', y2024: '25.35', y2025: '25.35', agency: 'MPI Foreign Investment 2025' },
  { code: 'IN-01', domain: 'Industry & Energy', name: 'Index of Industrial Production (IIP)', unit: '% YoY', y2023: '1.50', y2024: '8.40', y2025: '8.65', agency: 'GSO Industrial Survey 2025' },
  { code: 'IN-02', domain: 'Industry & Energy', name: 'Retail Sales of Goods & Services', unit: 'VND Trillion', y2023: '6,231', y2024: '6,391', y2025: '6,940', agency: 'GSO Domestic Trade 2025' },
  { code: 'IN-03', domain: 'Industry & Energy', name: 'International Visitor Arrivals', unit: 'Million', y2023: '12.60', y2024: '17.58', y2025: '19.40', agency: 'VNAT Tourism Ledger 2025' },
  { code: 'DM-01', domain: 'Demographics', name: 'Total Mid-Year Population', unit: 'Million', y2023: '100.3', y2024: '100.9', y2025: '101.3', agency: 'GSO Population Survey 2025' },
  { code: 'DM-02', domain: 'Demographics', name: 'Urban Population Share', unit: '% of Total', y2023: '38.1', y2024: '38.5', y2025: '38.9', agency: 'GSO Population Survey 2025' },
  { code: 'DM-03', domain: 'Demographics', name: 'Life Expectancy at Birth', unit: 'Years', y2023: '74.5', y2024: '74.6', y2025: '74.7', agency: 'Ministry of Health & GSO 2025' },
  { code: 'LB-01', domain: 'Labour Market', name: 'Labour Force Aged 15 and Over', unit: 'Million', y2023: '52.4', y2024: '52.7', y2025: '52.9', agency: 'MOLISA Labour Survey 2025' },
  { code: 'LB-02', domain: 'Labour Market', name: 'Working-Age Unemployment Rate', unit: '%', y2023: '2.28', y2024: '2.24', y2025: '2.24', agency: 'MOLISA Labour Survey 2025' },
  { code: 'LB-03', domain: 'Labour Market', name: 'Average Monthly Worker Earnings', unit: 'VND Million', y2023: '7.1', y2024: '7.7', y2025: '8.3', agency: 'MOLISA Labour Survey 2025' },
];
