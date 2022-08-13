import connection from "../setup/database.js";

async function findPost(id){
   const verifyPost = await connection.query(`SELECT * FROM posts WHERE id = $1`, [
        id,
      ]);
      return verifyPost
}

async function deletePost(id, userId){

    const postDelete =  await connection.query(`DELETE FROM posts WHERE author_id = $1 AND id = $2`, [
        userId,
        id,
      ]);
      return postDelete
}


export const deletePostRepository = {
 findPost,
 deletePost
}