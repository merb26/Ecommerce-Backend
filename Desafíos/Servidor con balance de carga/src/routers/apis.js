const Router = require("express")
const yargs = require("yargs/yargs")(process.argv.slice(2))
const args = yargs.argv
const numCPUs = require("os").cpus().length

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

  res.render("info", { info })
})

module.exports = { routeApis }
