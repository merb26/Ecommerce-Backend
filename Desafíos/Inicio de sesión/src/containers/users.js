const users = require("../models/users")

class Container {
  async save(obj) {
    const user = new users(obj)

    return user.save()
  }

  async getAll() {
    return users.find({})
  }
}

module.exports = { Container }
