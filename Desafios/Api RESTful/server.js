const express = require("express")
const Container = require("./fileManagement")
const bodyParser = require("body-parser")
const { Router } = express

const container = new Container("./products.txt")
const app = express()
const routerProducts = Router()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

/* -------------------------------------------------------------------------- */
/*                              Show all products                             */
/* -------------------------------------------------------------------------- */
routerProducts.get("/", async (req, resp) => {
  const products = await container.getAll()
  resp.json(products)
})

/* -------------------------------------------------------------------------- */
/*                          Enter a product with form                         */
/* -------------------------------------------------------------------------- */
routerProducts.get("/form", async (req, resp) => {
  resp.sendFile(__dirname + "/public/index.html")
})

/* -------------------------------------------------------------------------- */
/*                            Show a product by id                            */
/* -------------------------------------------------------------------------- */
routerProducts.get("/:id", (req, resp) => {
  const { id } = req.params
  container.getById(parseInt(id)).then(product => resp.json(product))
})

/* -------------------------------------------------------------------------- */
/*                     Get and save the data of a product                     */
/* -------------------------------------------------------------------------- */
routerProducts.post("/", (req, resp) => {
  const product = {
    title: req.body.title,
    price: req.body.price,
    urlPicture: req.body.urlPicture,
  }

  container.save(product).then(product =>
    resp.json({
      message: `Fue guardado con éxito, el id del producto es:  ${product}`,
    })
  )
})

/* -------------------------------------------------------------------------- */
/*                             Update the product                             */
/* -------------------------------------------------------------------------- */
routerProducts.put("/:id", async (req, resp) => {
  const { id } = req.params

  const result = await container.update({
    title: "Nike",
    price: "8000",
    urlPicture: "444444444",
    id: parseInt(id),
  })

  resp.json(result)
})

/* -------------------------------------------------------------------------- */
/*                             Delete the product                             */
/* -------------------------------------------------------------------------- */
routerProducts.delete("/:id", async (req, resp) => {
  const { id } = req.params
  const result = await container.deleteById(parseInt(id))
  resp.json(result)
})

app.use("/api/products", routerProducts)

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
  console.log(`Running on Port: ${server.address().port}`)
})
