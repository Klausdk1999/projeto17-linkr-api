import { publishQuerys } from "../repositories/publishRepository.js";

const haveHashtag = async (req, res, next) => {
    const { description } = req.body;
    try{
        const descriptionArray = description.split(" ");
        const allHashtags = descriptionArray.map((string) => {
            if(string.includes("#")){
                return string.replace("#", "").toLowerCase();
            }
        }).filter( values => typeof values === "string");
        if(allHashtags.length > 0){
            for(let i = 0; i < allHashtags.length; i++){
                const hashtag = allHashtags[i];
                const { rows:hashtagDb } = await publishQuerys.haveHashtag([hashtag]);
                console.log(hashtagDb)
                if(hashtagDb.length === 0){
                    await publishQuerys.newHashtag([hashtag, 1]);
                }else{
                    await publishQuerys.updateMentions([1,hashtagDb[0].id]);
                };
            }
        }
        
        res.locals.allHashtagsIds = allHashtags;
        next();
    }catch(error){
        console.log(`[ERRO] In haveHashtag Middlware`);
        return res.status(500).send(error);
    };
}

export { haveHashtag }