import { Router } from "express";
import authenticateToken from "../middlewares/validations/tokenAuthentication.js";
import { getPosts,getUrlData, getUserPosts, favoritePost, getFavorites, removeFavorite } from "../controllers/postsController.js";
import getTrendings from "../controllers/trendingController.js";
import validateSchema from "../middlewares/validations/schemaValidation.js"
import publishSchema from "../schemas/publishSchema.js"
import { haveHashtag } from "../middlewares/timelineMiddleware.js"
import publishPost from "../controllers/publishController.js";
import { searchUser } from "../controllers/searchController.js";
import { getHashtagPosts } from "../controllers/hashtagTimelineController.js";
import deletePost from "../controllers/deleteController.js";
import getFollowPosts from "../controllers/followsController.js";

const timelineRouter = Router();

//Publish new post
timelineRouter.post("/timeline", authenticateToken, validateSchema(publishSchema), haveHashtag, publishPost)

timelineRouter.get("/search" , authenticateToken, searchUser); /////////////// validateSchema

timelineRouter.get("/following", authenticateToken, getFollowPosts) //Futuro posts;
timelineRouter.get("/posts" , authenticateToken, getPosts);
timelineRouter.get("/posts/favorite/:postId/:userId", getFavorites);

timelineRouter.post("/posts/favorite", authenticateToken , favoritePost);
timelineRouter.delete("/posts/favorite/:postId/:userId", authenticateToken , removeFavorite);


timelineRouter.get("/user/:id" , authenticateToken, getUserPosts);

timelineRouter.delete("/posts", authenticateToken, deletePost);

timelineRouter.put("/posts", )
timelineRouter.post("/urls" , getUrlData);

//Hashtag Timeline
timelineRouter.get("/hashtag/:hashtag", authenticateToken, getHashtagPosts)

//Trending SideBar
timelineRouter.get("/trendings", authenticateToken, getTrendings);

export default timelineRouter;