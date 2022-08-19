import { Router } from "express";
import authenticateToken from "../middlewares/validations/tokenAuthentication.js";
import { repostPost, checkIsReposted } from "../controllers/repostController.js";
//
const repostRouter = Router();

repostRouter.post('/repost', authenticateToken, repostPost);
repostRouter.get('/repost/:postId', checkIsReposted);


export default repostRouter;