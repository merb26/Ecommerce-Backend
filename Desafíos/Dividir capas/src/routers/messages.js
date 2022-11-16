const { Router } = require("express")

const Container = require("../controllers/knex")
const { sqlite3 } = require("../apis/options")
const { config } = require("../../config")
const { loggerErr, loggerCons } = require("../apis/logger")

const routerMessages = Router()

const containerChat = new Container(sqlite3, "messages")

routerMessages.get("/", async (req, res) => {
  loggerCons.error(
    { level: "error", url: `${req.hostname}:${config.PORT}${req.url}` },
    "Ruta messages"
  )
  loggerErr.error(
    { level: "error", url: `${req.hostname}:${config.PORT}${req.url}` },
    "Ruta messages"
  )

  res.render("messages")
})

const connectServerIO = serverIO => {
  serverIO.on("connection", socket => {
    socket.on("messageSent", message => {
      containerChat.save(message).then(() => console.log("Message saved"))

      containerChat.getAll().then(messages => {
        serverIO.sockets.emit("messages", messages)
      })
    })

    containerChat.getAll().then(messages => {
      socket.emit("messages", messages)
    })
  })
}

module.exports = { routerMessages, connectServerIO }
