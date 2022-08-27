const express = require("express")
const { Server: SERVER_HTTP } = require("http")
const { Server: SERVER_IO } = require("socket.io")

const Container = require("./controllers/knex")
const { mariaDB, sqlite3 } = require("./apis/options")
const createTableMariaDB = require("./apis/createTableMariaDB")
const createTableSqlite3 = require("./apis/createTableSqlite3")

// createTableMariaDB(mariaDB, "products")
// createTableSqlite3(sqlite3, "messages")

const app = express()
const serverHttp = new SERVER_HTTP(app)
const serverIO = new SERVER_IO(serverHttp)

const containerProducts = new Container(mariaDB, "products")
const containerChat = new Container(sqlite3, "messages")
app.use(express.static("public"))

app.get("/", (req, resp) => {
  resp.render("form")
})

serverIO.on("connection", socket => {
  console.log("Usuario conectado: " + socket.id)

  /* -------------------------------------------------------------------------- */
  /*                         Ingresa y muestra productos                        */
  /* -------------------------------------------------------------------------- */

  socket.on("productNew", product => {
    containerProducts.save(product).then(() => {})
    containerProducts
      .getAll()
      .then(rows => {
        serverIO.sockets.emit("products", rows)
      })
      .catch(err => console.log(err))
  })

  containerProducts
    .getAll()
    .then(rows => {
      socket.emit("products", rows)
    })
    .catch(err => console.log(err))

  /* -------------------------------------------------------------------------- */
  /*                                    Chat                                    */
  /* -------------------------------------------------------------------------- */

  socket.on("messageSent", message => {
    containerChat.save(message).then(() => console.log("Message saved"))

    containerChat.getAll().then(messages => {
      serverIO.sockets.emit("messages", messages)
    })
  })

  containerChat.getAll().then(messages => {
    socket.emit("messages", messages)
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
