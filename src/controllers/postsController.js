import { postsRepository } from "../repositories/postsRepository.js";
import connection from "../setup/database.js";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import { deletePostRepository } from "../repositories/deleteRepository.js";

export async function getPosts(req, res) {
  try {
    const posts = await postsRepository.getPosts();

    return res.status(201).send(posts.rows);
  } catch (error) {
    return res.status(500).send(error);
  }
} 

export async function deletePost(req, res) {
  const userId = res.locals.userId; 
  let { id } = req.params;
  try {
    const { rows:verifyPost } = await deletePostRepository.findPost(id);
    console.log(verifyPost[0])
    if (verifyPost.length === 0) {
      return res.sendStatus(404);
    }
    if(verifyPost[0].author_id !== Number(userId)) return res.sendStatus(401);
    await deletePostRepository.deleteHashtag_Posts([id])
    await deletePostRepository.deletePost(id, userId)
    res.sendStatus(204)
    
  } catch (error) {
    console.log(error)
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
