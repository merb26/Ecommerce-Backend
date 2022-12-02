const { serviceMessages } = require("../services/messagesService")

const controllerMessages = {
  getMessages: async (req, res) => {
    serviceMessages.visualizeMessages(req)

    res.render("messages")
  },
}

module.exports = { controllerMessages }
