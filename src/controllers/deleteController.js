import { deletePostRepository } from "../repositories/deleteRepository.js";

export default async function deletePost(req, res) {
    const userId = res.locals.userId; 
    const { postId } = req.body;
    // try {
        const {rows: verifyPost} = await deletePostRepository.findPost(postId)
        console.log(verifyPost)
        if (verifyPost.length === 0) {
            return res.sendStatus(404);
        }
        
        if ((verifyPost[0].author_id) !== userId) {
            return res.sendStatus(401);
        }
        await deletePostRepository.deleteLikes([postId]);
        const { rows:preview_id } = await deletePostRepository.deletePreviewPosts([postId]);
        console.log(preview_id)
        await deletePostRepository.deletePreviews([preview_id[0].preview_id])
        await deletePostRepository.deleteHashtagPosts([postId]);
        await deletePostRepository.deletePost(postId, userId)
        //get em posts e eenviar 
        res.sendStatus(200)
        
    // } catch (error) {
    //   console.log(`[ERRO] In deletePost Controller`);
    //   return res.status(500).send(error);
    // }
  }