import { commentQueries } from "../repositories/commentRepository.js";
export async function commentPost(req, res){
    const {postId, commenterId, comment} = req.body;
    try{
       await commentQueries.addComment(postId, commenterId, comment);
       res.sendStatus(201);
    }catch(err){
        return res.sendStatus(500);
    }

}


export async function getPostComments(req, res){
    const postId = req.params.postId;
    try{
        const comments = await commentQueries.getPostComments(postId);
        res.status(200).send(comments);
     }catch(err){
         console.log(err)
         return res.sendStatus(500);
     }
 
}