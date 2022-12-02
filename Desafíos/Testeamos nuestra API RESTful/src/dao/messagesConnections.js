const { loggerCons } = require("../apis/logger")
const { config } = require("../../config")

class Connection {
  async connection(dbSelect) {
    return databases[dbSelect]()
  }

  async desconnection() {}
}

const databases = {
  sqllite: () => {
    const options = {
      client: "sqlite3",
      connection: {
        filename: "./src/db/messages.sqlite",
      },
      useNullAsDefault: true,
    }

    knex = require("knex")(options)
    loggerCons.info("Connected database Messages SqlLite3")
    return knex
  },
}

const desconnDB = {
  otroDB: () => {},
}

module.exports = { Connection }
