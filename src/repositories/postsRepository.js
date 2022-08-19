import connection from "../setup/database.js";


const DEFAULT_QUERY = `
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
`

const getFriendsPosts = ( queryString ) => {
    const andCreatedTime = queryString.length === 3 ? `AND p.created_at <= $3` : "";
    return connection.query(`
        ${DEFAULT_QUERY}
        CROSS JOIN follows f
        WHERE followed_id = u.id AND follower_id = $1
        ${andCreatedTime}
        ORDER BY p.created_at DESC
        LIMIT 10
        OFFSET $2
        `, queryString
    );
};

const getUserPosts = (queryString) => {
    const andCreatedTime = queryString.length === 3 ? `AND p.created_at <= $3` : "";
    return connection.query(`
        ${DEFAULT_QUERY}
        WHERE p.author_id = $1
        ${andCreatedTime}
        ORDER BY p.created_at DESC
        LIMIT 10
        OFFSET $2
        `, queryString
    );
};

const getHashtagPosts = ( queryString ) => {
    const andCreatedTime = queryString.length === 3 ? `AND p.created_at <= $3` : "";
    return connection.query(`
        ${DEFAULT_QUERY}
        JOIN hashtags_posts h
        ON p.id = h.post_id
        WHERE h.hashtag_name=$1
        ${andCreatedTime}
        ORDER BY p.created_at DESC
        LIMIT 10
        OFFSET $2
        `, queryString
    );
};

const getPostId = ( queryString ) => {
    return connection.query(`SELECT * FROM posts WHERE id=$1 and author_id=$2`, queryString)
}

const editPost = (queryString) => {
    return connection.query(`UPDATE posts SET description=$1 WHERE id=$2 and author_id=$3`, queryString)
}

export const postsRepository = {
    getFriendsPosts,
    getUserPosts,
    getHashtagPosts,
    getPostId,
    editPost,
};
