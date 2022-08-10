import { postsRepository } from "../repositories/postsRepository.js";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";

export async function getPosts(req, res) {

    try {
      const posts = await postsRepository.getPosts();

      return res.status(201).send(posts.rows);

    } catch (error) {

      return res.status(500).send(error);

    }
}

export async function getUrlData(req, res) {
  let urldata;
  const { url } = req.body
  try {
    await getLinkPreview(url).then((data) =>
      {
        urldata=data;
      }
    );

    return res.status(200).send(urldata);

  } catch (error) {

    return res.status(500).send(error);

  }
} 

export const publishPost = async () => {
  const { userId } = res.locals;
  const { url, description } = req.body;
  const { allHashtagsIds } = res.locals;
  try{
    const postId = await postPublish([userId, description, url]);
    if(allHashtags > 0){
      for(let i = 0; i < allHashtagsIds.length; i++){
        const hashtagId = allHashtagsIds[i];
        await postHashtags([hashtagId, postId]);
      }
    }
    res.sendStatus(200);
  }catch(error){
    console.log(`[ERRO] In publishPost controller`);
    return res.status(500).send(error);
  }
}