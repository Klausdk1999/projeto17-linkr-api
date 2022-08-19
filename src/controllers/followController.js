import { followRepository } from "../repositories/followRepository.js";

export async function followUser(req, res){
    const {followerId, followedId} = req.body;

    try{
        await followRepository.addFollow(followerId, followedId);
        return res.sendStatus(201);
    }catch(err){
        return res.sendStatus(500);
    }

}


export async function unfollowUser(req, res){
    const followerId = req.params.followerId;
    const followedId = req.params.followedId;


    try{
        await followRepository.removeFollow(followerId, followedId);
        return res.sendStatus(200);
    }catch(err){
        return res.sendStatus(500);
    }
}


export async function getUserFollowers(req, res){
    const followedId = req.params.followedId;
    try{
        const followers = await followRepository.getFollowers(followedId);
        return res.status(200).send(followers);
    }catch(err){
        return res.sendStatus(500);
    }
}



export async function getFollowings(req, res){
    const userId = req.params.userId;

    try{
        const {rows: following} = await followRepository.getFollowings([userId]);
       // console.log(following)
        return res.send(following);
    }catch(err){
        res.sendStatus(500);
    }
}