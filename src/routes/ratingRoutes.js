import express from 'express';
import { addRating, checkUserRating } from '../controllers/ratingController.js';

const router = express.Router();

// POST => /api/rating
router.post('/', addRating);

// GET => /api/rating
router.get('/', checkUserRating);

export default router;
