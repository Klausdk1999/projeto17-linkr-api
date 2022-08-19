import connection from "../setup/database.js";


const DEFAULT_QUERY = `
    SELECT p.id as post_id, u.id as user_id, u.username, u.picture_url, p.description, p.url, p.created_at,
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
const REPOST_QUERY = `
    SELECT pu.id,p.id as post_id, u.id as user_id, u.username, u.picture_url, p.description, p.url, pu.created_at, u2.id as repost_user, u2.username as repost_username,
    (
        SELECT 
        COALESCE(COUNT(rp.post_id), 0)::INT AS reposts_count FROM reposts_posts rp
        WHERE pu.post_id = rp.post_id
    )as reposts_count,
    CASE
        WHEN pu.user_id = p.author_id THEN false
        ELSE true
    END AS repost_post,
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
    FROM posts_users pu
    JOIN posts p
    ON p.id = pu.post_id
    JOIN users u
    ON p.author_id = u.id
    JOIN users u2
    ON pu.user_id = u2.id
    JOIN previews_posts pp
    ON p.id = pp.post_id
`
const getFriendsPosts = ( queryString ) => {
    const andCreatedTime = queryString.length === 3 ? `AND p.created_at <= $3` : "";
    return connection.query(`
        ${REPOST_QUERY}
        CROSS JOIN follows f
        WHERE followed_id = u.id AND follower_id = $1
        ${andCreatedTime}
        ORDER BY pu.id DESC
        LIMIT 10
        OFFSET $2
        `, queryString
    );
};

const getUserPosts = (queryString) => {
    const andCreatedTime = queryString.length === 3 ? `AND p.created_at <= $3` : "";
    return connection.query(`
        ${REPOST_QUERY}
        WHERE p.author_id = $1
        ${andCreatedTime}
        ORDER BY pu.id DESC
        LIMIT 10
        OFFSET $2
        `, queryString
    );
};

const getHashtagPosts = ( queryString ) => {
    console.log(queryString)
    const andCreatedTime = queryString.length === 3 ? `AND p.created_at <= $3` : "";
    return connection.query(`
        ${REPOST_QUERY}
        JOIN hashtags_posts h
        ON p.id = h.post_id
        WHERE h.hashtag_name=$1
        ${andCreatedTime}
        ORDER BY pu.id DESC
        LIMIT 10
        OFFSET $2
        `, queryString
    );
};

const getPostId = ( queryString ) => {
    return connection.query(`SELECT * FROM posts WHERE id=$1 and author_id=$2`, queryString)
}

const getPost = ( queryString ) => {
    return connection.query(
        `SELECT * FROM posts WHERE id=$1`, queryString
    )
}

const editPost = (queryString) => {
    return connection.query(`UPDATE posts SET description=$1 WHERE id=$2 and author_id=$3`, queryString)
}

const getRepostById = ( queryString ) => {
    return connection.query(`SELECT * FROM reposts_posts WHERE post_id=$1 AND user_id=$2
    RETURNING id`, queryString)
}

const getReposts = ( queryString ) => {
    return connection.query(`
    SELECT FROM reposts_posts
    WHERE post_id=$1
    `, queryString)
}

const postReposts = ( queryString ) => {
    return connection.query(
    ` INSERT INTO reposts_posts
        (post_id, user_id)
        VALUES
        ($1, $2)
    `, queryString)
}


const getWithReposts = (queryString) => {
    const OFFSET = [queryString[2]]
    const andCreatedTime = queryString.length === 3 ? `AND p.created_at <= $3` : "";
    return connection.query(`
        ${REPOST_QUERY}
        CROSS JOIN follows f
        WHERE followed_id = u.id AND follower_id = $1
        ${andCreatedTime}
        ORDER BY pu.created_at DESC
        LIMIT 10
        OFFSET $2
        `, queryString
    );
}

export const postsRepository = {
    getFriendsPosts,
    getUserPosts,
    getHashtagPosts,
    getPostId,
    editPost,
    getRepostById,
    getReposts,
    getPost,
    postReposts,
    getWithReposts
};
