import { Router } from "express";
import authenticateToken from "../middlewares/validations/tokenAuthentication.js";
import { getPosts,getUrlData, getUserPosts } from "../controllers/postsController.js";
import getTrendings from "../controllers/trendingController.js";
import validateSchema from "../middlewares/validations/schemaValidation.js"
import publishSchema from "../schemas/publishSchema.js"
import { haveHashtag } from "../middlewares/timelineMiddleware.js"
import publishPost from "../controllers/publishController.js";


const timelineRouter = Router();

//Publish new post
timelineRouter.post("/timeline", authenticateToken, validateSchema(publishSchema), haveHashtag, publishPost)

//autenticar get posts
timelineRouter.get("/posts" , getPosts);
timelineRouter.get("/user/:id" , authenticateToken, getUserPosts);

timelineRouter.delete("/posts", );

timelineRouter.put("/posts", )
timelineRouter.post("/urls" , getUrlData);

//Hashtag Timeline
timelineRouter.get("/hashtag/:hashtag", )

//Trending SideBar
timelineRouter.get("/trendings", authenticateToken, getTrendings);

export default timelineRouter;