const alterTable = (options, nameTable) => {
  const knex = require("knex")(options)

  knex.schema
    .table(nameTable, table => {
      table.dropColumn("id")
      table.string("price").alter()
      table.renameColumn("title", "email")
      table.renameColumn("price", "dateAndHour")
      table.renameColumn("urlPicture", "text")
    })
    .then(() => console.log("Table altered"))
}

module.exports = alterTable
