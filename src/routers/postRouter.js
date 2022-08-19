import { Router } from "express";
import authenticateToken from "../middlewares/validations/tokenAuthentication.js";
import { deletePost, editPost, postRepost } from "../controllers/postsController.js";

const postRouter = Router();


postRouter.delete("/posts", authenticateToken, deletePost); //Deletar Post
postRouter.put("/posts/:postId", authenticateToken, editPost); //Editar descrição

postRouter.post("/reposts", authenticateToken, postRepost)


export default postRouter;