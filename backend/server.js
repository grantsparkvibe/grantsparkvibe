// File: backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));


// Sample Schema & Route
const grantSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
});

const Grant = mongoose.model('Grant', grantSchema);

app.get('/api/grants', async (req, res) => {
  try {
    const grants = await Grant.find();
    res.json(grants);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/grants', async (req, res) => {
  try {
    const newGrant = new Grant(req.body);
    await newGrant.save();
    res.status(201).json(newGrant);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create grant' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
