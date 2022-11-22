const products = require("../models/products")
const { loggerCons } = require("../apis/logger")

class ProductsMongoDAO {
  async getAll() {
    const productsDB = await products.find({})

    return productsDB
  }
}

module.exports = { ProductsMongoDAO }
