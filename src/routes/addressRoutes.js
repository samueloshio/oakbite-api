import express from 'express';
import { verifyTokenAndAuthorization } from '../middleware/verifyToken.js';
import {
  addAddress,
  deleteAddress,
  getAllAddresses,
  getDefaultAddress,
  setDefaultAddress,
} from '../controllers/addressController.js';

const router = express.Router();

// POST => /api/address
router.post('/', verifyTokenAndAuthorization, addAddress);

router.patch('/default/:id', verifyTokenAndAuthorization, setDefaultAddress);

router.delete('/:id', verifyTokenAndAuthorization, deleteAddress);

router.get('/default', verifyTokenAndAuthorization, getDefaultAddress);

router.get('/all', verifyTokenAndAuthorization, getAllAddresses);
export default router;
