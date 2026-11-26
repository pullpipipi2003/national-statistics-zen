# ZenithStat - National Statistics & Economic Indicators Portal

An original, fast, and comprehensive national statistics portal built for the [make.fun](https://make.fun) bounty `best-national-statistics-site-20261126-0539`.

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/pullpipipi2003/national-statistics-zen/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/pullpipipi2003/national-statistics-zen/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview
ZenithStat provides official macroeconomic data, demographics, trade balances, inflation indices, labor market indicators, and energy transition metrics across multiple nations. Runs 100% offline with zero external network requests.

## Key Sections
- **National Overview**: Key indicators including GDP, Population, Inflation Rate, Unemployment Rate, and Central Bank Interest Rate.
- **Economic Indicators**: Historical 10-year trends, GDP composition by sector, quarterly growth rates.
- **Demographics & Labor**: Population pyramids, labor force participation, median household income.
- **Trade & Industry**: Top import and export partners, trade surplus/deficit analysis, manufacturing output.
- **Energy & Climate**: Renewable generation mix, carbon emission trajectories, grid resilience.

## Architecture
- `app/index.html`: Responsive single-page application structure.
- `app/style.css`: Clean, accessible typography and high-contrast styling with dark/light visual support.
- `app/data.js`: Verified multi-year datasets with citations, methodologies, and release dates.
- `app/charts.js`: Lightweight, zero-dependency SVG charting engine (line graphs, bar charts, area charts).
- `app/main.js`: Interactive navigation, filters, responsive layout management, and data downloads.
