const Router = require("express")
const { generatorProducts } = require("../apis/generateProductsFaker")

const { loginMongodb } = require("../controllers/login")

const routeLogin = Router()

routeLogin.get("/", (req, res) => {
  res.render("login")
})

routeLogin.get("/index", loginMongodb.authentic, (req, res) => {
  const { name } = req.session

  const products = generatorProducts(5)

  res.render("index", { name, products })
})

routeLogin.get("/logout", loginMongodb.authentic, async (req, res) => {
  const { name } = req.session
  try {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).send(`{message: No se pudo cerrar sesion}`)
      }
    })
    res.status(200).render("logout", { name })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
})

routeLogin.post("/index", loginMongodb.startSesion)

module.exports = { routeLogin }
