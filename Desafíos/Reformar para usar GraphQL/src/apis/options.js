const sqlite3 = {
  client: "sqlite3",
  connection: {
    filename: "./src/db/messages.sqlite",
  },
  useNullAsDefault: true,
}

module.exports = { sqlite3 }
