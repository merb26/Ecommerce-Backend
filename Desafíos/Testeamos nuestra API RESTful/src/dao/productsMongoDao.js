const products = require("../models/products")
const { loggerCons } = require("../apis/logger")

class ProductsMongoDAO {
  async getAll() {
    const productsDB = await products.find({})

    return productsDB
  }

  async add(product) {
    const result = await products.create(product)

    return result
  }
}

module.exports = { ProductsMongoDAO }
