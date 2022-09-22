const messages = require("../models/messages")

class Container {
  /* -------------------------------------------------------------------------- */
  /*                                    save                                    */
  /* -------------------------------------------------------------------------- */
  async save(obj) {
    const message = new messages(obj)
    message.save()
  }

  /* -------------------------------------------------------------------------- */
  /*                                   getAll                                   */
  /* -------------------------------------------------------------------------- */
  async getAll() {
    return messages.find({})
  }
}

module.exports = { Container }
