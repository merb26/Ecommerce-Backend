const normalizr = require("normalizr")
const { normalize, schema } = normalizr

const normalizeMessages = messages => {
  const schemaAuthor = new schema.Entity(
    "authors",
    {},
    { idAttribute: "email" }
  )

  const schemaMessage = new schema.Entity("messages", {
    author: schemaAuthor,
  })

  const normalizeMessages = normalize(messages, [schemaMessage])

  return normalizeMessages
}

module.exports = { normalizeMessages }
