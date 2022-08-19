import connection from "../setup/database.js";

async function deletePost(queryString){

    const postDelete =  await connection.query(`DELETE FROM posts WHERE author_id = $1 AND id = $2`, queryString);
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

const deleteComments = ( queryString ) => {
  return connection.query(`
    DELETE FROM comments
    WHERE post_id=$1
  `, queryString)
}

const deleteRepost = (queryString) => {
  return connection.query(`
    DELETE FROM reposts_posts
    WHERE id=$1
  `, queryString)
}

const deleteAllReposts = (queryString) => {
  return connection.query(`
    DELETE FROM reposts_posts
    WHERE post_id=$1
  `, queryString)
}

export const deletePostRepository = {
  deletePost,
  deletePreviewPosts,
  deletePreviews,
  deleteHashtagPosts,
  deleteLikes,
  deleteRepost,
  deleteComments,
  deleteAllReposts
}