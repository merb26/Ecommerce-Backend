const { Container } = require("../containers/file")

const container = new Container("./db/messages.json")

const controllerMessagesFile = {
  getMessages: async () => {
    return await container.getAll()
  },
  saveMessage: message => {
    container.save(message)
  },
}

module.exports = { controllerMessagesFile }
