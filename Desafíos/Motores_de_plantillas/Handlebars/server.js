const express = require("express")
const bodyParser = require("body-parser")
const handlebars = require("express-handlebars")
const Container = require("./fileManagement")

const app = express()
const container = new Container("products.txt")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static("public"))

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
)

app.get("/", (req, resp) => {
  resp.render("main", {})
})

app.get("/products", async (req, resp) => {
  let existProducts = true
  const products = await container.getAll()
  if (!products) {
    existProducts = false
  } else if (products.length == 0) {
    existProducts = false
  }

  resp.render("products", {
    products,
    listExists: existProducts,
  })
})

app.post("/products", (req, resp) => {
  const product = {
    title: req.body.title,
    price: req.body.price,
    urlPicture: req.body.urlPicture,
  }
  container.save(product)
  resp.render("main")
})

app.set("view engine", "hbs")
app.set("views", "./views")

const PORT = process.env.PORT || 8080
app.listen(PORT, err => {
  if (err) throw new Error(`Error en servidor ${err}`)
  console.log(`Running on Port: ${PORT}`)
})
