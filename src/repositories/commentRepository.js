import connection from "../setup/database.js";

async function addComment(postId, commenterId, comment){
    return await connection.query(`
        INSERT INTO comments (comment, post_id, commenter_id) VALUES ($1, $2, $3)
    `, [comment, postId, commenterId]);
}

async function getPostComments(postId){
    const {rows: comments} = await connection.query(`
        SELECT c.*, u.id as post_author, u2.username as commenter_username, u2.picture_url as commenter_picture FROM comments c
        JOIN posts p
        ON p.id = c.post_id
        JOIN users u
        ON u.id = p.author_id
        JOIN users u2
        ON u2.id = c.commenter_id
        WHERE c.post_id = $1
    `, [postId]);
    return comments;
}


export const commentQueries = {
    addComment,
    getPostComments
}