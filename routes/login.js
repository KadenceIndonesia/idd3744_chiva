const express = require("express")
const loginControllers = require("../controllers/login")
const Router = express()

Router.get("", loginControllers.getLogin)
Router.post("/auth", loginControllers.getAuth)

module.exports = Router;