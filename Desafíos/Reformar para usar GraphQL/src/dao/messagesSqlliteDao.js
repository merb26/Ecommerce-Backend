class messagesSqlliteDAO {
  constructor(knex) {
    this.nameTable = "messages"
    this.knex = knex
  }

  save = object => {
    return this.knex(this.nameTable).insert(object)
  }

  getAll() {
    return this.knex.from(this.nameTable).select("*")
  }
}

module.exports = { messagesSqlliteDAO }
