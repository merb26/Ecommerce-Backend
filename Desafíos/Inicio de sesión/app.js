const { mongoose } = require("mongoose")
const express = require("express")
const session = require("express-session")
const passport = require("passport")

const { routeLogin } = require("./src/routers/login")
const { listenerServer } = require("./server")

const app = express()

app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

/* -------------------------------------------------------------------------- */
/*                             Conexión de MongoDB                            */
/* -------------------------------------------------------------------------- */
const URL =
  "mongodb+srv://merb:XcKp9WciORH5TlCS@cluster0.4ryuos8.mongodb.net/ecommerce"

try {
  mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("Connected database MongoDB")
} catch (error) {
  console.log(error)
}

app.use(
  session({
    secret: "my_secret",
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

app.use("/", routeLogin)

app.set("views", "./views")
app.set("view engine", "pug")

listenerServer(app)
