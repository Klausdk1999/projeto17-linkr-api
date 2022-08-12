

const getHashtagPosts = async (req,res) => {
    //Receber parametro
    try{
        //Ver se existe a #
        //Se não existir -> error 404
        //Se existir pegar os posts
        //Se não possuirem posts -> error 204
    }catch(error){
        console.log(`[ERRO] In haveHashtag Middlware`);
        return res.status(500).send(error);
    };
}

export {getHashtagPosts};