import express from 'express';
import { fetchStockData } from '../services/stockService';
import admin from 'firebase-admin';

// Creates a new Express router
const router = express.Router();

// Handles GET requests for stock data by symbol
router.get('/:symbol', async (req, res) => {
  const { symbol } = req.params;
  try {
    const stockData = await fetchStockData();
    res.json(stockData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch stock data' });
  }
});

// Handles POST requests for creating price alerts
router.post('/alert', async (req, res) => {
  const { symbol, price, direction } = req.body;

  try {
    // Creates a Firebase Cloud Messaging message
    const message = {
      notification: {
        title: `Stock Alert: ${symbol}`,
        body: `The price of ${symbol} is now ${direction} ${price}`,
      },
      topic: symbol,
    };

    // Sends the message to the specified topic
    admin.messaging().send(message);

    res.status(200).send('Alert sent successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending alert.');
  }
});

export default router;

