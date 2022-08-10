import { postsRepository } from "../repositories/postsRepository.js";
import connection from "../setup/database.js";

export async function getPosts(req, res) {
  try {
    const posts = await postsRepository.getPosts();

    return res.status(201).send(posts.rows);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function deletePost(req, res) {
  //const userId = res.locals.userId; //verificar o essa variavel recebe
  const { id } = req.params;

  try {
    //verificar se existe um post com esse id(404)
    const verifyPost = await connection.query(`SELECT * FROM posts WHERE id = $1`, [
      id,
    ]);
    if (verifyPost.rowCount === 0) {
      return res.sendStatus(404);
    }
    //se existir, verificar se o userId é igual ao author_id (401)
    // if (verifyPost.rows[0].author_id !== userId) {
    //   return res.sendStatus(401);
    // }
    //por fim deletar o post(204)
    await connection.query(`DELETE FROM posts WHERE author_id = $1 AND id = $2`, [
      userId,
      id,
    ]);
    //get em posts e eenviar 
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
}
