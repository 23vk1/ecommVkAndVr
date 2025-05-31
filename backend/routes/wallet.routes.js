import express from "express";
import {
  createUserWallet,
  getUserWallet,
  updateUserWallet,
  deleteUserWallet,
} from "../controllers/wallet.controller.js";

const router = express.Router();


router.post('/', createUserWallet)
router.get('/:user_id', getUserWallet);
router.put('/:user_id', updateUserWallet);
router.delete('/:user_id', deleteUserWallet); // soft delete wallet


export default router;









