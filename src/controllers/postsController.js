import {favoriteRepository} from '../repositories/favoriteRepository.js'

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