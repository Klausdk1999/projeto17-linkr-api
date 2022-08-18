import { followRepository } from "../repositories/followRepository.js";

export default async function getTimelinePosts(req,res){
    const userId = res.locals.userId;
    const {page, created_at} = req.body;
    try{
        const {rows:following} = await followRepository.getFollowings([userId]);
        if(following.length === 0) return res.sendStatus(404);
        let queryString;
        if(created_at === undefined){
            queryString = [userId, page]
        } else {
            queryString = [userId, page, created_at]
        }
        const { rows:posts } = await followRepository.getFollowPosts(queryString);
        if(posts.length === 0) return res.sendStatus(204)
        res.status(200).send(posts)
    }catch(e){
        console.log(`[ERRO] In getHashtagPosts Controller`);
        return res.status(500).send(e);
    }
}