const { generatorProducts } = require("./apis/generateProductsFaker")
const { controller } = require("./apis/chooseDatabase")
const { normalizeMessages } = require("./apis/schemaNormalize")
const express = require("express")
const { Server: SERVER_HTTP } = require("http")
const { Server: SERVER_IO } = require("socket.io")

const app = express()
const serverHttp = new SERVER_HTTP(app)
const serverIO = new SERVER_IO(serverHttp)

app.use(express.static("public"))

app.get("/", (req, resp) => {
  resp.render("form")
})

app.get("/api/products-test", (req, resp) => {
  resp.render("mocks")
})

serverIO.on("connection", async socket => {
  console.log("Usuario conectado: " + socket.id)
  let messages

  /* -------------------------------------------------------------------------- */
  /*                                  Productos                                 */
  /* -------------------------------------------------------------------------- */

  socket.emit("products", generatorProducts(5))

  /* -------------------------------------------------------------------------- */
  /*                                    Chat                                    */
  /* -------------------------------------------------------------------------- */

  socket.on("messageSent", async message => {
    controller.saveMessage(message)

    messages = await controller.getMessages()
    serverIO.sockets.emit("messages", {
      normalized: normalizeMessages(messages),
      dataLength: JSON.stringify(messages).length,
    })
  })

  messages = await controller.getMessages()
  socket.emit("messages", {
    normalized: normalizeMessages(messages),
    dataLength: JSON.stringify(messages).length,
  })

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
