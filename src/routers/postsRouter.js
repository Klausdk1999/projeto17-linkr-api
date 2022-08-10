import { Router } from "express";
import { getPosts } from "../controllers/postsController.js";
//import validateSchema from "../middlewares/validations/schemaValidation.js"; 

const postsRouter = Router();

//autenticar get posts
postsRouter.get("/posts" , getPosts);

//router.get("/posts" ,validateSchema(signUpSchema), getPosts);
//router.post("/posts",validateSchema(signInSchema), createPost);

export default postsRouter;