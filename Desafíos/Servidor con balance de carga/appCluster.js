const { mongoose } = require("mongoose")
const http = require("http")
const cluster = require("cluster")
const numCPUs = require("os").cpus().length
const { fork } = require("child_process")

const {
  controllerProductsMongodb,
} = require("./src/controllers/mongodbProducts")
const { config } = require("./config")

/* -------------------------------------------------------------------------- */
/*                             Conexión de MongoDB                            */
/* -------------------------------------------------------------------------- */

try {
  mongoose.connect(config.URL_MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("Connected database MongoDB")
} catch (error) {
  console.log(error)
}

/* -------------------------------------------------------------------------- */
/*                            Cluster (api/randoms)                           */
/* -------------------------------------------------------------------------- */

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`)

  for (let index = 0; index < numCPUs; index++) {
    cluster.fork()
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`)
  })
} else {
  http
    .createServer(async (req, res) => {
      const forked = fork("./src/apis/randoms.js")

      const products = await controllerProductsMongodb.getProducts()
      forked.send(products)

      forked.on("message", product => {
        const productPort = {
          ...product,
          port: `Puerto ${config.PORT} - PID: ${
            process.pid
          } - fyh: ${new Date().toDateString()}`,
        }
        res.end(JSON.stringify(productPort))
      })
    })
    .listen(config.PORT)

  console.log(`Worker ${process.pid} started`)
}
