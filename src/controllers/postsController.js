import { postsRepository } from "../repositories/postsRepository.js";
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


export async function getUserPosts(req, res){
  const userId = req.params.id;
  try{
    const posts = await postsRepository.getPosts(userId);

    return res.status(201).send(posts.rows);
  }catch(e){
    return res.status(500).send(e);
  }
}



export async function deletePost(req, res) {
  const userId = res.locals.userId; 
  const { id } = req.params;

  try {
    const verifyPost = await deletePostRepository.findPost(id)
    if (verifyPost.rowCount === 0) {
      return res.sendStatus(404);
    }
   
    if ((verifyPost.rows[0].author_id) !== userId) {
      return res.sendStatus(401);
    }
   await deletePostRepository.deletePost(id, userId)
    //get em posts e eenviar 
   const posts = await deletePostRepository.returnPosts()
    res.status(204).send(posts)
    
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


export async function favoritePost(req, res){
  const {postId, userId} = req.body;
  try{
    postsRepository.favoritePost(postId, userId);
    return res.sendStatus(200);

  }catch(e){
    return res.sendStatus(500);
  }

}


export async function removeFavorite(req, res){
  const postId = req.params.postId;
  const userId = req.params.userId;
  try{
    postsRepository.removeFavorite(postId, userId);
    return res.sendStatus(200);

  }catch(e){
    return res.sendStatus(500);
  }
}

export async function getFavorites(req, res){
  const postId = req.params.id;
  
  try{
    const favoriteQuantity = await postsRepository.getFavorites(postId);
   //console.log(favoriteQuantity);
   res.status(200).send(favoriteQuantity);

  }catch(e){
    return res.sendStatus(500);
  }

}