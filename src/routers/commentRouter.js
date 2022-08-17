import { Router } from "express";
import authenticateToken from "../middlewares/validations/tokenAuthentication.js";
import { commentPost, getPostComments } from "../controllers/commentController.js";


const commentRouter = Router();

commentRouter.post('/comments', authenticateToken, commentPost);
commentRouter.get('/comments/:postId', getPostComments);


export default commentRouter;