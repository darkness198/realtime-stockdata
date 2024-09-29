## First App

This application is a simple stock tracking app that allows users to view real-time stock prices and charts.

### Running the App

1. **Backend:**
   - Navigate to the `firstapp/backend` directory.
   - Install dependencies: `npm install`
   - Build the application: `npm run build`
   - Run the application: `npm run start`

2. **Frontend:**
   - Navigate to the `firstapp/frontend` directory.
   - Install dependencies: `npm install`
   - Start the development server: `npm run start`

### Implementation Flow

The application works as follows:

1. **Frontend:**
   - The frontend application uses React to render the user interface.
   - It fetches stock data from the backend API using Axios.
   - It displays the stock data in a list and a chart using Chart.js.
   - It uses Socket.io to establish a real-time connection with the backend.
   - When a user searches for a stock, the frontend sends a request to the backend API.

2. **Backend:**
   - The backend application uses Express to create a REST API.
   - It uses Axios to fetch stock data from Alpha Vantage API.
   - It uses Socket.io to broadcast real-time stock updates to connected clients.
   - When the backend receives a request from the frontend, it fetches the stock data from Alpha Vantage API.
   - It then broadcasts the stock data to all connected clients.

### Code Comments

- **Frontend:**
   - The `src/services/api.ts` file contains the code for fetching stock data from the backend API.
   - The `src/services/websocket.ts` file contains the code for establishing a real-time connection with the backend.
   - The `src/components/StockList.tsx` file contains the code for rendering the stock list.
   - The `src/components/StockChart.tsx` file contains the code for rendering the stock chart.

- **Backend:**
   - The `src/services/stockService.ts` file contains the code for fetching stock data from Alpha Vantage API.
   - The `src/routes/stocks.ts` file contains the code for handling stock requests from the frontend.
   - The `src/websocket.ts` file contains the code for broadcasting real-time stock updates to connected clients.

### Notes

- You will need to replace `https://your-backend-domain.com` in the `.env` files with the actual domain of your backend server.
- You will also need to replace `YOUR_ALPHA_VANTAGE_API_KEY` and `YOUR_FIREBASE_SERVICE_ACCOUNT_JSON_STRING` in the backend `.env` file with your actual API keys.
- The application uses Firebase for authentication and real-time database.
