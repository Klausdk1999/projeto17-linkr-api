import connection from "../setup/database.js";

async function registerUser(user){
    await connection.query(`INSERT INTO users ("userName", email, password, "pictureUrl") VALUES ($1, $2, $3, $4)`,
    [user.userName, user.email, user.password, user.pictureUrl]
    );

}


async function loginUser(){

}


export const authRepository = {
    registerUser,
    loginUser
}