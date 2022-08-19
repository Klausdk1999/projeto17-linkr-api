import { Router } from "express";
import { getUserById } from "../controllers/userController.js";
const userRouter =  Router();

userRouter.get('/user/data/:userId', getUserById);

export default userRouter;