import { followRepository } from "../repositories/followRepository.js";
import { postsRepository } from "../repositories/postsRepository.js";

async function getTimelinePosts(req,res){
    const userId = res.locals.userId;
    const {page, created_at} = req.body;
    try{
        const {rows:following} = await followRepository.getFollowings([userId]);
        if(following.length === 0) return res.status(404).send("follows");
        let queryString;
        if(created_at === undefined){
            queryString = [userId, page]
        } else {
            queryString = [userId, page, created_at]
        }
        const { rows:posts } = await followRepository.getFollowPosts(queryString);
        if(posts.length === 0) return res.status(404).send("posts")
        res.status(200).send(posts)
    }catch(e){
        console.log(`[ERRO] In getHashtagPosts Controller`);
        return res.status(500).send(e);
    }
};


const getHashtagPosts = async (req,res) => {
    const { hashtag } = req.params;
    try{
        const { rows: haveHashtag } = await postsRepository.haveHashtag([hashtag]);
        if(haveHashtag.length === 0) return res.status(404).send("hashtag");

        const { rows: hashtagPosts } = await postsRepository.getHashtagPosts([hashtag]);
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
    try{
      const { rows:posts } = await postsRepository.getPosts(userId);
      if(posts.length === 0) return res.status(404).send("posts")
  
      return res.status(200).send(posts);
    }catch(e){
      console.log(`[ERRO] In getUserPosts Controller`);
      return res.status(500).send(e);
    }
  }
  


export { getTimelinePosts, getHashtagPosts, getUserPosts }