import express from 'express';
import { addRating, checkUserRating } from '../controllers/ratingController.js';
import { verifyTokenAndAuthorization } from '../middleware/verifyToken.js';

const router = express.Router();

// POST => /api/rating
router.post('/', verifyTokenAndAuthorization, addRating);

// GET => /api/rating
router.get('/', verifyTokenAndAuthorization, checkUserRating);

export default router;
