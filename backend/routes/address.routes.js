import express from 'express';
import * as addressController from '../controllers/address.controller.js'

const router = express.Router();


router.post('/', addressController.createAddress)
router.get('/:userId', addressController.getAddressesByUserId)
router.put('/:id', addressController.updateAddress)

export default router;




