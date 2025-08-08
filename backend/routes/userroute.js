import express from "express";
import { register, login, getUser } from "../controllers/userController.js"
import { verifyToken } from "../middleware/verifyToken.js"

const UserRouter = express.Router();

UserRouter.post('/register', register);
UserRouter.post('/login', login);
UserRouter.get('/getUser', verifyToken, getUser);

export default UserRouter;