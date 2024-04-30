import express from 'express';
import {
  deleteUser,
  getUser,
  verifyAccount,
  verifyPhone,
} from '../controllers/userController.js';
import { verifyTokenAndAuthorization } from '../middleware/verifyToken.js';

const router = express.Router();

// GET => /users
router.get('/verify/:otp', verifyTokenAndAuthorization, verifyAccount);

// GET => /users
router.get('/verify_phone/:phone', verifyTokenAndAuthorization, verifyPhone);

// GET => /users
router.get('/', verifyTokenAndAuthorization, getUser);

// DELETE => /users
router.delete('/', deleteUser);

export default router;
