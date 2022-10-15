const products = require("../models/products")

class ContainerProducts {
  /* -------------------------------------------------------------------------- */
  /*                                   getAll                                   */
  /* -------------------------------------------------------------------------- */
  async getAll() {
    return products.find({})
  }
}

module.exports = { ContainerProducts }
