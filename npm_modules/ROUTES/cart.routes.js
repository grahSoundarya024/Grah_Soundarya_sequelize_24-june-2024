import {addToCart} from '../CONTROLLER/cart.controller.js'
import express from 'express';
const router  = express.Router();
router.post("/addToCart",addToCart);
export default router;