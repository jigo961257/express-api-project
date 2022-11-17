const pool = require("../../config/database");
const { successMSG, errorMSG } = require("../statusManger")
const fs = require("fs");

const getUsersList = (callback) => {
    try {
        pool.query(`SELECT * FROM Users`, (err, result) => {
            if (err) {
                return callback(errorMSG(401, "while fetch user", err))
            }
            return callback(null, successMSG(200, "user list get succesfully", result))
        });
    } catch (error) {
        if (error) {
            return callback(errorMSG(400, "issue is occures while get user list", error))
        }
    }
}

/**
 * for the delete user by the id
 * DELETE FROM `Users` WHERE id = "U04";
 * @params id | nummber | required
 * @return message
 */
const deleteUserById = (data, callback) => {
    try {
        if (Object.keys(data).length === 0) {
            return callback(errorMSG(401, "validation error", "data is empty"))
        } else if (!data.hasOwnProperty("id")) {
            return callback(errorMSG(401, "validation error", "the id is not get"))
        }
        pool.query(`SELECT * FROM Users WHERE id = ${data.id}`, (err, res) => {
            if (err) {
                return callback(errorMSG(401, "validation error", "the pass user id not existe"))
            }
            if (res.length > 0) {
                pool.query(`DELETE FROM Users WHERE id = ${data.id}`,
                    (err, result) => {
                        if (err) {
                            return callback(errorMSG(401, "error while delete", err))
                        }
                        console.log(result);

                    })
                return callback(null, successMSG(200, null, "user Delete successfully"))
            } else {
                return callback(errorMSG(201, "not found", "the pass user id not existe"))
            }
        })

    } catch (error) {
        console.log(error);
        if (error) {
            return callback(errorMSG(400, "issue is occures while delete user", error))
        }
    }
}

/**
 * for the login user 
 * @params username 
 * @params passwod
 * @retrun responce with token
 */

const userLogin = (data, callback) => {
    try {
        let getUser = pool.query(`SELECT * FROM Users WHERE id = ${data.id}`)
        getUser.on("error", (err) => {
            return callback(errorMSG(401, "error occures while fetch data", err))
        }).on("result", (res) => {
            if (res.length > 0) {
                let getUserPass = pool.query(`SELECT password FROM Users WHERE id = ${data.id}`)
                getUserPass.on("result", (res) => {
                    console.log(res);
                })
            }
        })
    } catch (error) {
        if (error) {
            return callback(errorMSG(400, "error occure while login user", error))
        }
    }
}

module.exports = {
    create: (data, callback) => {
        // console.log("data => services => ", data);

        try {
            if (Object.keys(data).length <= 0) {
                return callback(errorMSG(401, "validation error", "data is empty"))
            }
            pool.query(`
            INSERT INTO Users (id, name, type, contact, email, password) VALUES (NULL, ?, ?, ?, ?, ?)`,
                [
                    data.name,
                    data.utype,
                    data.contact,
                    data.email,
                    data.password
                ], (err, result, fileds) => {
                    if (err) {
                        return callback(errorMSG(401, "while create user", err))
                    }
                    return callback(null, successMSG(200, "registed success", "user create succesfully"))
                })
            // let obj = {}
            // obj.id = "U" + Math.floor(Math.random() * 100).toString()
            // obj.name = data.name
            // obj.type = data.utype
            // obj.email = data.email
            // obj.contact = data.contact
            // obj.pass = data.password

            // pool.users.push(obj);

        } catch (error) {
            if (error) {
                return callback(errorMSG(400, "error occure while create user", error))
            }
        }
    },
    getUsersList,
    deleteUserById,
    userLogin
}

