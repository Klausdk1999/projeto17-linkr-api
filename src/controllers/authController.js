import bcrypt from 'bcrypt';
import { authRepository } from "../repositories/authRepository.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function signUp(req, res){
    const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
    const userBody = {
        ...req.body,
        password: encryptedPassword
    };
    

    try{
        const findUser = await authRepository.registerUser(userBody);
        if(findUser){
            return res.sendStatus(409);
        }
        return res.sendStatus(201);

    }catch(e){
        console.log(e)
        return res.sendStatus(500);
    }

}


export async function signIn(req, res){
    const user = req.body;
    const secretKey = process.env.jwt_secret;
    try{
        const findUser = await authRepository.findUser(user);
        if(!findUser || !bcrypt.compareSync(user.password, findUser.password)){
            return res.status(401).send('Incorrect email or password');
        }
        const token = jwt.sign(findUser.id, secretKey);
        return res.status(200).send({
            token,
            id: findUser.id,
            username: findUser.username,
            pictureUrl: findUser.picture_url
        });

    }catch(e){
        console.log(e)
        return res.sendStatus(500);
    }

}



export async function getUserById(req, res){
    const userId = req.params.userId;
    try{
        const {rows: user} = await authRepository.getUserById(userId);
    console.log(user[0])
        return res.send(user);
    }catch(err){
        return res.sendStatus(500);
    }
}