const { Container } = require("../containers/firebase")

const container = new Container("messages")

const controllerMessagesFirebase = {
  getMessages: async () => {
    const docs = await container.getAll()
    const messages = docs.map(doc => ({
      author: doc.data().author,
      dateAndHour: doc.data().dateAndHour,
      text: doc.data().text,
      id: doc.id,
    }))

    return messages
  },
  saveMessage: message => {
    container.save(message)
  },
}

module.exports = { controllerMessagesFirebase }
