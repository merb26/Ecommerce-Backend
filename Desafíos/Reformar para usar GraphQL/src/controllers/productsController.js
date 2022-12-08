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

    res.json({ message: "Product added successfully", productNew: result })
  },
  updateProduct: async (req, res) => {
    const { productReplaced } = req.body
    const result = await productsService.update(productReplaced)

    res.json({ message: result })
  },
  deleteProductById: async (req, res) => {
    const { _id } = req.body
    const result = await productsService.delete(_id)

    res.json({ message: result })
  },
}

module.exports = { productsController }
