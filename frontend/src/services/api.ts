// frontend/src/services/api.ts
import { StockData } from '../types';

// Replace with your backend API endpoint
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Flag to use mock data or actual API
const USE_MOCK_DATA = true; // Set to false to use actual API

// Mock stock data
const mockStocks: StockData[] = [
  {
    symbol: 'AAPL',
    price: 150.25,
    change: 1.5,
    timestamp: Date.now(),
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'AAPL',
          data: [
            { x: new Date(2023, 0, 1), y: 140 },
            { x: new Date(2023, 1, 1), y: 145 },
            { x: new Date(2023, 2, 1), y: 150 },
            { x: new Date(2023, 3, 1), y: 148 },
            { x: new Date(2023, 4, 1), y: 152 },
            { x: new Date(2023, 5, 1), y: 155 },
            { x: new Date(2023, 6, 1), y: 160 }
          ],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    }
  },
  {
    symbol: 'GOOGL',
    price: 2500.50,
    change: -2.0,
    timestamp: Date.now(),
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'GOOGL',
          data: [
            { x: new Date(2023, 0, 1), y: 2400 },
            { x: new Date(2023, 1, 1), y: 2450 },
            { x: new Date(2023, 2, 1), y: 2500 },
            { x: new Date(2023, 3, 1), y: 2480 },
            { x: new Date(2023, 4, 1), y: 2520 },
            { x: new Date(2023, 5, 1), y: 2550 },
            { x: new Date(2023, 6, 1), y: 2600 }
          ],
          fill: false,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }
      ]
    }
  },
  {
    symbol: 'MSFT',
    price: 300.75,
    change: 0.5,
    timestamp: Date.now(),
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'MSFT',
          data: [
            { x: new Date(2023, 0, 1), y: 290 },
            { x: new Date(2023, 1, 1), y: 295 },
            { x: new Date(2023, 2, 1), y: 300 },
            { x: new Date(2023, 3, 1), y: 298 },
            { x: new Date(2023, 4, 1), y: 302 },
            { x: new Date(2023, 5, 1), y: 305 },
            { x: new Date(2023, 6, 1), y: 310 }
          ],
          fill: false,
          borderColor: 'rgb(54, 162, 235)',
          tension: 0.1
        }
      ]
    }
  },
  {
    symbol: 'AMZN',
    price: 120.00,
    change: -1.0,
    timestamp: Date.now(),
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'AMZN',
          data: [
            { x: new Date(2023, 0, 1), y: 110 },
            { x: new Date(2023, 1, 1), y: 115 },
            { x: new Date(2023, 2, 1), y: 120 },
            { x: new Date(2023, 3, 1), y: 118 },
            { x: new Date(2023, 4, 1), y: 122 },
            { x: new Date(2023, 5, 1), y: 125 },
            { x: new Date(2023, 6, 1), y: 130 }
          ],
          fill: false,
          borderColor: 'rgb(255, 205, 86)',
          tension: 0.1
        }
      ]
    }
  }
];

// Fetches initial stock data from the backend API or returns mock data
export const fetchInitialStocks = async (): Promise<StockData[]> => {
  if (USE_MOCK_DATA) {
    return mockStocks;
  } else {
    try {
      const response = await fetch(`${API_URL}/api/stocks`);
      return response.json() as Promise<StockData[]>;
    } catch (error) {
      console.error('Error fetching initial stocks:', error);
      return [];
    }
  }
};