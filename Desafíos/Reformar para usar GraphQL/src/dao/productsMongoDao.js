const products = require("../models/products")
const { asDTO } = require("../dto/productDTO")
const { loggerCons } = require("../apis/logger")

class ProductsMongoDAO {
  async getAll() {
    const productsDB = await products.find({})

    const productsDTO = asDTO(productsDB)
    return productsDTO
  }

  async add(product) {
    const result = await products.create(product)

    return result
  }

  async update({ _id, name, description, code, urlPicture, price, stock }) {
    const result = await products.updateOne(
      { _id },
      {
        $set: {
          name,
          description,
          code,
          urlPicture,
          price,
          stock,
        },
      }
    )

    return result
  }

  async deleteById(_id) {
    const result = await products.deleteOne({ _id })

    return result
  }
}

module.exports = { ProductsMongoDAO }
