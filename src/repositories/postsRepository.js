import connection from "../setup/database.js";



async function getPosts(userId) {
    const whereClause = userId ? " WHERE p.author_id = $1 " : "";
    const query = `
        SELECT p.id as post_id, u.id as user_id, u.username, u.picture_url, p.description, p.url, p.created_at,
        (
            SELECT
            ARRAY_AGG(
                jsonb_build_object(
                    'id', l.id,
                    'liker_username', u.username
                )
            )
            FROM likes l
            JOIN users u
            ON l.liker_id = u.id
            WHERE l.post_id = p.id
        )as likes,
        (
            SELECT
            ARRAY_AGG(
                jsonb_build_object(
                    'title', pr.title,
                    'description', pr.description,
                    'url', pr.url,
                    'favicon', pr.favicon
                )
            )
            FROM previews pr
            WHERE pp.preview_id = pr.id AND pp.post_id = p.id
        ) as preview
        FROM posts p
        JOIN users u
        ON p.author_id = u.id
        JOIN previews_posts pp
        ON p.id = pp.post_id
        WHERE p.author_id = $1
        ORDER BY p.created_at DESC 
        LIMIT 20;
`
	return userId ? connection.query(query, [userId]) : connection.query(query);
}


const haveHashtag = async (queryString) => {
    return connection.query(`SELECT * FROM hashtags WHERE name=$1`, queryString)
}

const getHashtagPosts = async (queryString) => {
    return connection.query(`
        SELECT p.id as post_id,u.id as user_id, u.username, u.picture_url, p.description, p.url, p.created_at,
        (SELECT
            ARRAY_AGG(
                jsonb_build_object(
                    'id', l.id,
                    'liker_username', u.username
                )
            )
            FROM likes l
            JOIN users u
            ON l.liker_id = u.id
            WHERE l.post_id = p.id
            )as likes,
        (
            SELECT
            ARRAY_AGG(
                jsonb_build_object(
                    'title', pr.title,
                    'description', pr.description,
                    'url', pr.url,
                    'favicon', pr.favicon
                )
            )
            FROM previews pr
            WHERE pp.preview_id = pr.id AND pp.post_id = p.id
        ) as preview
        FROM posts p
        JOIN users u
        ON p.author_id = u.id
        JOIN hashtags_posts h
        ON p.id = h.post_id
        JOIN previews_posts pp
        ON p.id = pp.post_id
        WHERE h.hashtag_name=$1
        ORDER BY p.id DESC
        LIMIT 20`, queryString
    )
}

// async function getPosts(id,url,shortUrl) {
// 	return connection.quqery(
//         `INSERT INTO urls ("user_id", "url", "short_url", "view_count") VALUES ($1, $2, $3, $4);`, [id, url, shortUrl, 0]
//     );
// }

export const postsRepository = {
    getPosts,
    haveHashtag,
    getHashtagPosts
}
