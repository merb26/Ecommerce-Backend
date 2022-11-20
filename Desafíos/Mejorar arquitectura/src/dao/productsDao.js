const products = require("../models/products")
const { Connection } = require("./connection")
const { loggerCons } = require("../apis/logger")

class ProductsMongoDAO extends Connection {
  constructor() {
    super()
    this.connection = new Connection()
  }

  async getAll() {
    this.connection.connection()

    const productsDB = products.find({})

    return productsDB
  }
}

module.exports = { ProductsMongoDAO }
