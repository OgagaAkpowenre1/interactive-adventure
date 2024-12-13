const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({path: '/workspace/interactive-adventure/security.env'});


const MONGO_URI = process.env.MONGO_URI

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => res.send('API is running!'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
