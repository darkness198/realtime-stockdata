import React from 'react';
import { StockData } from '../types';

interface StockListProps {
  stocks: StockData[];
  onSelectStock: (stock: StockData) => void;
}

// Renders a list of stocks with their prices and allows users to select a stock
const StockList: React.FC<StockListProps> = ({ stocks, onSelectStock }) => {
  return (
    <ul>
      {stocks.map((stock) => (
        <li key={stock.symbol} onClick={() => onSelectStock(stock)}>
          {stock.symbol} - ${stock.price.toFixed(2)}
        </li>
      ))}
    </ul>
  );
};

export default StockList;

