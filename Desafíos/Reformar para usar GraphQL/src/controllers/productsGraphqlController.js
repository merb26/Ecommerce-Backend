const { graphqlHTTP } = require("express-graphql")
const { buildSchema } = require("graphql")

const { productsService } = require("../services/productsGraphqlService")

const schema = buildSchema(`
  type Product {
    _id: ID!
    name: String
    description: String
    code: String
    urlPicture: String
    price: String
    stock: String
  }
  type Message {
    message: String
  }
  type Query {
    getProducts:[Product]!
  }
  type Mutation {
    addProduct(
        name: String
        description: String
        code: String
        urlPicture: String
        price: String
        stock: String
    ): Message
    updateProduct(
        _id: ID!
        name: String
        description: String
        code: String
        urlPicture: String
        price: String
        stock: String
    ): Message
    deleteProductById(_id: ID!): Message
  }
`)

class GraphQLController {
  constructor() {
    this.config = {
      schema,
      rootValue: {
        getProducts: async () => {
          const products = await productsService.getAll()
          return products
        },
        addProduct: async ({
          name,
          description,
          code,
          urlPicture,
          price,
          stock,
        }) => {
          const productNew = {
            name,
            description,
            code,
            urlPicture,
            price,
            stock,
          }
          const result = await productsService.add(productNew)
          return { message: "Product created" }
        },
        updateProduct: async ({
          _id,
          name,
          description,
          code,
          urlPicture,
          price,
          stock,
        }) => {
          const productReplaced = {
            _id,
            name,
            description,
            code,
            urlPicture,
            price,
            stock,
          }
          const result = await productsService.update(productReplaced)

          return { message: "Product updated" }
        },
        deleteProductById: async ({ _id }) => {
          const result = await productsService.delete(_id)

          return { message: "Product deleted" }
        },
      },
      graphiql: true,
    }
    return graphqlHTTP(this.config)
  }
}

module.exports = { GraphQLController }
