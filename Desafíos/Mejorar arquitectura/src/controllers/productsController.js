const { productsService } = require("../services/productsService")
const { loggerCons } = require("../apis/logger")

const productsController = {
  getProducts: async (req, res) => {
    const products = await productsService.getAll()

    res.json(products)
  },
}

module.exports = { productsController }
