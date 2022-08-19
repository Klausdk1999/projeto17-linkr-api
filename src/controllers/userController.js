import { authRepository } from "../repositories/authRepository.js";


export async function getUserById(req, res){
    const userId = req.params.userId;
    console.log(userId)
    try{
        const {rows: user} = await authRepository.getUserById(userId);
        console.log(user[0])
        return res.send(user[0]);
    }catch(err){
        return res.sendStatus(500);
    }
}