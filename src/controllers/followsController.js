export default async function getFollowPosts(req,res){
    try{
        res.sendStatus(200)
    }catch(e){
        console.log(`[ERRO] In getHashtagPosts Controller`);
        return res.status(500).send(e);
    }
}