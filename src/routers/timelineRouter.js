import { Router } from "express";
import authenticateToken from "../middlewares/validations/tokenAuthentication.js";
import { getPosts,getUrlData } from "../controllers/postsController.js";


const timelineRouter = Router();

//autenticar get posts
timelineRouter.get("/posts" , getPosts);
timelineRouter.post("/urls" , getUrlData);


export default timelineRouter;