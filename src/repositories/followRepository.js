import connection from "../setup/database.js";

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


export const followRepository = {
}
