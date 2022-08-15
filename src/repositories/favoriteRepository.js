import connection from "../setup/database.js";


async function favoritePost(postId, userId){
    return connection.query(`INSERT INTO likes (liker_id, post_id) VALUES ($1, $2)`, [userId, postId]);
}

async function removeFavorite(postId, userId){
    return connection.query(`DELETE FROM likes WHERE liker_id = $1 AND post_id = $2`, [userId, postId]);
}

async function getFavorites(postId){
    const {rows: favoriteQuantity} = await connection.query(`select count(*) as quantity from likes where post_id = $1`, [postId]);
    return favoriteQuantity[0].quantity
}


async function getLikers(postId){
    const {rows: likers} = await connection.query(`
    select u.id as liker_id, u.username from users u 
    join likes l
    on l.liker_id = u.id
    where l.post_id = $1`, [postId]);
    console.log(likers);
    return likers;
}

async function checkIsFavorite(userId, postId){
   const {rows: userFavorite} = await connection.query(`select * from likes where post_id = $1 and liker_id = $2`, [postId, userId]);    
    return userFavorite[0];
}



export const favoriteRepository = {
    favoritePost,
    getFavorites,
    removeFavorite,
    checkIsFavorite,
    getLikers
}