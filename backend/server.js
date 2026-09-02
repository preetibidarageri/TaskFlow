require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log('Starting TaskFlow backend...');
console.log('MongoDB URI exists:', !!MONGO_URI);

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is missing from .env');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 15000,
  })
  .then(() => {
    console.log('=================================');
    console.log('✅ MongoDB connected successfully');
    console.log('=================================');

    app.use('/api/tasks', taskRoutes);

    app.get('/', (req, res) => {
      res.json({
        success: true,
        message: 'TaskFlow backend is running',
      });
    });

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📱 Mobile API: http://172.16.2.95:${PORT}`);
    });
  })
  .catch(error => {
    console.error('=================================');
    console.error('❌ MongoDB connection failed');
    console.error('=================================');
    console.error(error);
    process.exit(1);
  });
