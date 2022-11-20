const { ProductsMongoDAO } = require("../dao/productsDao")
const { Connection } = require("../dao/connection")

const dataBase = ["mongodb"]

class FactoryProducts {
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

module.exports = { FactoryProducts }
