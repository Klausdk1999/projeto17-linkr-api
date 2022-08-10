import connection from "../setup/database.js";

async function getPosts() {
	return connection.query(
        `SELECT u.username,u.picture_url,p.description,p.url,p.created_at,list.hashtags, likes.likes
        FROM ((posts p 
        LEFT JOIN (SELECT hp.post_id, string_agg(h.name,', ') as hashtags FROM hashtags_posts hp LEFT JOIN hashtags h ON h.id = hp.hashtag_id GROUP BY hp.post_id) as list
        ON list.post_id=p.id) 
        LEFT JOIN (SELECT p.id as post_id,p.description, string_agg(u.username,', ')as likes FROM (posts p JOIN likes l ON p.id = l.post_id) JOIN users u ON u.id=l.liker_id GROUP BY p.id) 
        as likes ON likes.post_id = p.id )
        JOIN users u ON p.author_id=u.id 
        ORDER BY p.created_at DESC LIMIT 20;`
    );
}

// async function getPosts(id,url,shortUrl) {
// 	return connection.quqery(
//         `INSERT INTO urls ("user_id", "url", "short_url", "view_count") VALUES ($1, $2, $3, $4);`, [id, url, shortUrl, 0]
//     );
// }

export const postsRepository = {
	getPosts,
    insertURL
}