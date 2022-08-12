import connection from "../setup/database.js";



async function getPosts(userId) {
    const whereClause = userId ? " WHERE p.author_id = $1 " : "";
    const query = `
        SELECT p.id as post_id, u.id as user_id, u.username, u.picture_url, p.description, p.url, p.created_at, list.hashtags, likes.likes
        FROM ((posts p 
        LEFT JOIN (SELECT hp.post_id, string_agg(h.name,', ') as hashtags FROM hashtags_posts hp LEFT JOIN hashtags h ON h.name = hp.hashtag_name GROUP BY hp.post_id) as list
        ON list.post_id=p.id) 
        LEFT JOIN (SELECT p.id as post_id,p.description, string_agg(u.username,', ')as likes FROM (posts p JOIN likes l ON p.id = l.post_id) JOIN users u ON u.id=l.liker_id GROUP BY p.id) 
        as likes ON likes.post_id = p.id )
        JOIN users u ON p.author_id=u.id
        ${whereClause}
        ORDER BY p.created_at DESC LIMIT 20;
`
	return userId ? connection.query(query, [userId]) : connection.query(query);
}


async function favoritePost(postId, userId){
    return connection.query(`INSERT INTO likes (liker_id, post_id) VALUES ($1, $2)`, [userId, postId]);
}

async function removeFavorite(postId, userId){
    return connection.query(`DELETE FROM likes WHERE liker_id = $1 AND post_id = $2`, [userId, postId]);
}

async function getFavorites(postId, userId){
    const {rows: favoriteQuantity} = await connection.query(`select count(*) as quantity from likes where post_id = $1`, [postId]);
    //const {rows: userFavorite} = await connection.query(`select * from likes where post_id = $1 and liker_id = $2`, [postId, userId]);
    //console.log(userFavorite);
    return favoriteQuantity[0].quantity;
}


export const postsRepository = {
    getPosts,
    favoritePost,
    getFavorites,
    removeFavorite
}

