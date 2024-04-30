import express from 'express';
import {
  createCategory,
  getRandomCategory,
  getAllCategories,
} from '../controllers/categoryController.js';
import { verifyAdmin } from '../middleware/verifyToken.js';

const router = express.Router();

// POST => /api/category
router.post('/', verifyAdmin, createCategory);

// GET => /api/random
router.get('/random', getRandomCategory);

// GET => /api/category
router.get('/', getAllCategories);

export default router;
