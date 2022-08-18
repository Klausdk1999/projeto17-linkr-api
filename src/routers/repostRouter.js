import { Router } from "express";
import authenticateToken from "../middlewares/validations/tokenAuthentication.js";
import { sharePost } from "../controllers/repostController.js";
const repostRouter = Router();

repostRouter.post('/repost', authenticateToken, sharePost);

export default repostRouter;