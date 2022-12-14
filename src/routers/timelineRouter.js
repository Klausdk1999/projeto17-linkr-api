import { Router } from "express";
import authenticateToken from "../middlewares/validations/tokenAuthentication.js";

import validateSchema from "../middlewares/validations/schemaValidation.js"

import publishSchema from "../schemas/publishSchema.js"
import { haveHashtag } from "../middlewares/timelineMiddleware.js"
import publishPost from "../controllers/publishController.js";

import { getTimelinePosts, getHashtagPosts, getUserPosts, getTest, getTimelinePostsRefresh, getHashtagPostsRefresh, getUserPostsRefresh  } from "../controllers/timelinesController.js";

import { searchUser } from "../controllers/searchController.js";

import getTrendings from "../controllers/trendingController.js";




const timelineRouter = Router();

//Publish new post
timelineRouter.post("/timeline", authenticateToken, validateSchema(publishSchema), haveHashtag, publishPost);

//Timeline Posts
timelineRouter.get("/timeline/posts/refresh", authenticateToken, getTimelinePostsRefresh)
timelineRouter.get("/timeline/posts", authenticateToken, getTimelinePosts);


//Hashtag Timeline Posts
timelineRouter.get("hashtag/:hashtag/refresh", authenticateToken, getHashtagPostsRefresh)
timelineRouter.get("/hashtag/:hashtag", authenticateToken, getHashtagPosts)


//User Timeline Posts
timelineRouter.get("/user/:id/refresh", authenticateToken, getUserPostsRefresh)
timelineRouter.get("/user/:id" , authenticateToken, getUserPosts);


//Filtrar users
timelineRouter.get("/search/:username" , authenticateToken, searchUser);

timelineRouter.get("/timeline/reposts", authenticateToken, getTest)

//Trending SideBar
timelineRouter.get("/trendings", authenticateToken, getTrendings);

export default timelineRouter;