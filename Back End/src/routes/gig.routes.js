import express from 'express';
import { deleteUser } from '../controllers/gig.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();
router.post('/', verifyToken, createGig);
router.delete(('/:id', verifyToken, deleteGig));
router.get('/single/:id', verifyToken, getGig);
router.get('/', verifyToken, getGigs);

export default router;
