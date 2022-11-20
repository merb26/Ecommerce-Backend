const products = require("../models/products")
const { loggerCons } = require("../apis/logger")
const { asDTO } = require("../dto/productDTO")

class ProductsMongoDAO {
  async getAll() {
    const productsDB = await products.find({})

    const productsDTO = asDTO(productsDB)

    return productsDTO
  }
}

module.exports = { ProductsMongoDAO }
