const { fork } = require("child_process")
const Router = require("express")
const yargs = require("yargs/yargs")(process.argv.slice(2))
const args = yargs.argv
const { controllerProductsMongodb } = require("../controllers/mongodbProducts")

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
  }

  res.render("info", { info })
})

routeApis.get("/api/randoms", async (req, res) => {
  const forked = fork("./src/apis/randoms.js")

  const products = await controllerProductsMongodb.getProducts()
  forked.send(products)

  forked.on("message", product => {
    res.json(product)
  })
})

module.exports = { routeApis }
