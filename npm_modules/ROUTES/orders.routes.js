import express from 'express';
import {placeOrders} from '../CONTROLLER/orders.controller.js'
const router =  express.Router();
router.post ("/placeOrders",placeOrders);
export default router;