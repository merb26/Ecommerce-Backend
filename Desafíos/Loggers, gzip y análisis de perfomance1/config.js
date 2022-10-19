require("dotenv").config()
const yargs = require("yargs/yargs")(process.argv.slice(2))
const args = yargs.argv

const config = {
  URL_MONGODB: process.env.URL_MONGODB,
  PORT: args.PORT || 8080,
  SECRET: process.env.SECRET || "MY-SECRET",
  MODO: args.MODO || "fork",
  NODE_ENV: process.env.NODE_ENV || "develop",
}

module.exports = { config }
