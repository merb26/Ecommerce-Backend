const express = require("express")
const { Server: SERVER_HTTP } = require("http")
const { Server: SERVER_IO } = require("socket.io")
const Container = require("./fileManagement")
const ContainerChat = require("./controllerChat")

const app = express()
const serverHttp = new SERVER_HTTP(app)
const serverIO = new SERVER_IO(serverHttp)

const containerProducts = new Container("products.txt")
const containerChat = new ContainerChat("chat.txt")

app.use(express.static("public"))

app.get("/", (req, resp) => {
  resp.render("form")
})

serverIO.on("connection", async socket => {
  console.log("Usuario conectado: " + socket.id)

  /* -------------------------------------------------------------------------- */
  /*                         Ingresa y muestra productos                        */
  /* -------------------------------------------------------------------------- */

  socket.on("productNew", async product => {
    await containerProducts.save(product)
    const products = await containerProducts.getAll()
    serverIO.sockets.emit("products", products)
  })

  const products = await containerProducts.getAll()
  socket.emit("products", products)

  /* -------------------------------------------------------------------------- */
  /*                                    Chat                                    */
  /* -------------------------------------------------------------------------- */

  socket.on("messageSent", async message => {
    await containerChat.save(message)
    const messages = await containerChat.getAll()
    serverIO.sockets.emit("messages", messages)
  })

  const messages = await containerChat.getAll()
  socket.emit("messages", messages)

  socket.on("disconnect", () => {
    console.log("usuario desconectado: ", socket.id)
  })
})

app.set("view engine", "pug")
app.set("views", "./views")

const PORT = process.env.PORT || 8080
serverHttp.listen(PORT, err => {
  if (err) throw new Error(`Error en servidor ${err}`)
  console.log(`Running on Port: ${PORT}`)
})
