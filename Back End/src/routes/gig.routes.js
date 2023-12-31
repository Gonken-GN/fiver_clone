import express from 'express';
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
} from '../controllers/gig.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();
router.post('/', verifyToken, createGig);
router.delete('/:id', verifyToken, deleteGig);
router.get('/:id', verifyToken, getGig);
router.get('/', verifyToken, getGigs);

export default router;
