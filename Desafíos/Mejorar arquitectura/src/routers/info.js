const Router = require("express")

const { controllerInfo } = require("../controllers/info")

const routeApis = Router()

routeApis.get("/info", controllerInfo.getInfo)

module.exports = { routeApis }
