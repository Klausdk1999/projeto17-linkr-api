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

const deletePreviewPosts = (queryString) => {
  return connection.query(`
    DELETE FROM previews_posts
    WHERE post_id =$1
    RETURNING preview_id`,
    queryString
  )
}

const deletePreviews = (queryString) => {
  return connection.query(`
    DELETE FROM previews
    WHERE id=$1`,
    queryString
  )
}

const deleteHashtagPosts = (queryString) => {
  return connection.query(`
    DELETE FROM hashtags_posts
    WHERE post_id=$1`,
    queryString
  )
}

const deleteLikes = (queryString) => {
  return connection.query(`
    DELETE FROM likes
    WHERE post_id=$1
  `, queryString)
}

export const deletePostRepository = {
 findPost,
 deletePost,
 deletePreviewPosts,
 deletePreviews,
 deleteHashtagPosts,
 deleteLikes
}