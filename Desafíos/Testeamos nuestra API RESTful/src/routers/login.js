const Router = require("express")

const { passport } = require("../apis/passportLocal")
const { loginMongodb } = require("../controllers/login")

const routeLogin = Router()

routeLogin.get("/", loginMongodb.getLogin)

routeLogin.post(
  "/index",
  passport.authenticate("login", {
    successRedirect: "/index",
    failureRedirect: "/errorSesion",
  })
)

routeLogin.get("/index", loginMongodb.authentic, loginMongodb.getIndex)

routeLogin.get("/logout", loginMongodb.getLogout)

routeLogin.get("/register", loginMongodb.getRegister)

routeLogin.post(
  "/signup",
  passport.authenticate("signup", {
    successRedirect: "/",
    failureRedirect: "/errorRegister",
  })
)

routeLogin.get("/errorSesion", loginMongodb.getErrorSesion)

routeLogin.get("/errorRegister", loginMongodb.getErrorRegister)

module.exports = { routeLogin }
