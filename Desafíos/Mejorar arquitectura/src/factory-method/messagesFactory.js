const { messagesSqlliteDAO } = require("../dao/messagesSqlliteDao")
const { Connection } = require("../dao/messagesConnections")

const dataBase = ["sqllite"]

class MessagesFactory {
  constructor() {
    new Connection().connection(dataBase[0]).then(knex => {
      this.messageDao = new messagesSqlliteDAO(knex)
    })
  }

  getMessagesDAO() {
    return this.messageDao
  }
}

module.exports = { MessagesFactory }
