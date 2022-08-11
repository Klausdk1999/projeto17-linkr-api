import connection from "../setup/database.js";

const get10Trendings = async () => {
    return await connection.query(`
        SELECT name
        FROM hashtags
        ORDER BY mentions DESC, view_count DESC
        LIMIT 10 
    `)
};

export { get10Trendings };