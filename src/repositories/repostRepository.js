import connection from "../setup/database.js";
//

async function sharePost(reposterId, postId){
    return await connection.query(
        `INSERT INTO reposts_posts (user_id, post_id) VALUES ($1, $2)`, [reposterId, postId]);
}

async function checkIsReposted(postId){
    return await connection.query(
      `SELECT * FROM reposts_posts WHERE post_id = $1`, [postId]
    );
}



export const repostRepository = {
    sharePost,
    checkIsReposted
}