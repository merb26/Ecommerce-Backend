class ProductDTO {
  constructor({ _id, name, description, code, urlPicture, price, stock }) {
    this._id = _id
    this.name = name
    this.description = description
    this.code = code
    this.urlPicture = urlPicture
    this.price = price
    this.stock = stock
  }
}

const asDTO = products => {
  if (Array.isArray(products))
    return products.map(product => new ProductDTO(product))
  else return new ProductDTO(products)
}

module.exports = { asDTO }
