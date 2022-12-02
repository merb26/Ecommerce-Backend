const { axiosGET, axiosPOST } = require("../src/apis/axios")
const assert = require("assert").strict

const URL = "http://localhost:8080/products"

// ;(async () => {
//   const products = await axiosGET(URL)
//   console.log(products.data)
// })()

describe("Prueba a la API RESTful", () => {
  describe("Método GET", () => {
    it("Debe leer productos", async () => {
      const products = await axiosGET(URL)
      let status = products.status
      products.data.message && (status = 404)
      console.log(`Respuesta del servidor (status): ${status}`)
      console.log(products.data)

      assert.strictEqual(status, 200)
    })
  })

  describe("Método POST", () => {
    it("Debe ingresar producto nuevo", async () => {
      const productNew = {
        name: "prueba",
        description: "info de prueba",
        code: "1234",
        urlPicture: "la-foto",
        price: "es lo que cuesta",
        stock: "bastante cantidad",
      }

      const product = await axiosPOST(URL, { productNew })
      let status = product.status

      assert.strictEqual(status, 200)
    })
  })
})
