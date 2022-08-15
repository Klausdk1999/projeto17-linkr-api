import { getLinkPreview } from "link-preview-js";

const getUrlPreview = (url) => async (req,res,next) => {
    let urlPreview;
    try{
      await getLinkPreview(url).then((data) => {
          return urlPreview = [
            data.title,
            data.url,
            data.description,
            data.favicons[0]
          ]
      });
      if(urlPreview.length === 0) return res.sendStatus(406);
      console.log(`OI`)
      res.locals.urlPreview = urlPreview;
      next();
    }catch(e){
      console.log(`[ERRO] In getUrlPreview Middleware`);
      return res.status(500).send(error);
    }
};

export { getUrlPreview };