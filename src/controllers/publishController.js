import { publishQuerys } from "../repositories/publishRepository.js";

const publishPost = async (req,res) => {
    const { userId } = res.locals;
    const { url, description } = req.body;
    const { allHashtagsNames } = res.locals;

    try{
      const {rows:postId} = await publishQuerys.postPublish([userId, description, url]);
      if(allHashtagsNames.length > 0){
        for(let i = 0; i < allHashtagsNames.length; i++){
          const hashtagName = allHashtagsNames[i];
          await publishQuerys.hashtagsPosts([hashtagName, postId[0].id]);
        }
      }
      res.sendStatus(201);
    }catch(error){
      console.log(`[ERRO] In publishPost controller`);
      return res.status(500).send(error);
    }
};

export default publishPost;