const products = require("../models/products")
const { Connection } = require("./connection")
const { loggerCons } = require("../apis/logger")
const { asDTO } = require("../dto/productDTO")

class ProductsMongoDAO extends Connection {
  constructor() {
    super()
    this.connection = new Connection()
  }

  async getAll() {
    this.connection.connection()

    const productsDB = await products.find({})

    const productsDTO = asDTO(productsDB)

    return productsDTO
  }
}

module.exports = { ProductsMongoDAO }
