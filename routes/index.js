const express = require('express');
const path = require('path');
const cors = require('cors');

const router = express.Router();

const SUPABASE_URL = 'https://ymbtbodeofdcgnsgxzzg.supabase.co/rest/v1/users';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltYnRib2Rlb2ZkY2duc2d4enpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMzEwNTMsImV4cCI6MjA2ODgwNzA1M30.a4RqHjHgpFuRoyRnxueX4NJEoE2subxq-hnfXTwZhME';

router.use(cors({
  origin: 'https://kosy-wer.github.io', // ganti dengan URL GitHub Pages kamu
  methods: ['GET', 'POST'], // method yang diizinkan
  allowedHeaders: ['Content-Type', 'Authorization'] // header yang diizinkan
}));

// Serve the index.html file for the root route
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});
router.post('/users', async (req, res) => {
  try {
    const response = await fetch(SUPABASE_URL, {
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: await response.text() });
    }

    const data = await response.json();
    res.json(data); // kirim hasil JSON langsung ke client
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const response = await fetch(SUPABASE_URL, {
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
