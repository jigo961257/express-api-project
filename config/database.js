const mysql = require("mysql")
const env = process.env;

const pool = mysql.createPool({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    connectionLimit: 10,
    database: env.DB_NAME
})

// var pool = {
//     "users": [],
//     "data": [],
// }

module.exports = pool