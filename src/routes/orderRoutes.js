import express from 'express';
import { verifyTokenAndAuthorization } from '../middleware/verifyToken.js';
import { getUserOrders, placeOrder } from '../controllers/orderController.js';

const router = express.Router();

// POST => /api/rating
router.post('/', verifyTokenAndAuthorization, placeOrder);

// GET => /api/rating
router.get('/', verifyTokenAndAuthorization, getUserOrders);

export default router;
