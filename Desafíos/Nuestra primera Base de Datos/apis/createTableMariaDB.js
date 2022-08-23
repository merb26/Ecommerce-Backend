const createTable = (options, nameTable) => {
  const knex = require("knex")(options)

  knex.schema
    .createTable(nameTable, table => {
      table.increments("id")
      table.string("name")
      table.integer("price")
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
