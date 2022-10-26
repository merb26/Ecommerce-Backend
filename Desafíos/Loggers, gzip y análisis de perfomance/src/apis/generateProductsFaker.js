const { faker } = require("@faker-js/faker")

const generatorProducts = amount => {
  const products = []

  for (let index = 0; index < amount; index++) {
    const title = faker.commerce.product()
    const price = faker.commerce.price(1000, 7000, 0)
    const urlPicture = faker.image.image(100, 100, true)

    const product = {
      title,
      price,
      urlPicture,
    }

    products.push(product)
  }

  return products
}

module.exports = { generatorProducts }
