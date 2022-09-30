const { mongoose } = require("mongoose")
const express = require("express")
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const MongoStore = require("connect-mongo")

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

/* -------------------------------------------------------------------------- */
/*                      Configuración de MongoDB Session                      */
/* -------------------------------------------------------------------------- */

// const mongoConfig = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "123@456",
//     resave: true,
//     rolling: true,
//     saveUninitialized: false,
//     cookie: {
//       httpOnly: false,
//       secure: false,
//       maxAge: 60,
//     },
//   })
// )

app.use(
  session({
    secret: "secret",
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect("/login")
  }
}

passport.use(
  "login",
  new LocalStrategy((email, password, done) => {
    console.log("passportLogin")
    let user = Users.find(user => user.username === username)

    if (!user) {
      console.log(`No existe el usuario ${username}`)
      return done(null, false, { message: "User not found" })
    }

    // if (!isValidePassword(user, password)) {
    //     console.log('Password incorrecto')
    //     return done(null, false, { message: 'Password incorrect' })
    // }

    if (user.password !== password) {
      console.log("Password incorrecto")
      return done(null, false, { message: "Password incorrect" })
    }

    done(null, user)
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  let user = Users.find(user => user.id === id)

  done(null, user)
})

app.get("/home", checkAuth, (req, res) => {
  res.render("profileUser", { user: req.user })
})

// login

app.get("/login", (req, res) => {
  // if (req.isAuthenticated()) {
  //     const { user } = req.user
  //     console.log('user logueado')
  //     res.render('profileUser')
  // } else {
  //     console.log('user no logueado')
  //     res.render('login')
  // }
  res.render("login")
})

app.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/home",
    failureRedirect: "/login",
  })
)

app.use("/", routeLogin)

app.set("views", "./views")
app.set("view engine", "pug")

listenerServer(app)
