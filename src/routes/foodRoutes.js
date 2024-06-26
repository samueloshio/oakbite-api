import express from 'express';
import {
  addFood,
  getFoodsByCategoryAndCode,
  getFoodById,
  getFoodsByRestaurant,
  getRecommendedmFood,
  // getRandomFoodsByCategoryAndCode,
  searchFoods,
  getAllFoods,
} from '../controllers/foodController.js';
import { verifyVendor } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', addFood);

router.get('/:id', getFoodById);

router.get('/search/:search', searchFoods);

router.get('/:category/:code', getFoodsByCategoryAndCode);

router.get('/recommendation/:code', getRecommendedmFood);

router.get('/restaurant-foods/:id', getFoodsByRestaurant);

router.get('/', getAllFoods);
// router.get('/byId/:id', getRandomFoodsByCategoryAndCode);

export default router;
