const { ContainerProducts } = require("../containers/productsMongoDB")

const container = new ContainerProducts()

const controllerProductsMongodb = {
  getProducts: async () => {
    const products = await container.getAll()
    return products
  },
}

module.exports = { controllerProductsMongodb }
