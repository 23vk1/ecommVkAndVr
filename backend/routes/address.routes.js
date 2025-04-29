import express from 'express';
import * as addressController from '../controllers/address.controller.js'

const router = express.Router();

// POST /api/address
router.post('/', addressController.createAddress)

export default router;




