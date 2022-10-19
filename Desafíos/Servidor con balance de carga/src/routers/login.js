const Router = require("express")

const { generatorProducts } = require("../apis/generateProductsFaker")
const { loginMongodb } = require("../controllers/login")
const { passport } = require("../apis/passportLocal")

const routeLogin = Router()

/* -------------------------------------------------------------------------- */
/*                                Inicio sesión                               */
/* -------------------------------------------------------------------------- */
routeLogin.get("/", (req, res) => {
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

    res.render("logout", { user })
  })
})

/* -------------------------------------------------------------------------- */
/*                                  Registro                                  */
/* -------------------------------------------------------------------------- */
routeLogin.get("/register", (req, res) => {
  console.log("Probando")

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
  res.render("errorSesion")
})

routeLogin.get("/errorRegister", (req, res) => {
  res.render("errorRegister")
})

module.exports = { routeLogin }
