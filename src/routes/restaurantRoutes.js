import express from 'express';
import {
  addRestaurant,
  getAllNearbyRestaurant,
  getRandomRestaurant,
  getRestaurantById,
} from '../controllers/restaurantController.js';

const router = express.Router();

router.post('/', addRestaurant);

router.get('/:code', getRandomRestaurant);

router.get('/all/:code', getAllNearbyRestaurant);

router.get('/byId/:id', getRestaurantById);

export default router;
