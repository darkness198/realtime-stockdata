// frontend/src/services/websocket.ts
import { io, Socket } from 'socket.io-client';
import { StockData } from '../types';

// Replace with your backend WebSocket endpoint
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

// Initializes the WebSocket connection and returns the Socket object
export const initWebSocket = (): Socket => {
  const socket = io(SOCKET_URL, {
    transports: ['websocket'],
  });

  // Logs a message when the WebSocket connection is established
  socket.on('connect', () => {
    console.log('Connected to WebSocket server');
  });

  // Logs a message when the WebSocket connection is closed
  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
  });

  return socket;
};