const pino = require("pino")

const loggerWarn = pino("warn.log")

const loggerErr = pino("error.log")

const loggerCons = pino()

module.exports = { loggerWarn, loggerErr, loggerCons }
