import { postsRepository } from "../repositories/postsRepository.js";
import {favoriteRepository} from '../repositories/favoriteRepository.js'
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";

export async function getPosts(req, res) {
  
  try {
    const posts = await postsRepository.getPosts();

    return res.status(201).send(posts.rows);
  } catch (error) {
    console.log(`[ERRO] In getPosts Controller`);
    return res.status(500).send(error);
  }
}


export async function getUserPosts(req, res){
  const userId = req.params.id;
  try{
    const posts = await postsRepository.getPosts(userId);

    return res.status(201).send(posts.rows);
  }catch(e){
    console.log(`[ERRO] In getUserPosts Controller`);
    return res.status(500).send(e);
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

 
  try{
    const likers = await favoriteRepository.getLikers(postId);
    res.status(200).send(likers);

  }catch(e){
    console.log(e)
    return res.sendStatus(500);
  }

}