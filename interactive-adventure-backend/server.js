const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 


const MONGO_URI = process.env.MONGO_URI

const app = express();
app.use(cors());
app.use(express.json());

const storyRoutes = require('./routes/storyRoutes');
const sceneRoutes = require('./routes/sceneRoutes')

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/stories', storyRoutes)

app.use('/api/scenes', sceneRoutes)

app.get('/api/test', (req, res) => { 
    res.json("I work")
})

// MongoDB connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => res.send('API is running!'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
