const { loggerErr, loggerCons } = require("../apis/logger")
const { config } = require("../../config")
const { MessagesRepo } = require("../repository/messages/messagesRepo")

const serviceMessages = {
  visualizeMessages: req => {
    loggerCons.info(
      { level: "info", url: `${req.hostname}:${config.PORT}${req.url}` },
      "Ruta messages"
    )
  },
  webSocket: serverIO => {
    serverIO.on("connection", socket => {
      socket.on("messageSent", message => {
        new MessagesRepo()
          .save(message)
          .then(() => console.log("Message saved"))
        new MessagesRepo().getAll().then(messages => {
          serverIO.sockets.emit("messages", messages)
        })
      })

      new MessagesRepo().getAll().then(messages => {
        socket.emit("messages", messages)
      })
    })
  },
}

module.exports = { serviceMessages }
