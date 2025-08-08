import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import FoodRouter from "./routes/foodroute.js";
import UserRouter from "./routes/userroute.js";
import CartRouter from "./routes/cartroute.js";
import OrderRouter from "./routes/orderroute.js";
import dotenv from 'dotenv'
dotenv.config();


//app config
const app = express();

//middleware 
app.use(express.json());
app.use(cors());

//api endpoints
app.use('/api/food', FoodRouter);
app.use('/images', express.static('upload'));
app.use('/api/user', UserRouter);
app.use('/api/cart', CartRouter);
app.use('/api/order', OrderRouter);

connectDB().then(() => {
    app.listen(8800, () => {
        console.log("server is running!");
    })
});