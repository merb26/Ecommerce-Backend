const createTable = (options, nameTable) => {
  const knex = require("knex")(options)

  knex.schema
    .createTable(nameTable, table => {
      table.string("email")
      table.string("dateAndHour")
      table.string("text")
    })
    .then(() => {
      console.log("table created")
    })
    .catch(err => {
      console.log(err)
      throw err
    })
    .finally(() => knex.destroy())
}

module.exports = createTable
