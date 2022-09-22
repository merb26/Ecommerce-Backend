const { Container } = require("../containers/mongoDB")

const container = new Container()

const controllerMessagesMongodb = {
  getMessages: async () => {
    const messages = await container.getAll()
    const messagesData = []

    messages.forEach(element => {
      const message = {
        author: element.author,
        dateAndHour: element.dateAndHour,
        text: element.text,
        id: element.id,
      }
      messagesData.push(message)
    })

    return messagesData
  },
  saveMessage: message => {
    container.save(message)
  },
}

module.exports = { controllerMessagesMongodb }
