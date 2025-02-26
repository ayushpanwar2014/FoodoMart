import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js'
import { placeOrder, verifyOrder, userOrders, fectchAllOrder, updateStatus, removeOrder } from '../controllers/OrderController.js';

const OrderRouter = express.Router();

OrderRouter.post('/place', verifyToken, placeOrder);
OrderRouter.post('/verify', verifyOrder);
OrderRouter.post('/userorder', verifyToken, userOrders);
OrderRouter.get('/list', fectchAllOrder);
OrderRouter.post('/status', updateStatus);
OrderRouter.post('/removeOrder',  removeOrder);

export default OrderRouter;