const express = require('express')
const connectDB = require('./src/config/db')
const authRoute = require('./src/routes/auth')
const userRoutes = require('./src/routes/user')
const hobbieUserRoutes = require('./src/routes/hobbieUser')
const cors = require('cors');
const app = express()

// Enable CORS for all origins
app.use(cors());

// Connect to MongoDB Atlas
connectDB()

// You can also configure it to allow only specific origins:
app.use(cors({
    origin: process.env.FRONTEND_URL,
}));

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello Duniya!!')
})
app.use('/api/auth', authRoute)
app.use('/api/hobbieuser', hobbieUserRoutes)
app.use('/api/user', userRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));