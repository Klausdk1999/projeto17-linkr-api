import connection from "../setup/database.js";

async function searchUsers(input) {
    
    return connection.query(`SELECT username,picture_url,id FROM users WHERE to_tsvector(username) @@ to_tsquery('"${input}"":*')`);
}

export const searchRepository = {
    searchUsers

}
