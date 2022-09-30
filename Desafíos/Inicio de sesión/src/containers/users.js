const users = require("../models/users")

class Container {
  async save(obj) {
    const user = new users(obj)

    user.save()
  }

  async getAll() {
    users.find({})
  }
}

module.exports = { Container }
