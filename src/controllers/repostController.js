import { repostRepository } from "../repositories/repostRepository.js";

export async function repostPost(req, res){
    const {reposterId, postId} = req.body;
    try{
        await repostRepository.sharePost(reposterId, postId);
        return res.sendStatus(201);
    }catch(err){
        return res.sendStatus(500);
    }

}


export async function checkIsReposted(req, res){
    const postId = req.params.postId;
    try{
        const {rows: reposts} = await repostRepository.checkIsReposted(postId);
        return res.sendStatus(201);
    }catch(err){
        return res.sendStatus(500);
    }
}