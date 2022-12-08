const mongoose = require("mongoose")

const nameCollection = "users"

const schemaUser = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
})

module.exports = mongoose.model(nameCollection, schemaUser)
