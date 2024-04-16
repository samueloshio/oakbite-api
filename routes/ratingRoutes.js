import express from 'express';
import { addRating, checkRating } from '../controllers/ratingController.js';

const router = express.Router();

// POST => /api/rating
router.post('/', addRating);

// GET => /api/rating
router.get('/', checkRating);

export default router;
