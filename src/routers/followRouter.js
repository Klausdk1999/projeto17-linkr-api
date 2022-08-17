import { Router } from "express";
import authenticateToken from "../middlewares/validations/tokenAuthentication.js";
import { followUser, unfollowUser ,getUserFollowers, getFollowings } from "../controllers/followController.js";

const followRouter = Router();

followRouter.post('/follow', authenticateToken, followUser);
followRouter.delete('/follow/:followedId/:followerId', authenticateToken, unfollowUser);
followRouter.get('/follow/:followedId', getUserFollowers);
followRouter.get('/follow/following/:userId', getFollowings);


export default followRouter;