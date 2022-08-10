import { publishQuerys } from "../repositories/publishRepository.js";

const publishPost = async (req,res) => {
    const { userId } = res.locals;
    const { url, description } = req.body;
    const { allHashtagsIds } = res.locals;
    try{
      const {rows:postId} = await publishQuerys.postPublish([userId, description, url]);
      if(allHashtagsIds.length > 0){
        for(let i = 0; i < allHashtagsIds.length; i++){
          const hashtagId = allHashtagsIds[i];
          await publishQuerys.hashtagsPosts([hashtagId, postId[0].id]);
        }
      }
      res.sendStatus(201);
    }catch(error){
      console.log(`[ERRO] In publishPost controller`);
      return res.status(500).send(error);
    }
};

export default publishPost;