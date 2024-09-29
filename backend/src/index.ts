// backend/src/index.ts
import express from 'express';
import cors from 'cors';
import http from 'http';
import stockRoutes from './routes/stocks';
import { initializeWebSocket } from './websocket';

// Creates a new Express application
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Mounts the stock routes
app.use('/api/stocks', stockRoutes);

// Initializes the WebSocket server
initializeWebSocket(server);

// Starts the server on the specified port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});