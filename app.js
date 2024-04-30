import express from 'express';
// import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import NotFound from 'http-errors';
import dotenv from 'dotenv';
import connect_db from './src/config/dbConfig.js';
// import generateOtp from './src/utils/otp_generator.js';

// IMPORT ROUTERS
import categoryRoute from './src/routes/categoryRoutes.js';
import restaurantRoute from './src/routes/restaurantRoutes.js';
import foodRoute from './src/routes/foodRoutes.js';
import ratingRoute from './src/routes/ratingRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors({ origin: true, credentials: true }));
app.disable('x-powered-by'); //less hacker know about our stack
app.get('/', async (req, res, next) => {
  res.send('Awesome it works 🐻');
});

// ROUTES MIDDLEWARES
app.use('/api/categories', categoryRoute);
app.use('/api/restaurant', restaurantRoute);
app.use('/api/foods', foodRoute);
app.use('/api/rating', ratingRoute);

app.use((req, res, next) => {
  next(NotFound(404, 'Hush!!! Sorry, Route Not Found'));
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 7020;

// Initialize Database & Serve Connection
connect_db()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`Server connected 🚀 to http://localhost:${PORT}`);
      });
    } catch (error) {
      console.log('Cannot connect to the server');
    }
  })
  .catch((error) => {
    console.log('Invalid database connection...!');
  });

// app.listen(PORT, () => {
//   console.log(`Server connected 🚀 to http://localhost:${PORT}`);
// });
