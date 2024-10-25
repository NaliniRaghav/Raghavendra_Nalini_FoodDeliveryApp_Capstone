// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import dotenv from 'dotenv';
 
// import userRoutes from './routes/userRoutes.js';
// import restaurantRoutes from './routes/restaurantRoutes.js';
// import menuItemRoutes from './routes/menuitemRoutes.js';
// import orderRoutes from './routes/orderRoutes.js';
// import reviewRoutes from './routes/reviewRoutes.js';
// dotenv.config();   
// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Connecting MongoDb
// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Home Route
// app.get('/', (req, res) => {
//     res.send('Welcome to the Restaurant App API');
// });

// // CRUD routes for different models
// app.use('/api/users', userRoutes);
// app.use('/api/restaurants', restaurantRoutes);
// app.use('/api/menu-items', menuItemRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/reviews', reviewRoutes);

// // Starting the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
 
// // seedData();

// server.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import menuItemRoutes from './routes/menuitemRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

import seedData from './seedfile1.js';

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json()); 
app.use(cors());  

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);  
    });

// Define the home route
app.get('/', (req, res) => {
    res.send('Welcome to the Restaurant App API');
});

// Register CRUD routes for different models
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menu-items', menuItemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

// Error handling middleware for unknown routes
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Global error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

seedData();