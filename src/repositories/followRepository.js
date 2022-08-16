import connection from "../setup/database.js";

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
    removeFollow
} 