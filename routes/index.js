const express = require("express")
const indexControllers = require("../controllers/index")
const Router = express()

Router.get("", indexControllers.getIndex)
Router.get("login/", indexControllers.getLogin)

module.exports = Router;