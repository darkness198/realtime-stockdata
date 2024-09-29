// backend/src/websocket.ts
import { Server, Socket } from 'socket.io';
import { fetchStockData } from './services/stockService';
import { StockData } from './types';

// Global variable to store the Socket.io server instance
let io: Server;

// Initializes the WebSocket server and sets up event listeners
export const initializeWebSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  // Logs a message when a client connects
  io.on('connection', (socket: Socket) => {
    console.log('A client connected:', socket.id);

    // Logs a message when a client disconnects
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  // Fetches and emits stock data to all connected clients every 5 seconds
  setInterval(async () => {
    const stocks: StockData[] = await fetchStockData();
    io.emit('stockUpdate', stocks);
  }, 5000);
};