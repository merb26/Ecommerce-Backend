const { Router } = require("express")

const { productsController } = require("../controllers/productsController")

const routerProducts = Router()

routerProducts.get("/", productsController.getProducts)

routerProducts.post("/", productsController.addProduct)

routerProducts.put("/", productsController.updateProduct)

routerProducts.delete("/", productsController.deleteProductById)
module.exports = { routerProducts }
