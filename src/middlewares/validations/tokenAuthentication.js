import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

const authenticateToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(token === null) return res.sendStatus(401);
    console.log(token)
    jwt.verify(token, process.env.jwt_secret, (err,user) => {
        if(err) return res.sendStatus(401);
        res.locals.userId = parseInt(user) ;
        next();
    })
    
}

export default authenticateToken;