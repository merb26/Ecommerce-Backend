const mongoose = require("mongoose")

const collection = "messages"

const schema = new mongoose.Schema({
  author: { type: Object },
  dateAndHour: { type: String },
  text: { type: String },
})

module.exports = mongoose.model(collection, schema)
