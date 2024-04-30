import express from 'express';
import {
  deleteUser,
  getUser,
  verifyAccount,
  verifyPhone,
} from '../controllers/userController.js';

const router = express.Router();

// GET => /users
router.get('/verify/:otp', verifyAccount);

// GET => /users
router.get('/verify_phone/:phone', verifyPhone);

// GET => /users
router.get('/', getUser);

// DELETE => /users
router.delete('/', deleteUser);

export default router;
