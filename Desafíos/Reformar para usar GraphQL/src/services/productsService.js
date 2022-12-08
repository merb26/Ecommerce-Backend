const { RepoProducts } = require("../repository/products/productsRepo")
const { loggerCons } = require("../apis/logger")

const repository = new RepoProducts()

const productsService = {
  getAll: async () => {
    const products = await repository.getAll()
    return products
  },
  add: async product => {
    const result = await repository.add(product)
    return result
  },
  update: async productReplaced => {
    console.log(productReplaced)
    const result = await repository.update(productReplaced)
    return result
  },
  delete: async _id => {
    const result = await repository.deleteById(_id)
    return result
  },
}

module.exports = { productsService }
