const { productsService } = require("../services/productsService")
const { loggerCons } = require("../apis/logger")

const productsController = {
  getProducts: async (req, res) => {
    const products = await productsService.getAll()

    res.json(products)
  },
  addProduct: async (req, res) => {
    const { productNew } = req.body
    const result = await productsService.add(productNew)

    res.json({ message: result })
  },
}

module.exports = { productsController }
