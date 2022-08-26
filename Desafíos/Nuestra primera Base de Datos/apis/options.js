const mariaDB = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "backend",
  },
}

const sqlite3 = {
  client: "sqlite3",
  connection: {
    filename: "./db/messages.sqlite",
  },
  useNullAsDefault: true,
}

module.exports = { mariaDB, sqlite3 }
