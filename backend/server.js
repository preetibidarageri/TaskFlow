const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');

const app = express();

const PORT = process.env.PORT || 5000;

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// TEST ROUTE
// ===============================

app.get('/', (req, res) => {
  res.json({
    message: 'TaskFlow API is running',
  });
});

// ===============================
// TASK ROUTES
// ===============================

app.use('/api/tasks', taskRoutes);

// ===============================
// MONGODB CONNECTION
// ===============================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');

    // IMPORTANT:
    // 0.0.0.0 allows your mobile phone
    // to connect to this backend.
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.log('MongoDB connection error:', error);
  });
