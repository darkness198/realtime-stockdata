// backend/src/types.ts

// Interface for stock data
export interface StockData {
  symbol: string;
  price: number;
  change: number;
  timestamp: number;
}