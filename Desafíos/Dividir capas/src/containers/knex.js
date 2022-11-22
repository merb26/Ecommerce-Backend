class Container {
  constructor(options, nameTable) {
    this.nameTable = nameTable
    this.knex = require("knex")(options)
    console.log(this.knex)
  }

  save = object => {
    return this.knex(this.nameTable).insert(object)
  }

  getAll = () => {
    return this.knex.from(this.nameTable).select("*")
  }
}

module.exports = Container
