const { Router } = require("express")

const { productsController } = require("../controllers/productsController")

const routerProducts = Router()

routerProducts.get("/", productsController.getProducts)

module.exports = { routerProducts }
