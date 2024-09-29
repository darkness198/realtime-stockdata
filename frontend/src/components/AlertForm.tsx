import React, { useState } from 'react';

interface AlertFormProps {
  onAddAlert: (alert: any) => void;
}

// Allows users to create price alerts for specific stocks
const AlertForm: React.FC<AlertFormProps> = ({ onAddAlert }) => {
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState(0);
  const [direction, setDirection] = useState('above');

  // Handles form submission and adds the alert to the list
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAlert({ stock, price, direction });
    setStock('');
    setPrice(0);
    setDirection('above');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="stock">Stock:</label>
        <input
          type="text"
          id="stock"
          value={stock}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStock(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(parseInt(e.target.value, 10))}
        />
      </div>
      <div>
        <label htmlFor="direction">Direction:</label>
        <select
          id="direction"
          value={direction}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDirection(e.target.value)}
        >
          <option value="above">Above</option>
          <option value="below">Below</option>
        </select>
      </div>
      <button type="submit">Add Alert</button>
    </form>
  );
};

export default AlertForm;

