import connection from "../setup/database.js";

const getFollowPosts = async (queryString) => {
    console.log(queryString.length)
    const andCreatedTime =  queryString.length === 3  ? `AND p.created_at <= $3` : "";
    const query = `
        SELECT p.id as post_id, u.id as user_id, u.username, u.picture_url,
        p.description, p.url, p.created_at,
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
        ) as likes,
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
        CROSS JOIN follows f
        WHERE followed_id = u.id AND follower_id = $1
        ${andCreatedTime}
        ORDER BY p.created_at DESC
        LIMIT 10
        OFFSET $2`
    return  connection.query(query, queryString)
}


const getFollowings = (queryString) => {
    console.log(queryString)
    return connection.query(`
        SELECT *
        FROM follows
        WHERE follower_id = $1
    `, queryString)
}

async function addFollow(followerId, followedId){
    return connection.query(`
        INSERT INTO follows (follower_id, followed_id) VALUES ($1, $2)
    `, [followerId, followedId]);
}

async function removeFollow(followerId, followedId){
    return connection.query(`
        DELETE FROM follows WHERE follower_id = $1 AND followed_id = $2
    `, [followerId, followedId]);
}


async function getFollowers(followedId){
    const {rows: followers} = await connection.query(`
        SELECT users.id as follower_id FROM users
        JOIN follows
        ON follows.followed_id = $1 AND follows.follower_id = users.id
    `, [followedId]);
    return followers;
}


export const followRepository = {
    addFollow,
    getFollowers,
    removeFollow,
    getFollowPosts,
    getFollowings
} 
