import express from 'express';
import dotenv from 'dotenv';
import shippingController from './controllers/shippingController.js';

dotenv.config();

const app = express();
app.use(express.json());

console.log("Loaded API Key:", process.env.API_KEY); 

const PORT = parseInt(process.env.PORT, 10) || 8080;

app.get('/calculate-shipping', shippingController);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
