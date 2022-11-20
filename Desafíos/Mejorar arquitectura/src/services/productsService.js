const { FactoryProducts } = require("../factory-method/factoryProducts")
const { loggerCons } = require("../apis/logger")

const container = new FactoryProducts().getProductsDAO()

const productsService = {
  getAll: async () => {
    const products = await container.getAll()
    return products
  },
}

module.exports = { productsService }
