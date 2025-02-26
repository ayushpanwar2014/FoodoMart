import express from 'express';
import { addToCart, removeToCart, fetchCart } from '../controllers/CartController.js';
import { verifyToken } from '../middleware/verifyToken.js';


const CartRoute = express.Router();

CartRoute.post('/addtocart', verifyToken, addToCart);
CartRoute.post('/removetocart', verifyToken, removeToCart);
CartRoute.post('/fetchcart', verifyToken, fetchCart);

export default CartRoute;