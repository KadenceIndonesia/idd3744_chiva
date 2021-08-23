const express = require("express")
const reportControllers = require("../controllers/kepo")
const Router = express()

Router.get("/ms", reportControllers.getMsEvd)
Router.get("/ms/detail/:id", reportControllers.getMsDetail)

Router.get("/retail/", reportControllers.getRetail)
Router.get("/retail/detail/:id", reportControllers.getRetailDetail)

Router.get("/caller/", reportControllers.getCaller)
Router.get("/caller/detail/:id", reportControllers.getCallerDetail)

module.exports = Router;