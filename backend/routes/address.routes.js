import express from 'express';
import {
    createAddress,
    updateAddress, 
    deleteAddress,
    getAddressesByUserId,
    setDefaultAddress
} from '../controllers/address.controller.js'
import { protect} from '../middleware/auth.middleware.js'

const router = express.Router();

router.use(protect);



// testing pending 
router.post('/', createAddress);
router.get('/', getAddressesByUserId);
router.put('/:addressId', updateAddress);
router.delete('/:addressId', deleteAddress);
router.patch('/:addressId/default', setDefaultAddress);

export default router;




