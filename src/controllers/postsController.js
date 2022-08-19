import { deletePostRepository } from "../repositories/deleteRepository.js";
import {favoriteRepository} from '../repositories/favoriteRepository.js'
import { postsRepository } from '../repositories/postsRepository.js';

export async function favoritePost(req, res){
  const {postId, userId} = req.body;
  try{
    favoriteRepository.favoritePost(postId, userId);
    return res.sendStatus(200);

  }catch(e){
    return res.sendStatus(500);
  }

}


export async function removeFavorite(req, res){
  const postId = req.params.postId;
  const userId = req.params.userId;
  try{
    favoriteRepository.removeFavorite(postId, userId);
    return res.sendStatus(200);

  }catch(e){
    return res.sendStatus(500);
  }
}

export async function getFavorites(req, res){
  const postId = req.params.postId;
  let isFavorite = false;

 
  try{
    const likers = await favoriteRepository.getLikers(postId);
    res.status(200).send(likers);

  }catch(e){
    console.log(e)
    return res.sendStatus(500);
  }

}

export async function editPost(req, res){
  const { userId } = res.locals;
  const { postId } = req.params;
  const {description} = req.body;
  try{
    const { rows:havePost } = await postsRepository.getPostId([postId, userId]);
    if(havePost.length === 0) return res.sendStatus(404);

    await postsRepository.editPost([description, postId, userId]);
    res.sendStatus(200);
  }catch(e){
    console.log(e)
    return res.sendStatus(500);
  }
}


export async function deletePost(req, res) {
    const {userId} = res.locals
    const { postId } = req.body;

    try {
        const {rows: verifyPost} = await postsRepository.getPostId([postId, userId])
        if (verifyPost.length === 0)return res.sendStatus(404);

        await deletePostRepository.deleteLikes([postId]);
        const { rows:preview_id } = await deletePostRepository.deletePreviewPosts([postId]);
        await deletePostRepository.deletePreviews([preview_id[0].preview_id])
        await deletePostRepository.deleteHashtagPosts([postId]);
        await deletePostRepository.deletePost(postId, userId)
        //get em posts e eenviar 
        res.sendStatus(200)
        
    } catch (error) {
      console.log(`[ERRO] In deletePost Controller`);
      return res.status(500).send(error);
    }
  }