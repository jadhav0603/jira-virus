const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const webhookRouter = require('./Routes/webhook');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/api', webhookRouter);




app.listen(PORT, async() => {
    // await mongoose.connect(process.env.MONGODB_URI)
    //     .then(() => console.log('MongoDB connected'))
    //     .catch(err => console.error('MongoDB connection error:', err));
  console.log(`Server is running on port ${PORT}`);
});