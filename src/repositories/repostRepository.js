import connection from "../setup/database.js";


async function sharePost(reposterId, postId){
    return await connection.query(
        `INSERT INTO reposts (reposter_id, post_id) VALUES ($1, $2)`, [reposterId, postId]);
}



export const repostRepository = {
    sharePost,
}