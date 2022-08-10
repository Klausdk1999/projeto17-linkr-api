import { Router } from "express";
import { deletePost, getPosts } from "../controllers/postsController.js";
import authenticateToken from "../middlewares/validations/tokenAuthentication.js";
//import validateSchema from "../middlewares/validations/schemaValidation.js"; 

const router = Router();

//autenticar get posts
router.get("/posts" , getPosts);

//router.get("/posts" ,validateSchema(signUpSchema), getPosts);
//router.post("/posts",validateSchema(signInSchema), createPost);

router.delete("/delete-post/:id", deletePost )

export default router;