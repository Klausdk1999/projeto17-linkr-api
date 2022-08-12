import { postsRepository } from "../repositories/postsRepository.js";

const getHashtagPosts = async (req,res) => {
    const { hashtag } = req.params;
    try{
        const { rows: haveHashtag } = await postsRepository.haveHashtag([hashtag]);
        if(haveHashtag.length === 0) return res.sendStatus(404);
    
        const { rows: hashtagPosts } = await postsRepository.getHashtagPosts([hashtag]);
        if(hashtagPosts.length === 0) return res.sendStatus(204);

        res.status(200).send(hashtagPosts)
    }catch(error){
        console.log(`[ERRO] In haveHashtag Middlware`);
        return res.status(500).send(error);
    };
}

export {getHashtagPosts};