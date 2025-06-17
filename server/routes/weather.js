import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/:city', async (req, res) => {
  const city = req.params.city;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Missing API key" });
  }

  try {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    res.json(result.data);
  } catch (error) {
    console.error('Weather fetch failed:', error.message);
    res.status(500).json({ error: 'Weather fetch failed' });
  }
});

export default router;
