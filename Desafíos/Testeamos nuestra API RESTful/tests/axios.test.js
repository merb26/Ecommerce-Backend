const { axiosGET, axiosPOST, axiosDELETE } = require("../src/apis/axios")
const assert = require("assert").strict

const URL = "http://localhost:8080/products"

describe("Prueba a la API RESTful", () => {
  describe("*************************Método GET********************", () => {
    it("Debe leer productos", async () => {
      const products = await axiosGET(URL)
      let status = products.status
      products.data.message && (status = 404)
      assert.strictEqual(status, 200)
      console.log(`Respuesta del servidor (status): ${status}`)
      console.log(products.data)
    })
  })

  describe("*************************Método POST********************", () => {
    it("Debe ingresar producto nuevo", async () => {
      const productNew = {
        name: "DragonBall",
        description: "info de prueba",
        code: "1234",
        urlPicture: "la-foto",
        price: "es lo que cuesta",
        stock: "bastante cantidad",
      }
      const product = await axiosPOST(URL, { productNew })
      let status = product.status

      assert.strictEqual(status, 200)

      console.log(`Respuesta del servidor (status): ${status}`)
      console.log(product.data)
    })
  })

  describe("*************************Método UPDATE********************", () => {
    it("Debe actualizar un producto existente", async () => {
      const productReplaced = {
        _id: "638848ed563621ce4678c959",
        name: "pruebaActualizado",
        description: "info de prueba",
        code: "1234",
        urlPicture: "la-foto",
        price: "es lo que cuesta",
        stock: "poquita cantidad",
      }
      const product = await axiosPOST(URL, { productReplaced })
      let status = product.status
      assert.strictEqual(status, 200)
    })
  })

  describe("*************************Método DELETE********************", () => {
    it("Debe eliminar el producto existente", async () => {
      const productDelete = {
        _id: "638a782fdf28349fc5f37cda",
      }
      const product = await axiosDELETE(URL, productDelete)
      let status = product.status

      assert.strictEqual(product.data.message.deletedCount, 1)

      console.log(`Respuesta del servidor (status): ${status}`)
      console.log(product.data.message)
    })
  })
})
