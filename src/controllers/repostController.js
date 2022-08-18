import { repostRepository } from "../repositories/repostRepository.js";


export async function sharePost(req, res){
    const {reposterId, postId} = req.body;
    console.log(reposterId, postId);
    try{
        await repostRepository.sharePost(reposterId, postId);
        return res.sendStatus(201);
    }catch(err){
        return res.sendStatus(500);
    }
}