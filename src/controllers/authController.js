import bcrypt from 'bcrypt';
import { authRepository } from "../repositories/authRepository.js";

export async function signUp(req, res){
    const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
    const userBody = {
        ...req.body,
        password: encryptedPassword
    };

    try{
        authRepository.registerUser(userBody);
        res.sendStatus(201);

    }catch(e){
        return res.sendStatus(500);
    }

}


export async function signIn(req, res){

}