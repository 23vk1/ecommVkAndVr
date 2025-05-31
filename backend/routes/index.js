import express from "express";
import userRoutes from "./user.routes.js"
import authRoutes from './auth.routes.js'
import addressRoutes from './address.routes.js'
import walletRoutes from './wallet.routes.js'

const router = express.Router();



router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/addresses', addressRoutes);
router.use('/wallets', walletRoutes);


// router.get('/', (req, res) =>{
//     res.send("Server is working");
// })


export default router;

