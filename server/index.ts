import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/onmeta-config', (req, res) => {
  res.json({ apiKey: process.env.ONMETA_API_KEY });
});

app.post('/onmeta-webhook', async (req, res) => {
  const { merchant_tx_id, status, upi_id, amount } = req.body;

  console.log('Received Onmeta webhook:', req.body);

  if (status === 'SUCCESS') {
    // Here you would typically update your database to reflect the successful transaction.
    // For now, we'll just log it to the console.
    console.log(`Transaction ${merchant_tx_id} for ${upi_id} with amount ${amount} was successful.`);
    // You could also notify the user or merchant via websockets or another notification service.
  } else {
    // Handle other statuses like 'PENDING', 'FAILED', etc.
    console.log(`Transaction ${merchant_tx_id} status: ${status}`);
  }

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
