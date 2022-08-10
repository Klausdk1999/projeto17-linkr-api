import { postsRepository } from "../repositories/postsRepository.js";

export async function getPosts(req, res) {

    try {
      const posts = await postsRepository.getPosts();

      return res.status(201).send(posts.rows);

    } catch (error) {

      return res.status(500).send(error);

    }
};

export const publishPost = () => {
  const { userId } = res.locals;
  const queryString = {
    
  }
  try{
    await postPublish()
  }catch(error){
    console.log(`[ERRO] In publishPost controller`);
    return res.status(500).send(error);
  }
}