const yargs = require("yargs/yargs")(process.argv.slice(2)).argv
const numCPUs = require("os").cpus().length

const { loggerCons } = require("../apis/logger")
const { config } = require("../../config")

const serviceInfo = {
  getInfoProcess: req => {
    const info = {
      yargs,
      platform: process.platform,
      node: process.version,
      rss: process.memoryUsage().rss,
      pathProyect: process.cwd(),
      pathEjecutable: process.execPath,
      id: process.pid,
      numCPUs,
    }

    loggerCons.info(
      { level: "info" },
      `${req.hostname}:${config.PORT}${req.url}`
    )
    console.log(info)

    return info
  },
}

module.exports = { serviceInfo }
