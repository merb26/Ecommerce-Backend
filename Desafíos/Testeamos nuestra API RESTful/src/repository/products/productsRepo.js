const { asDTO } = require("../../dto/productDTO")

const { ProductsFactory } = require("../../factory-method/productsFactory")

const dao = new ProductsFactory()

class RepoProducts {
  constructor() {
    this.dao = dao.getProductsDAO()
  }

  async getAll() {
    const productsDB = await this.dao.getAll({})

    const productsDTO = asDTO(productsDB)

    return productsDTO
  }

  async add(product) {
    const productNew = await this.dao.add(product)
    return productNew
  }
}

module.exports = { RepoProducts }
