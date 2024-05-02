import express from 'express';
import { verifyTokenAndAuthorization } from '../middleware/verifyToken.js';
import {
  addProductToCart,
  decrementProductQty,
  getCart,
  getCartCount,
  removeCartItem,
} from '../controllers/cartController.js';

const router = express.Router();

// POST => /api/cart
router.post('/', verifyTokenAndAuthorization, addProductToCart);

// GET => /api/cart
router.get('/decrement/:id', verifyTokenAndAuthorization, decrementProductQty);

// DELETE => /api/cart
router.delete('/:id', verifyTokenAndAuthorization, removeCartItem);

// GET => /api/cart
router.get('/', verifyTokenAndAuthorization, getCart);

// GET => /api/cart
router.get('/count', verifyTokenAndAuthorization, getCartCount);

export default router;
