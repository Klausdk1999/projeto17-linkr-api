import { Router } from "express";
import authenticateToken from "../middlewares/validations/tokenAuthentication.js";
import { getPosts,getUrlData } from "../controllers/postsController.js";
//import validateSchema from "../middlewares/validations/schemaValidation.js"; 

const postsRouter = Router();

//autenticar get posts
postsRouter.get("/posts" , getPosts);
postsRouter.post("/urls" , getUrlData);
//router.get("/posts" ,validateSchema(signUpSchema), getPosts);
//router.post("/posts",validateSchema(signInSchema), createPost);
postsRouter.post("/timeline", authenticateToken,)

export default postsRouter;