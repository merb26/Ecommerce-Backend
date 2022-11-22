const { RepoProducts } = require("../repository/products/productsRepo")
const { loggerCons } = require("../apis/logger")

const repository = new RepoProducts()

const productsService = {
  getAll: async () => {
    const products = await repository.getAll()
    return products
  },
}

module.exports = { productsService }
