const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const SUPABASE_URL = 'https://ymbtbodeofdcgnsgxzzg.supabase.co/rest/v1/users';
const API_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltYnRib2Rlb2ZkY2duc2d4enpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzIzMTA1MywiZXhwIjoyMDY4ODA3MDUzfQ.ejm_bGvGVWMrpaTsjJKS2EspWffmgHjmQscLuyDlfDI";

app.use(cors({
  origin:[
    "https://kosy-wer.github.io", 
    "http://localhost:8000"
],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve the index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/users', async (req, res) => {
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

app.post("/users", async (req, res) => {
  const { Title, Descriptions } = req.body;

  if (!Title || !Descriptions) {
    return res.status(400).json({ error: "Title & Descriptions required" });
  }

  try {
    const response = await fetch(SUPABASE_URL, {
      method: "POST",
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify({ Title, Descriptions }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json({ message: "Inserted successfully", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "User ID required" });
  }

  try {
    const response = await fetch(`${SUPABASE_URL}?id=eq.${id}`, {
      method: "DELETE",
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json({ message: "Deleted successfully", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { Title, Descriptions } = req.body;

  if (!id || !Title || !Descriptions) {
    return res.status(400).json({ error: "User ID, Title & Descriptions required" });
  }

  try {
    const response = await fetch(`${SUPABASE_URL}?id=eq.${id}`, {
      method: "PATCH", // bisa juga "PUT", tapi Supabase biasa pakai PATCH
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify({ Title, Descriptions }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json({ message: "Updated successfully", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = app;
