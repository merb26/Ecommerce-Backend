const { Router } = require("express")

const Container = require("../dao/knex")
const { sqlite3 } = require("../apis/options")
const { controllerMessages } = require("../controllers/messages")

const routerMessages = Router()

const containerChat = new Container(sqlite3, "messages")

routerMessages.get("/", controllerMessages.getMessages)

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
