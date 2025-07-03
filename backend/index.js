const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const imageRoutes = require('./routes/imageRoutes');
app.use('/api/images', imageRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
