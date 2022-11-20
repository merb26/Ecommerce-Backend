const { serviceMessages } = require("../services/messages")

const controllerMessages = {
  getMessages: async (req, res) => {
    serviceMessages.visualizeMessages(req)

    res.render("messages")
  },
}

module.exports = { controllerMessages }
