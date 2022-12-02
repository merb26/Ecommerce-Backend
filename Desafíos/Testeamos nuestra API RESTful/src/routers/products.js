const { Router } = require("express")

const { productsController } = require("../controllers/productsController")

const routerProducts = Router()

routerProducts.get("/", productsController.getProducts)

routerProducts.post("/", productsController.addProduct)

module.exports = { routerProducts }
