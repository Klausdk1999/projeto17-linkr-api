import { searchRepository } from "../repositories/searchRepository.js";

export async function searchUser(req, res){
  const { userId } = res.locals;
  const { searchUsername } = req.body;
    try{
      const { rows:users } = await searchRepository.searchUsers([userId, `${searchUsername}%`]);
      if(users.length === 0) return res.sendStatus(404);
      res.status(201).send(users);
    }catch(e){
      return res.status(500).send(e);
    }
  }