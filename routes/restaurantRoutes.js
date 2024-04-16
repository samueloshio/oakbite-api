import express from 'express';
import {
  addRestaurant,
  getRandomRestaurant,
  getAllNearbyRestaurant,
  getRestaurantById,
} from './restaurantController.js';

const router = express.Router();

router.post('/', addRestaurant);

router.get('/:code', getRandomRestaurant);

router.get('/all/:code', getAllNearbyRestaurant);

router.get('/byId/:id', getRestaurantById);

export default router;
