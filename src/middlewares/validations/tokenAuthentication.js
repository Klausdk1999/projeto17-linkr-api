import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

const authenticateToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if(token === null) return res.sendStatus(401);

    jwt.verify(token, process.env.jwt_secret, (err,user) => {
        if(err) return res.sendStatus(401);
<<<<<<< HEAD
        res.locals.userId = parseInt(user) ;
=======
        res.locals.userId = user;
>>>>>>> bcb4a9274afb3382f0d6f0c5d636b862851368f7
        next();
    })
    
}

export default authenticateToken;