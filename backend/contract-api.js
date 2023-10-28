const express = require('express');

// NEAR
import { GuestBook } from './near-interface';
import { Wallet } from './near-wallet';

// When creating the wallet you can choose to create an access key, so the user
// can skip signing non-payable methods when talking wth the  contract
const wallet = new Wallet({ createAccessKeyFor: process.env.CONTRACT_NAME })

// Abstract the logic of interacting with the contract to simplify your flow
const guestBook = new GuestBook({ contractId: process.env.CONTRACT_NAME, walletToUse: wallet });

// Express JS part
const app = express();
const port = 3000; // You can choose any available port you prefer

// Sample data (replace with your actual messages data)
const messages = [
  { id: 1, text: 'Hello, World!' },
  { id: 2, text: 'This is a sample message.' },
];

// Define a GET endpoint to fetch messages
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});