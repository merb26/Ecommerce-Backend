const { mongoose } = require("mongoose")
const express = require("express")
const session = require("express-session")
const passport = require("passport")
const cluster = require("cluster")
const numCPUs = require("os").cpus().length

const { config } = require("./config")
const { routeLogin } = require("./src/routers/login")
const { routeApis } = require("./src/routers/apis")
const { listenerServer } = require("./server")

const app = express()

app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

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

app.use(
  session({
    secret: process.env.SECRET,
    cookie: {
      maxAge: 600 * 1000,
      httpOnly: true,
      secure: false,
    },
    rolling: true,
    resave: true,
    saveUninitialized: true,
  })
)

/* -------------------------------------------------------------------------- */
/*                                   Cluster                                  */
/* -------------------------------------------------------------------------- */
const modo = config.MODO
if (modo.toLowerCase() == "cluster") {
  if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`)

    //Fork workers
    for (let index = 0; index < numCPUs; index++) {
      cluster.fork()
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`)
    })
  } else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    app.get("/", (req, res) => {
      res.json({ message: "ok" })
    })

    listenerServer(app)

    console.log(`Worker ${process.pid} started`)
  }
}

app.get("/datos", (req, res) => {
  console.log(`Puerto ${config.PORT} fyh: ${new Date()}`)
  res.send(
    `Puerto ${config.PORT} - PID: ${
      process.pid
    } - fyh: ${new Date().toDateString()}`
  )
})

app.use(passport.initialize())
app.use(passport.session())

app.use("/", routeLogin)
app.use("/", routeApis)

app.set("views", "./views")
app.set("view engine", "pug")

if (modo.toLowerCase() != "cluster") {
  listenerServer(app)
}
