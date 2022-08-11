import connection from "../setup/database.js";

async function registerUser(user){
    const {rows: findUser} = await connection.query(`SELECT * FROM USERS WHERE email = $1 OR username = $2`, [user.email, user.username]);
    if(findUser.length > 0){
        return findUser[0];
    }

    await connection.query(`INSERT INTO users (username, email, password, picture_url) VALUES ($1, $2, $3, $4)`,
    [user.username, user.email, user.password, user.pictureUrl]
    );

}

async function findUser(user){
    const {rows: findUser} = await connection.query(`
        SELECT * FROM users WHERE email = $1
    `, [user.email]);

    return findUser[0];

}

export const authRepository = {
    registerUser,
    findUser
}