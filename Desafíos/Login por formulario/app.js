const express = require("express")
const session = require("express-session")
const MongoStore = require("connect-mongo")

const { generatorProducts } = require("./src/apis/generateProductsFaker")
const { routeLogin } = require("./src/routers/login")
const { listenerServer } = require("./server")

const app = express()

app.use(express.json())
app.use(express.static("public"))

const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

app.use(
  session({
    secret: process.env.SESSION_SECRET || "123@456",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://merb:XcKp9WciORH5TlCS@cluster0.4ryuos8.mongodb.net/ecommerce`,
      mongoOptions: mongoConfig,
      //ttl: 600, //10 minutos de expiración
      ttl: 60, //1 minuto de expiración
    }),
  })
)

app.use("/", routeLogin)

app.set("views", "./views")
app.set("view engine", "pug")

listenerServer(app)
