const mysql = require("mysql")
const env = process.env;

// const pool = mysql.createPool({
//     host: env.DB_HOST,
//     user: env.DB_USER,
//     password: env.DB_PASS,
//     connectionLimit: 10,
//     database: env.DB_NAME,
// })

const pool = mysql.createPool({
    host: "containers-us-west-129.railway.app",
    port: 7370,
    user: "root",
    password: "mPnucMn0lFzE5wukBckt",
    connectionLimit: 10,
    database: "railway",
})


// var pool = {
//     "users": [],
//     "data": [],
// }

module.exports = pool