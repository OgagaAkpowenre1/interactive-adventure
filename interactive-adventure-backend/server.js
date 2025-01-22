const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 


const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
    console.error('MONGO_URI is not defined in .env file');
    process.exit(1); // Exit the process with an error code
}


const app = express(); 
const allowedOrigins = [
    'https://5173-idx-interactive-adventure-1737094341845.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev', // Your frontend
    'https://interactive-adventure-production.up.railway.app', // Your Railway domain (if making backend-to-backend calls)
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());

const storyRoutes = require('./routes/storyRoutes');
const sceneRoutes = require('./routes/sceneRoutes')

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/stories', storyRoutes)
// app.get('/api/stories', async (req, res) =>{
//     try{
//         res.json("hello")
//     }catch(error){
//         console.error("Error creating story", error)
//         res.status(500).json({error : "An error occurred while fetching the stories"})
//     }
    
// })
app.use('/api/scenes', sceneRoutes)

app.get('/api/test', (req, res) => { 
    res.json("I work")
})

// MongoDB connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {console.error('MongoDB connection error:', err); process.exit(1)});

app.use((req, res) => {
        res.status(404).json({ error: 'Route not found' });
    });

app.get('/', (req, res) => res.send('API is running!'));

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    await mongoose.disconnect();
    process.exit(0);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
