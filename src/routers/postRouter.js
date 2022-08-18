import { Router } from "express";
import authenticateToken from "../middlewares/validations/tokenAuthentication.js";
import deletePost from "../controllers/deleteController.js";

const postRouter = Router();


postRouter.delete("/posts", authenticateToken, deletePost); //Deletar Post
postRouter.put("/posts", authenticateToken, ); //Editar descrição


export default postRouter;