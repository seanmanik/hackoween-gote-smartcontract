const express = require('express');

const { GuestBook } = require('./near-interface');
const { Wallet } = require('./near-wallet');
const { utils } = require('near-api-js');
const app = express();
const port = process.env.PORT || 3000;

// wallet
const wallet = new Wallet({ createAccessKeyFor: process.env.CONTRACT_NAME })
const guestBook = new GuestBook({ contractId: process.env.CONTRACT_NAME, walletToUse: wallet });

app.use(express.json());

app.get('/messages', async (req, res) => {
    try {
      const messages = await guestBook.getMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Add a message
  app.post('/messages', async (req, res) => {
    const { message, donation } = req.body;
    try {
      await guestBook.addMessage(message, donation);
      res.status(201).json({ message: 'Message added successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });