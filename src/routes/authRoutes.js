import express from 'express';
import { signInUser, signUpUser } from '../controllers/authController.js';

const router = express.Router();

// POST => /
router.post('/register', signUpUser);
// POST => /
router.post('/login', signInUser);

export default router;
