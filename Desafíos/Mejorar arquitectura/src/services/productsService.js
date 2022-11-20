const { ProductsMongoDAO } = require("../dao/productsDao")
const { loggerCons } = require("../apis/logger")

const container = new ProductsMongoDAO()

const productsService = {
  getAll: async () => {
    const products = await container.getAll()
    return products
  },
}

module.exports = { productsService }
