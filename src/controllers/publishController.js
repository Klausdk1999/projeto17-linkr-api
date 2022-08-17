import { getLinkPreview } from "link-preview-js";
import { publishQuerys } from "../repositories/publishRepository.js";

const publishPost = async (req, res) => {
  const { userId } = res.locals;
  const { url, description } = req.body;
  const { allHashtagsNames } = res.locals;
  let urlPreview;
  // try {
    await getLinkPreview(url).then((data) => {

      return urlPreview = [
        data.title,
        data.url,
        data.description,
        data.favicons[0]
      ]
    });
    if(urlPreview.length === 0) return res.sendStatus(422);
    const {rows:previewId} = await publishQuerys.postPreview(urlPreview);
    const {rows:postId } = await publishQuerys.postPublish([userId, description, url]);
    await publishQuerys.postPreviewPosts([previewId[0].id, postId[0].id])
    if (allHashtagsNames.length > 0) {
      for (let i = 0; i < allHashtagsNames.length; i++) {
        const hashtagName = allHashtagsNames[i];
        await publishQuerys.hashtagsPosts([hashtagName, postId[0].id]);
      }
    }
    res.sendStatus(201);
  // } catch (error) {
  //   console.log(`[ERRO] In publishPost controller`);
  //   return res.status(500).send(error);
  // }
};

export default publishPost;