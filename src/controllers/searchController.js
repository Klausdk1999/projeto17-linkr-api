import { searchRepository } from "../repositories/searchRepository.js";
import { stripHtml } from "string-strip-html";

export async function searchUser(req, res){
  const { userId } = res.locals;
  const { username }  = req.params
    try{
      const { rows:users } = await searchRepository.searchUsers([userId, `${username}%`]);
      if(users.length === 0) return res.sendStatus(404);
      res.status(302).send(users);
    }catch(e){
      return res.status(500).send(e);
    }
  }