import express from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js';
import requireAuth from '../middleware/auth.js';

const router = express.Router();

router.post('/', requireAuth, createUser);
router.get('/', requireAuth, getAllUsers);
router.get('/:id', requireAuth, getUserById);
router.put('/:id', requireAuth, updateUser);
router.delete('/:id', requireAuth, deleteUser);

export default router;
