const { create, getUsersList, deleteUserById, userLogin } = require("./user.services")

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        create(body, (err, result) => {
            if (err) {
                console.log("this is error: ", err)
                return res.status(400).json(err)
            }

            return res.status(200).json(result)
        })
    },
    getUsers: (req, res) => {
        getUsersList((err, result) => {
            if (err) {
                console.log("this is error (getUsersList): ", err)
                return res.status(400).json(err)
            }

            return res.status(200).json(result)
        })
    },
    deleteUser: (req, res) => {
        const body = req.body;
        deleteUserById(body, (err, result) => {
            if (err) {
                console.log("this is error (deleteUserById): ", err)
                return res.status(400).json(err)
            }
            return res.status(200).json(result)
        })
    },
    login: (req, res) => {
        const body = req.body;
        userLogin(body, (err, result) => {
            if (err) {
                console.log("this is error (userLogin): ", err)
                return res.status(400).json(err)
            }
            return res.status(200).json(result)
        })
    }
}