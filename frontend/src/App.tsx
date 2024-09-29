// frontend/src/App.tsx
import React, { useEffect, useState } from 'react';
import StockList from './components/StockList';
import StockChart from './components/StockChart';
import AlertForm from './components/AlertForm';
import { StockData, Alert } from './types';
import { initWebSocket } from './services/websocket';
import { fetchInitialStocks } from './services/api';

// Main application component
const App: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Fetches initial stock data and initializes WebSocket connection on component mount
  useEffect(() => {
    // Fetch initial stock data
    const getInitialStocks = async () => {
      const initialStocks = await fetchInitialStocks();
      setStocks(initialStocks);
      // Set initial stock to google
      // const googleStock = initialStocks.find(stock => stock.symbol === 'GOOGL');
      // setSelectedStock(googleStock || null);
    };
    getInitialStocks();

    // Initialize WebSocket connection
    const socket = initWebSocket();

    // Handles stock updates received from the WebSocket server
    socket.on('stockUpdate', (updatedStock: StockData) => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) =>
          stock.symbol === updatedStock.symbol ? updatedStock : stock
        )
      );

      // Checks if any price alerts have been triggered
      alerts.forEach((alert) => {
        if (
          alert.symbol === updatedStock.symbol &&
          ((alert.type === 'above' && updatedStock.price >= alert.value) ||
            (alert.type === 'below' && updatedStock.price <= alert.value))
        ) {
          window.alert(`Alert: ${updatedStock.symbol} is ${alert.type} ${alert.value}`);
          // Optionally, remove the alert after triggering
          setAlerts((prevAlerts) =>
            prevAlerts.filter((a) => a !== alert)
          );
        }
      });
    });

    // Disconnects from the WebSocket server on component unmount
    return () => {
      socket.disconnect();
    };
  }, [alerts]);

  // Handles stock selection from the list
  const handleSelectStock = (stock: StockData) => {
    setSelectedStock(stock);
  };

  // Handles adding a new price alert
  const handleAddAlert = (alert: Alert) => {
    setAlerts((prevAlerts) => [...prevAlerts, alert]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Real-Time Stock Dashboard</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 p-2">
          <StockList stocks={stocks} onSelectStock={handleSelectStock} />
          <AlertForm onAddAlert={handleAddAlert} />
        </div>
        <div className="md:w-2/3 p-2">
          {selectedStock ? (
            <StockChart stock={selectedStock} />
          ) : (
            <div className="text-center text-gray-500">Select a stock to view details</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;