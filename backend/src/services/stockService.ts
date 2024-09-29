// backend/src/services/stockService.ts
import axios from 'axios';
import { StockData } from '../types';

// Gets the Alpha Vantage API key from the environment variable
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY || '';
const ALPHA_VANTAGE_URL = 'https://www.alphavantage.co/query';

// List of stock symbols to fetch data for
const STOCK_SYMBOLS = ['AAPL', 'GOOGL', 'MSFT', 'AMZN'];

// Fetches stock data for the specified symbols from Alpha Vantage API
export const fetchStockData = async (): Promise<StockData[]> => {
  const promises = STOCK_SYMBOLS.map(async (symbol) => {
    try {
      const response = await axios.get(ALPHA_VANTAGE_URL, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol,
          apikey: ALPHA_VANTAGE_API_KEY,
        },
      });

      // Extracts relevant data from the API response
      const data = response.data['Global Quote'];
      const price = parseFloat(data['05. price']);
      const change = parseFloat(data['09. change']);
      const timestamp = Date.now();

      // Returns the stock data object
      return {
        symbol,
        price,
        change,
        timestamp,
      } as StockData;
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
      return {
        symbol,
        price: 0,
        change: 0,
        timestamp: Date.now(),
      } as StockData;
    }
  });

  // Waits for all stock data fetches to complete
  const stocks = await Promise.all(promises);
  return stocks;
};