require("dotenv").config();

const express = require("express")
const bodyParser = require("body-parser")

const app = express();
var jsonParser = bodyParser.json()

app.use(jsonParser);

const uesrRouter = require("./api/users/user.route")

app.use("/api/users", uesrRouter)
app.get("/api", (req, res) => {
    res.json({
        success: 1,
        message: "api call success"
    })
})

app.listen(process.env.PORT || 4000, () => {
    console.log("server is running well " + process.env.APP_PORT);
})