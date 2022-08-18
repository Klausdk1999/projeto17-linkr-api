import { followRepository } from "../repositories/followRepository.js";
import { postsRepository } from "../repositories/postsRepository.js";
import { searchRepository } from "../repositories/searchRepository.js"
import { findHashtag } from "../repositories/trendingRepository.js";

const getQueryString = (where, page, created) => {
    const offsetSize = page * 10
    if(created === undefined){
        return [where, offsetSize]
    } else {
        return [where, offsetSize, created]
    }
}

async function getTimelinePosts(req,res){
    const { userId } = res.locals;
    const { page, created } = req.params;
    try{
        const {rows:following} = await followRepository.getFollowings([userId]);

        if(following.length === 0) return res.status(404).send("follows");

        const queryString = getQueryString(userId, page, created)

        const { rows:posts } = await postsRepository.getFriendsPosts(queryString);
        if(posts.length === 0) return res.status(404).send("posts")
        res.status(200).send(posts)
    }catch(e){
        console.log(`[ERRO] In getHashtagPosts Controller`);
        return res.status(500).send(e);
    }
};


const getHashtagPosts = async (req,res) => {
    const { hashtag } = req.params;
    const { page, created } = req.params;
    try{
        const { rows: haveHashtag } = await findHashtag([hashtag]);
        if(haveHashtag.length === 0) return res.status(404).send("hashtag");

        const queryString = getQueryString(hashtag, page, created)

        const { rows: hashtagPosts } = await postsRepository.getHashtagPosts(queryString);
        console.log(hashtagPosts)
        if(hashtagPosts.length === 0) return res.status(404).send("posts");

        res.status(200).send(hashtagPosts);
    }catch(error){
        console.log(`[ERRO] In getHashtagPosts Controller`);
        return res.status(500).send(error);
    };
};

async function getUserPosts(req, res){
    const userId = req.params.id;
    const { page, created } = req.params;
    try{
        const { rows:haveUserId } = await searchRepository.searchUserById([userId]);
        if(haveUserId.length === 0) res.status(404).send("Usuario não existe");

        const queryString = getQueryString(userId, page, created)

      const { rows:posts } = await postsRepository.getUserPosts(queryString);
      if(posts.length === 0) return res.status(404).send("posts")
  
      return res.status(200).send(posts);
    }catch(e){
      console.log(`[ERRO] In getUserPosts Controller`);
      return res.status(500).send(e);
    }
  }
  


export { getTimelinePosts, getHashtagPosts, getUserPosts }