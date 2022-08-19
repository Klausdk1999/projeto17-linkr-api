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
const TEST_QUERY = `
    SELECT p.id as post_id, u.id as user_id, u.username, u.picture_url, p.description, p.url, pu.created_at,
    CASE
        WHEN u.id = p.author_id THEN false
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
    JOIN previews_posts pp
    ON p.id = pp.post_id
`

const CREATE_ORDER = `
SELECT *
(
    SELECT created_at FROM reposts_posts
)
UNION
(
    SELECT created_at FROM posts
) as created_order
ORDER BY created_order DESC
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
    console.log(queryString)
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

const postRepost = ( queryString ) => {
    ` INSERT INTO reposts_posts
        (post_id, user_id)
        VALUES
        ($1, $2)
    `, queryString
}


const getWithReposts = (queryString) => {
    const andCreatedTime = queryString.length === 3 ? `AND p.created_at <= $3` : "";
    return connection.query(`
        ${TEST_QUERY}
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
    postRepost,
    getWithReposts
};
