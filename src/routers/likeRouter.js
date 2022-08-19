import { Router } from "express";
import authenticateToken from "../middlewares/validations/tokenAuthentication.js";
import { favoritePost, getFavorites, removeFavorite } from "../controllers/postsController.js";



const likeRouter = Router();

likeRouter.get("/posts/favorite/:postId/:userId", getFavorites);
likeRouter.post("/posts/favorite", authenticateToken , favoritePost);
likeRouter.delete("/posts/favorite/:postId/:userId", authenticateToken , removeFavorite);

export default likeRouter;