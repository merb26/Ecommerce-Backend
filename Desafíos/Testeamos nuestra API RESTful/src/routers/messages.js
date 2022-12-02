const { Router } = require("express")

const { controllerMessages } = require("../controllers/messages")
const { serviceMessages } = require("../services/messagesService")

const routerMessages = Router()

routerMessages.get("/", controllerMessages.getMessages)

const connectServerIO = serverIO => {
  serviceMessages.webSocket(serverIO)
}

module.exports = { routerMessages, connectServerIO }
