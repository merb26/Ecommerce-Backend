const { loggerErr, loggerCons } = require("../apis/logger")
const { config } = require("../../config")

const serviceMessages = {
  visualizeMessages: req => {
    loggerCons.error(
      { level: "error", url: `${req.hostname}:${config.PORT}${req.url}` },
      "Ruta messages"
    )
    loggerErr.error(
      { level: "error", url: `${req.hostname}:${config.PORT}${req.url}` },
      "Ruta messages"
    )
  },
}

module.exports = { serviceMessages }
