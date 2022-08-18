import connection from "../setup/database.js";

const findHashtag = async (queryString) => {
    return connection.query(`SELECT * FROM hashtags WHERE name=$1`, queryString)
}


const get10Trendings = async () => {
    return await connection.query(`
        SELECT name
        FROM hashtags
        ORDER BY mentions DESC, view_count DESC
        LIMIT 10 
    `)
};

export { get10Trendings, findHashtag };