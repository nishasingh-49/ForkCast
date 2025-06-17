// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weather.js';

dotenv.config();

const app = express(); // move this UP ⬆️ before using app

app.use(cors());
app.use(express.json());

app.use('/api/weather', weatherRoutes); // now it won't scream internally

app.get('/', (req, res) => {
  res.send('🍴 ForkCast Backend is alive!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
