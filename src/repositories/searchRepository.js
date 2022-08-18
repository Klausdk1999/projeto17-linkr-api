import connection from "../setup/database.js";

async function searchUsers(queryString) {
    
    return connection.query(`
    SELECT u.username, u.picture_url, u.id,
    (
        SELECT EXISTS (
            SELECT id
            FROM follows
            WHERE follower_id = $1
            AND followed_id = u.id
        )
    ) as following
    FROM users u
    WHERE LOWER (REPLACE ( u.username, ' ', ''))
    LIKE LOWER (REPLACE ($2, ' ', ''))
    ORDER BY following DESC
    `, 
    queryString
    );
}

const searchUserById = (queryString) => {
    return connection.query(`
        SELECT *
        FROM users u
        WHERE u.id = $1
        `, 
        queryString
    )
}

export const searchRepository = {
    searchUsers,
    searchUserById
}
