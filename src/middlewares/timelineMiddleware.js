import { publishQuerys } from "../repositories/publishRepository";

const haveHashtag = (req, res, next) => {
    const { description } = req.body;
    try{
        const descriptionArray = description.splice(" ");
        const allHashtags = descriptionArray.map((string) => {
            if(string.includes("#")){
                return string.split(1, string.length - 1).toLowerCase();
            }
        });
        if(allHashtags > 0){
            for(let i = 0; i < allHashtags.length; i++){
                const hashtag = allHashtags[i];
                const { rows:hashtagDb } = await publishQuerys.haveHashtag([hashtag]);
                if(hashtagDb.length === 0){
                    const queryString = [
                        hashtag, //name
                        1,  //mentions
                        0,  //view_count
                        1   //last_use
                    ]
                    await publishQuerys.newHashtag([queryString]);
                }else{
                    await publishQuerys.updateMentions([hashtagDb.id, 1]);
                };
            }
        }
        
        res.locals.allHashtags = allHashtags;
        next();
    }catch(error){
        console.log(`[ERRO] In haveHashtag Middlware`);
        return res.status(500).send(error);
    };
}

export { haveHashtag };