import { Router } from "express";
import authenticateToken from "../middlewares/validations/tokenAuthentication.js";
import { getPosts,getUrlData } from "../controllers/postsController.js";
import getTrendings from "../controllers/trendingController.js";


const timelineRouter = Router();

//Publish new post
timelineRouter.post("/timeline", )

//autenticar get posts
timelineRouter.get("/posts" , getPosts);
timelineRouter.delete("/posts", );
timelineRouter.put("/posts", )
timelineRouter.post("/urls" , getUrlData);

//Hashtag Timeline
timelineRouter.get("/hashtag/:hashtag", )

//Trending SideBar
timelineRouter.get("/trendings", authenticateToken, getTrendings);

export default timelineRouter;