const { ProductsMongoDAO } = require("../dao/productsMongoDao")
const { Connection } = require("../dao/productsConnections")

const dataBase = ["mongodb"]

class ProductsFactory {
  constructor() {
    switch (dataBase[0]) {
      case "mongodb":
        new Connection().connection()

        this.productDao = new ProductsMongoDAO()
        break

      default:
        // No ha seleccionado una base de datos
        break
    }
  }

  getProductsDAO() {
    return this.productDao
  }
}

module.exports = { ProductsFactory }
