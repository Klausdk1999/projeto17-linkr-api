import { get10Trendings } from "../repositories/trendingRepository.js"

const getTrendings = (req,res) => {
    try{
        const { rows:trendings } = await get10Trendings();
        res.status(200).send(trendings)
    }catch(error){
        console.log(`[ERRO] In getTrendings controller`);
        return res.status(500).send(error);
    }
}

export default getTrendings;