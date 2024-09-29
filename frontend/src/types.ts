// frontend/src/types.ts

import { ChartData, ScatterDataPoint, BubbleDataPoint } from 'chart.js';

// Interface for stock data
export interface StockData {
  symbol: string;
  price: number;
  change: number;
  timestamp: number;
  data: ChartData<'line', { x: Date; y: number }[], string>;
}

// Interface for price alerts
export interface Alert {
  symbol: string;
  type: 'above' | 'below';
  value: number;
}