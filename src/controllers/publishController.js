import { publishQuerys } from "../repositories/publishRepository.js";

const publishPost = async () => {
    const { userId } = res.locals;
    const { url, description } = req.body;
    const { allHashtagsIds } = res.locals;
    try{
      const postId = await publishQuerys.postPublish([userId, description, url]);
      if(allHashtags > 0){
        for(let i = 0; i < allHashtagsIds.length; i++){
          const hashtagId = allHashtagsIds[i];
          await publishQuerys.postHashtags([hashtagId, postId]);
        }
      }
      res.sendStatus(200);
    }catch(error){
      console.log(`[ERRO] In publishPost controller`);
      return res.status(500).send(error);
    }
};

export default publishPost;