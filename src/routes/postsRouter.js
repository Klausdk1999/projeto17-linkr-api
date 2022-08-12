import { Router } from "express";
import { deletePost, getPosts } from "../controllers/postsController.js";
import authenticateToken from "../middlewares/validations/tokenAuthentication.js";
//import validateSchema from "../middlewares/validations/schemaValidation.js"; 

const postRouter = Router();

//autenticar get posts
//router.get("/posts" , getPosts);

//router.get("/posts" ,validateSchema(signUpSchema), getPosts);
//router.post("/posts",validateSchema(signInSchema), createPost);

postRouter.delete("/delete-post/:id", authenticateToken, deletePost)

export default postRouter;