import express from 'express';
// import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import NotFound from 'http-errors';
import dotenv from 'dotenv';
import connect_db from './config/dbConfig.js';

// IMPORT ROUTERS
import categoryRouter from './routes/categoryRoutes.js';
import restaurantRouter from './routes/restaurantRoutes.js';
import foodRouter from './routes/foodRoutes.js';
import ratingRouter from './routes/ratingRoutes.js';

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
app.use('/api/categories', categoryRouter);
app.use('/api/restaurant', restaurantRouter);
app.use('/api/foods', foodRouter);
app.use('/api/rating', ratingRouter);

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

const PORT = process.env.PORT || 7080;

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
