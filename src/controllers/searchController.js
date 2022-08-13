import { searchRepository } from "../repositories/searchRepository.js";

export async function searchUser(req, res){
    const input= req.params.input;
    try{
      const users = await searchRepository.searchUsers(input);
      return res.status(201).send(users.rows);
    }catch(e){
      return res.status(500).send(e);
    }
  }