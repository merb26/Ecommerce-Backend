class Container {
  constructor(options, nameTable) {
    this.options = options
    this.nameTable = nameTable
  }

  knex = require("knex")(options)

  save = object => {
    knex(this.nameTable)
      .insert(object)
      .then(() => console.log("data inserted"))
      .catch(err => {
        console.log(err)
        throw err
      })
      .finally(() => knex.destroy())
  }

  getAll = () => {
    knex
      .from(this.nameTable)
      .select("*")
      .then(rows => {
        for (const row of rows) {
          console.log(`${row["id"]} ${row["name"]} ${row["price"]}`)
        }
      })
      .catch(err => {
        console.log(err)
        throw err
      })
      .finally(() => knex.destroy())
  }
}
