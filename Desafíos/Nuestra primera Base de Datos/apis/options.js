const mariaDB = () => {
  return {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "backend",
    },
  }
}

const sqlite3 = () => {
  return {
    client: "sqlite3",
    connection: {
      filename: "../db/mydb.sqlite",
    },
    useNullAsDefault: true,
  }
}

module.exports = { mariaDB, sqlite3 }
