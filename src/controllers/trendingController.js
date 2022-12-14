import { get10Trendings } from "../repositories/trendingRepository.js"

const getTrendings = async (req,res) => {
    try{
        const { rows:trendings } = await get10Trendings();
        if(trendings.length === 0) return res.sendStatus(404)
        res.status(200).send(trendings)
    }catch(error){
        console.log(`[ERRO] In getTrendings controller`);
        return res.status(500).send(error);
    }
};

export default getTrendings;