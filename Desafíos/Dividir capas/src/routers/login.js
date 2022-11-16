const Router = require("express")

const { generatorProducts } = require("../apis/generateProductsFaker")
const { passport } = require("../apis/passportLocal")
const { loginMongodb } = require("../controllers/login")
const { loggerCons } = require("../apis/logger")
const { config } = require("../../config")

const routeLogin = Router()

/* -------------------------------------------------------------------------- */
/*                                Inicio sesión                               */
/* -------------------------------------------------------------------------- */
routeLogin.get("/", (req, res) => {
  loggerCons.info({ level: "info" }, `${req.hostname}:${config.PORT}${req.url}`)

  res.render("login")
})

routeLogin.post(
  "/index",
  passport.authenticate("login", {
    successRedirect: "/index",
    failureRedirect: "/errorSesion",
  })
)

routeLogin.get("/index", loginMongodb.authentic, (req, res) => {
  const products = generatorProducts(5)
  const { user } = req
  loggerCons.info({ level: "info" }, `${req.hostname}:${config.PORT}${req.url}`)

  res.render("index", { user, products })
})

/* -------------------------------------------------------------------------- */
/*                                Cierra sesión                               */
/* -------------------------------------------------------------------------- */
routeLogin.get("/logout", async (req, res, next) => {
  const { user } = req
  req.logout(err => {
    if (err) {
      return next(err)
    }
    loggerCons.info(
      { level: "info" },
      `${req.hostname}:${config.PORT}${req.url}`
    )

    res.render("logout", { user })
  })
})

/* -------------------------------------------------------------------------- */
/*                                  Registro                                  */
/* -------------------------------------------------------------------------- */
routeLogin.get("/register", (req, res) => {
  loggerCons.info({ level: "info" }, `${req.hostname}:${config.PORT}${req.url}`)

  res.render("register")
})

routeLogin.post(
  "/signup",
  passport.authenticate("signup", {
    successRedirect: "/",
    failureRedirect: "/errorRegister",
  })
)

/* -------------------------------------------------------------------------- */
/*                                   Errores                                  */
/* -------------------------------------------------------------------------- */
routeLogin.get("/errorSesion", (req, res) => {
  loggerCons.info({ level: "info" }, `${req.hostname}:${config.PORT}${req.url}`)

  res.render("errorSesion")
})

routeLogin.get("/errorRegister", (req, res) => {
  loggerCons.info({ level: "info" }, `${req.hostname}:${config.PORT}${req.url}`)

  res.render("errorRegister")
})

module.exports = { routeLogin }
