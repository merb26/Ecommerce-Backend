const Router = require("express")
const yargs = require("yargs/yargs")(process.argv.slice(2))
const numCPUs = require("os").cpus().length

const { loggerCons } = require("../../logger")
const { config } = require("../../config")

const args = yargs.argv
const routeApis = Router()

routeApis.get("/info", (req, res) => {
  const info = {
    args,
    platform: process.platform,
    node: process.version,
    rss: process.memoryUsage().rss,
    pathProyect: process.cwd(),
    pathEjecutable: process.execPath,
    id: process.pid,
    numCPUs,
  }

  loggerCons.info({ level: "info" }, `${req.hostname}:${config.PORT}${req.url}`)
  console.log(info)

  res.render("info", { info })
})

module.exports = { routeApis }
