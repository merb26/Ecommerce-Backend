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
    const result = await this.dao.add(product)
    return result
  }

  async update(productReplaced) {
    const result = await this.dao.update(productReplaced)
    return result
  }

  async deleteById(_id) {
    const result = await this.dao.deleteById(_id)
    return result
  }
}

module.exports = { RepoProducts }
