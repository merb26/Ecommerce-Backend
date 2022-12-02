const request = require("supertest")
const { expect } = require("chai")

const { app } = require("../app")

const URL = "/products"

describe("Prueba a la API RESTful", () => {
  describe("*************************Método GET********************", () => {
    it("Debe leer productos", async () => {
      const products = await request(app).get(URL).send()

      let { status, _body } = products
      expect(status).to.eql(200)
      console.log(`Respuesta del servidor (status): ${status}`)
      console.log(_body)
    })
  })

  // describe("*************************Método POST********************", () => {
  //   it("Debe ingresar producto nuevo", async () => {
  //     const productNew = {
  //       name: "Asus",
  //       description: "info de prueba",
  //       code: "1234",
  //       urlPicture: "la-foto",
  //       price: "es lo que cuesta",
  //       stock: "bastante cantidad",
  //     }
  //     const product = await request(app).post(URL).send({ productNew })
  //     let { status, _body } = product

  //     expect(status).to.eql(200)

  //     console.log(`Respuesta del servidor (status): ${status}`)
  //     console.log(_body)
  //   })
  // })

  // describe("*************************Método UPDATE********************", () => {
  //   it("Debe actualizar un producto existente", async () => {
  //     const productReplaced = {
  //       _id: "638a8701542d71b1273bcbbc",
  //       name: "pruebaActualizado",
  //       description: "info de prueba",
  //       code: "1234",
  //       urlPicture: "la-foto",
  //       price: "es lo que cuesta",
  //       stock: "poquita cantidad",
  //     }
  //     const product = await request(app).put(URL).send({ productReplaced })
  //     let { status } = product
  //     expect(status).to.eql(200)
  //   })
  // })

  // describe("*************************Método DELETE********************", () => {
  //   it("Debe eliminar el producto existente", async () => {
  //     const productDelete = {
  //       _id: "638a8701542d71b1273bcbbc",
  //     }

  //     const product = await request(app).delete(URL).send(productDelete)
  //     let { status, _body } = product

  //     expect(_body.message.deletedCount).to.eql(1)

  //     console.log(`Respuesta del servidor (status): ${status}`)
  //     console.log(_body)
  //   })
  // })
})
