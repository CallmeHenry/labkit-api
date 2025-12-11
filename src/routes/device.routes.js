import express from 'express';
import { createDevice, getAllDevices, getDeviceById, updateDevice, deleteDevice } from '../controllers/device.controller.js';
import requireAuth from '../middleware/auth.js';

const router = express.Router();

router.post('/', requireAuth, createDevice);
router.get('/', getAllDevices);
router.get('/:id', getDeviceById);
router.put('/:id', requireAuth, updateDevice);
router.delete('/:id', requireAuth, deleteDevice);

export default router;
