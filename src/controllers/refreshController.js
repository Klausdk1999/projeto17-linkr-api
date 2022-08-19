export async function postRepost(req,res){
    const { userId } = res.locals
    const { postId } = req.body;
    try {
      const { rows: post} = await postsRepository.getPost([postId]);
      if(post.length === 0) return res.sendStatus(404);
  
      await postsRepository.postReposts([postId, userId]);
      await publishQuerys.postPostOrder([postId, userId]);
      res.sendStatus(201);
    } catch (error) {
      console.log(`[ERRO] In deletePost Controller`);
      return res.status(500).send(error);
    }
  }
  