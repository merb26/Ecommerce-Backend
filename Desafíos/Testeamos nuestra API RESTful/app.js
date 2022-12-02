const { Server: SERVER_HTTP } = require("http")
const { Server: SERVER_IO } = require("socket.io")
const compression = require("compression")
const express = require("express")
const session = require("express-session")
const passport = require("passport")

const { config } = require("./config")
const { routeLogin } = require("./src/routers/login")
const { routeApis } = require("./src/routers/info")
const { routerProducts } = require("./src/routers/products")
const { routerMessages, connectServerIO } = require("./src/routers/messages")
const { listenerServer } = require("./server")
const { loggerCons, loggerWarn } = require("./src/apis/logger")

const app = express()
const serverHttp = new SERVER_HTTP(app)
const serverIO = new SERVER_IO(serverHttp)

app.use(express.json())
app.use(compression())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

/* -------------------------------------------------------------------------- */
/*                          Configuration of Session                          */
/* -------------------------------------------------------------------------- */
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

app.use(passport.initialize())
app.use(passport.session())

/* -------------------------------------------------------------------------- */
/*                                   Routers                                  */
/* -------------------------------------------------------------------------- */

app.use("/", routeLogin)
app.use("/", routeApis)
app.use("/messages", routerMessages)
app.use("/products", routerProducts)

/* -------------------------------------------------------------------------- */
/*                                  WebSocket                               */
/* -------------------------------------------------------------------------- */

connectServerIO(serverIO)

/* -------------------------------------------------------------------------- */
/*                                     PUG                                    */
/* -------------------------------------------------------------------------- */

app.set("views", "./views")
app.set("view engine", "pug")

listenerServer(serverHttp)

app.get("*", async (req, res) => {
  loggerCons.warn(
    { level: "warn", url: `${req.hostname}:${config.PORT}${req.url}` },
    "Ruta inexistente"
  )
  loggerWarn.warn(
    { level: "warn", url: `${req.hostname}:${config.PORT}${req.url}` },
    "Ruta inexistente"
  )
  res.json({ message: "Ruta inexistente" })
})

module.exports = { app }
