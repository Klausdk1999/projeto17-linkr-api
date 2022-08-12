import connection from "../setup/database.js";


async function findPost(id){
  
   const verifyPost = await connection.query(`SELECT * FROM posts WHERE id = $1`, [
        id,
      ]);
      return verifyPost
}

async function deletePost(id, userId){

    const postDelete =  await connection.query(`
    DELETE FROM posts
    WHERE author_id =$1 AND id = $2`, [
        userId,
        id,
      ]);
      return postDelete
}

async function returnPosts(){
    const {rows: posts} = await connection.query(`SELECT * FROM posts`) 
    return posts
}

const deleteHashtag_Posts = async (queryParams) => {
  const query = await connection.query(`
    DELETE FROM hashtags_posts WHERE post_id = $1`, queryParams);
  return query
}


export const deletePostRepository = {
 findPost,
 deletePost,
 returnPosts,
 deleteHashtag_Posts
}