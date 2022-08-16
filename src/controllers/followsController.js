import { followRepository } from "../repositories/followRepository.js";

export default async function getFollowPosts(req,res){
    const userId = res.locals.userId; 
    try{
        const {rows:following} = await followRepository.getFollowings([userId]);
        if(following[0].length === 0) return res.sendStatus(404);
        const { rows:posts } = await followRepository.getFollowPosts();
        if(posts[0].length === 0) return res.sendStatus(204)
        res.status(200).send(posts)
    }catch(e){
        console.log(`[ERRO] In getHashtagPosts Controller`);
        return res.status(500).send(e);
    }
}